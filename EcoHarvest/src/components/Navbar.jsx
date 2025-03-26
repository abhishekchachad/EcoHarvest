import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
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
        {!user ? (
          <Button color="primary" onClick={onLoginClick}>
            Login
          </Button>
        ) : (
          <div>
            <span>{user.username}</span>
            <Button color="danger" onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;