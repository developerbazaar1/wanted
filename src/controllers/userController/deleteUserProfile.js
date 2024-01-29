const cloudinary = require("cloudinary");
const deleteCloudinaryImage = require("../../helpers/CloudinaryDeleteImghelper");
const { OK, INTERNAL_SERVER_ERROR } = require("../../httpStatusCode");
const userModal = require("../../models/userModels/userModal");

const deleteuserProfileController = async (req, res, next) => {
  try {
    let user = req.user;

    // Delete image from Cloudinary
    const deleteRes = await cloudinary.uploader.destroy(
      user?.userProfilePic?.imgPublicId
    );
    // console.log(deleteRes);

    // Update user profile picture information

    let updateuser = await userModal.findByIdAndUpdate(
      user._id,
      { $set: { userProfilePic: "" } }, // Corrected the syntax here
      { returnDocument: "after" }
    );

    if (updateuser) {
      return res.status(OK).json({
        status: "success",
        message: "Successfully Deleted Profile Pic",
        result: {
          userProfilePic: updateuser.userProfilePic,
          _id: updateuser._id,
          userName: updateuser.userName,
          email: updateuser.email,
          phoneNumber: updateuser.phoneNumber,
          role: updateuser.role,
          userQRcode: updateuser.userQRcode,
        },
      });
    }
  } catch (error) {
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";
    console.log(error);

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

module.exports = { deleteuserProfileController }; // Corrected the function name
