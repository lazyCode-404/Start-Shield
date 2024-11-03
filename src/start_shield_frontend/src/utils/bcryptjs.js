import bcrypt from 'bcryptjs';

// Funcție pentru hash-ul parolei
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};


// Funcție pentru compararea parolelor
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

