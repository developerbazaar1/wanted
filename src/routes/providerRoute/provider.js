const express = require("express");
const ProviderRouter = express.Router();
const {
  providersignupValidator,
  loginValidator,
  portfolioValidator,
  advertValidator,
  updateAdvertValidator,
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
} = require("../../controllers/providerController/advertController");

/**
 * provider auth route
 */
ProviderRouter.post("/signup", providersignupValidator, signup);
ProviderRouter.post("/login", loginValidator, login);

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
  portfolioValidator,
  createPortofolio
).get("/portfolio", auth, getPortfolio);

/**
 * @advertroute
 */

ProviderRouter.post("/addAdvert", auth, advertValidator, addAdvert)
  .get("/getAdvert", auth, getAdvert)
  .put("/updateAdvert", auth, updateAdvertValidator, updateAdvert)
  .delete("/deleteAdvert", auth, deleteAdvert);

module.exports = ProviderRouter;
