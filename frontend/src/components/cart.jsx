// cart.jsx
import "../styles/cart.css";
import React, { useState } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const [quantities, setQuantities] = useState({});
  
  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = parseInt(item.pricePerUnit) * (quantities[item._id] || 0);
      return total + itemTotal;
    }, 0);
  };

  const totalItems = cartItems.reduce((total, item) => total + (quantities[item._id] || 0), 0);

  return (
    <>
      <div className="cart">
        <div className='shoppingCart'>
          <h1>Your Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p>Your cart is currently empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item._id} className="cartItem">
                  <img src={`/images/cards/${item.productImage}`} alt={item.productName} />
                  <div className="details">
                    <p>{item.productName}</p>
                    <p>Unit price: {parseInt(item.pricePerUnit)} DH</p>
                    Quantity:
                    <input
                      type="number"
                      min="0"
                      value={quantities[item._id] || 0}
                      onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 0)}
                      required
                    />
                    <p>Total: {parseInt(item.pricePerUnit) * (quantities[item._id] || 0)} DH</p>
                    <label>
                      Design File:
                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .pdf"
                      />
                    </label>
                    <button className="remove" onClick={() => handleRemove(item._id)}>X</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="cartSummary">
          <div>
            <h2>Cart Summary</h2>
            <p>Total Items: {totalItems}</p>
            <p>Overall Total: {calculateTotal()} DH</p>
          </div>
          <button className="placeOrder">place the order</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
