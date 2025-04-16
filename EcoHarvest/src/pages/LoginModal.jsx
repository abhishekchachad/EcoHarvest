import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const API_URL = "https://ecoharvestbackend.vercel.app";

const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Make API call to login
    try {
      fetch('https://ecoharvestbackend.vercel.app/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
        body: JSON.stringify({email, password})
      });

      const data = await response.json();

      if (response.ok) {
        // Call the onLogin prop with user data and token
        localStorage.setItem("token", data.token);  // Save JWT token to localStorage
        onLogin(data.token);
        onClose();
      } else {
        setError(data.message);  // Display error message if login fails
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('An error occurred during login.');
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit">Login</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
