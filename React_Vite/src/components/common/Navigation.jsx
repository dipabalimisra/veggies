import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Signin from "../Backend/Signin";
import Signup from "../Backend/Signup";
import { Modal , Button } from "react-bootstrap";

const Navigation = (props) => {
  const { user, signOut } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState('signin'); // 'signin' or 'signup'

  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const userMenuRef = useRef(null); // Ref to attach to the main user-menu div

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef]); // Re-run effect if userMenuRef changes (unlikely for this specific case, but good practice)

  useEffect(() => {
    if (user) {
      setIsOpen(false); // Ensure dropdown is closed when user becomes available
    }
  }, [user]);

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent the click from immediately closing the dropdown via the document listener
    setIsOpen(!isOpen); // Toggle the isOpen state
  };

  const openModal = (formType) => {
    setCurrentForm(formType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentForm('signin'); // Reset to signin by default when closing
  };

  const handleAuthSuccess = () => {
    // Optionally, perform some action after successful auth, e.g., show a toast
    console.log('Authentication successful! Closing modal.');
    // The modal is already closed by onClose in Signin/Signup
  };
  
    const toggleForm = (formType) => {
      setCurrentForm(formType);
    };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    console.log("Searching for:", searchTerm);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/'); // Redirect to signin after logout
  };
  

  return (
    <nav
      id="menu"
      className=" navbar navbar-expand-lg navbar-dark bg-dark navbar-default navbar-fixed-top"
    >
      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton >
          <Modal.Title>{currentForm === 'signin' ? 'Sign In' : 'Sign Up'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentForm === 'signin' ? (
            <Signin onClose={closeModal} onSuccess={handleAuthSuccess} toggleForm={toggleForm} />
          ) : (
            <Signup onClose={closeModal} onSuccess={handleAuthSuccess} toggleForm={toggleForm} />
          )}
        </Modal.Body>
      </Modal>
      
      <div className="top-bar-left">
        {/* You could add a logo or brand name here */}
        <a href="/" className="top-bar-logo">
          Veggies
        </a>
        <a
          href="/cart"
          className="top-bar-icon-link"
          aria-label="Shopping Cart"
        >
          <FontAwesomeIcon icon={faShoppingCart} color="white"/>
          <span className="cart-count" color="white">3</span> {/* Example cart item count */}
        </a>
        {user ? (
          <>
            <div className="user-menu top-bar-auth-link" ref={userMenuRef}>
                <Button className="user-trigger" onClick={toggleDropdown}>
                    <span className="username" style={{color:"white"}}>Hello, {user.username}</span></Button>
                <div className={`dropdown-content ${isOpen ? 'active' : ''}`}>
                    <a href="/profile">My Profile</a>
                    <a href="/settings">Account Settings</a>
                    <a href="/change-password">Change Password</a>
                    <a href="/my-orders">My Orders</a>
                    <Link onClick={handleSignOut}>Sign Out</Link>
                </div>
            </div>
            {user.role === 'admin' ? (
              <Link to={'/addProduct'} className="top-bar-auth-link">Add Product</Link>
            ) : (
              <></>
            )}
              
           
            
          </>
          ) : (
          <>
            <Button onClick={()=> openModal('signin')}  className="top-bar-auth-link">
              <FontAwesomeIcon icon={faUser} /> Sign In
            </Button>
            <span className="auth-divider">/</span>
            <Button onClick={() => openModal('signup')} className="top-bar-auth-link">
            <FontAwesomeIcon icon={faUser} /> Sign Up
            </Button>
          </>
          )}
      </div>
      <div className="top-bar-center">
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search products"
          />
          <button type="submit" className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      <div className="top-bar-right">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggler" // Updated class name for toggler
              data-bs-toggle="collapse" // Updated data attribute (data-bs-toggle instead of data-toggle)
              data-bs-target="#bs-example-navbar-collapse-1" // Updated data attribute (data-bs-target instead of data-target)
              aria-controls="bs-example-navbar-collapse-1" // Added for accessibility
              aria-expanded="false" // Added for accessibility
              aria-label="Toggle navigation" // Added for accessibility
            >
              {/* Use a single span with navbar-toggler-icon for the hamburger */}
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navbar-right">
              <li className="nav-item">
                <a href="#feature-class" className="page-scroll nav-link">
                  Why Veggis than others
                </a>
              </li>
              <li className="nav-item">
                <a href="#category" className="page-scroll nav-link">
                  Pick one Category
                </a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="page-scroll nav-link">
                  Feel Free to Reach Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;