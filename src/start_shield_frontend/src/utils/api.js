// src/utils/api.js
import { HttpAgent } from '@dfinity/agent';
import { canisterId, createActor } from '../../../declarations/start_shield_backend';
import { hashPassword } from './bcryptjs'; // Asigură-te că importul este corect

const agent = new HttpAgent();
const actor = createActor(canisterId, { agent });

// api.js
export const registerUser = async(actor, formData) => {
    try {
        const hashedPassword = await hashPassword(formData.password); // Hash-uiește parola

        const response = await actor.signUp(
            formData.firstName,
            formData.lastName,
            formData.email,
            hashedPassword, // Trimite parola hash-uită
            formData.role === 'Admin' ? { 'ADMIN': null } : { 'USER': null }
        );

        console.log('Response from backend:', response);
        return response;
    } catch (error) {
        console.error('Error signing up:', error);
        throw error;
    }
};