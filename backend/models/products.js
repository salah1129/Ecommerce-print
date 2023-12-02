// Products model

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    sku: { type: String, required: true },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    subCategoryID: {type : mongoose.Schema.Types.ObjectId, ref : 'subcategorySchema'},
    longDescription: { type: String, required: true },
    descriptions: [{ type: String }], 
    price: { type: String },
    discountPrice: { type: Number },
    active: { type: Boolean, required: true },
    images: [{ type: String }]
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

