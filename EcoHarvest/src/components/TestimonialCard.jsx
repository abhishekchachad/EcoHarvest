import React from "react";
import { FaStar } from "react-icons/fa";
import "../styles/index.css";

const TestimonialCard = ({ name, text, rating }) => {
  return (
    <div className="testimonial-card">
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < rating ? "star-filled" : "star-empty"} 
          />
        ))}
      </div>
      <p className="testimonial-text">"{text}"</p>
      <p className="testimonial-author">- {name}</p>
    </div>
  );
};

export default TestimonialCard;