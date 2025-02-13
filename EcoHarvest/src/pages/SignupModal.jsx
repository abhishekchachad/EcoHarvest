import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // Import Close Icon
import "../styles/index.css";

const SignupModal = ({ onClose, switchToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});

  // Password Strength Checker
  const checkPasswordStrength = (password) => {
    if (!password) return "";

    const strengthMeter = {
      1: "Weak 🔴",
      2: "Fair 🟠",
      3: "Good 🟡",
      4: "Strong 🟢",
    };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    return strengthMeter[strength] || "Weak 🔴";
  };

  // Handle Signup Submission
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) return alert("❌ All fields are required!");

    try {
        // Ensure correct API endpoint
        const response = await axios.post("http://localhost:5000/api/users", { 
            username, 
            email, 
            password 
        });

        alert("Signup successful! Please log in.");
        switchToLogin(); // Switch to Login modal after successful signup
    } catch (error) {
        console.error("Signup Error:", error.response?.data?.error || error.message);
        alert(error.response?.data?.error || "Signup failed. Please try again.");
    }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon" onClick={onClose} />

        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
            }}
            required
          />

          {/* Password Strength Meter */}
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            {passwordStrength}
          </p>

          <button type="submit">Sign Up</button>
        </form>

        {/* Switch to Login Modal */}
        <p className="switch-text">
          Already have an account?{" "}
          <span onClick={switchToLogin} className="switch-link">
            Click here to login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
