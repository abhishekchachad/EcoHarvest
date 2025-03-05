import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/index.css"; // Add styles for admin panel

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", { name, price, description });
      setName("");
      setPrice("");
      setDescription("");
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.product_id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${editingId}`, { name, price, description });
      setEditingId(null);
      setName("");
      setPrice("");
      setDescription("");
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel - Manage Products</h2>

      {/* Add/Update Form */}
      <form onSubmit={editingId ? handleUpdate : handleAddProduct}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      {/* Product List */}
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(product.product_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
