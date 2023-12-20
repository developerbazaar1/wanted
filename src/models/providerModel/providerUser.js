const mongoose = require("mongoose");

const providerModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "vendor", "admin"],
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProviderUser", providerModel);
