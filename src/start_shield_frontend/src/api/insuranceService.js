import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/insurance';

// Obține toate asigurările
export const getAllInsurances = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error fetching insurances:', error);
    throw error;
  }
};

// Adaugă o nouă asigurare
export const addInsurance = async (insuranceData) => {
  try {
    const response = await axios.post(API_BASE_URL, insuranceData);
    return response.data;
  } catch (error) {
    console.error('Error adding insurance:', error);
    throw error;
  }
};

// Actualizează o asigurare existentă
export const updateInsurance = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating insurance:', error);
    throw error;
  }
};

// Șterge o asigurare
export const deleteInsurance = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting insurance:', error);
    throw error;
  }
};
