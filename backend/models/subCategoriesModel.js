// const mongoose = require("mongoose");

// const subcategorySchema = mongoose.Schema({
//   subcategoryName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   categoryID: {
//     type: mongoose.Schema.Types.ObjectId, 
//     required: true,
//     ref: 'Category'
//   },
//   active: {
//     type: Boolean,
//     default: true,
//   },
// });
// module.exports = mongoose.model("subcategories", subcategorySchema);

const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  subcategoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Replace with the actual name of your Category model
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("subcategories", subcategorySchema);
