import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";
import AuthModal from "./AuthModal";
import { FaLeaf, FaTractor, FaShippingFast, FaSeedling, FaRecycle } from "react-icons/fa";
import TestimonialCard from "../components/TestimonialCard";
import ProductShowcase from "../components/ProductShowcase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomePage = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user details from JWT
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSuccess(true);
      setError("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setSuccess(false);
    }
  };

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
      const response = await fetch("http://localhost:5000/api/login", {
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
      const response = await fetch("http://localhost:5000/api/signup", {
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
      <section className="hero">
        <div className="hero-text">
          <h1>EcoHarvest - Your Destination for Organic & Sustainable Farming</h1>
          <p>
            Welcome to EcoHarvest, where we believe in organic farming, sustainable agriculture,
            and delivering eco-friendly products to promote a healthier planet. Our mission is to
            empower farmers and consumers with farm-to-table food, non-GMO seeds, and chemical-free
            farming solutions that nurture both people and the environment.
          </p>
          <div className="hero-buttons">
            <button className="shop-button" onClick={handleShopClick}>
              Shop Organic Products
            </button>
            <button className="shop-button" onClick={() => window.location.href="/about"}>
              Learn About Our Mission
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://storage.googleapis.com/a1aa/image/eenVLYXvS0d3UrCiBv4rztdSofkT7hI_PeqbUtfBABI.jpg"
            alt="A basket of fresh organic produce"
          />
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="value-props">
        <div className="value-prop">
          <FaLeaf className="prop-icon" />
          <h3>100% Organic</h3>
          <p>Certified organic products with no synthetic pesticides or fertilizers</p>
        </div>
        <div className="value-prop">
          <FaTractor className="prop-icon" />
          <h3>Direct from Farmers</h3>
          <p>Supporting local farmers and sustainable agriculture practices</p>
        </div>
        <div className="value-prop">
          <FaShippingFast className="prop-icon" />
          <h3>Fast Delivery</h3>
          <p>Fresh products delivered to your door within 48 hours</p>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2>Our Bestsellers</h2>
        <ProductShowcase />
        <div className="view-all">
          <button className="secondary-button" onClick={() => window.location.href="/products"}>
            View All Products
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>Our Sustainable Farming Practices</h2>
          <p>
            At EcoHarvest, we're committed to regenerative agriculture that improves soil health,
            conserves water, and reduces carbon emissions. Our partner farms use techniques like:
          </p>
          <ul className="practices-list">
            <li><FaSeedling /> Crop rotation and diversity</li>
            <li><FaRecycle /> Composting and natural fertilizers</li>
            <li><FaLeaf /> Integrated pest management</li>
          </ul>
          <button className="secondary-button" onClick={() => window.location.href="/about"}>
            Learn More About Our Methods
          </button>
        </div>
        <div className="about-image">
          <img src="https://www.snexplores.org/wp-content/uploads/2019/11/860-header-organic-ag-iStock_000017236342_Double.jpg" alt="Sustainable farm" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <TestimonialCard 
            name="Sarah J." 
            text="EcoHarvest's non-GMO seeds and natural fertilizers have increased my crop yield by 30% while maintaining organic certification. Their bulk pricing helps my small farm stay competitive." 
            rating={5} 
          />
          <TestimonialCard 
            name="Michael T." 
            text="The raised garden bed kit and organic soil amendments transformed my balcony into a thriving mini-farm. Everything arrived compostable-packaged - truly walking the eco-talk!" 
            rating={4} 
          />
          <TestimonialCard 
            name="Priya K." 
            text="I recommend EcoHarvest to all my students. Their heirloom seed collections and biodegradable planters make sustainable gardening accessible to beginners. The detailed growing guides are invaluable." 
            rating={5} 
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Join Our Community</h2>
          <p>Subscribe to get seasonal recipes, farming tips, and exclusive offers</p>
          <form className="newsletter-form"  onSubmit={handleSubmit}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
            
            {success && (
                  <p className="text-center mt-4">
                    ✅ Thank you! You have successfully subscribed to our News Letter.
                  </p>
                )}
                {error && (
                  <p className="text-danger text-center mt-4">
                    ❌ {error}
                  </p>
                )}
          </form>
        </div>
      </section>
  
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
