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
    setIsLoggedIn(!!user); // ✅ Ensure it updates correctly
  }, []);

  const handleShopClick = () => {
    if (isLoggedIn) {
      alert("🛒 Redirecting to Shop...");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <main className="hero">
        <div className="hero-text">
          <h1>Eco Harvest Farming</h1>
          <p>Discover the best organic products for a healthier lifestyle. Join us today and explore nature’s finest!</p>
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

      <Footer />
    </div>
  );
};

export default HomePage;
