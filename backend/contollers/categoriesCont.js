// Categories controller 
const Category = require("../models/categories")

exports.createCategory =  async (req, res) => {
    // Only users with admin and manager roles can create a new category.
    try {
        const { categoryName } = req.body;
        const existingCategory = await Category.findOne({categoryName})
        if(existingCategory){
            return res.status(400).json({msg : "Category name alrady in use"})
        }
        const newCategory = new Category ({
            ...req.body,
            active : true
        })
        await newCategory.save()
        res.status(201).json({msg : "Category created successfully"})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.getAllCategories = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit
        const categories = await Category.find().skip(skip).limit(limit).select('categoryName');
        if(categories.length === 0){
            return res.status(200).json([])
        }
        res.status(200).json({categories})
    } catch (error){
        res.status(500).json({error : error.message})
    }
}

exports.searchForCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit
        const searchQuery = req.query.q || ""
        const searchFilter = {
            $or : [
                {categoryName : {$regex : searchQuery, $options : "i"}}
            ]
        }
        const categories = await  Category.find(searchFilter).skip(skip).limit(limit)
        if(categories.length === 0){
            return res.status(200).json([])
        }
        res.status(200).json({categories})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if(!category){
            return res.status(404).json({msg : "Category not found"})
        }
        res.status(200).json({category})
    } catch (error) {
        res.status(500).json({error : error.message})
    }
}

exports.updateCategoryByID = async (req, res) => {
    try{
        const categoryToUpdate = req.body
        const categoryID = req.params.id
        const existingCategory = await Category.findOne({categoryName : categoryToUpdate.categoryName})
        if(existingCategory){
            return res.status(400).json({msg : "Category name already in use"})
        }
        const category = await Category.findByIdAndUpdate(categoryID, categoryToUpdate)
        if(!category){
            res.status(400).json({error : "Category not found"})
        }
        res.status(200).json({msg : "Category updated successfully"})
    } catch(error){
        res.status(500).json({error : error.message})
    }
}

exports.deleteCategoryByID = async (req, res) => {
    // a task to update later !  Only categories that have no attached subcategories can be deleted.
    try{
        const catgoryToDelete = await Category.findByIdAndDelete(req.params.id)
        if(!catgoryToDelete){
            return res.status(404).json({msg : "Category not found !"})
        }
        res.status(200).json({msg : "Category deleted successfully"})
    } catch(error){
        res.status(500).json({error : error.message})
    }
}