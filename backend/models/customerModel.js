const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const customerSchema  = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        creation_Date: {
            type: Date,
            default: Date.now,
        },
        last_login: {
            type: Date,
            default: Date.now,
        },
        valid_account: {
            type: Boolean,
            default: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },


    },
    //track when the field was created and updated in DB
    {
     timestamps: true,
    }
);

customerSchema.pre('save', async function (next) {
    //check if password is modified or not
    if(!this.isModified('password')) {
       next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

customerSchema.methods.matchPassword = async function (enteredPassword) {
    //compare pwd entered and from the db
    return await bcrypt.compare(enteredPassword, this.password);

}

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;


//what type of data user gonna have