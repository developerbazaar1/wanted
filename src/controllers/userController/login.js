const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
} = require("../../httpStatusCode");

const UserModal = require("../../models/userModels/userModal");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await UserModal.findOne({ email });

    if (!userExists) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "User not found with this email",
      });
    }

    // Compare the hashed password using bcrypt.compare
    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Incorrect password",
      });
    }

    const token = jwt.sign({ _id: userExists._id }, process.env.JWT_SECRET);
    return res.status(OK).json({
      status: "success",
      data: {
        id: userExists._id,
        userName: userExists.userName,
        email: userExists.email,
        phoneNumber: userExists.phoneNumber,
        userProfilePic: userExists.userProfilePic,
        userQRcode: userExists.userQRcode,
      },
      token,
    });
  } catch (error) {
    console.log(error, "erro in login");
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

module.exports = { login };
