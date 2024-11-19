// express-api/routes/insuranceRoutes.js
const express = require('express');
const { getAllInsurances, addInsurance, updateInsurance, deleteInsurance } = require('../controllers/insuranceController');
const router = express.Router();

// Route pentru a obține toate asigurările
router.get('/', getAllInsurances);

// Route pentru a adăuga o asigurare
router.post('/', addInsurance);

// Route pentru a actualiza o asigurare specifică
router.put('/:id', updateInsurance);

// Route pentru a șterge o asigurare specifică
router.delete('/:id', deleteInsurance);

module.exports = router;
