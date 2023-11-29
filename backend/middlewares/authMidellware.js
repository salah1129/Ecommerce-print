const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Customer = require('../models/customerModel');

//protect the api from any unauthorized access
const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            //verifying the token sent by user
            token = req.headers.authorization.split(' ')[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            //fetch the user by id
            req.user = await Customer.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

//Midellware to generate and send a new access token using a refrsh token
    const refreshAccessToken = asyncHandler(async (req, res ) => {
        const refreshToken = req.body.refreshToken; //refresh token sent in the request body

        //Validate the refresh token ((check on database of valid refresh tokens))
        if (refreshTokenIsValid(refreshToken)) {
            //Fetch the user details
            const user = await Customer.findById(req.user._id).select('-password');

            //Generate a new access token
            const accessToken = generateAccessToken(user);

            //Send the new access token to the client
            res.json({ accessToken })
        } else {
            res.status(401);
            throw new Error("Invalid refresh token");
          }

    });

module.exports = { protect };