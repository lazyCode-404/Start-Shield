// import { HttpAgent, Actor } from "@dfinity/agent";
// import { idlFactory } from "../../../declarations/start_shield_backend"; // Calea către declarațiile generate
// import { canisterId as backendCanisterId } from "../../../declarations/start_shield_backend";

// const network = process.env.DFX_NETWORK || "local";
// const localhost = "http://localhost:4943";
// const host = "https://icp0.io";

// // Configurare agent HTTP
// export const createBackendActor = async (identity) => {
//   const agent = new HttpAgent({
//     host: network === "local" ? localhost : host,
//     identity, // Identitatea utilizatorului (dacă există)
//   });

//   // Fetch root key doar pentru mediul local
//   if (network === "local") {
//     await agent.fetchRootKey();
//   }

//   // Creează actorul backend
//   return Actor.createActor(idlFactory, {
//     agent,
//     canisterId: backendCanisterId,
//   });
// };
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/start_shield_backend/start_shield_backend.did.js"; // Calea către declarațiile generate
import { canisterId as backendCanisterId } from "../../../declarations/start_shield_backend";

// Configurare rețea (local sau Internet Computer)
const network = process.env.DFX_NETWORK || "local";
const localhost = "http://localhost:4943"; // URL-ul pentru mediul local
const host = "https://icp0.io"; // URL-ul pentru mediul de producție

/**
 * Creează un actor pentru backend-ul canisterului.
 * @param {Identity} identity - Identitatea utilizatorului (opțional).
 * @returns {Promise<Actor>} - Actorul backend creat.
 */
export const createBackendActor = async (identity) => {
  try {
    // Configurare agent HTTP
    const agent = new HttpAgent({
      host: network === "local" ? localhost : host, // Selectează host-ul în funcție de rețea
      identity, // Setează identitatea utilizatorului (dacă există)
    });

    // Fetch root key doar pentru mediul local (necesar pentru testare)
    if (network === "local") {
      console.log("Fetching root key for local development...");
      await agent.fetchRootKey();
    }

    // Creează actorul backend folosind idlFactory și canisterId
    const actor = Actor.createActor(idlFactory, {
      agent,
      canisterId: backendCanisterId,
    });

    console.log("Backend actor created successfully.");
    return actor;
  } catch (error) {
    console.error("Failed to create backend actor:", error);
    throw error; // Propagă eroarea pentru a fi gestionată în frontend
  }
};
