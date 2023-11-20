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
    type: String,
  },
  role: {
    type: String,
    default: "Admin",
  },
});

module.exports = mongoose.model("UserModal", userSchema);
