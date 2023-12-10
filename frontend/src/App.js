// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Products from './components/products';
import ProductDetails from './components/productDetails';
import Cart from './components/cart';
import LoginSignup from './components/loginSignup/LoginSignup.jsx';

function App() {
  // Load cart from local storage on initial render
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [cartItems, setCartItems] = useState(initialCart);

  // Update local storage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(item => item._id === product._id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingProductIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
  };

  return (
    <div className="container">
      <div>
        <Router>
          <Routes>
            <Route path="/products" element={<Products />} />
            <Route path="/signinSignup" element={<LoginSignup/>} />
            <Route
              path="/products/cards/:id"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
