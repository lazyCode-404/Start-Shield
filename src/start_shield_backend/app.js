import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 8000;

app.use(express.json());

app.post("/api/apply", (req, res) => {
  const newData = req.body;

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }
    const jsonData = JSON.parse(data || "[]");
    jsonData.push(newData);

    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), "utf8", (err) => {
      if (err) {
        return res.status(500).send("Error saving data");
      }
      res.send("Application saved successfully.");
    });
  });
});

app.get("/api/company/:registrationNumber", (req, res) => {
  const { registrationNumber } = req.params;

  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading data");
    }
    const jsonData = JSON.parse(data || "[]");
    const companyData = jsonData.find(
      (entry) => entry.registrationNumber === registrationNumber
    );

    if (companyData) {
      res.json(companyData);
    } else {
      res.status(404).send("Company not found");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
