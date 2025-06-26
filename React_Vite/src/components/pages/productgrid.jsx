import React, { useState , useEffect } from "react";
import axios from 'axios';
import { Link, Router } from "react-router-dom";
import Pagination from "./Pagination";


const ProductGrid = () => {

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4); // Number of products to show per page
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  

  //const API_BASE_URL = `http://localhost:5000/api/products/?page=${currentPage}&limit=${productsPerPage}`; // Your backend API URL

  // Function to fetch products
  const fetchProducts = async () => {
   
    try {
      const response = await axios.get(`http://localhost:5000/api/products?page=${currentPage}&limit=${productsPerPage}`);
      //setProducts(response.data);
      const data = await response.data;

      setProducts(data.products); 
      setTotalPages(data.totalPages); 
      setTotalProducts(data.totalProducts); 
    } catch (err) {
      console.error('Error fetching products:', err);
      //setError('Failed to load products.');
    } 
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, [currentPage,productsPerPage]);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1 className="wrapper">Flash Deal :- lowest Price Guaranteed</h1>

      {/* if (!products || products.length === 0) {
        <div className="no-products-message">No products to display.</div>
      } */}
      <div className="product-grid-container">
        {products &&
          products.map((product) => (
            <div className="product-box" key={product._id}>
                <div className="product-image-wrapper">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <h3 className="product-title"><Link to={`/productdetails/${product._id}`} >{product.name} </Link></h3>
                <p className="product-price">{product.price}</p>
                <p className="product-description">{product.description}</p> 
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
          ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default ProductGrid;
