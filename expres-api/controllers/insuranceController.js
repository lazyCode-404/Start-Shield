// express-api/controllers/insuranceController.js
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../data/data.json');

// Helper pentru a citi fișierul JSON
const readData = async () => {
  try {
    const jsonData = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading JSON data:", error);
    return [];
  }
};

// Helper pentru a scrie în fișierul JSON
const writeData = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing JSON data:", error);
  }
};
// Funcție pentru a obține toate asigurările
const getAllInsurances = async (req, res) => {
  const data = await readData();
  res.json(data);
};

// Funcție pentru a adăuga o nouă asigurare
const addInsurance = async (req, res) => {
  const data = await readData();
  const newInsurance = req.body;
  newInsurance.id = Date.now().toString();
  data.push(newInsurance);
  await writeData(data);
  res.status(201).json(newInsurance);
};

// Funcție pentru a actualiza o asigurare
const updateInsurance = async (req, res) => {
  const data = await readData();
  const { id } = req.params;
  const index = data.findIndex((insurance) => insurance.id === id);

  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    await writeData(data);
    res.json(data[index]);
  } else {
    res.status(404).json({ message: 'Insurance not found' });
  }
};

// Funcție pentru a șterge o asigurare
const deleteInsurance = async (req, res) => {
  const data = await readData();
  const { id } = req.params;
  const updatedData = data.filter((insurance) => insurance.id !== id);

  if (data.length !== updatedData.length) {
    await writeData(updatedData);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Insurance not found' });
  }
};

module.exports = { getAllInsurances, addInsurance, updateInsurance, deleteInsurance };

