const subCategoriesModel = require("../models/subCategoriesModel");
const SubcategoryModel = require("../models/subCategoriesModel");

const createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, categoryID, active } = req.body;
    if (!subcategoryName) {
      return res.status(400).json({ message: "Subcategory name is missing" });
    }
    const existingSubcategory = await SubcategoryModel.findOne({
      subcategoryName,
    });
    if (existingSubcategory) {
      return res.status(400).json({ message: "Subcategory already exists" });
    }
    const newSubcategory = new SubcategoryModel({
      subcategoryName,
      categoryID,
      active,
    });

    const savedSubcategory = await newSubcategory.save();

    res
    .status(201)
    .json({ message: "Subcategory created successfully", savedSubcategory });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message});
  }
};

const paginateResults = (req) => {
  const pageNumber = !isNaN(req.query.page) ? parseInt(req.query.page) : 1;

  if (pageNumber < 1) {
    console.log("Invalid Page Number");
  }

  const itemsPerPage = 10;
  const skipCount = (pageNumber - 1) * itemsPerPage;

  return {
    itemsPerPage,
    skipCount,
  };
};

const getAllSubcategories = async (req, res) => {
  
  try {
    const subcategories = await subCategoriesModel.find();
    if(!subcategories){
      return res.status(404).json({msg : "subCategories not found"})
    }
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const searchSubcategory = async (req, res) => {
  try {
    const { itemsPerPage, skipCount } = paginateResults(req);
    const data = [];
    const queryObject = req.query.subcategory_name;

    const subcategories = await SubcategoryModel.find({
      subcategory_name: new RegExp(`^${queryObject}`, "i"),
    })
      .sort({ subcategory_name: -1 })
      .limit(itemsPerPage)
      .skip(skipCount)
      .populate("category_id", "category_name")
      .exec();

    if (subcategories.length === 0) {
      return res.status(404).json({ message: "No Subcategories found." });
    }
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while searching for subcategories.",
    });
  }
};

const getSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategory = await SubcategoryModel.findById(subcategoryId).populate(
      "category_id",
      "category_name"
    );

    if (!subcategory) {
      return res
        .status(404)
        .json({ message: "No Subcategory found with the provided Id" });
    }

    res.status(200).json({ status: 200, data: { subcategory } });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Subcategory" });
  }
};

const updateSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const subcategoryUpdate = req.body;

    const isSubcategoryNameExist = await SubcategoryModel.findOne({
      _id: { $ne: subcategoryId },
      subcategory_name: subcategoryUpdate.subcategory_name,
    });

    if (isSubcategoryNameExist) {
      return res
        .status(400)
        .json({ message: "Subcategory name already exists" });
    }

    const subcategory = await SubcategoryModel.findByIdAndUpdate(
      subcategoryId,
      subcategoryUpdate
    );

    if (subcategory) {
      return res
        .status(200)
        .json({ status: 200, message: "Subcategory updated successfully" });
    } else {
      return res.status(404).json({ message: "Invalid subcategory id" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error updating subcategory" });
  }
};

const deleteSubcategory = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    // Check for associated Products (you can uncomment this part)
    // const productCount = await ProductModel.countDocuments({ subcategory_id: subcategoryId });

    // if (productCount > 0) {
    //     return res.status(400).send(`This Subcategory has ${productCount} associated Products and cannot be deleted.`);
    // }

    await SubcategoryModel.findByIdAndDelete(subcategoryId);
    res.status(200).json("Subcategory deleted successfully");
  } catch (error) {
    res.status(404).json("Invalid Subcategory id");
  }
};

module.exports = {
  createSubcategory,
  getAllSubcategories,
  searchSubcategory,
  getSubcategory,
  updateSubcategory,
  deleteSubcategory,
};