const mongoose = require("mongoose");

const customerEnqModal = new mongoose.Schema(
  {
    category: {
      type: String,
    },
    userName: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    description: {
      type: String,
    },
    otherInformation: {
      type: String,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerEnqModal", customerEnqModal);
