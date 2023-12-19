const mongoose = require("mongoose");
const categroyModal = require("../../models/adminModel/category");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
} = require("../../httpStatusCode");
/**
 * @param {categoryName} req
 * @param {*category} res
 * @returns
 */

const addCategoryController = async (req, res, next) => {
  let { categoryName } = req.body;
  const ImgIcon = req.catImgAndIcon;
  // console.log("upload urls inside the", ImgIcon);
  // console.log(categoryName);
  try {
    if (!categoryName) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide categoryName",
      });
    }

    let result = await categroyModal.create({
      categoryName,
      categoryIcon: ImgIcon.categoryIcon,
      categoryImage: ImgIcon.categoryImage,
    });

    if (!result) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Failed to add Category try later",
      });
    } else {
      return res.status(CREATED).json({
        message: "Successfully added category",
        result,
      });
    }
  } catch (error) {
    // console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

/**
 *
 * @param {category_id} req
 * @param {*updateCategory} res
 * @param {*} next
 * @returns
 */

const updateCategoryController = async (req, res, next) => {
  let { categoryName, _id } = req.body;
  const ImgIcon = req?.catImgAndIcon;

  try {
    if (!_id) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide category id to be updated",
      });
    }
    if (!categoryName) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide categoryName",
      });
    }

    let result = await categroyModal.findByIdAndUpdate(
      _id,
      {
        $set: {
          categoryName: categoryName,
          categoryIcon: ImgIcon?.categoryIcon,
          categoryImage: ImgIcon?.categoryImage,
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Failed to Update Category try later",
      });
    } else {
      return res.status(CREATED).json({
        message: "Successfully Updated category",
        result,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

/**
 *
 * @param {*category_id to be delted} req
 * @param {*deleted id} res
 * @param {*} next
 * @returns
 */
const deleteCategoryController = async (req, res, next) => {
  let { _id } = req.body;

  try {
    if (!_id) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide category id to be deleted",
      });
    }

    let result = await categroyModal.findByIdAndUpdate(
      _id,
      {
        categoryName: categoryName,
      },
      (returnDocument = "after")
    );

    if (!result) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        message: "Failed to delete Category try later",
      });
    } else {
      return res.status(CREATED).json({
        message: "Successfully Deleted category",
        result,
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
