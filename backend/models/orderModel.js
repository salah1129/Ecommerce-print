
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    // customer: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Customer',
    //   required: true,
    // },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true },
        designFile: { type: String }, // You may adjust this based on your requirements
      },
    ],
    totalAmount: { type: Number, required: true },
    deliveryDetails: {
      address: { type: String, required: true },
      taxNumber: { type: String },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
    paymentDetails: {
      cardNumber: { type: String, required: true },
      expiryDate: { type: String, required: true },
      cvv: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
