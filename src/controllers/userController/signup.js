const { encryptPassword } = require("../../config/utlis");
const { v4: uuidv4 } = require("uuid");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require("../../httpStatusCode");
const jwt = require("jsonwebtoken");
const UserModal = require("../../models/userModels/userModal");

const userSignupController = async (req, res) => {
  const { email, password, userName } = req.body;
  // console.log("inside user controller");
  try {
    const userExists = await UserModal.findOne({ email });

    if (userExists) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "User already exits with this email address!",
      });
    }
    const userQRcode = generateUniqueCode();
    console.log("user qr code", userQRcode);
    const hashPassword = await encryptPassword(password);

    const user = await UserModal.create({
      userName,
      email,
      password: hashPassword,
      phoneNumber: "",
      userProfilePic: "",
      userQRcode: userQRcode,
      role: "user",
    });

    if (!user) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ status: "error", message: "Failed to create a user" });
    }

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.status(CREATED).json({
        status: "success",
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userProfilePic: user.userProfilePic,
          userQRcode: user.userQRcode,
          role: user.role,
        },
        token,
      });
    }
  } catch (error) {
    // console.log(error, "in user signup router");
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

function generateUniqueCode() {
  const uuid = uuidv4();

  const numericCode = uuid.replace(/\D/g, "").slice(0, 10);

  return numericCode.padStart(10, "0");
}

module.exports = { userSignupController };