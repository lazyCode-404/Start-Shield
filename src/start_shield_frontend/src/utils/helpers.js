// src/utils/helpers.js

export const validateFormData = (formData) => {
    const { firstName, lastName, email, password } = formData;
    const errors = [];
  
    if (!firstName) errors.push('First name is required.');
    if (!lastName) errors.push('Last name is required.');
    if (!email) errors.push('Email is required.');
    if (!password) errors.push('Password is required.');
  
    return errors; // Returnează un array cu mesajele de eroare
  };
  