import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/index.css";
import SignupModal from "../pages/SignupModal"; // Updated import path

const Navbar = () => {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <header className="navbar">
        {/* Logo and Cart Section */}
        <div className="logo-section">
          <img src="/logo.png" alt="Eco-Harvest-Logo" className="site-logo" />
          <span className="logo-text">Eco Harvest</span>
        </div>

        {/* Navigation Links */}
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Product</a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </nav>

        {/* Shopping Cart and Sign Up */}
        <div className="navbar-icons">
          <FaShoppingCart className="cart-icon" />
          <button className="signup-button" onClick={() => setShowSignup(true)}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Signup Modal */}
      {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
    </>
  );
};

export default Navbar;
