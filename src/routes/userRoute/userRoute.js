const express = require("express");
const UserRoutes = express.Router();
const {
  providersignupValidator,
  loginValidator,
  portfolioValidator,
  advertValidator,
} = require("../../controllers/providerController/validator");

const auth = require("../../config/auth");
const { signup } = require("../../controllers/userController/signup");
const { login } = require("../../controllers/userController/login");

/**
 * @userSignupRoute
 * @param {}
 */
UserRoutes.post("/signup", providersignupValidator, signup);
UserRoutes.post("/login", loginValidator, login);

module.exports = UserRoutes;
