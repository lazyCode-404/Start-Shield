import React, { useState } from "react";
import { loadStripe } from "../../../../../node_modules/@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "../../../../../node_modules/@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("your-publishable-key-here");

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState(""); // State pentru numele titularului cardului

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // Creează un payment intent
      const { data: clientSecret } = await axios.post("http://localhost:8000/api/create-payment-intent", {
        amount: 5000, // Suma în cenți (ex: $50.00)
        currency: "usd",
      });

      // Confirma plata
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: name, // Trimite numele titularului cardului
          },
        },
      });

      if (result.error) {
        setMessage(`Payment failed: ${result.error.message}`);
      } else {
        setMessage("Payment successful!");
        // Salvează tranzacția în backend-ul Motoko
        await axios.post("http://localhost:8000/api/save-transaction", {
          transactionId: result.paymentIntent.id,
          amount: result.paymentIntent.amount,
          status: result.paymentIntent.status,
        });
      }
    } catch (error) {
      console.error("Error during payment:", error);
      setMessage("An error occurred during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Pay with Debit Card</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="name">Cardholder's Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <CardElement />
        <button type="submit" disabled={!stripe || loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentForm />
  </Elements>
);

export default PaymentPage;
