// EcoHarvest/src/pages/addProduct.jsx

import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', { name, price, description });
            alert('Product added successfully!');
            setName('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h2>Add New Product</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
                <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
