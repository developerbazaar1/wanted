const express = require("express");
const UserRoutes = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const allowedFormats = ["png", "jpg", "jpeg", "jfif", "webp", "avif"];

const fileFilter = (req, file, cb) => {
  // Check if the file format is allowed
  const fileExt = file.originalname.split(".").pop().toLowerCase();
  if (allowedFormats.includes(fileExt)) {
    // Allow the upload
    cb(null, true);
  } else {
    // Reject the upload with an error message
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
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
const {
  liveAndLatestOfferController,
  GetAdvertDetails,
} = require("../../controllers/userController/liveAdsLatesController");
const {
  SerachAdvertAndProductController,
} = require("../../controllers/userController/SerachController");
const {
  udateProfileController,
} = require("../../controllers/userController/udateProfileController");
const userAuth = require("../../config/userAuth");
const { handleUpload } = require("../../Utils/UploadMiddleWare");
const {
  deleteuserProfileController,
} = require("../../controllers/userController/deleteUserProfile");
const {
  GetUserWishList,
  updateWishList,
} = require("../../controllers/userController/wishlistController");
const {
  servicesController,
  servicesSubController,
  getSingleSubservice,
} = require("../../controllers/userController/ServicesController");

/**
 * user auth route for signup
 */
UserRoutes.post("/signup", usersignupValidator, userSignupController);
UserRoutes.post("/login", userLoginValidation, userLoginController);

//Route to update Profile picture
UserRoutes.put(
  "/updateprofile",
  userAuth,
  handleUpload,
  updateProfileValidator,
  profileImageHelper("profilePic"),
  udateProfileController
);
UserRoutes.delete("/deleteprofile", userAuth, deleteuserProfileController);

UserRoutes.get("/getads", liveAndLatestOfferController);
UserRoutes.get("/getservice", servicesController);
UserRoutes.get("/getSubSservice", servicesSubController);
UserRoutes.get("/getsingsubservideadvert/:_id", getSingleSubservice);
UserRoutes.get("/getads/details", GetAdvertDetails);
UserRoutes.get("/serach", SerachAdvertAndProductController);
UserRoutes.get("/wishlist", userAuth, GetUserWishList);
UserRoutes.put("/wishlist/:advertId", userAuth, updateWishList);

module.exports = UserRoutes;
