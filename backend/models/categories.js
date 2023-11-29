// Category model

const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
    categoryName : {type : String, required : true},
    active : {type : Boolean},
})

const Category = mongoose.model("Category", categorySchema)

module.exports = Category