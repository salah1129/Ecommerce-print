// Products model

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    sku: { type: String, required: true },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    subCategoryID: {type : mongoose.Schema.Types.ObjectId, ref : 'subcategorySchema'},
    longDescription: { type: String, required: true },
    descriptions: [{ type: String , required: true}], 
    price: { type: String , required: true},
    pricePerUnit: {type: Number, required: true},
    // discountPrice: { type: Number , required: true},
    active: { type: Boolean, required: true , required: true},
    images: [{ type: String , required: true}]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

