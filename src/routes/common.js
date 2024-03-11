const express = require("express");
const {
  getCategoryController,
  getsubCategoryController,
  getsubSubCategoryController,
  getTypeAheadController,
  getQueryTypeAheadController,
} = require("../controllers/commonController");
const CommonRoute = express.Router();

CommonRoute.get("/getcategory", getCategoryController);
CommonRoute.get("/getsubcategory", getsubCategoryController);
CommonRoute.get("/getsubSubcategory", getsubSubCategoryController);
CommonRoute.get("/get-predection", getTypeAheadController);
CommonRoute.get("/get-query-predection", getQueryTypeAheadController);

module.exports = CommonRoute;
