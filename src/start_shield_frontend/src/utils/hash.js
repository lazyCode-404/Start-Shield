// utils/hash.js
import bcrypt from 'bcryptjs'; // or any other hashing library

export const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password is required for hashing.');
  }
  const salt = await bcrypt.genSalt(); // Adjust the salt rounds as needed
  return await bcrypt.hash(password, salt);
};
