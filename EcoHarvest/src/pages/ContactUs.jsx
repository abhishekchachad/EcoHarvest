import React, { useState } from "react";
import axios from "axios";
import "../styles/index.css";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("ecoharvestbackend.vercel.app/api/messages", { email, message });
      setSuccess(true);
      setError("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5 contact-page">
      <div className="mb-5">
        <h1 className="text-center fw-bold mb-4">Get in Touch with EcoHarvest 🌿</h1>
        <p className="text-center lead">
          We're passionate about connecting with our community. Whether you're a customer with feedback,
          a farmer with a new idea, or just curious about what we do — we'd love to hear from you!
        </p>
        <p className="text-center">
          At <strong>EcoHarvest</strong>, we believe that communication drives innovation.
          Every message you send helps us grow greener, better, and more connected.
        </p>
        <p className="text-center">
          🌍 Let’s work together toward a future of sustainable farming, clean produce, and ethical trade.
        </p>
      </div>

      <div className="card shadow p-4">
        <h2 className="text-center mb-4">📬 Send Us a Message</h2>
        <p className="text-center loyalty-text mb-4">
          Whether it’s a question, a comment, or a suggestion — we’re here to help.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Email address</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Your Message</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-50">
              <FaPaperPlane className="me-2" />
              Send Message
            </button>
          </div>

          {success && (
            <p className="text-success text-center mt-4">
              ✅ Thank you! Your message was sent successfully.
            </p>
          )}
          {error && (
            <p className="text-danger text-center mt-4">
              ❌ {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
