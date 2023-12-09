
// // cart.jsx
// import "../styles/cart.css";
// import React, { useState } from 'react';
// import axios from 'axios';

// const Cart = ({ cartItems, removeFromCart }) => {
//   const [quantities, setQuantities] = useState({});
//   const [placingOrder, setPlacingOrder] = useState(false);
//   const [orderDetails, setOrderDetails] = useState({
//     email: '',
//     address: '',
//     phoneNumber: '',
//     city: '',
//     country: '',
//   });
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);

//   const handleRemove = (productId) => {
//     removeFromCart(productId);
//   };

//   const handleQuantityChange = (productId, quantity) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [productId]: quantity,
//     }));
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => {
//       const itemTotal = parseInt(item.pricePerUnit) * (quantities[item._id] || 0);
//       return total + itemTotal;
//     }, 0);
//   };

//   const totalItems = cartItems.reduce((total, item) => total + (quantities[item._id] || 0), 0);

//   const handlePlaceOrder = () => {
//     setPlacingOrder(true);
//   };

//   const handleInputChange = (e, field) => {
//     setOrderDetails((prevDetails) => ({
//       ...prevDetails,
//       [field]: e.target.value,
//     }));
//   };

//   const handleConfirmOrder = async () => {
//     try {
//       // input validation
//       if (!validateInputs()) {
//         return;
//       }

//       const orderData = {
//         email: orderDetails.email,
//         address: orderDetails.address,
//         phoneNumber: orderDetails.phoneNumber,
//         city: orderDetails.city,
//         country: orderDetails.country,
//         items: cartItems.map(item => ({
//           productId: item._id,
//           productName: item.productName,
//           quantity: quantities[item._id] || 0,
//           price: `${item.pricePerUnit} DH`,
//         })),
//         total: calculateTotal(),
//       };

//       await axios.post('http://localhost:5000/v1/orders', orderData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       setShowSuccessMessage(true);

//       setPlacingOrder(false);
//       setOrderDetails({
//         email: '',
//         address: '',
//         phoneNumber: '',
//         city: '',
//         country: '',
//       });

//     } catch (error) {
//       console.error('Error confirming order:', error.message);
//     }
//   };

//   const validateInputs = () => {
//     // email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(orderDetails.email)) {
//       alert('Invalid email address');
//       return false;
//     }

//     // phone number validation
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(orderDetails.phoneNumber)) {
//       alert('Invalid phone number');
//       return false;
//     }


//     return true;
//   };

//   return (
//     <>
//       <div className="cart">
//         <div className='shoppingCart'>
//           <h1>Your Shopping Cart</h1>
//           {cartItems.length === 0 ? (
//             <p>Your cart is currently empty.</p>
//           ) : (
//             <div>
//               {cartItems.map(item => (
//                 <div key={item._id} className="cartItem">
//                   <img src={`/images/cards/${item.productImage}`} alt={item.productName} />
//                   <div className="details">
//                     <p>{item.productName}</p>
//                     <p>Unit price: {parseInt(item.pricePerUnit)} DH</p>
//                     Quantity:
//                     <input
//                       type="number"
//                       min="0"
//                       value={quantities[item._id] || 0}
//                       onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value) || 0)}
//                       required
//                     />
//                     <p>Total: {parseInt(item.pricePerUnit) * (quantities[item._id] || 0)} DH</p>
//                     <button className="remove" onClick={() => handleRemove(item._id)}>X</button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         <div className="cartSummary">
//           <div>
//             <h2>Cart Summary</h2>
//             <p>Total Items: {totalItems}</p>
//             <p>Overall Total: {calculateTotal()} DH</p>
//             {placingOrder ? (
//               <form className="form">
//                 <label>Email:
//                   <input
//                     type="email"
//                     value={orderDetails.email}
//                     onChange={(e) => handleInputChange(e, 'email')}
//                     required
//                     pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
//                   />
//                 </label>
//                 <label>Address:
//                   <input
//                     type="text"
//                     value={orderDetails.address}
//                     onChange={(e) => handleInputChange(e, 'address')}
//                     required
//                   />
//                 </label>
//                 <label>Phone Number:
//                   <input
//                     type="tel"
//                     value={orderDetails.phoneNumber}
//                     onChange={(e) => handleInputChange(e, 'phoneNumber')}
//                     required
//                     pattern="\d{10}"
//                   />
//                 </label>
//                 <label>City:
//                   <input
//                     type="text"
//                     value={orderDetails.city}
//                     onChange={(e) => handleInputChange(e, 'city')}
//                     required
//                   />
//                 </label>
//                 <label>Country:
//                   <input
//                     type="text"
//                     value={orderDetails.country}
//                     onChange={(e) => handleInputChange(e, 'country')}
//                     required
//                   />
//                 </label>
//                 <button type="button" onClick={handleConfirmOrder}>Confirm Order</button>
//               </form>
//             ) : (
//               <>
//                 <button onClick={handlePlaceOrder}>Place the order</button>
//                 {showSuccessMessage && (
//                   <div className="success-message">
//                     Your order has been confirmed successfully!
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cart;


// cart.jsx
import "../styles/cart.css";
import React, { useState } from 'react';
import axios from 'axios';

const Cart = ({ cartItems, removeFromCart }) => {
  const [quantities, setQuantities] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    email: '',
    address: '',
    phoneNumber: '',
    city: '',
    country: '',
    design: {},
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRemove = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));

    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      design: {
        ...prevDetails.design,
        [productId]: {
          designImage: '',
          designDescription: '',
        },
      },
    }));
  };

  const handleDesignChange = (productId, field, value) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      design: {
        ...prevDetails.design,
        [productId]: {
          ...prevDetails.design[productId],
          [field]: value,
        },
      },
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = parseInt(item.pricePerUnit) * (quantities[item._id] || 0);
      return total + itemTotal;
    }, 0);
  };

  const totalItems = cartItems.reduce((total, item) => total + (quantities[item._id] || 0), 0);

  const handlePlaceOrder = () => {
    setPlacingOrder(true);
  };

  const handleInputChange = (e, field) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value,
    }));
  };

  const handleConfirmOrder = async () => {
    try {
      // input validation
      if (!validateInputs()) {
        return;
      }

      const orderData = {
        email: orderDetails.email,
        address: orderDetails.address,
        phoneNumber: orderDetails.phoneNumber,
        city: orderDetails.city,
        country: orderDetails.country,
        items: cartItems.map(item => ({
          productId: item._id,
          productName: item.productName,
          quantity: quantities[item._id] || 0,
          price: `${item.pricePerUnit} DH`,
          userDesign: orderDetails.design[item._id],
        })),
        total: calculateTotal(),
      };

      await axios.post('http://localhost:5000/v1/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setShowSuccessMessage(true);

      setPlacingOrder(false);
      setOrderDetails({
        email: '',
        address: '',
        phoneNumber: '',
        city: '',
        country: '',
        design: {},
      });

    } catch (error) {
      console.error('Error confirming order:', error.message);
    }
  };

  const validateInputs = () => {
    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orderDetails.email)) {
      alert('Invalid email address');
      return false;
    }

    // phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(orderDetails.phoneNumber)) {
      alert('Invalid phone number');
      return false;
    }

    return true;
  };

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
                    <div className="design">
                      <label >Design Image URL:
                        <input className="desingUrl"
                          type="text"
                          value={orderDetails.design[item._id]?.designImage || ''}
                          onChange={(e) => handleDesignChange(item._id, 'designImage', e.target.value)}
                        />
                      </label>
                      <label>Design Description:
                        <textarea className="textarea"
                          value={orderDetails.design[item._id]?.designDescription || ''}
                          onChange={(e) => handleDesignChange(item._id, 'designDescription', e.target.value)}
                        />
                      </label>
                    </div>
                    <p>Total: {parseInt(item.pricePerUnit) * (quantities[item._id] || 0)} DH</p>
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
            {placingOrder ? (
              <form className="form">
                <label>Email:
                  <input
                    type="email"
                    value={orderDetails.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    required
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  />
                </label>
                <label>Address:
                  <input
                    type="text"
                    value={orderDetails.address}
                    onChange={(e) => handleInputChange(e, 'address')}
                    required
                  />
                </label>
                <label>Phone Number:
                  <input
                    type="tel"
                    value={orderDetails.phoneNumber}
                    onChange={(e) => handleInputChange(e, 'phoneNumber')}
                    required
                    pattern="\d{10}"
                  />
                </label>
                <label>City:
                  <input
                    type="text"
                    value={orderDetails.city}
                    onChange={(e) => handleInputChange(e, 'city')}
                    required
                  />
                </label>
                <label>Country:
                  <input
                    type="text"
                    value={orderDetails.country}
                    onChange={(e) => handleInputChange(e, 'country')}
                    required
                  />
                </label>
                <button type="button" onClick={handleConfirmOrder}>Confirm Order</button>
              </form>
            ) : (
              <>
                <button onClick={handlePlaceOrder}>Place the order</button>
                {showSuccessMessage && (
                  <div className="success-message">
                    Your order has been confirmed successfully!
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
