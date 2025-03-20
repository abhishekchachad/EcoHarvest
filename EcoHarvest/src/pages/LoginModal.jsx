import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSignIn } from '@clerk/clerk-react';
import axios from 'axios'; 
import '../styles/index.css';

const LoginModal = ({ onClose, switchToSignup }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        setActive({ session: result.createdSessionId });

        // ✅ Get Clerk User Details from session
        const userData = {
          email,
        };

        // ✅ Send User Data to Backend
        await axios.post('http://localhost:5000/api/users', userData);

        alert('Login Successful!');
        onClose();
        window.location.reload();
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon" onClick={onClose} />

        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}
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
          Don't have an account?{' '}
          <span onClick={switchToSignup} className="switch-link">
            Click here to sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
