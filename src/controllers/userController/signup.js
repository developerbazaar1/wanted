const { encryptPassword } = require("../../config/utlis");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require("../../httpStatusCode");
const jwt = require("jsonwebtoken");
const UserModal = require("../../models/userModels/userModal");

const signup = async (req, res) => {
  const { email, password, userName } = req.body;

  try {
    const userExists = await UserModal.findOne({ email });

    if (userExists) {
      return res
        .status(BAD_REQUEST)
        .json("User already exits with this email address!");
    }

    const hashPassword = await encryptPassword(password);

    const user = await UserModal.create({
      userName,
      email,
      password: hashPassword,
      phoneNumber: "",
      userProfilePic: "",
      userQRcode: "",
    });

    if (!user) {
      return res
        .status(INTERNAL_SERVER_ERROR)
        .json({ error: "Failed to create a user" });
    }

    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      return res.status(CREATED).json({
        data: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userProfilePic: user.userProfilePic,
          userQRcode: user.userQRcode,
        },
        token,
      });
    }
  } catch (error) {
    console.log(error, "in provider signup router");
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

module.exports = { signup };
