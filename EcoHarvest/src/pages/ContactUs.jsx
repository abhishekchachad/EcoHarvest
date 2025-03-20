import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css"; // Ensure custom styles are applied

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");

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

  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/news", { title: newsTitle, content: newsContent });
      setNewsTitle("");
      setNewsContent("");
      alert("News posted successfully!");
    } catch (error) {
      alert("There was an error posting the news.");
      console.error("Error posting news:", error);
    }
  };

  return (
    <div className="contact-page container">
      {/* Newsletter Section for Admin */}
      <div className="newsletter-section my-5 p-5 bg-gradient shadow rounded-lg">
        <h2 className="text-center mb-4">Post Latest News</h2>
        <form onSubmit={handleNewsSubmit} className="bg-light p-4 border rounded shadow-sm">
          <div className="mb-4">
            <label htmlFor="newsTitle" className="form-label fw-bold">News Title</label>
            <input
              type="text"
              className="form-control"
              id="newsTitle"
              placeholder="Enter the title of the news"
              value={newsTitle}
              onChange={(e) => setNewsTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newsContent" className="form-label fw-bold">News Content</label>
            <textarea
              className="form-control"
              id="newsContent"
              rows="5"
              placeholder="Type the content of the news"
              value={newsContent}
              onChange={(e) => setNewsContent(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success w-50 fw-bold">Post News</button>
          </div>
        </form>
      </div>

      {/* Contact Us Section */}
      <div className="contact-container mt-5">
        <h1 className="text-center">Contact EcoHarvest - Your Trusted Organic Farming Partner</h1>
        <p className="text-center loyalty-text mt-3">
          "At EcoHarvest, we value our customers and their commitment to <strong>sustainable agriculture</strong>. Get in touch with us today for <strong>eco-friendly farming solutions</strong> and <strong>organic farming tools</strong>! 🌱💚"
        </p>
        <form className="contact-form mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Your Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label">Your Message</label>
            <textarea
              className="form-control"
              id="message"
              placeholder="Type your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-50">Send Message</button>
          </div>
        </form>
        {success && <p className="success-message text-success text-center mt-4">✅ Your message has been sent! We will get back to you soon.</p>}
        {error && <p className="error-message text-danger text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ContactUs;
