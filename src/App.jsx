import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { connect, disconnect } from "starknetkit";
import { Contract, RpcProvider } from "starknet";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import GamePage from "./pages/GamePage";
import { contractABI } from "./abi";
import { supabase } from "./supabaseClient";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState(null);
  const [playerDetails, setPlayerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const CONTRACT_ADDRESS =
    import.meta.env.VITE_CONTRACT ||
    "0x3060854ecff13fd7f72caf971475823ff457fed1de616e70cd5342ffa345d88";

  const PROVIDER = new RpcProvider({
    nodeUrl:
      import.meta.env.VITE_SEPOLIA_URL ||
      "https://free-rpc.nethermind.io/sepolia-juno",
  });

  const backendUrl = import.meta.env.VITE_APP_URL || "http://127.0.0.1:8080";

  useEffect(() => {
    console.log("App mounted, delaying wallet connection");
    const timer = setTimeout(() => {
      connectWallet();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const connectWallet = async () => {
    if (address) {
      try {
        await disconnect();
        setProvider(PROVIDER);
        setAccount(null);
        setAddress(null);
        setPlayerDetails(null);
        setError(null);
        console.log("Wallet disconnected");
      } catch (err) {
        console.error("Disconnect error:", err);
        setError("Failed to disconnect wallet");
      }
      return;
    }

    setLoading(true);
    setError(null);
    try {
      console.log("Connecting to wallet...");
      if (typeof window === "undefined" || !window.starknet) {
        throw new Error(
          "No StarkNet wallet detected. Please install Argent X or Braavos."
        );
      }

      const { wallet } = await connect({
        provider: PROVIDER,
      });

      console.log("Wallet object:", wallet);

      if (
        wallet &&
        wallet.isConnected &&
        wallet.account &&
        wallet.selectedAddress
      ) {
        setProvider(wallet.provider || PROVIDER);
        setAccount(wallet.account);
        setAddress(wallet.selectedAddress);

        try {
          console.log("Checking/creating user in Supabase:", wallet.selectedAddress);

          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('wallet_address', wallet.selectedAddress)
            .maybeSingle();

          if (fetchError && fetchError.code !== 'PGRST116') {
            throw fetchError;
          }

          let data;
          if (existingUser) {
            console.log("Existing user found:", existingUser);
            data = {
              status: "Existing",
              username: existingUser.username,
              position: 0,
              address: existingUser.wallet_address,
              highest_score: existingUser.highest_score
            };
          } else {
            console.log("Creating new user");
            const newUsername = `player_${wallet.selectedAddress.slice(2, 10)}`;

            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert({
                wallet_address: wallet.selectedAddress,
                username: newUsername,
                highest_score: 0,
                total_accumulated_score: 0,
                games_played: 0
              })
              .select()
              .single();

            if (insertError) throw insertError;

            data = {
              status: "New",
              username: newUser.username,
              position: 0,
              address: newUser.wallet_address,
              highest_score: newUser.highest_score
            };
          }

          console.log("User data:", data);
          console.log("Status response:", data.status);

          if (data.status === "New") {
            try {
              console.log("Contract ABI:", contractABI);

              const contract = new Contract(
                contractABI,
                CONTRACT_ADDRESS,
                wallet.account
              );
              console.log("Contract instance:", contract);

              const res = await contract.player_registers(
                wallet.selectedAddress,
                data.username
              );
              const txHash = res?.transaction_hash;
              if (!txHash) {
                throw new Error(
                  "No transaction hash returned from contract call"
                );
              }
              const txResult = await provider.waitForTransaction(txHash);
              console.log("Contract transaction:", txResult);
            } catch (contractError) {
              console.error("Contract call failed:", contractError);

              const { error: deleteError } = await supabase
                .from('users')
                .delete()
                .eq('wallet_address', wallet.selectedAddress);

              if (deleteError) {
                console.error("Failed to delete user:", deleteError);
              }

              throw new Error(
                `Failed to register player on contract: ${contractError.message}`
              );
            }
          } else {
            console.log("Existing user, skipping contract registration");
          }

          setPlayerDetails({
            username: data.username,
            position: data.position,
            walletAddress: data.address,
            score: data.highest_score.toString(),
          });
          console.log(`Connected: ${wallet.selectedAddress.slice(0, 10)}...`);
        } catch (fetchError) {
          console.warn("User sync failed, using fallback:", fetchError);

          setPlayerDetails({
            username: `player_${wallet.selectedAddress.slice(2, 10)}`,
            position: 0,
            walletAddress: wallet.selectedAddress,
            score: "0",
          });
        }
      } else {
        throw new Error("Failed to connect wallet");
      }
    } catch (error) {
      const message = getFriendlyErrorMessage(error);
      setError(message);
      console.error("Connection error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyErrorMessage = (error) => {
    const message = error.message || "Failed to connect wallet";
    if (message.includes("user rejected") || message.includes("authorize")) {
      return "Connection cancelled. Please approve the connection in your wallet.";
    }
    if (message.includes("detected")) {
      return "No StarkNet wallet found. Please install Argent X or Braavos and refresh the page.";
    }
    if (message.includes("version")) {
      return "Wallet version issue. Please update your wallet extension to the latest version.";
    }
    return `Wallet connection failed: ${message}. Please ensure your wallet is unlocked and set to Sepolia testnet.`;
  };

  const getContract = async (contractAddress, contractType) => {
    console.log("getting contract with: ", contractAddress);
    console.log("user address: ", address);
    console.log("account: ", account);
    console.log("provider: ", provider);

    // const { abi } = await provider.getClassAt(contractAddress);
    console.log("Contract ABI:", contractABI);

    try {
      // if (!abi) {
      //   throw new Error("No ABI found for the contract.");
      // }

      if (contractType === 1) {
        if (!address) {
          toast.error("Connect wallet!");
          return;
        }
        return new Contract(contractABI, contractAddress, provider);
      } else if (contractType === 2) {
        if (!address || !account) {
          toast.error("Account not initialized");
          return;
        }
        return new Contract(contractABI, contractAddress, account);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to initialize contract at ${contractAddress}: ${error.message}`
        );
      } else {
        throw new Error(
          `Failed to initialize contract at ${contractAddress}: Unknown error`
        );
      }
    }
  };

  const updateUsername = async (newUsername) => {
    if (!address || !newUsername || newUsername.length > 50) {
      setError("Please enter a valid username (1-50 characters)");
      return;
    }
    if (!newUsername.match(/^[a-zA-Z0-9_]+$/)) {
      setError(
        "Username must contain only alphanumeric characters or underscores"
      );
      return;
    }

    setUpdateLoading(true);
    setError(null);
    try {
      const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('wallet_address', address)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!userData) {
        throw new Error("User not found");
      }

      console.log("User data:", userData);

      // Step 2: Check if updated is false and call contract if true
      if (userData.updated === false) {
        try {
          // const abi = contractAbi;
          // if (!abi || !Array.isArray(abi)) {
          //   throw new Error("Invalid or missing ABI");
          // }
          // console.log("Contract ABI:", abi);

          const contract = await getContract(CONTRACT_ADDRESS, 2);
          console.log("Contract instance:", contract);

          const res = await contract.player_update_username(newUsername);
          const txHash = res?.transaction_hash;
          if (!txHash) {
            throw new Error("No transaction hash returned from contract call");
          }
          const txResult = await provider.waitForTransaction(txHash);
          console.log("Contract transaction:", txResult);
        } catch (contractError) {
          console.error("Contract call failed:", contractError);
          throw new Error(
            `Failed to update username on contract: ${contractError.message}`
          );
        }
      } else {
        console.log("User already updated, skipping contract call");
      }

      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({
          username: newUsername,
          updated_at: new Date().toISOString()
        })
        .eq('wallet_address', address)
        .select()
        .single();

      if (updateError) throw updateError;

      console.log("Username updated:", updatedUser);
      setPlayerDetails({
        username: updatedUser.username,
        position: 0,
        walletAddress: updatedUser.wallet_address,
        score: updatedUser.highest_score.toString(),
      });
    } catch (error) {
      const message = error.message || "Unknown error";
      setError(message);
      console.error("Update error:", message);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Suspense
      fallback={<div className="loading-container">Loading App...</div>}
    >
      <div className="app-container">
        <h1 style={{ color: "white" }}>App is Running</h1>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                address ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <LandingPage
                    connectWallet={connectWallet}
                    loading={loading}
                    error={error}
                  />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                address ? (
                  <Dashboard
                    playerDetails={playerDetails}
                    address={address}
                    connectWallet={connectWallet}
                    updateUsername={updateUsername}
                    loading={updateLoading}
                    error={error}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/game"
              element={
                address ? (
                  <GamePage playerDetails={playerDetails} />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="*"
              element={
                <div className="error-container">404: Page Not Found</div>
              }
            />
          </Routes>
        </Router>
      </div>
    </Suspense>
  );
}

export default App;

//=========
