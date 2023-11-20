const express = require("express");
const {
  getCategoryController,
  getsubCategoryController,
} = require("../controllers/commonController");
const CommonRoute = express.Router();

CommonRoute.get("/getcategory", getCategoryController);
CommonRoute.get("/getsubcategory", getsubCategoryController);

module.exports = CommonRoute;
