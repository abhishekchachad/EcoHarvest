// EcoHarvest/src/pages/LoginModal.jsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSignIn } from '@clerk/clerk-react';
import axios from 'axios'; // ✅ Added Axios for API request
import '../styles/index.css';

const LoginModal = ({ onClose, switchToSignup }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

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

        // ✅ Store the user in local DB
        await axios.post('http://localhost:5000/api/users', { email });

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
