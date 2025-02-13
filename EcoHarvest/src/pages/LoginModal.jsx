import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // Import Close Icon
import "../styles/index.css";

const LoginModal = ({ onClose, switchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("All fields are required!");

    try {
        const response = await axios.post("http://localhost:5000/api/users/login", {
            email,
            password,
        });

        if (response.data.user) {
            alert("Login Successful!");
            localStorage.setItem("user", JSON.stringify(response.data.user));
            onClose();
            window.location.reload();
        } else {
            alert("Invalid credentials");
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data?.error || error.message);
        alert(error.response?.data?.error || "Login failed. Please try again.");
    }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
      
        <FaTimes className="close-icon" onClick={onClose} />

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

      
        <p className="switch-text">
          Don't have an account?{" "}
          <span onClick={switchToSignup} className="switch-link">
            Click here to sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
