import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import "../styles/index.css";

const Footer = () => {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/products" className="footer-link">Products</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <p><FaEnvelope className="contact-icon" /> info@ecoharvest.com</p>
            <p><FaPhone className="contact-icon" /> (123) 456-7890</p>
            <p>123 Green Street, Eco City</p>
          </div>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://x.com/" target="_blank" aria-label="Twitter"><FaTwitter /></a>
            <a href="https://https://www.instagram.com/" target="_blank" aria-label="Instagram"><FaInstagram /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Newsletter</h4>
          <div className="newsletter">
            <p>Subscribe for updates and offers</p>
            <form onSubmit={handleSubmit}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
              
                {success && (
                  <p className="text-success text-center mt-4">
                    ✅ Thank you! You have successfully subscribed to our News Letter.
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
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Eco Harvest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;