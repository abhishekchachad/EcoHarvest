import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/index.css";

const API_URL = process.env.REACT_APP_API_URL;

const ProductDetail = () => {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", product_id);
        const response = await axios.get(`https://ecoharvestbackend-9q0e3lm2n-abhishekchachads-projects.vercel.app/api/products/${product_id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const addToCart = async () => {
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
        quantity: 1,
      });

      alert(`${product.name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading product details...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div  style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Left: Product Image */}
        <div style={{ flex: "1 1 350px" }}>
          <img
            src={`https://ecoharvestbackend-9q0e3lm2n-abhishekchachads-projects.vercel.app/${product.image_url}`}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </div>

        {/* Right: Product Info */}
        <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#2c3e50", marginBottom: "15px" }}>{product.name}</h2>
          <p style={{ fontSize: "1rem", color: "#555", marginBottom: "10px" }}>{product.description}</p>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}><strong>Category:</strong> {product.category}</p>
          <p style={{ fontSize: "1.1rem", marginBottom: "10px" }}><strong>Stock:</strong> {product.stock_quantity}</p>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#388e3c", marginBottom: "20px" }}>
            ${product.price}
          </p>

          <button
            onClick={addToCart}
            style={{
              padding: "12px 20px",
              backgroundColor: "#4caf50",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
              transition: "background-color 0.3s ease",
              width: "fit-content"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
          >
            Add to Cart
          </button>
            <button
            onClick={() => window.location.href = "/cart"} 
            style={{
                margin: "20px 0",
                padding: "12px 25px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
                transition: "background-color 0.3s ease",
                width: "fit-content"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#388e3c")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4caf50")}
            >
                Go to Cart
            </button>


          {/* <Link to="/cart" className="cart-link">
          <FaShoppingCart className="cart-icon" />
        </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
