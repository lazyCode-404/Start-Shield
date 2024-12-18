import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as companyIdl, canisterId as companyCanisterId } from "dfx-generated/companyData";

const agent = new HttpAgent();

if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey(); // Doar pentru dezvoltare locală
}

export const companyActor = Actor.createActor(companyIdl, {
  agent,
  canisterId: companyCanisterId,
});

export const addCompany = async (data) => {
  const principal = await window.ic.plug.getPrincipal();
  return await companyActor.addCompany(principal, data);
};

export const getCompany = async () => {
  const principal = await window.ic.plug.getPrincipal();
  return await companyActor.getCompany(principal);
};
