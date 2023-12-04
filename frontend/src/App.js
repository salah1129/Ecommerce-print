// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Products from './components/products';
import Cards from './components/categories/cards';
import ProductDetails from './components/productDetails';
import Cart from './components/cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage on application start
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (product) => {
    // Check if the product is already in the cart
    const existingProductIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      // Product is already in the cart, update the quantity or take any other action
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1; // Update quantity as needed
      setCartItems(updatedCart);
    } else {
      // Product is not in the cart, add it
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
    }

    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  return (
    <div className="container">
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/cards" element={<Cards />} />
            <Route
              path="/products/cards/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
