// Product routes

const express = require("express")
const router = express.Router()
const {createNewProduct, searchForProduct, getAllProducts, getProductByID, updateProductByID, deleteProductByID} = require("../contollers/productsController")

// Create new product
router.post("/", createNewProduct)

// List all products
router.get("/", getAllProducts)

// Search for product
router.get("/search", searchForProduct)

// Get product by ID 
router.get("/:id", getProductByID)

// Update product by ID 
router.put("/:id", updateProductByID)

// Delete product by ID 
router.delete("/:id", deleteProductByID)

module.exports = router