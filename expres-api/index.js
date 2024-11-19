// express-api/index.js
const express = require('express');
const bodyParser = require('body-parser');
const insuranceRoutes = require('./routes/insuranceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/insurance', insuranceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
