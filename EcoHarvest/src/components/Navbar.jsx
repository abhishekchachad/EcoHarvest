import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>
        Home
      </Link>
      <Link to="/products" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>
        Products
      </Link>
      <Link to="/login" style={{ margin: "0 10px", color: "#fff", textDecoration: "none" }}>
        Login
      </Link>
    </nav>
  );
};

export default Navbar; // Ensure this is a default export
