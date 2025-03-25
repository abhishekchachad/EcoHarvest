import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ Import Clerk User Authentication
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CartPage = () => {
  const { user } = useUser(); // ✅ Get logged-in Clerk user
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchCart(user.email); // ✅ Fetch cart based on user email
    }
  }, [user]);

  // ✅ Fetch Cart Items for the Logged-in User
  const fetchCart = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart?email=${email}`);
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart. Please try again.");
      setLoading(false);
    }
  };

  // ✅ Update Item Quantity in Cart
  const updateQuantity = async (product_id, quantity) => {
    if (quantity < 1) return; // Prevents setting invalid quantity

    try {
      await axios.put(`http://localhost:5000/api/cart/${product_id}`, { email: user.email, quantity });
      fetchCart(user.email); // ✅ Refresh cart after update
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update item quantity.");
    }
  };

  // ✅ Remove Item from Cart
  const removeItem = async (product_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${product_id}`, { data: { email: user.email } });
      fetchCart(user.email); // ✅ Refresh cart after removal
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item.");
    }
  };

  if (!user) {
    return (
      <div className="container mt-4">
        <h2>Your Cart 🛒</h2>
        <p>Please <Link to="/login">log in</Link> to view your cart.</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Your Cart 🛒</h2>
      {loading ? (
        <p>Loading your cart...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Shop Now</Link></p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.product_id}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.product_id, e.target.value)}
                    className="form-control"
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
      {cart.length > 0 && <Link to="/checkout" className="btn btn-primary">Proceed to Checkout</Link>}
    </div>
  );
};

export default CartPage;
