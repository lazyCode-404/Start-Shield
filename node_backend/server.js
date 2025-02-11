import express from "express";
import cors from "cors";
import { json } from "body-parser";
import Stripe from "stripe";
const app = express();

require("dotenv").config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


app.use(cors());
app.use(json());

// Endpoint pentru crearea unui Payment Intent
app.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});

// Endpoint pentru salvarea tranzacției (apelat de frontend)
app.post("/api/save-transaction", async (req, res) => {
  const { transactionId, amount, status } = req.body;

  // Aici poți trimite datele tranzacției către backend-ul Motoko
  console.log("Transaction saved:", { transactionId, amount, status });
  res.status(200).send({ message: "Transaction saved successfully!" });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
