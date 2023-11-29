const express = require('express');
const { protect } = require('../middlewares/authMidellware');
const { addOrder, getOrdersList, getOrderById, updateOrderById } = require('../contollers/orderControllers.js');
const { checkUserRole } = require('../middlewares/checkRoleMidellware');
const router = express.Router();

router.route('/').post(protect, addOrder);
router.route('/').get(protect, checkUserRole, getOrdersList);
router.route('/:id').get(protect, checkUserRole, getOrderById).put(protect, updateOrderById);

module.exports = router

