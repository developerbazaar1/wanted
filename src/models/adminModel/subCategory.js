const mongoose = require("mongoose");

const subcategoryScehma = new mongoose.Schema(
  {
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModal",
    },
    subCategoryName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubcategoryModal", subcategoryScehma);
