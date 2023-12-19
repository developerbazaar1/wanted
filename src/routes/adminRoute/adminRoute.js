const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  addCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controllers/adminController/categoryController");
const {
  adSubcategoryController,
  updateSubcategoryController,
} = require("../../controllers/adminController/subcategoryController");
const { planValidator } = require("../../validations/planValidator");
const {
  addPlanController,
  updatePlanController,
  deletePlanController,
  getPlanController,
} = require("../../controllers/adminController/plansController");
const auth = require("../../config/auth");
const handeCatImgAndIconHelper = require("../../helpers/CatImgAndIconHelper");
const subcategoryImageUploaderHelper = require("../../helpers/uploadsubcategoryImgHelper");
const AdminRoutes = express.Router();
/**
 * routes to handle categroy
 */
AdminRoutes.post(
  "/addcategory",
  upload.fields([
    { name: "categoryImage", maxCount: 1 },
    { name: "categoryIcon", maxCount: 1 },
  ]),
  handeCatImgAndIconHelper("catImgAndIcon"),
  addCategoryController
)
  .put(
    "/updatecategory",
    upload.fields([
      { name: "categoryImage", maxCount: 1 },
      { name: "categoryIcon", maxCount: 1 },
    ]),
    handeCatImgAndIconHelper("catImgAndIcon"),
    updateCategoryController
  )
  .delete("/deletecategory", deleteCategoryController);
/**
 * routes to handle subcategory
 */
AdminRoutes.post(
  "/addsubcategory",
  upload.single("subcateImg"),
  subcategoryImageUploaderHelper("subCatImg"),
  adSubcategoryController
);
AdminRoutes.put(
  "/updatesubcateogry",
  upload.single("subcateImg"),
  subcategoryImageUploaderHelper("subCatImg"),
  updateSubcategoryController
);

//route to handle plans
AdminRoutes.post("/addplan", planValidator, addPlanController);
AdminRoutes.put("/updateplan", updatePlanController);
AdminRoutes.delete("/deleteplan", deletePlanController);
AdminRoutes.get("/getplan", getPlanController);

module.exports = AdminRoutes;
