// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const [order, setOrder] = useState({ name: "", address: "", payment: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/orders", order);
      setMessage("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Checkout 🛍️</h2>
      {message && <p className="alert alert-success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input type="text" name="address" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Payment Method</label>
          <select name="payment" className="form-control" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
