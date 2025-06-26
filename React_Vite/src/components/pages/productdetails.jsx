import React, { useState, useEffect } from "react";
import axios from "axios";
import SmoothScroll from "smooth-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./../../ProductDetails.css";
import { Link, Links, useParams } from "react-router-dom";
import { Image } from "react-bootstrap";
import Navigation from "../common/navigation";
import Footer from "../common/footer";
import {
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetails = () => {
  const { productId } = useParams();// Get product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const API_BASE_URL = `http://localhost:5000/api/products/${productId}`;

  useEffect(()=>{
  const fetchProductbyID = async() => {
    try{
      setLoading(true);
      setError(null);
      const response = await axios.get(API_BASE_URL);
      console.log(response);
      const data = await response.data;
      console.log(data);
      setProduct(data);
    }catch (err) {
      console.log ('Failed to Show the Product', err);
      setProduct(null);
      if(err.response){
        if(err.response.status === 404){
          setError("Product Not Found against the ID");
        }else if(err.response.status === 400){
          setError("invalid Prouct ID Format");
        }else {
          setError(`Server Error: + ${err.response.status}`);
        }
      }else if(err.request){
        setError('Could not establish the connection.')
      }else{
        setError(`The Product can't be fetched`)
      }

    }finally{
      setLoading(false);
    }
  }; fetchProductbyID ();
  }, [productId]);


  const handleQuantityChange = (action) => {
    if (action === "increment" && quantity < 10) {
      setQuantity((prevQty) => prevQty + 1);
    } else if (action === "decrement" && quantity > 1) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  if (loading) {
    return (
      <div>
      <Navigation />
      <div className="product-details-info">
        <p>Loading product details...</p>
      </div>
      <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
      <Navigation />
      <div className="product-details-info">
        <p>{error}</p>
      </div>
      <Footer />
      </div>
    );
  }

  if(!product){
    return (
      <div>
      <Navigation />
      <div className="product-details-info">
        <p>The Product can't be fetched due to some technical Issue.</p>
        <Link to={'/'}>Back to Home Page</Link>
      </div>
      <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="product-details-info">
        <nav className="breadcrumb">
          <Link to={'/'}>Home</Link> &gt; <Link to={`/category/${product.category}`}>{product.category}</Link> &gt;{" "}
          <span>{product.name}</span>
        </nav>
        <div className="product-cards">
          <Image
            className="card"
            src= {`/${product.imageUrl}`}
            alt={product.name}
          />

          <div className="card product-desc">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-price">
              Price :
              <span className="current-price">{product.price}</span>
              {/* {product.oldPrice && <span className="old-price">${product.oldPrice.toFixed(2)}</span>}
            {product.discount && <span className="discount-badge">{product.discount}% OFF</span>} */}
            </div>
            <p className="product-short-description">
              Description :  {product.description}
            </p>
            <div className="product-add-to-cart">
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange("decrement")}
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min="1"
                className="quantity-input"
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange("increment")}
              >
                +
              </button>
            </div>

            
              <button className="add-to-cart-btn">
                <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart
              </button>
              <button className="wishlist-btn" aria-label="Add to Wishlist">
                <FontAwesomeIcon icon={faHeart} />
              </button>
            </div>
            <div className="product-delivery-info">
                <p>
                    Free shipping on orders over $50
                </p>
                <p>
                    30-day money-back guarantee
                </p>
            </div>
          </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;
