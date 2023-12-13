const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders } = require('../contollers/orderControllers.js');

router.route('/').post(createOrder).get(getAllOrders);

module.exports = router;
