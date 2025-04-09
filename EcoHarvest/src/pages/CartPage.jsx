import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Decode token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decoded = JSON.parse(atob(base64));
      setUserId(decoded.userId);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }, []);

  // Fetch cart items
  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://ecoharvestbackend-5c9panvp0-abhishekchachads-projects.vercel.app/api/cart?userId=${userId}`);
      setCart(response.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`https://ecoharvestbackend-5c9panvp0-abhishekchachads-projects.vercel.app/api/cart/${productId}`, {
        userId,
        quantity: parseInt(quantity),
      });
      fetchCart();
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`https://ecoharvestbackend-5c9panvp0-abhishekchachads-projects.vercel.app/api/cart/${productId}`, {
        data: { userId },
      });
      fetchCart();
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  if (!userId) {
    return (
      <div className="container mt-5">
        <h3>Please log in to view your cart.</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Your Cart 🛒</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Shop Now</Link></p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Image</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>
                  <img
                    src={`https://ecoharvestbackend-5c9panvp0-abhishekchachads-projects.vercel.app/${item.image_url}`}
                    alt={item.name}
                    width="60"
                    height="60"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product_id, e.target.value)}
                    min="1"
                    className="form-control"
                    style={{ width: "80px" }}
                  />
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => removeItem(item.product_id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <div className="text-end">
          <Link to="/checkout" className="btn btn-success">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
