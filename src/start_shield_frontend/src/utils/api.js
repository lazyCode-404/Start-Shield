// src/utils/api.js
import { HttpAgent } from '@dfinity/agent';
import { canisterId, createActor } from '../../../declarations/start_shield_backend';
import { hashPassword } from './bcryptjs'; // Asigură-te că importul este corect

const agent = new HttpAgent();
const actor = createActor(canisterId, { agent });

// api.js
export const registerUser = async (actor, formData) => {
  try {
    const hashedPassword = await hashPassword(formData.password); // Hash-uiește parola

    const response = await actor.signUp(
      formData.firstName,
      formData.lastName,
      formData.email,
      hashedPassword,  // Trimite parola hash-uită
      formData.role === 'Admin' ? { 'ADMIN': null } : { 'USER': null }
    );

    console.log('Response from backend:', response);
    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// import { HttpAgent } from '@dfinity/agent';
// import { canisterId, createActor } from '../../../declarations/start_shield_backend'; // Adjust the path based on your project structure

// /**
//  * Sign up a user by interacting with the backend actor
//  * @param {Object} actor - The actor created to interact with the canister
//  * @param {Object} userDetails - The details of the user signing up
//  * @returns {Promise<string>} The result from the backend (success or failure message)
//  */
// export const signUpUser = async (actor, userDetails) => {
//   try {
//     const { firstName, lastName, email, password, role } = userDetails;

//     // Call the registerUser method in the backend actor
//     const response = await actor.registerUser(firstName, lastName, email, password, role);

//     return response;
//   } catch (error) {
//     console.error('Error during sign up:', error);
//     throw new Error('Failed to sign up the user.');
//   }
// };

// /**
//  * Create an actor to interact with the backend
//  * @returns {Object} The actor for interacting with the backend canister
//  */
// export const createBackendActor = () => {
//   // Initialize an HttpAgent to interact with the Internet Computer
//   const agent = new HttpAgent();

//   // Create the actor for the backend canister
//   const actor = createActor(canisterId, { agent });

//   return actor;
// };

