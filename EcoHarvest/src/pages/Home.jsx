import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/index.css";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <main className="hero">
        <div className="hero-text">
          <h1>Eco Harvest Farming</h1>
          <p>
            Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada.
            Curabitur aliquet quam id dui posuere blandit. Quisque velit nisi, pretium ut
            lacinia in, elementum id enim.
          </p>
          <button className="shop-button">Shop Online</button>
        </div>
        <div className="hero-image">
          <img 
            src="https://storage.googleapis.com/a1aa/image/eenVLYXvS0d3UrCiBv4rztdSofkT7hI_PeqbUtfBABI.jpg"
            alt="A basket of fresh tomatoes and other vegetables"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
