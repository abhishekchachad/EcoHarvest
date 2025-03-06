// EcoHarvest/src/pages/Home.jsx
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
    setIsLoggedIn(!!user);
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
      {/* Hero Section */}
      <main className="hero">
        <div className="hero-text">
          <h1>EcoHarvest - Your Destination for Organic & Sustainable Farming</h1>
          <p>
            Welcome to EcoHarvest, where we believe in organic farming, sustainable agriculture, and delivering eco-friendly products to promote a healthier planet. 
            Our mission is to empower farmers and consumers with farm-to-table food, non-GMO seeds, and chemical-free farming solutions that nurture both people and the environment.
          </p>
          <button className="shop-button" href="/products">
            Shop Organic Products
          </button>
        </div>
        <div className="hero-image">
          <img src="https://storage.googleapis.com/a1aa/image/eenVLYXvS0d3UrCiBv4rztdSofkT7hI_PeqbUtfBABI.jpg" alt="A basket of fresh organic produce" />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
