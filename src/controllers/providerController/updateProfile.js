const { encryptPassword } = require("../../config/utlis");
const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = require("../../httpStatusCode");
const ProviderUser = require("../../models/providerModel/providerUser");
const bcrypt = require("bcryptjs");

let updateProfile = async (req, res) => {
  try {
    const {
      userName,
      password,
      phoneNumber,
      newPassword,
      confirmnewPassword,
      _id,
    } = req.body;

    const providerExists = await ProviderUser.findOne({ _id: _id });

    if (!providerExists) {
      return res.status(BAD_REQUEST).json({
        success: false,
        message: "User not found",
      });
    }

    const updateObject = {};

    if (userName) {
      updateObject.userName = userName;
    }

    if (phoneNumber) {
      updateObject.phoneNumber = phoneNumber;
    }

    if (password || newPassword || confirmnewPassword) {
      if (!password || !newPassword || !confirmnewPassword) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: "Please provide all required passwords",
        });
      }

      if (newPassword !== confirmnewPassword) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: "New Password and Confirm New Password do not match",
        });
      }

      const passwordMatch = await bcrypt.compare(
        password,
        providerExists.password
      );

      if (!passwordMatch) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: "Incorrect old password",
        });
      }

      const hashPassword = await encryptPassword(newPassword);
      updateObject.password = hashPassword;
    }

    const updateProviderUser = await ProviderUser.findByIdAndUpdate(
      _id,
      { $set: updateObject },
      { returnDocument: "after" }
    );

    if (updateProviderUser) {
      return res.json({
        success: true,
        message: "Profile updated successfully",
        user: {
          id: updateProviderUser._id,
          userName: updateProviderUser.userName,
          email: updateProviderUser.email,
          phoneNumber: updateProviderUser.phoneNumber,
        },
      });
    }

    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update user profile",
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { updateProfile };
