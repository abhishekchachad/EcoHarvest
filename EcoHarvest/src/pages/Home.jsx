import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";
import AuthModal from "./AuthModal"; // Replace separate modals with combined AuthModal

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user details from JWT

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      console.log("Stored Token:", storedToken);  // Log the token
      setIsLoggedIn(true);
      const decodedUser = decodeToken(storedToken);
      console.log("Decoded User:", decodedUser);  // Log the decoded user data
      setUser(decodedUser);
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedData = JSON.parse(atob(base64));
      console.log("Decoded Token Data:", decodedData);  // Log the decoded token data
      return decodedData;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

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

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("https://ecoharvestbackend-o7qka6p27-abhishekchachads-projects.vercel.app/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // On successful login, store the token in localStorage
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        const decodedUser = decodeToken(data.token);
        setUser(decodedUser);
        setShowAuthModal(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in");
    }
  };

  const handleSignup = async (email, password, username) => {
    try {
      const response = await fetch("https://ecoharvestbackend-o7qka6p27-abhishekchachads-projects.vercel.app/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username, role: "customer" }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        setAuthMode("login"); // Switch to login mode after signup
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("An error occurred while signing up");
    }
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const handleLogout = () => {
    // Clear the token and user data from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <main className="hero">
        <div className="hero-text">
          <h1>EcoHarvest - Your Destination for Organic & Sustainable Farming</h1>
          <p>
            Welcome to EcoHarvest, where we believe in organic farming, sustainable agriculture,
            and delivering eco-friendly products to promote a healthier planet. Our mission is to
            empower farmers and consumers with farm-to-table food, non-GMO seeds, and chemical-free
            farming solutions that nurture both people and the environment.
          </p>
          <button className="shop-button" onClick={handleShopClick}>
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
