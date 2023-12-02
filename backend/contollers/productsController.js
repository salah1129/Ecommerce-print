// Products controller

const Product = require("../models/products")
 // Create new product
exports.createNewProduct = async (req, res) => {
    try {
        const existingProduct = await Product.findOne({
            $or :[
                {productName : req.body.productName},
                {sku : req.body.sku}
            ]
        })
        if(existingProduct){
            return res.status(400).json({msg : "SKU and product nam should be unique"})
        }
        const newProduct = new Product({
            ...req.body,
            active : true
        })
        await newProduct.save()
        res.status(201).json({msg : "Product created successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// List all products
exports.getAllProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const products = await Product.aggregate([
            // {
            //     $skip: skip,
            // },
            // {
            //     $limit: limit,
            // },
            {
                $lookup: {
                    from: "categories", 
                    localField: "subCategoryID",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $project: {
                    _id: 1,
                    sku: 1,
                    productImage: 1,
                    productName: 1,
                    categoryName:1,
                    subCategoryID: 1,
                    descriptions: 1,
                    longDescription: 1,
                    price: 1,
                    active: 1,
                    images: 1
                },
            },
        ]);

        if (products.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Search for product
exports.searchForProduct = async (req, res) => {
    try {
        const searchQuery = req.query.query
        const page = req.query.page || 1
        const limit = 10
        const skip = (page - 1) * limit
        const product = await Product.find({
            $or : [
                {productName : {$regex : searchQuery, $options : "i"}}
            ]
        })
        // .skip(skip)
        // .limit(limit)
        if(product.length === 0){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}


// Search for products with specific fields
exports.searchForProduct = async (req, res) => {
    try {
        const searchQuery = req.query.query;
        const page = req.query.page || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const products = await Product.aggregate([
            {
                $match: {
                    productName: { $regex: searchQuery, $options: "i" },
                },
            },
            {
                $skip: skip,
            },
            {
                $limit: limit,
            },
            {
                $lookup: {
                    from: "categories", 
                    localField: "subCategoryID",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $project: {
                    productName: 1,
                    categoryName: { $arrayElemAt: ["$category.categoryName", 0] },
                    price: 1,
                    active: 1,
                },
            },
        ]);

        if (products.length === 0) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get a product by ID
exports.getProductByID = async (req, res) => {
    try {
        const productID = req.params.id 
        const product = await Product.findById(productID)
        if(!product){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Update product by ID 
exports.updateProductByID = async (req, res) => {
    try {
        const productID = req.params.id
        const updatedData = req.body
        const existingProduct = await Product.findOne({
            $or :[
                {productName : req.body.productName},
                {sku : req.body.sku}
            ]
        })
        if(existingProduct && existingProduct._id != productID){
            return res.status(400).json({msg : "Product name or SKU is already in use"})
        }
        const product = await Product.findByIdAndUpdate(productID, updatedData)
        if(!product){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({msg : "Product updated successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

// Delete product by ID
exports.deleteProductByID = async (req, res) => {
    try {
        const productToDelete = await Product.findByIdAndDelete(req.params.id)
        if(!productToDelete){
            return res.status(404).json({msg : "Bad request : product not found"})
        }
        res.status(200).json({msg : "Product deleted successfully"})
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}