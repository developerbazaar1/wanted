const mongoose = require("mongoose");

const subSubcategoryScehma = new mongoose.Schema({
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubcategoryModal",
  },
  subSubCategoryName: {
    type: String,
  },
});

module.exports = mongoose.model("subSubCategory", subSubcategoryScehma);
