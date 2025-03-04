import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Ensure it updates correctly
  }, []);

  const handleShopClick = () => {
    if (isLoggedIn) {
      alert("Redirecting to Shop...");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="home-container">
      <main className="hero">
        <div className="hero-text">
          <h1>Eco Harvest Farming</h1>
          <p>At Eco Harvest, we believe in sustainable and chemical-free farming to provide you with the freshest and healthiest organic products. Our mission is to bring farm-fresh goodness straight to your doorstep while supporting local farmers and promoting eco-friendly agricultural practices.</p>
          <button className="shop-button" onClick={handleShopClick}>
            Shop Online
          </button>
        </div>
        <div className="hero-image">
          <img src="https://storage.googleapis.com/a1aa/image/eenVLYXvS0d3UrCiBv4rztdSofkT7hI_PeqbUtfBABI.jpg" alt="A basket of fresh tomatoes and other vegetables" />
        </div>
      </main>

      {/* ✅ Ensure the login modal shows when triggered */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          switchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {showSignup && (
        <SignupModal
          onClose={() => setShowSignup(false)}
          switchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default HomePage;
