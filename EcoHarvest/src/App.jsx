import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AdminPage from "./pages/AdminPage"; // Import Admin Page

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Admin Route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
