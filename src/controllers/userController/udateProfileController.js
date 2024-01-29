const {
  OK,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
} = require("../../httpStatusCode");
const userModal = require("../../models/userModels/userModal");

const udateProfileController = async (req, res, next) => {
  let { newPassword, userName, phoneNumber } = req.body;
  let ProfileUrl = req.urls;

  let updateFields = {
    userName,
    phoneNumber: phoneNumber,
    userProfilePic: ProfileUrl,
  };

  if (newPassword) {
    updateFields.password = newPassword;
  }

  try {
    const UpdateUser = await userModal.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { returnDocument: "after" }
    );

    if (!UpdateUser) {
      return res.status(FORBIDDEN).json({
        message: "Error while Updating the profile Try later!",
        status: "Error",
      });
    } else {
      return res.status(OK).json({
        message: "successfully Update the Profile!",
        data: {
          userProfilePic: UpdateUser.userProfilePic,
          _id: UpdateUser._id,
          userName: UpdateUser.userName,
          email: UpdateUser.email,
          phoneNumber: UpdateUser.phoneNumber,
          role: UpdateUser.role,
          userQRcode: UpdateUser.userQRcode,
        },
        status: "sucess",
      });
    }
  } catch (error) {
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

module.exports = { udateProfileController };
