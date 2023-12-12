import "../styles/cart.css";
import React, { useState, useRef, useEffect } from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const [quantities, setQuantities] = useState({});
  const [showOrderForm, setShowOrderForm] = useState(false);
  const orderFormRef = useRef(null);

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

  const handlePlaceOrderClick = () => {
    setShowOrderForm(true);
  };

  useEffect(() => {
    if (showOrderForm && orderFormRef.current) {
      orderFormRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showOrderForm]);


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
          <button className="placeOrder" onClick={handlePlaceOrderClick}>
            Place Order
          </button>
        </div>
      </div>

      {showOrderForm && (
        
        <div className="orderForm" ref={orderFormRef}>
          <h2>Order Details</h2>
          <p>Please provide your personal, delivery, and payment details to complete the order.</p>
          <form>
            <h3>Personal Details</h3>
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" required />
            </label>
            <h3>Delivery Details</h3>
            <label>
              Address:
              <input type="text" name="address" required />
            </label>
            <label>
              Tax number if you are a company:
              <input type="text" name="Matricule fiscale" />
            </label>
            <label>
              City:
              <input type="text" name="city" required />
            </label>
            <label>
              Postal Code:
              <input type="text" name="postalCode" required />
            </label>
            <h3>Payment Details</h3>
            <label>
              Card Number:
              <input type="text" name="cardNumber" required />
            </label>
            <label>
              Expiry Date:
              <input type="text" name="expiryDate" placeholder="MM/YYYY" required />
            </label>
            <label>
              CVV:
              <input type="text" name="cvv" required />
            </label>
            <button type="submit" className="submitOrder">Submit Order</button>
          </form>
        </div>
      )}
    </>
  );
};
export default Cart;
