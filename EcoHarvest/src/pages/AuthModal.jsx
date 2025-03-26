import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// Constants matching your database constraints
const ALLOWED_ROLES = [
  { value: 'customer', label: 'Customer' },
  { value: 'vendor', label: 'Vendor' },
  { value: 'admin', label: 'Administrator' }
];

const AuthModal = ({ mode, onClose, onLogin, onSignup, switchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    role: 'customer' // Default to customer role
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Username validation (only for signup)
    if (mode === 'signup' && !formData.username) {
      newErrors.username = 'Username is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (mode === 'login') {
        // Make API call to login
        const response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          onLogin(data.token);
          onClose();
        } else {
          setError(data.message);
        }
      } else {
        // Make API call to signup
        const response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            username: formData.username,
            role: formData.role,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Account created successfully!');
          setError('');
          switchMode(); // Switch to login mode
        } else {
          setError(data.message);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError('An error occurred during the process.');
    }
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'login' ? 'Login to Your Account' : 'Create New Account'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                  required
                />
                <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Account Type</Form.Label>
                <Form.Select name="role" value={formData.role} onChange={handleChange}>
                  {ALLOWED_ROLES.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </>
          )}
          
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              required
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          {error && <p className="text-danger">{error}</p>}

          <Button variant="primary" type="submit" className="w-100 mb-3" size="lg">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>

          <div className="text-center mt-3">
            {mode === 'login' ? (
              <p className="text-muted">
                Don't have an account?{' '}
                <Button variant="link" onClick={switchMode} className="p-0 align-baseline">
                  Sign up now
                </Button>
              </p>
            ) : (
              <p className="text-muted">
                Already have an account?{' '}
                <Button variant="link" onClick={switchMode} className="p-0 align-baseline">
                  Login here
                </Button>
              </p>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
