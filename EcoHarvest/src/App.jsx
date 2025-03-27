import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/Home";
import Products from "./pages/Products";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage"; // ✅ Cart Page
import AuthModal from "./pages/AuthModal"; // ✅ Combined Auth Modal

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";

const App = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const handleAuthClick = () => {
    setAuthMode("login");
    setShowAuthModal(true);
  };

  const handleCloseAuth = () => {
    setShowAuthModal(false);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const handleLogin = (email, password) => {
    localStorage.setItem("user", JSON.stringify({ email }));
    setShowAuthModal(false);
  };

  const handleSignup = (email, password, username) => {
    localStorage.setItem("user", JSON.stringify({ email, username }));
    setShowAuthModal(false);
  };

  return (
    <Router>
      <Navbar onLoginClick={handleAuthClick} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* ✅ Route works now */}
      </Routes>

      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={handleCloseAuth}
          onLogin={handleLogin}
          onSignup={handleSignup}
          switchMode={switchAuthMode}
        />
      )}

      <Footer />
    </Router>
  );
};

export default App;
