// LandingPage.js

import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/landingPage.css';

const LandingPage = () => {
  const backgroundImageStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/images/cards/background.jpg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '70vh',
  };

  const subCategoriesRef = useRef();

  useEffect(() => {
    const subCategoriesContainer = subCategoriesRef.current;

    const scroll = () => {
      if (subCategoriesContainer) {
        subCategoriesContainer.scrollLeft += 8; // Adjust the scroll speed as needed
      }
    };

    const scrollInterval = setInterval(scroll, 100); // Adjust the interval as needed

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="landingPage">
      <header className="header">
        <div className="logo">
          <img src="/path/to/your/logo.png" alt="Your Logo" />
          <h1>Your Brand</h1>
        </div>
        <nav className="navigation">
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <section className="hero" style={backgroundImageStyle}>
        <div className="hero-content">
          <h2>Welcome to Your Brand</h2>
          <p>Discover quality products for your business needs. Order with confidence!</p>
          <Link to="/products" className="cta-button">Explore Products</Link>
        </div>
      </section>

      <section className="subCategories" ref={subCategoriesRef}>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Cotton Business Cards1.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Large Postcards.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Envelope Seals.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Banners.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Tabletop Signs.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Water Bottles.jpg')", backgroundSize: "cover" }}></div>
        <div className="subCategory" style={{ backgroundImage: "url('/images/cards/Wall Calendars.jpg')", backgroundSize: "cover" }}></div>
      </section>

      <section className="cta">
        <h2>Ready to Elevate Your Business?</h2>
        <p>Explore our products and take your business to the next level!</p>
        <Link to="/products" className="cta-button">Get Started</Link>
      </section>

      <footer className="footer">
        <p>&copy; 2023 Your Brand. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
