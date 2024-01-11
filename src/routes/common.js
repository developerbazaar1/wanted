const express = require("express");
const {
  getCategoryController,
  getsubCategoryController,
  getsubSubCategoryController,
} = require("../controllers/commonController");
const CommonRoute = express.Router();

CommonRoute.get("/getcategory", getCategoryController);
CommonRoute.get("/getsubcategory", getsubCategoryController);
CommonRoute.get("/getsubSubcategory", getsubSubCategoryController);

module.exports = CommonRoute;
