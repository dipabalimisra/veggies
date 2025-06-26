import React, { useState, useEffect } from "react";
 

import JsonData from "./../../data/data.json";
import SmoothScroll from "smooth-scroll";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/fontawesome-svg-core/styles.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import Header from "../common/header";
import Navigation from "../common/navigation";
import Contact from "../common/contact";
import Features from "./features";
import ProductGrid from "./productgrid";
import Footer from "../common/footer";
import PickCategory from "./pickcategory";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  

  return (
    <div>
      
      <Navigation />
      <Header data={landingPageData.Header} />
      <ProductGrid />
      <PickCategory />
      <Features data={landingPageData.Features} />
      <Contact data={landingPageData.Contact} />
      <Footer />
    </div>
  );
};

export default Home;