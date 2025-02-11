import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/start_shield_backend"; // Calea către declarațiile generate
import { canisterId as backendCanisterId } from "../../../declarations/start_shield_backend";

const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943";
const host = "https://icp0.io";

// Configurare agent HTTP
export const createBackendActor = async (identity) => {
  const agent = new HttpAgent({
    host: network === "local" ? localhost : host,
    identity, // Identitatea utilizatorului (dacă există)
  });

  // Fetch root key doar pentru mediul local
  if (network === "local") {
    await agent.fetchRootKey();
  }

  // Creează actorul backend
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: backendCanisterId,
  });
};
