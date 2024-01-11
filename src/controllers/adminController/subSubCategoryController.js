const mongoose = require("mongoose");
const subSubCategoryModal = require("../../models/adminModel/subSubCategoryModal");
const {
  INTERNAL_SERVER_ERROR,
  CREATED,
  BAD_REQUEST,
} = require("../../httpStatusCode");

let adsubSubcategoryController = async (req, res, next) => {
  let { SubcategoryId, subsubcategoryName } = req.body;

  try {
    if (!SubcategoryId) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide category under which subcategory is added",
      });
    }

    if (!subsubcategoryName) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide categoryName",
      });
    }
    if (!mongoose.Types.ObjectId.isValid(SubcategoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let SubSubcategory = {
      subcategory_id: SubcategoryId,
      subSubCategoryName: subsubcategoryName,
    };

    let newsuSubbcategory = await subSubCategoryModal.create(SubSubcategory);
    // console.log(newsuSubbcategory);
    if (!newsuSubbcategory) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Failed to add Category try later",
      });
    } else {
      return res.status(CREATED).json({
        message: "Successfully added subcategory",
        newsuSubbcategory,
      });
    }
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = { adsubSubcategoryController };
