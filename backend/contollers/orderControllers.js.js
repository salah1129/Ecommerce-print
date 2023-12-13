const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');


const createOrder = asyncHandler(async (req, res) => {
  const {
    customer,
    items,
    totalAmount,
    deliveryDetails,
    paymentDetails,
  } = req.body;

  const order = await Order.create({
    customer,
    items,
    totalAmount,
    deliveryDetails,
    paymentDetails,
  });

  res.status(201).json(order);
});


const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

module.exports = { createOrder, getAllOrders };
