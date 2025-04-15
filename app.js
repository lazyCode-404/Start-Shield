import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4943;

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
//     next();
// });
// app.use(cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization"
// }));
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


// Activare CORS
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware pentru JSON
app.use(express.json());

// Endpoint de test
app.get('/api/health-check', (req, res) => {
    res.json({ message: "Backend-ul funcționează!" });
});

// Pornirea serverului
app.listen(PORT, () => {
    console.log(`Server pornit pe http://localhost:${PORT}`);
});