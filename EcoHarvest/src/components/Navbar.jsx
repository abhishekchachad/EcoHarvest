import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();

  // Retrieve the token from localStorage and decode it to extract user information
  const token = localStorage.getItem("token");

  let username = null;

  // Function to decode JWT token
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(atob(base64));
      return decodedData;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  if (token) {
    // Decode the JWT token to extract user info
    const decodedToken = decodeToken(token);
    username = decodedToken ? decodedToken.username : null;
  }

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("token");
    navigate('/');  // Redirect to home after logout
  };

  return (
    <header className="navbar">
      <div className="logo-section">
        <img src="/logo.jpeg" alt="Eco-Harvest-Logo" className="site-logo" />
        <span className="logo-text">Eco Harvest</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <div className="navbar-icons">
        <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
        </Link>

        {!username ? (
          <Button color="primary" onClick={onLoginClick}>
            Login
          </Button>
        ) : (
          <div>
            <span className="welcome-message">Welcome, {username}</span>
            <Button color="danger" onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
