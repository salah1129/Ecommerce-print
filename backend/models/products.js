const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    sku: { type: String, required: true },
    productImage: { type: String, required: true },
    productName: { type: String, required: true },
    subCategoryID: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategorySchema' },
    longDescription: { type: String, required: true },
    descriptions: [{ type: String, required: true }], 
    pricePerUnit: { type: Number, required: true },
    price: {type: String},
    active: { type: Boolean, required: true },
    images: [{ type: String, required: true }],
    printQuality: { type: String, required: true },
    productionTime: { type: String, required: true },
    careInstructions: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: { type: String, required: true },
    material: { type: String, required: true },
    availableColors: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
