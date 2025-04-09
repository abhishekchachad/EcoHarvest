import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });

  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);
  const [thankYou, setThankYou] = useState(false);

  // Decode token to get userId
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

  // Fetch cart and calculate total
  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`https://ecoharvestbackend.vercel.app/api/cart?userId=${userId}`);
      setCart(response.data);

      const total = response.data.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);
      setOrderTotal(total + 5); // +5 for shipping
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  };

  const clearCart = async () => {
    try {
      for (const item of cart) {
        await axios.delete(`https://ecoharvestbackend.vercel.app/api/cart/${item.product_id}`, {
          data: { userId }
        });
      }
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    setThankYou(true);
    await clearCart();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (thankYou) {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-success">✅ Thank you for shopping with us!</h2>
        <p>Redirecting you to home...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column align-items-center py-5">
      <h1 className="text-center text-primary mb-5">Checkout</h1>
      <div className="w-100 max-w-4xl bg-white shadow p-4 rounded">
        <div className="row">
          {/* Billing Info */}
          <div className="col-md-6">
            <h2 className="h4 mb-4">Billing Details</h2>
            {["name", "email", "address", "city", "zip", "country"].map((field) => (
              <div key={field} className="form-group mb-3">
                <label htmlFor={field} className="form-label text-capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <div className="bg-light p-4 rounded">
              <h2 className="h4 mb-4">Order Summary</h2>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>${(orderTotal - 5).toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping:</span>
                <span>$5.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between font-weight-bold text-lg mb-4">
                <span>Total:</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-success w-100 py-3"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
