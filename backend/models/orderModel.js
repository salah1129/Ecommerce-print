const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
        },
        customer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subcategory'
        },
        order_items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'OrderItem',
            required: true,
        }],
        shippingAddress1: {
            type: String,
            required: true,
        },
        shippingAddress2: {
            type: String,
        },
        city: {
            type: String,
            required: true,
        },
        zip: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        order_date: {
           type: Date,
           default: Date.now,
        },
        totalPrice:{
            type: Number,
        },
        status:{
            type: String,
            required: true,
            default: 'open',
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;