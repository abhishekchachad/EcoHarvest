// EcoHarvest/src/pages/Products.jsx
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

  // Function to add product to cart
  const addToCart = async (product) => {
    try {
      await axios.post("http://localhost:5000/api/cart", {
        user_id: 1,  // ✅ Hardcoded for now, replace with actual user ID from authentication
        product_id: product.product_id,
        quantity: 1,  // Default quantity = 1
      });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  

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
              <div className="product-buttons">
                <button className="buy-button">Buy Now</button>
                <button className="add-to-cart-button" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
