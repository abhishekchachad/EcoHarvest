// EcoHarvest/src/pages/AboutUs.jsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";

const AboutUs = () => {
  return (
    <div className="home-container">
      <div className="about-container">
        <h1>About EcoHarvest - Leading in Sustainable Agriculture</h1>
        <p className="loyalty-text">
          "At EcoHarvest, we are committed to promoting <strong>organic farming</strong>, <strong>sustainable agriculture</strong>, and <strong>eco-friendly products</strong> for a greener future. 🌱"
        </p>
        <div className="about-content">
          <p>
            Our journey began with a vision to provide <strong>fresh, organic, and chemical-free produce</strong> directly from farmers to your doorstep. We believe in ethical sourcing, <strong>fair trade</strong>, and using <strong>sustainable gardening solutions</strong> to protect our planet.
          </p>
          <p>
            Over the years, we have built a strong community of farmers and environmentally conscious consumers who share the same vision—creating a healthier lifestyle through <strong>farm-to-table food</strong> and <strong>zero-waste farming</strong>. Join us in this mission to make a difference, one harvest at a time! 🍃
          </p>
          <h2>Our Core Values</h2>
          <ul>
            <li>🌾 <strong>Regenerative Agriculture</strong> - Improving soil health with <strong>natural compost</strong></li>
            <li>🚜 <strong>Eco-Friendly Farming Tools</strong> - Providing <strong>best organic products</strong> to farmers</li>
            <li>🍏 <strong>Farm-to-Table Freshness</strong> - Delivering <strong>locally grown organic food</strong></li>
            <li>🌍 <strong>Climate-Friendly Farming</strong> - Using <strong>sustainable irrigation methods</strong> for better water conservation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
