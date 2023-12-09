// module.exports = Order;
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productName: {
        type: String
      }, 
      price: {
        type: String
      },
      itemTotal: {
        type: Number,
      },
    }
  ],
  total: {
    type: Number
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
