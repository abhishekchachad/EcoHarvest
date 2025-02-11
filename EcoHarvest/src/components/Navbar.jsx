import React from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon
import "../styles/index.css";

const Navbar = () => {
  return (
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

      {/* Shopping Cart Icon */}
      <div className="cart-icon">
        <FaShoppingCart />
      </div>
    </header>
  );
};

export default Navbar;
