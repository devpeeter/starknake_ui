import { Controller } from "@cartridge/controller";

const controller = new Controller({
  app: "your-game-id",
  network: "starknet-testnet", // or 'starknet-mainnet'
});

export default controller;
