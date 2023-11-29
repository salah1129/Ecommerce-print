// User model
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');


const userSchema= mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            unique: true,
        },
        last_name:{
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
            enum: ['Admin', 'Manager']
        },
        username:{
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
    
        },
        active: {
            type: Boolean,
            default: true,
        }        
    },
    {
        timestamps:true,
    }

)
  userSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  
  userSchema.methods.comparePassword = function (password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  };
  
module.exports= mongoose.model('Users',userSchema);