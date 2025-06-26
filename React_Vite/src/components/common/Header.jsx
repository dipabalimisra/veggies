

import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';


 const Header = (props) => {
  const {title, paragraph} = props.data ? props.data : '';
  const [overlayVisible, setOverlayVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && overlayVisible){
        setOverlayVisible(false);
      }
       if (window.scrollY < 400 && !overlayVisible) {
        setOverlayVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
  return (
    <header id="header">
      <div className="intro">
          <div className="container-fluid">
            <div className='overlay-wrapper'>
              <div className={`overlay ${!overlayVisible ? 'hidden' : ''}`}>
                <div className="overlay-text">
                <h1 className="heading">
                  {title ? title : "Loading"}
                  <span></span>
                </h1>
                <p>{paragraph ? paragraph : "Loading"}</p>
                 <Button
                  href="#category"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Pick One Category
                </Button>
                </div>
                </div>
                </div>
              </div>
            </div>
    </header>
  );
};

export default Header;