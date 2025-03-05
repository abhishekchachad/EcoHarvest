import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/index.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>🌱 Our Organic Products</h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.product_id} className="product-card">
              <img src={`http://localhost:5000/${product.image_url}`} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock_quantity} left</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <button className="buy-button">Buy Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
