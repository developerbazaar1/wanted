const mongoose = require("mongoose");

const providerPortfolioModal = new mongoose.Schema({
  storeName: {
    type: String,
    // required: false,
  },
  storeEmail: {
    type: String,
    // required: false,
  },

  storeCategory: {
    type: String,
    // required: false,
  },
  storeAddress: {
    type: String,
    // required: false,
  },
  storeDescription: {
    type: String,
    // required: false,
  },
  storeWebsite: {
    type: String,
    // required: false,
  },
  storeContactDetails: {
    type: String,
    // required: false,
  },
  storeSubCategory: {
    type: String,
    // required: false,
  },
  storeThumbNail: {
    type: String,
    // required: false,
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProviderUser",
    // required: true,
  },
});

module.exports = mongoose.model("ProviderPortfolio", providerPortfolioModal);
