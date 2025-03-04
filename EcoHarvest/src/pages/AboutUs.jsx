import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";

const AboutUs = () => {
  return (
    <div className="home-container">
      <div className="about-container">
        <h2>About EcoHarvest</h2>
        <p className="loyalty-text">
          "At EcoHarvest, we are dedicated to bringing you the best organic products
          while promoting sustainable and eco-friendly farming practices. 🌱"
        </p>
        <div className="about-content">
          <p>
            Our journey started with a simple goal: to provide fresh, organic, and chemical-free 
            produce directly from farmers to your doorstep. We believe in ethical sourcing, 
            fair trade, and sustainable agricultural methods that protect our planet.
          </p>
          <p>
            Over the years, we have built a community of farmers and conscious consumers who 
            share the same vision—healthier lives and a greener planet. Join us in making a 
            difference, one harvest at a time! 🍃
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;