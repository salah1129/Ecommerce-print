const Customer = require('../models/customerModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

//Function to send verification Email
async function sendVerificationEmail(email, verificationToken) {
    //config nodemailer with email service provider details
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });

    //CONSTRUCT the email content
    const emailContent = {
        from: "Imprimerie1SERVICE@gmail.com",
        to: email,
        subject: 'Account verification',
        text: `Click the following link to verify your account: ${process.env.APP_BASE_URL}/verify/${verificationToken}`,
    };

    //send the email
    try {
        await transporter.sendMail(emailContent);
        console.log('Verification email sent successfully.');
    } catch (error) {
        console.error('Error sending verification email:', error);

    }
}
const registerCustomer = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    const verificationToken = generateToken();

    const customerExist = await Customer.findOne({ email });

    if (customerExist) {
        res.status(400);
        throw new Error("Costumer already exists");
    }

    const customer = await Customer.create({
        first_name,
        last_name,
        email, 
        password,
        verificationToken
    });

    if (customer) {
        //send a verification email
        await sendVerificationEmail(customer.email, verificationToken);

        res.status(201).json({
            _id: customer._id,
            name: customer.name,
            email: customer.email,
            token: generateToken(customer._id),
        });
    } else {
        res.status(400);
        throw new Error("Error Occured!");
    }

});

const authCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const customer = await Customer.findOne({ email });

    if(customer && (await customer.matchPassword(password))) {
        res.json({
            _id: customer._id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email,
            token: generateToken(customer._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password!");
    }

      // Check if the customer's account is active
    //if (!customer.isActive) {
       //return res.status(401).json({ message: 'Account is not active' });
    //}

   
});

const deleteCustomer = asyncHandler(async (req, res) => {

    //find costumer in DB
    const customer = await Customer.findById(req.params.id);

    if(!customer) {
        res.status(404);
        throw new Error("Customer Not Found");

    }
       
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Customer Deleted successfully" });

});


const getCustomerById = asyncHandler(async (req, res) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {

    const customer = await Customer.findById(req.params.id);

    if(customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
} else {
    res.status(403).json({ message: 'Unauthorized access'})
}
});

const getCustomers = asyncHandler( async (req, res) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {

        
        //get te page number from the query parameters default to 1
        const page = parseInt(req.query.page, 10) || 1;
        
        //set the number of costumers to display per page
        const pageSize = 10;
        
        //calculate the skip value based on the page number and page size
        const skip = (page-1) * pageSize;

        const customers = await Customer.find({ customer: req.customer }).sort({ first_name: -1 }).skip(skip).limit(pageSize);
        
    res.json(customers);
    } else {
        res.status(403).json({ message: 'Unauthorized access'})
    }
});

//get costumer list with search query
const getSearchCustomers = asyncHandler(async(req, res) => {
   //extracting the search query from the request
   const searchQuery = req.query.first_name ;

           //get te page number from the query parameters default to 1
           const page = parseInt(req.query.page, 10) || 1;
        
           //set the number of costumers to display per page
           const pageSize = 10;
           
           //calculate the skip value based on the page number and page size
           const skip = (page-1) * pageSize;

   if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {
   const customers = await Customer.find({
    $or: [
        { first_name:  { $regex: new RegExp(searchQuery, 'i') } },
    ],
   }).sort({ first_name: -1 }).skip(skip).limit(pageSize);

    
   res.json(customers);
   } else {
    res.status(403).json({ message: 'Unauthorized access'})
   }
});

const updateCustomer = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, role  } = req.body;

    if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {

    const customer = await Customer.findById(req.params.id);

    //check if the costumer info belongs to the user requesting to update
    /*if(costumer.user.toString() !== req.user._id.toString()) {
       res.status(401);
       throw new Error("You can't perform this action");
    }*/

    if (email && email !== costumer.email) {
        const isEmailUnique = await Customer.findOne({ email });

        if (isEmailUnique) {
            res.status(400);
            throw new Error('Customer with this email already exists');
        };
    };

    if(customer) {
        customer.first_name = first_name;
        customer.last_name = last_name;
        customer.email = email;
        customer.password = password;

        const updatedCustomer = await customer.save(); 
        res.json(updatedCustomer);
    } else {
        res.status(404);
        throw new Error("Invalid customer id")
    }
  } else {
    res.status(403);
    throw new Error("you don't have enough privilege")
  }
});

//logout function
const logoutCustomer = asyncHandler(async(req, res) => {
     
})

const updateCustomerProfile = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, role  } = req.body;

   // if (req.user && (req.user.role === 'admin' || req.user.role === 'manager')) {

    const customer = await Customer.findById(req.params.id);

    //check if the costumer info belongs to the user requesting to update
    if(customer.user.toString() !== req.user._id.toString()) {
       res.status(401);
       throw new Error("You can't perform this action");
    }

    if (email && email !== costumer.email) {
        const isEmailUnique = await Customer.findOne({ email });

        if (isEmailUnique) {
            res.status(400);
            throw new Error('Customer with this email already exists');
        };
    };

    if(customer) {
        customer.first_name = first_name;
        customer.last_name = last_name;
        customer.email = email;
        customer.password = password;

        const updatedCustomer = await customer.save(); 
        res.json(updatedCustomer);
    } else {
        res.status(404);
        throw new Error("Invalid customer id")
    }

  //} else {
   // res.status(403);
   // throw new Error("you don't have enough privilege")
  //}

});

const getCustomerProfile = asyncHandler(async (req, res) => {
    const customer = await Customer.findById(req.params.id);

    if(customer) {
        res.json(customer);
    } else {
        res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
});


module.exports = { registerCustomer, authCustomer, deleteCustomer, getCustomerById, getCustomers, getSearchCustomers, updateCustomer, logoutCustomer, updateCustomerProfile, getCustomerProfile }; 

