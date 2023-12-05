const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../httpStatusCode");
const validator = require("validator");

/**
 *
 * @param {userName,password,email} req
 * @param {Validator functin for user signup} res
 * @param {*} next
 * @returns
 */
const usersignupValidator = (req, res, next) => {
  try {
    console.log("inside user signup validation");
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

    // Check if userName is not empty
    if (!userName) {
      return res
        .status(BAD_REQUEST)
        .json({ status: "error", message: "User name is required" });
    }

    // If all validations pass, call next to continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any unexpected errors here
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

  try {
    if (!id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please Provide User Id!",
      });
    }

    if (oldPassword) {
      if (!newPassword) {
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "Please Provide New Password!",
        });
      }
      if (newPassword.length < 6) {
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "New Password must at least 6 Character Long!",
        });
      }
    }
    next();
  } catch (error) {
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
