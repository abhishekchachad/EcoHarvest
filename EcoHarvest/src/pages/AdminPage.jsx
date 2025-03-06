// EcoHarvest/src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
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

    // ✅ Fetch All Products
    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // ✅ Handle Image Selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // ✅ Add or Update Product
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
                // Update Product
                await axios.put(`http://localhost:5000/api/products/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Add Product
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

    // ✅ Edit Product
    const handleEdit = (product) => {
        setEditingId(product.product_id);
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setStockQuantity(product.stock_quantity);
        setCategory(product.category);
        setPreviewImage(`http://localhost:5000/${product.image_url}`);
    };

    // ✅ Soft Delete Product (Set DeleteFlag = 'Y')
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
            <h2>Admin Panel</h2>

            {/* ✅ Form for Adding/Updating Products */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} required />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
            </form>

            {/* ✅ Table to Display Products */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Image</th>
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
                        <tr key={product.product_id}>
                            <td>
                                <img src={`http://localhost:5000/${product.image_url}`} alt={product.name} className="product-image" />
                            </td>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.stock_quantity}</td>
                            <td>{product.category}</td>
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
