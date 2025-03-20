
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    country: ""
  });

  const [orderTotal, setOrderTotal] = useState(49.99);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    alert("Checkout Successful! Payment Processed.");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column align-items-center py-5">
      {/* Checkout Form */}
      <h1 className="text-center text-primary mb-5">Checkout</h1>

      <div className="w-100 max-w-4xl bg-white shadow p-4 rounded">
        <div className="row">
          {/* Billing Details */}
          <div className="col-md-6">
            <h2 className="h4 mb-4">Billing Details</h2>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="zip" className="form-label">Postal Code</label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-md-6">
            <div className="bg-light p-4 rounded">
              <h2 className="h4 mb-4">Order Summary</h2>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal:</span>
                <span>$49.99</span>
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

