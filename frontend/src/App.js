
// app.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';
import Products from './components/products';
import Cards from './components/categories/cards';

function App() {
  return (
    <div className="container">
      <div>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cards" element={<Cards />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
