import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'; // Assuming you have solid icons installed


const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-col about-us">
          <h3>About Us</h3>
          <p>
            Get the fresh Vegetables direct from our Farm to your doorstep.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-col quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/shop">Shop Now</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="footer-col customer-service">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/support">Support Center</a></li>
          </ul>
        </div>

        {/* Contact & Social Section */}
        <div className="footer-col contact-social">
          <h3>Contact & Connect</h3>
          <p><FontAwesomeIcon icon={faEnvelope} /> contact@cc.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> +91 (123) 9876543210</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} veggies.co. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;