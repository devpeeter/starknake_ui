import React from "react";

function LandingPage({ connectWallet, loading, error }) {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="logo-section">
          <img
            src="/sprites/logo.png"
            alt="Snake Attack"
            className="game-logo"
          />
          <h1 className="game-title">SNAKE ATTACK</h1>
          <p className="game-subtitle">Connect your wallet to start playing</p>

          {/* Step-by-step instructions */}
          <div className="connection-steps">
            <h3>How to connect:</h3>
            <ol>
              <li>Click "Connect Wallet" below</li>
              <li>Approve the connection in your wallet popup</li>
              <li>Select your account and authorize</li>
              <li>Start playing!</li>
            </ol>
          </div>
        </div>

        <div className="connect-section">
          <button
            onClick={connectWallet}
            disabled={loading}
            className={`connect-wallet-btn ${loading ? "loading" : ""}`}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Waiting for authorization...
              </>
            ) : (
              "Connect Wallet"
            )}
          </button>

          {error && (
            <div className="error-message">
              <strong>Connection Issue:</strong> {error}
              <div className="error-help">
                <p>
                  <strong>Troubleshooting tips:</strong>
                </p>
                <ul>
                  <li>Make sure your wallet is unlocked</li>
                  <li>Check for any popup blockers</li>
                  <li>
                    Look for the connection request in your wallet extension
                  </li>
                  <li>Try refreshing the page and connecting again</li>
                </ul>
              </div>
            </div>
          )}

          <div className="wallet-guidance">
            <p>Don't have a StarkNet wallet?</p>
            <div className="wallet-links">
              <a
                href="https://www.argent.xyz/argent-x/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install ArgentX
              </a>
              <a
                href="https://braavos.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Braavos
              </a>
            </div>
          </div>
        </div>

        <div className="game-preview">
          <img
            src="/sprites/bg_game.jpg"
            alt="Game Preview"
            className="preview-image"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

///=========

// import React, { useEffect } from "react";
// import { useConnect, useAccount } from "@starknet-react/core";

// function LandingPage({
//   fetchUserData,
//   setPlayerDetails,
//   setError,
//   setLoading,
// }) {
//   const { connect, connectors } = useConnect();
//   const { address } = useAccount();
//   const controller = connectors[0];

//   // Handle wallet connection
//   const handleConnect = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       if (!controller) {
//         throw new Error(
//           "No wallet connector available. Please refresh the page."
//         );
//       }
//       await connect({ connector: controller });
//     } catch (err) {
//       const message = err.message || "Wallet connection failed";
//       setError(
//         message.includes("user rejected") || message.includes("authorize")
//           ? "Connection cancelled. Please approve the connection in your wallet."
//           : message.includes("detected")
//           ? "No StarkNet wallet found. Please install Argent X or Braavos and refresh."
//           : `Wallet connection failed: ${message}. Ensure your wallet is unlocked and on Sepolia testnet.`
//       );
//       console.error("Connection error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user data after connection
//   useEffect(() => {
//     if (address) {
//       setLoading(true);
//       fetchUserData(address)
//         .then((data) => {
//           setPlayerDetails(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError("Failed to fetch user data: " + err.message);
//           setLoading(false);
//         });
//     }
//   }, [address, fetchUserData, setPlayerDetails, setError, setLoading]);

//   return (
//     <div className="landing-page">
//       <div className="landing-container">
//         <div className="logo-section">
//           <img
//             src="/sprites/logo.png"
//             alt="Snake Attack"
//             className="game-logo"
//           />
//           <h1 className="game-title">SNAKE ATTACK</h1>
//           <p className="game-subtitle">Connect your wallet to start playing</p>

//           {/* Step-by-step instructions */}
//           <div className="connection-steps">
//             <h3>How to connect:</h3>
//             <ol>
//               <li>Click "Connect Wallet" below</li>
//               <li>Approve the connection in your wallet popup</li>
//               <li>Select your account and authorize</li>
//               <li>Start playing!</li>
//             </ol>
//           </div>
//         </div>

//         <div className="connect-section">
//           <button
//             onClick={handleConnect}
//             disabled={loading}
//             className={`connect-wallet-btn ${loading ? "loading" : ""}`}
//           >
//             {loading ? (
//               <>
//                 <span className="spinner"></span>
//                 Waiting for authorization...
//               </>
//             ) : (
//               "Connect Wallet"
//             )}
//           </button>

//           {error && (
//             <div className="error-message">
//               <strong>Connection Issue:</strong> {error}
//               <div className="error-help">
//                 <p>
//                   <strong>Troubleshooting tips:</strong>
//                 </p>
//                 <ul>
//                   <li>Make sure your wallet is unlocked</li>
//                   <li>Check for any popup blockers</li>
//                   <li>
//                     Look for the connection request in your wallet extension
//                   </li>
//                   <li>Try refreshing the page and connecting again</li>
//                 </ul>
//               </div>
//             </div>
//           )}

//           <div className="wallet-guidance">
//             <p>Don't have a StarkNet wallet?</p>
//             <div className="wallet-links">
//               <a
//                 href="https://www.argent.xyz/argent-x/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Install ArgentX
//               </a>
//               <a
//                 href="https://braavos.app/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Install Braavos
//               </a>
//             </div>
//           </div>
//         </div>

//         <div className="game-preview">
//           <img
//             src="/sprites/bg_game.jpg"
//             alt="Game Preview"
//             className="preview-image"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
