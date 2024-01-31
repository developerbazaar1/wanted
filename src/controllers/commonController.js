const { OK, BAD_REQUEST } = require("../httpStatusCode");
const CategroyModal = require("../models/adminModel/category");
const SubcategoryModal = require("../models/adminModel/subCategory");
const SubSubCategoryModal = require("../models/adminModel/subSubCategoryModal");

const getCategoryController = async (req, res, async) => {
  try {
    let { search } = req.query;
    let query = {};
    if (search) {
      query = { categoryName: { $regex: new RegExp(search, "i") } };
    }

    console.log(search);
    await CategroyModal.find(query)
      .select({
        _id: 1,
        categoryName: 1,
        categoryImage: 1,
        categoryIcon: 1,
      })
      .then((category) => {
        res.status(OK).json({
          status: "success",
          category,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load category",
        });
      });
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const getsubCategoryController = async (req, res, async) => {
  try {
    let subCategory = await SubcategoryModal.find({})
      .select({
        _id: 1,
        category_id: 1,
        subCategoryName: 1,
        subCatImg: 1,
      })
      .then((subcategory) => {
        res.status(OK).json({
          status: "success",
          subcategory,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load Sub category",
        });
      });
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
const getsubSubCategoryController = async (req, res, async) => {
  try {
    let subCategory = await SubSubCategoryModal.find({})
      .then((subSubCategory) => {
        res.status(OK).json({
          status: "success",
          subSubCategory,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load Sub category",
        });
      });

    // console.log(subCategory);
    // console.log(SubSubCategoryModal);
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getCategoryController,
  getsubCategoryController,
  getsubSubCategoryController,
};
