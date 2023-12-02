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
    ref: 'Category', 
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("subcategories", subcategorySchema);
