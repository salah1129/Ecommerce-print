const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
       expiresIn: "30d" ,
    });
    //refresh token /number of days the token gonna be expired
};

module.exports = generateToken;