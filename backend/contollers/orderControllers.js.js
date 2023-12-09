// order controller

const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const dotenv = require('dotenv');

const addOrder = asyncHandler(async (req, res) => {

    // if (costumer) {
        let order = new Order({
            ...req.body
        });
        order = await order.save();
        if (order) {
            res.status(201).json({ message: 'Order created successfully' });
        } else {
            res.status(400);
            throw new Error('Order not created');
        }
    // } else {
    //     res.status(400);
    //     throw new Error("you don't have enough privilege");
    // }

});

const getOrdersList = asyncHandler( async (req, res) => {

        //get te page number from the query parameters default to 1
        const page = parseInt(req.query.page, 10) || 1;
        
        //set the number of costumers to display per page
        const pageSize = 10;
         
        //calculate the skip value based on the page number and page size
        const skip = (page-1) * pageSize;

    // const orderList = await Order.find().populate('user', 'name').sort({'order_date': -1}).skip(skip).limit(pageSize);
    const orderList = await Order.find().skip(skip).limit(pageSize);
    
    if(!orderList) {
        res.status(500).json({success: false});
    }

    res.json(orderList);

});

const getOrderById = asyncHandler( async (req, res) => {

        const order = await Order.findById(req.params.id)
        .populate({
            path: 'costumer',
            select :'first_name last_name',
        })
        .populate({
            path: 'orderItems',
             populate: {
                path: 'product',
                 populate: { 
                    path: 'category' 
                },
            },
        });

        if(!order) {
            res.status(404).json({message: "Order not found"})
        }

        res.send(order);


});

const updateOrderById = asyncHandler( async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    );

    if(!order) {
        return res.status(404).json({ message: "invalid order id" });
    }

    res.status(200).send(order);
})

module.exports = { addOrder, getOrdersList, getOrderById, updateOrderById };
