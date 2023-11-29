// subcategorie routes
const express = require("express");
const router = express.Router();
const {
  createSubcategory,
  getSubcategory,
  searchSubcategory,
  getAllSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("../contollers/subCategoriesController");

//Add a new user:
router.post("/", createSubcategory);
router.get("/:id", getSubcategory);
router.get("/", getAllSubcategories);
router.get("/search", searchSubcategory);
router.put("/:id", updateSubcategory);
router.delete("/:id", deleteSubcategory);

module.exports = router;