import React from "react"; 
import { useState } from "react";
import axios from "axios";

export default function Withdraw() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    if (!phone || !amount) {
      setMessage("Please enter phone and amount");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://daraja-backend-1.onrender.com/withdraw",
        {
          phone,
          amount,
        }
      );

      setMessage(res.data.message || "Request sent successfully");
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || "Request failed"));
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Withdraw Money (M-Pesa Test)</h2>

      <input
        style={styles.input}
        type="text"
        placeholder="07XXXXXXXX"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        style={styles.input}
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button style={styles.button} onClick={handleWithdraw} disabled={loading}>
        {loading ? "Processing..." : "Withdraw"}
      </button>

      <p style={styles.message}>{message}</p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "350px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f5f5f5",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontFamily: "Arial",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1a8f1a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  message: {
    marginTop: "15px",
    color: "#333",
    fontWeight: "bold",
  },
};
