import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/index.css";
import { useNavigate } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

const API_URL = "https://ecoharvestbackend.vercel.app";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  console.log("API URL:", "https://ecoharvestbackend.vercel.app");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await axios.get("http://localhost:5000/api/products");  // Correct backend URL
        const response = await axios.get(`${API_URL}/api/products`);  // Correct backend URL
        
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");

        console.log("Fetched Products:", response.data);  // Log the response
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

  const addToCart = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login to add to cart.");

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      const userId = decoded.userId;

      await axios.post(`${API_URL}/api/cart`, {
        userId,
        product_id: product.product_id,
        quantity: 1
      });

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="products-container" style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem", color: "#2f7d32" }}>
        🌱 Our Organic Products
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="products-grid" style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
          {products.map((product) => (
            <div
              key={product.product_id}
              className="product-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                width: "260px",
                backgroundColor: "#fff",
                boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                transition: "transform 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <img
                src={`${API_URL}/${product.image_url}`}
                alt={product.name}
                className="product-image"
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}
              />
              <h3 style={{ fontSize: "1.2rem", margin: "10px 0" }}>{product.name}</h3>
              <p className="product-description" style={{ fontSize: "0.9rem", color: "#555" }}>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock_quantity}</p>
              <p><strong>Price:</strong> <span style={{ color: "#2e7d32", fontWeight: "bold" }}>${product.price}</span></p>
              <button
                onClick={() => navigate(`/products/${product.product_id}`)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "#e0e0e0",
                  color: "#333",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d5d5d5")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
              >
                View Product
              </button>
              <button
                onClick={() => addToCart(product)}
                style={{
                  marginTop: "10px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s ease"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "50px",
            right: "40px",
            padding: "20px",
            borderRadius: "50%",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
            zIndex: 1000,
            transition: "opacity 0.8s ease",
          }}
          title="Back to Top"
        >
          <FaArrowUp />
        </button>
      )}

    </div>
  );
};

export default Products;
