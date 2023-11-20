const express = require("express");
const {
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controllers/adminController/categoryController");
const {
  adSubcategoryController,
} = require("../../controllers/adminController/subcategoryController");
const { planValidator } = require("../../validations/planValidator");
const {
  addPlanController,
  updatePlanController,
  deletePlanController,
  getPlanController,
} = require("../../controllers/adminController/plansController");
const AdminRoutes = express.Router();
/**
 * routes to handle categroy
 */
AdminRoutes.post("/addcategory", addCategoryController)
  .put("/updatecategory", updateCategoryController)
  .delete("/deletecategory", deleteCategoryController);
/**
 * routes to handle subcategory
 */
AdminRoutes.post("/addsubcategory", adSubcategoryController);

//route to handle plans
AdminRoutes.post("/addplan", planValidator, addPlanController);
AdminRoutes.put("/updateplan", updatePlanController);
AdminRoutes.delete("/deleteplan", deletePlanController);
AdminRoutes.get("/getplan", getPlanController);

module.exports = AdminRoutes;
