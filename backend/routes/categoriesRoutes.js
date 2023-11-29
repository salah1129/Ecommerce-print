// Categories routes

const express = require("express")
const router = express.Router()
const {createCategory, getAllCategories, searchForCategory, getCategoryById, updateCategoryByID, deleteCategoryByID} = require("../contollers/categoriesCont")

// Create new category
router.post("/", createCategory)

// Retrieve all categories 
router.get("/", getAllCategories)

// Search for category
router.get("/search", searchForCategory)

// Get category by ID
router.get("/:id", getCategoryById)

// Update category by ID
router.put("/:id", updateCategoryByID)

// Delete category by ID
router.delete("/:id", deleteCategoryByID)

module.exports = router