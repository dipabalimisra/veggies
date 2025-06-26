import React, { useEffect, useState } from 'react';
import Navigation from '../common/navigation';
import Footer from '../common/footer';
import { Await, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import "./../../App.css";
import { Button } from 'react-bootstrap';



const Category = () => {

  const {presentFilter} = useParams();
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState(presentFilter || 'null');
  const [loading, setLoading] = useState(true);
//   const [filteredproducts, setFilteredProducts] = useState([]);

  const fetchProductsbyCategory = async() => {
    try{
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/products/category/${activeFilter}`);
        const data = await response.data;
        setProducts(data || []);
        if(!products){
            console.error('Error in Fetching Products');
        }
    }catch (err) {
        console.error('Error in Filtering the Products');
        setProducts([]);
    }finally{
        setLoading(false);
    }
  }

  useEffect(() => {
    
    fetchProductsbyCategory();
   
  }, [activeFilter]); // Dependencies: Re-run effect when activeFilter or products changes

  const handleFilterClick = (category) => {
    setActiveFilter(category); // Update the active filter state
  };



  return (
    <div>
       {/* <Navigation /> */}
      <h1 className="wrapper text-center">Shop by Category</h1>
      <div className="filter-buttons px-6 text-center">
          {/* <Button
            className={activeFilter === 'all' ? 'active' : ''}
            onClick={() => handleFilterClick('all')}
          >
            All
          </Button> */}
          <Button   
            className={activeFilter === 'Vegetable' ? 'active' : ''}
            onClick={() => handleFilterClick('Vegetable')}
          >
            Vegetables
          </Button>
          <Button
            className={activeFilter === 'Fruit' ? 'active' : ''}
            onClick={() => handleFilterClick('Fruit')}
          >
            Fruits
          </Button>
          <Button><Link className='text-center' to={'/'} >Back to Home</Link></Button>
        </div>
        
        <div className="product-grid-container">
        {loading && <p>Loading Products .. </p>}
        {!loading && products.length === 0 && (
            <p>No Product against this category.</p>
        )}
        {!loading && products.length > 0 && (
          products.map((product) => (
            <div className="product-box" key={product._id}>
                <div className="product-image-wrapper">
                  <img
                    src={`/${product.imageUrl}`}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <h3 className="product-title"><Link to={`/productdetails/${product._id}`} >{product.name} </Link></h3>
                <p className="product-price">{product.price}</p>
                <p className="product-description">{product.description}</p> 
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
          ))
        )
        }
      </div>
        <Footer />
    </div>
  )
};

export default Category;
