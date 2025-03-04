import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { useSignUp } from '@clerk/clerk-react'; // Clerk Signup Hook
import '../styles/index.css';

const SignupModal = ({ onClose, switchToLogin }) => {
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      alert('Verification email sent! Please check your inbox.');
      switchToLogin(); // Redirect to login modal
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon" onClick={onClose} />

        <h2>Sign Up</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSignup}>
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
          <button type="submit">Sign Up</button>
        </form>

        <p className="switch-text">
          Already have an account?{' '}
          <span onClick={switchToLogin} className="switch-link">
            Click here to login
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;