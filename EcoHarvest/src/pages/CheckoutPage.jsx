// // src/pages/CheckoutPage.jsx
// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const CheckoutPage = () => {
//   const [order, setOrder] = useState({ name: "", address: "", payment: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setOrder({ ...order, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/orders", order);
//       setMessage("Order placed successfully!");
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Checkout 🛍️</h2>
//       {message && <p className="alert alert-success">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Name</label>
//           <input type="text" name="name" className="form-control" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Address</label>
//           <input type="text" name="address" className="form-control" onChange={handleChange} required />
//         </div>
//         <div className="mb-3">
//           <label>Payment Method</label>
//           <select name="payment" className="form-control" onChange={handleChange} required>
//             <option value="">Select</option>
//             <option value="Credit Card">Credit Card</option>
//             <option value="PayPal">PayPal</option>
//             <option value="Cash on Delivery">Cash on Delivery</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-success">Place Order</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutPage;


// This below code is working fine
// import React, { useState } from "react";

// const CheckoutPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     zip: "",
//     country: ""
//   });

//   const [orderTotal, setOrderTotal] = useState(49.99);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleCheckout = () => {
//     alert("Checkout Successful! Payment Processed.");
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
//         {/* Billing Details */}
//         <div className="p-4 bg-white rounded shadow">
//           <h2 className="text-lg font-semibold mb-4">Billing Details</h2>
//           <div className="space-y-4">
//             <div>
//               <label>Name</label>
//               <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//             <div>
//               <label>Email</label>
//               <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//             <div>
//               <label>Address</label>
//               <input type="text" name="address" value={formData.address} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//             <div>
//               <label>City</label>
//               <input type="text" name="city" value={formData.city} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//             <div>
//               <label>ZIP Code</label>
//               <input type="text" name="zip" value={formData.zip} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//             <div>
//               <label>Country</label>
//               <input type="text" name="country" value={formData.country} onChange={handleChange} className="border p-2 rounded w-full" />
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="p-4 bg-white rounded shadow">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//           <div className="flex justify-between mb-2">
//             <span>Subtotal:</span>
//             <span>$49.99</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Shipping:</span>
//             <span>$5.00</span>
//           </div>
//           <hr className="my-2" />
//           <div className="flex justify-between font-bold text-lg">
//             <span>Total:</span>
//             <span>${orderTotal.toFixed(2)}</span>
//           </div>
//           <button onClick={handleCheckout} className="bg-blue-500 text-white px-6 py-2 rounded w-full mt-4">
//             Proceed to Payment
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import axios from "axios";
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

