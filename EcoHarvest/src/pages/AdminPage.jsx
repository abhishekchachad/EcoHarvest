import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlusCircle, FaUserShield } from "react-icons/fa";
import "../styles/index.css";

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("stock_quantity", stockQuantity);
        formData.append("category", category);
        if (image) formData.append("image", image);

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/api/products/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post("http://localhost:5000/api/products", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            setEditingId(null);
            setName("");
            setPrice("");
            setDescription("");
            setStockQuantity("");
            setCategory("");
            setImage(null);
            setPreviewImage(null);
            fetchProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    const handleEdit = (product) => {
        setEditingId(product.product_id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setStockQuantity(product.stock_quantity);
        setCategory(product.category);
        setPreviewImage(`http://localhost:5000/${product.image_url}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/products/delete/${id}`);
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="admin-container">
            <h2 style={{ marginBottom: "20px" }}>
            <FaUserShield style={{ marginRight: "8px" }} />
                Admin Panel
            </h2>

            {/* ✅ Form for Adding/Updating Products */}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {previewImage && (
                <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "6px"
                    }}
                />
                )}
                <button type="submit">
                    <FaPlusCircle style={{ marginRight: "6px" }} />
                    {editingId ? "Update Product" : "Add Product"}
                </button>
                </form>


            {/* ✅ Table to Display Products */}
            <div className="admin-table-wrapper">
            <div style={{ overflowX: "auto" }}>
            <table className="admin-table" style={{
                width: "100%",
                borderCollapse: "separate",
                borderSpacing: "0 10px",
                fontSize: "15px"
            }}>
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                    <th style={{ padding: "12px", textAlign: "left" }}>Image</th>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.product_id} style={{
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    borderRadius: "8px"
                    }}>
                    <td style={{ padding: "10px" }}>
                        <img
                        src={`http://localhost:5000/${product.image_url}`}
                        alt={product.name}
                        className="product-image"
                        style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "6px",
                            objectFit: "cover"
                        }}
                        />
                    </td>
                    <td>{product.product_id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td style={{ maxWidth: "180px" }}>{product.description}</td>
                    <td>{product.stock_quantity}</td>
                    <td>{product.category}</td>
                    <td>
                        <button
                        className="edit-btn"
                        onClick={() => handleEdit(product)}
                        style={{
                            marginRight: "6px",
                            padding: "6px 10px",
                            borderRadius: "4px"
                        }}
                        >
                        <FaEdit style={{ marginRight: "4px" }} />
                        Edit
                        </button>
                        <button
                        className="delete-btn"
                        onClick={() => handleDelete(product.product_id)}
                        style={{
                            padding: "6px 10px",
                            borderRadius: "4px"
                        }}
                        >
                        <FaTrashAlt style={{ marginRight: "4px" }} />
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
};

export default AdminPage;
