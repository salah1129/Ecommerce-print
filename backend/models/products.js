// Products model

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    sku: { type: String, required: true },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    categoryID: {type : mongoose.Schema.Types.ObjectId},
    longDescription: { type: String, required: true },
    shortDescription : {type : String},
    price: { type: String },
    discountPrice: { type: Number },
    active: { type: Boolean, required: true }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;