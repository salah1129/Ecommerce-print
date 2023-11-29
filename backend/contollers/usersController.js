// Users controller
const jwt= require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt= require('bcrypt');
const nodemailer= require('nodemailer');
const User = require("../models/users");
require('dotenv').config();


//GENERATE REFRESH TOKEN:
const refreshToken = (id)=>{
  return jwt.sign({id},process.env.REFRESH_TOKEN_SECRET,{
    expiresIn : '1d',
  })
}
//CREATE USER:
const createUser = asyncHandler(async(req,res) =>{
const { first_name, last_name, email, role, username, password } = req.body;

if (!first_name || !last_name || !email || !role || !username || !password) {
  return res.status(400).json({ message: 'All inputs are required' });
}

const userExists = await User.findOne({email});
if(userExists){
  res.status(400)
  throw new Error("Users already in use")
}

const salt =  await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password,salt);

  const newUser = await User.create({
     first_name,
     last_name,
     email,
     role,
     username,
     password: hashedPassword });

  if(newUser){
    const transporter= nodemailer.createTransport ({
      service:'gmail',
      auth:{
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD
        }
    })
    let mailOptions = {
      from : "Imprimerie1SERVICE@gmail.com",
      to : email,
      subject :"Welcome To Our Website!",
      text:'Your username : ' + username + ' , ' + 'Your password : '+ password
    };
      transporter.sendMail(mailOptions)  
    res.status(201).json({
      first_name: User.first_name,
      last_name: User.last_name,
      email: User.email,
      role: User.role,
      username: User.username,
    })
  } else {
    res.status(400)
    throw new Error('Invalid User Data')
  }
});

 //loginUser with error
 const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  const refresh_Token= refreshToken(user._id); //R

  if(user && (await bcrypt.compare(password, user.password))) {
      res.json({
          first_name: user.first_name,
          email: user.email,
          token: genereteToken(user._id),
          refreshToken:refresh_Token, //R
          token_type: 'Bearer', //R
          expires_in: 10 * 24 * 60 * 60, //R
      });
  } else {
      res.status(400);
      throw new Error("Invalid email or password!");
  }
});

//GET ALL USERS:
const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ first_name: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    }
  };

//GET A USER:
const getUser = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters

  try {
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// SEARCH FOR A USER:
const searchUsers = async (req, res) => {
  const searchQuery = req.query.first_name || req.query.last_name;

  try {
    const users = await User.find({
      $or: [
        { first_name: { $regex: new RegExp(searchQuery , 'i')  } }, //  search in the first_name field
        { last_name: { $regex: new RegExp(searchQuery , 'i') } }, //  search in the last_name field
      ],
    }).limit(10); // Limit the results to a maximum of 10 users

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

///UPDATE USER:
const updateUser = asyncHandler(async(req,res)=>{
  try{ 
     const {id}= req.params
     const updateUser= await User.findByIdAndUpdate(id, req.body);
     if (updateUser){
        return  res.status(200).send({message:'user updated successfully'});
     } else {
        return res.status(401).send({message:"invalid user id"});
     } 
  } catch (error){
     console.log(error)
     res.status(500).send({message: error.message})
  }
})

/////DELETE USER:
 const deleteUser = asyncHandler(async(req,res) => {
   try {
      const {id}= req.params
   const removeUser= await User.findByIdAndDelete(id);
   if (removeUser){
      return res.status(200).send({message:'user deleted successfuly'});
      } else {
         return res.status(401).send({message:"Error deleting the user"});}
   } catch(error) {
      console.log(error)
      res.status(500).send({message: error.message})
   }
 });

//GENERATE TOKEN:
const genereteToken= (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3h' })
}


 module.exports = {
    createUser,
    deleteUser,
    updateUser,
    loginUser,
    getUsers,
    getUser,
    searchUsers,
 }