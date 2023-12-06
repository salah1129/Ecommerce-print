const express = require('express');

/////
const { registerCustomer, authCustomer, deleteCustomer, getCustomerById, getCustomers, getSearchCustomers, updateCustomer, logoutCustomer, updateCustomerProfile, getCustomerProfile } = require("../contollers/customersController");
const { protect } = require('../middlewares/authMidellware');
const { checkUserRole } = require('../middlewares/checkRoleMidellware');
const router = express.Router();

router.route('/').post(registerCustomer);
router.route('/login').post(authCustomer);
router.route('/logout').get(logoutCustomer);

router.route('/all').get(getCustomers);

router.route('/:id').get(protect, checkUserRole, getCustomerById).put(protect, checkUserRole, updateCustomer).delete(protect, deleteCustomer);
router.route('/').get(protect, checkUserRole, getSearchCustomers);
router.route('/profile/update/:id').patch(protect, updateCustomerProfile);
router.route('/profile/:id').get(protect, getCustomerProfile);

module.exports = router;