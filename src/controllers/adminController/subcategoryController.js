const mongoose = require("mongoose");
const SubcategoryModal = require("../../models/adminModel/subCategory");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  CREATED,
} = require("../../httpStatusCode");

let adSubcategoryController = async (req, res, next) => {
  let { categoryId, subcategoryName } = req.body;

  try {
    if (!categoryId) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide category under which subcategory is added",
      });
    }

    if (!subcategoryName) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide categoryName",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let Subcategory = {
      category_id: categoryId,
      subCategoryName: subcategoryName,
    };

    let newsubcategory = await SubcategoryModal.create(Subcategory);
    console.log(newsubcategory);
    if (!newsubcategory) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Failed to add Category try later",
      });
    } else {
      return res.status(CREATED).json({
        message: "Successfully added subcategory",
        newsubcategory,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = { adSubcategoryController };
