// EcoHarvest/src/pages/AboutUs.jsx

import React from "react";
import "../styles/index.css";

const AboutUs = () => {
  return (
    <>
      <div className="home-container">
        <div className="about-container">
          <section className="intro-section" style={{ marginBottom: "2rem" }}>
            <h1>About EcoHarvest - Leading in Sustainable Agriculture</h1>
            <p className="loyalty-text">
              "At EcoHarvest, we are committed to promoting <strong>organic farming</strong>, <strong>sustainable agriculture</strong>, and <strong>eco-friendly products</strong> for a greener future. 🌱"
            </p>
          </section>

          <section className="mission-section" style={{ backgroundColor: "#f8f8f8", padding: "20px", borderRadius: "8px", marginBottom: "2rem" }}>
            <h2>🌿 Our Mission</h2>
            <p>
              We aim to create a future where food is grown without harming the planet. Our goal is to bridge the gap between organic farmers and conscious consumers by offering fresh, chemical-free, and ethically sourced produce.
            </p>
          </section>

          <section className="journey-section" style={{ marginBottom: "2rem" }}>
            <h2>🚀 Our Journey</h2>
            <p>
              Our journey began with a vision to provide <strong>fresh, organic, and chemical-free produce</strong> directly from farmers to your doorstep. We believe in ethical sourcing, <strong>fair trade</strong>, and using <strong>sustainable gardening solutions</strong> to protect our planet.
            </p>
            <p>
              Over the years, we’ve built a strong community of farmers and environmentally conscious consumers who share the same vision—creating a healthier lifestyle through <strong>farm-to-table food</strong> and <strong>zero-waste farming</strong>. Join us in this mission to make a difference, one harvest at a time! 🍃
            </p>
          </section>

          <section className="values-section" style={{ backgroundColor: "#e6f3e6", padding: "20px", borderRadius: "8px", marginBottom: "2rem" }}>
            <h2>💚 Our Core Values</h2>
            <ul style={{ paddingLeft: "1.5rem" }}>
              <li>🌾 <strong>Regenerative Agriculture</strong> - Improving soil health with <strong>natural compost</strong></li>
              <li>🚜 <strong>Eco-Friendly Farming Tools</strong> - Providing <strong>best organic products</strong> to farmers</li>
              <li>🍏 <strong>Farm-to-Table Freshness</strong> - Delivering <strong>locally grown organic food</strong></li>
              <li>🌍 <strong>Climate-Friendly Farming</strong> - Using <strong>sustainable irrigation methods</strong> for better water conservation</li>
            </ul>
          </section>

          <section className="impact-section" style={{ marginBottom: "2rem" }}>
            <h2>🌎 Our Global Impact</h2>
            <p>
              Through collaborations with local farms, environmental NGOs, and green startups, we’re pushing the envelope on sustainability in agriculture. Every product you purchase supports not just a local farmer, but also a cleaner planet.
            </p>
          </section>

          <section className="cta-section" style={{ textAlign: "center", marginTop: "3rem" }}>
            <h3>🌱 Be Part of the Green Revolution</h3>
            <p>
              Whether you're a home gardener, a conscious consumer, or a passionate farmer — EcoHarvest is your partner in sustainable living.
            </p>
            <button
              style={{
                marginTop: "15px",
                padding: "12px 24px",
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Join the Movement
            </button>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
