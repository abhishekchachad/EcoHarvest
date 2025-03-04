import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import '../styles/index.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo-section">
        <img src="/logo.jpeg" alt="Eco-Harvest-Logo" className="site-logo" />
        <span className="logo-text">Eco Harvest</span>
      </div>

      {/* Navigation Links */}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About Us</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>

      {/* Authentication & Cart */}
      <div className="navbar-icons">
        <FaShoppingCart className="cart-icon" />

        {/* Show Sign In button when user is signed out */}
        <SignedOut>
          <SignInButton />
        </SignedOut>

        {/* Show User Profile & Logout button when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Navbar;