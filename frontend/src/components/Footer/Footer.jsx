import React from "react";
import "./Footer.css";
import logo from "../../assets/PrintKingdom6.png";

const Footer = () => {
  return (
    <div className="f-wrapper">
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src={logo} alt="" className="logoFooter"/>
          <span className="secondaryText">
            Our vision is to make all people <br />
            creative.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">Casablanca, Morocco</span>
          <div className="flexCenter f-menu">
            <span>Categories</span>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;