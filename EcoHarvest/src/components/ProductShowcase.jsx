import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

const ProductShowcase = () => {
  // Sample product data - replace with your actual data fetching logic
  const featuredProducts = [
    {
      id: 1,
      name: "Organic Fertilizer",
      price: 15.99,
      image: "/Images/organic_fertilizer.jpg"
    },
    {
      id: 2,
      name: "Organic Mulch",
      price: 18.75,
      image: "/Images/organic_mulch.jpg"
    },
    {
      id: 3,
      name: "Greenhouse Film",
      price: 99.99,
      image: "/Images/greenhouse_film.jpg"
    }
  ];

  return (
    <div className="product-showcase">
      {featuredProducts.map((product) => (
        <div key={product.id} className="showcase-product">
          <Link to={`/products`}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p className="price">${product.price.toFixed(2)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductShowcase;