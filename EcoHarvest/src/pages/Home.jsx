import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";
import AuthModal from "./AuthModal"; // Replace separate modals with combined AuthModal

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleShopClick = () => {
    if (isLoggedIn) {
      // Redirect to products if logged in
      window.location.href = "/products";
    } else {
      // Show auth modal in login mode if not logged in
      setAuthMode("login");
      setShowAuthModal(true);
    }
  };

  const handleLogin = (email, password) => {
    console.log("Logging in with:", email);
    localStorage.setItem("user", JSON.stringify({ email }));
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const handleSignup = (email, password, username) => {
    console.log("Signing up with:", username, email);
    localStorage.setItem("user", JSON.stringify({ email, username }));
    setIsLoggedIn(true);
    setShowAuthModal(false);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <main className="hero">
        <div className="hero-text">
          <h1>EcoHarvest - Your Destination for Organic & Sustainable Farming</h1>
          <p>
            Welcome to EcoHarvest, where we believe in organic farming, sustainable agriculture, 
            and delivering eco-friendly products to promote a healthier planet. 
            Our mission is to empower farmers and consumers with farm-to-table food, 
            non-GMO seeds, and chemical-free farming solutions that nurture both people and the environment.
          </p>
          <button 
            className="shop-button" 
            onClick={handleShopClick} // Added onClick handler
          >
            Shop Organic Products
          </button>
        </div>
        <div className="hero-image">
          <img 
            src="https://storage.googleapis.com/a1aa/image/eenVLYXvS0d3UrCiBv4rztdSofkT7hI_PeqbUtfBABI.jpg" 
            alt="A basket of fresh organic produce" 
          />
        </div>
      </main>

      {/* Combined Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
          onSignup={handleSignup}
          switchMode={switchAuthMode}
        />
      )}
    </div>
  );
};

export default HomePage;