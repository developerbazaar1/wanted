const mongoose = require("mongoose");

const customerEnqModal = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enqExpiryDate: {
    type: Date,
    default: function () {
      return new Date(this.createdAt.getTime() + 4 * 24 * 60 * 60 * 1000);
    },
  },
});

module.exports = mongoose.model("CustomerEnqModal", customerEnqModal);
