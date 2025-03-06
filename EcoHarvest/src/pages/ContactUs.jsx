// EcoHarvest/src/pages/ContactUs.jsx

import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages", { email, message });
      setSuccess(true);
      setEmail("");
      setMessage("");
      setError("");
    } catch (error) {
      setError("There was an error sending your message. Please try again.");
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact EcoHarvest - Your Trusted Organic Farming Partner</h1>
        <p className="loyalty-text">
          "At EcoHarvest, we value our customers and their commitment to <strong>sustainable agriculture</strong>. Get in touch with us today for <strong>eco-friendly farming solutions</strong> and <strong>organic farming tools</strong>! 🌱💚"
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Your Email:</label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Your Message:</label>
          <textarea
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-button">Send Message</button>
        </form>
        {success && <p className="success-message">✅ Your message has been sent! We will get back to you soon.</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ContactUs;
