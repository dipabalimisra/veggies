import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Features = (props) => {
  return (
    <section className="info-section feature-class" id="feature-class">
      <div className="container mt-5">
      <h2 className="section-header">Why Veggies than Others</h2>
        <div className="section-content">
        
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.title}-${i}`}>
                  {" "}
                  <ul className="custom-bullet-list">
                  <li>
                    <span className="bullet-point-icon">✔</span> <span className="sub-heading">{d.title}</span> 
                  </li>
                  <li>
                    <span className="bullet-point-icon"></span> {d.text}
                  </li>
                  </ul>
                  <br></br>
                </div>
              ))
            : "Loading..."}
           
        </div>
      </div>
    </section>
  );
};

export default Features;