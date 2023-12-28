const express = require("express");
const multer = require("multer");
const ProviderRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  advertImgAndProductHelper,
} = require("../../helpers/advertImagehelper");
const {
  providersignupValidator,
  loginValidator,
  portfolioValidator,
  advertValidator,
  updateAdvertValidator,
  postAdvertAgainValidator,
} = require("../../controllers/providerController/validator");
const { login } = require("../../controllers/providerController/login");
const { signup } = require("../../controllers/providerController/signup");
const {
  createPortofolio,
  getPortfolio,
} = require("../../controllers/providerController/portfolio");
const auth = require("../../config/auth");
const {
  addAdvert,
  getAdvert,
  updateAdvert,
  deleteAdvert,
  postAgainAdvert,
  AddAdvert,
} = require("../../controllers/providerController/advertController");
const {
  updateProfile,
} = require("../../controllers/providerController/updateProfile");
const {
  addProductController,
  getProductController,
  deleteProductController,
  updateProductController,
  updateProductImageController,
} = require("../../controllers/providerController/productController");
const { advertUpdateImg } = require("../../helpers/advertUpdateImg");
const { handlePortfolioImg } = require("../../helpers/handlePortfolioImg");
const { productUpdateImg } = require("../../helpers/productUpdateImageHelper");
const subscriptionValidator = require("../../validations/subscriptionValidator");
const {
  getProviderSubscription,
  addsubscriptionController,
} = require("../../controllers/adminController/subscriptionController");
const fetchedPaymentController = require("../../controllers/providerController/fetchePayment");

const {
  AdvertProductPreviewController,
  GetOnlyAdvertPreview,
} = require("../../controllers/providerController/AdvertProductPreviewController");
require("../../validations/subscriptionValidator");

/**
 * provider auth route
 */
ProviderRouter.post("/signup", providersignupValidator, signup);
ProviderRouter.post("/login", loginValidator, login);
ProviderRouter.put("/update/profile", auth, updateProfile);

/**
 * update provider account route
 */

// ProviderRouter.put("/update/profile", auth, updateAccound);

/**
 * @provider Portfolio route
 */
ProviderRouter.put(
  "/portfolio",
  auth,
  upload.single("img"),
  portfolioValidator,
  handlePortfolioImg("portfolioImageUrls"),
  createPortofolio
).get("/portfolio", auth, getPortfolio);

/**
 * @advertroute routes
 */

ProviderRouter.post(
  "/addAdvert",
  auth,
  upload.fields([
    { name: "mainImg", maxCount: 1 },
    { name: "productImg1", maxCount: 3 },
    { name: "productImg2", maxCount: 3 },
    { name: "productImg3", maxCount: 3 },
  ]),
  advertValidator,
  advertImgAndProductHelper,
  AddAdvert
)
  .get("/getAdvert", auth, getAdvert)
  .put(
    "/updateAdvert",
    auth,
    upload.array("img"),
    updateAdvertValidator,
    advertUpdateImg("advertImageUrls"),
    updateAdvert
  )
  .delete("/deleteAdvert", auth, deleteAdvert)
  .put(
    "/postagainadvert",
    auth,
    upload.array("img"),
    postAdvertAgainValidator,
    advertUpdateImg("advertImageUrls"),
    postAgainAdvert
  );
// .delete("/deleteAdvertImg/:id/images/:imgId", auth, deleteAdvertImage);

/**
 * @products routes
 */

ProviderRouter.post("/addproduct", auth, addProductController)
  .get("/getproduct", auth, getProductController)
  .put("/updateproduct", auth, updateProductController)
  .delete("/deleteproduct", auth, deleteProductController)
  .put(
    "/addimages",
    auth,
    upload.array("img"),
    productUpdateImg("productImages"),
    updateProductImageController
  );

// This route is used to add created user subscription
ProviderRouter.post(
  "/addsubscription",
  auth,
  subscriptionValidator,
  addsubscriptionController
);

//this route is used to fetched the vendor-payment- hisotory
/**
 * req body (provider_id, portfolio_id)
 */
ProviderRouter.get("/paymenthistory", auth, fetchedPaymentController);

// This route fetch only active subscription of user
ProviderRouter.get("/getactivesubscription", auth, getProviderSubscription);
//this route get all advert , all product and portfolo
ProviderRouter.get("/advert-preview", auth, AdvertProductPreviewController);

//this route get all advert , all product , portfolo and particular advert
ProviderRouter.get("/getonly-AdvertPreview", auth, GetOnlyAdvertPreview);

module.exports = ProviderRouter;
