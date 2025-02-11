// express-api/index.js
import express from 'express';
import { json } from 'body-parser';
import insuranceRoutes from './routes/insuranceRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use('/api/insurance', insuranceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
