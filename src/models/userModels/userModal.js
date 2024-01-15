const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  userProfilePic: {
    imgUrl: {
      type: String,
    },
    imgPublicId: {
      type: String,
    },
  },
  userQRcode: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    required: true,
  },
});

module.exports = mongoose.model("UserModal", userSchema);
