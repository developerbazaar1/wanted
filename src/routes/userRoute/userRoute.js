const express = require("express");
const UserRoutes = express.Router();
const auth = require("../../config/auth");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  userSignupController,
} = require("../../controllers/userController/signup");
const {
  userLoginController,
} = require("../../controllers/userController/login");
const {
  usersignupValidator,
  userLoginValidation,
  updateProfileValidator,
} = require("../../validations/userValidation");
const { profileImageHelper } = require("../../helpers/userHelper");

/**
 * user auth route for signup
 */
UserRoutes.post("/signup", usersignupValidator, userSignupController);
UserRoutes.post("/login", userLoginValidation, userLoginController);

//Route to update Profile picture
UserRoutes.put(
  "/updateprofile",
  auth,
  upload.single("img"),
  updateProfileValidator,
  profileImageHelper("profilePic")
);

UserRoutes.get("/service");

module.exports = UserRoutes;
