import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors'; // Importăm middleware-ul CORS

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve("data.json");

// Middleware pentru CORS
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000' // Înlocuiește cu originea frontend-ului tău
}));


// Middleware pentru parsing JSON
app.use(express.json());

// Funcții pentru citire și scriere a datelor
const readData = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading data file:", err.message);
    return [];
  }
};

const writeData = async (data) => {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing to data file:", err.message);
    throw err;
  }
};

// Endpoint pentru adăugarea unei aplicații noi
app.post("/api/apply", async (req, res) => {
  const newData = req.body;

  if (!newData || !newData.registrationNumber || !newData.companyName) {
    return res.status(400).send("Invalid data: 'registrationNumber' and 'companyName' are required.");
  }

  try {
    const jsonData = await readData();

    const exists = jsonData.some(
      (entry) => entry.registrationNumber === newData.registrationNumber
    );
    if (exists) {
      return res.status(409).send("A company with this registration number already exists.");
    }

    jsonData.push(newData);
    await writeData(jsonData);

    res.status(201).send("Application saved successfully.");
  } catch (err) {
    res.status(500).send("Error saving application.");
  }
});

// Endpoint pentru obținerea datelor unei companii după registrationNumber
app.get("/api/company/:registrationNumber", async (req, res) => {
  const { registrationNumber } = req.params;

  try {
    const jsonData = await readData();
    const companyData = jsonData.find(
      (entry) => entry.registrationNumber === registrationNumber
    );

    if (companyData) {
      res.json(companyData);
    } else {
      res.status(404).send("Company not found");
    }
  } catch (err) {
    res.status(500).send("Error retrieving company data.");
  }
});

// Pornim serverul
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
