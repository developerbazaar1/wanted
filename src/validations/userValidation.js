const { encryptPassword } = require("../config/utlis");
const bcrypt = require("bcryptjs");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../httpStatusCode");
const validator = require("validator");
const userModal = require("../models/userModels/userModal");

/**
 *
 * @param {userName,password,email} req
 * @param {Validator functin for user signup} res
 * @param {*} next
 * @returns
 */
const usersignupValidator = (req, res, next) => {
  try {
    // console.log("inside user signup validation");
    const { email, password, userName } = req.body;
    if (!email || !userName || !password) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Email, user name, and password are required",
      });
    }

    // Check if email is a valid email address using validator
    if (!validator.isEmail(email)) {
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "Invalid email address" });
    }

    // Check if password meets your criteria (e.g., minimum length)
    if (password.length < 6) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Password must be at least 6 characters long",
      });
    }

    if (!userName) {
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "User name is required" });
    }

    next();
  } catch (error) {
    // console.log(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ status: "error", message: "Internal server error" });
  }
};

/**
 *
 * @param {password,email} req
 * @param {Validator functin for user signup} res
 * @param {*} next
 * @returns
 */
const userLoginValidation = async (req, res, next) => {
  console.log("request in user login validation");
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Email,  and Password are required",
      });
    }
    if (password.length < 6) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Password must be at least 8 characters long",
      });
    }
    // Check if email is a valid email address using validator
    if (!validator.isEmail(email)) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Invalid email address",
      });
    }
    // console.log("in login");

    next();
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error!",
    });
  }
};

const updateProfileValidator = async (req, res, next) => {
  let { oldPassword, newPassword, id } = req.body;
  let user = req.user;
  // console.log(user);

  try {
    if (!id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please Provide User Id!",
      });
    }

    if (oldPassword || newPassword) {
      if (!newPassword) {
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "Please Provide New Password!",
        });
      } else if (newPassword.length < 6) {
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "New Password must contain at least 6 digit!",
        });
      } else if (!oldPassword) {
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "Please Provide Old Password!",
        });
      }

      const userExist = await userModal.findOne({
        _id: user._id,
      });

      if (!userExist) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: "User not found",
        });
      }

      const passwordMatch = await bcrypt.compare(
        oldPassword,
        userExist.password
      );

      if (!passwordMatch) {
        return res.status(BAD_REQUEST).json({
          success: false,
          message: "Incorrect old password",
        });
      }

      const hashPassword = await encryptPassword(newPassword);
      req.body.newPassword = hashPassword;
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error!",
    });
  }
};

module.exports = {
  usersignupValidator,
  userLoginValidation,
  updateProfileValidator,
};
