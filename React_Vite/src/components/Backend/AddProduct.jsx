import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddProduct.css'; // For basic styling

function AddProduct() {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api/products'; // Your backend API URL

  

  // Handle input changes for the add product form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Handle form submission to add a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Basic validation
      if (!newProduct.name || !newProduct.price) {
        setError('Name and Price are required.');
        setLoading(false);
        return;
      }

      const response = await axios.post(API_BASE_URL, newProduct);
      console.log('Product added:', response.data);
      setNewProduct({ name: '', description: '', price: '', imageUrl: '' , category: ''}); // Clear form
      //fetchProducts(); // Re-fetch products to update the list
    } catch (err) {
      console.error('Error adding product:', err);
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Product Management</h1>

      {/* Section to Add Product */}
      <section className="add-product-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={newProduct.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Category [Fruit / Vegetable] :</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </section>

      <hr />

      {/* Section to Display Products */}
      {/* <section className="product-list-section">
        <h2>Available Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p className="error-message">{error}</p>}
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="product-card">
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.name} className="product-image" />
                )}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            !loading && <p>No products available yet. Add some!</p>
          )}
        </div>
      </section> */}
    </div>
  );
}

export default AddProduct;