const mongoose = require("mongoose");

const providerPortfolioModal = new mongoose.Schema({
  storeName: {
    type: String,
    // required: false,
    index: true,
  },
  storeEmail: {
    type: String,
    // required: false,
  },

  storeCategory: {
    type: String,
    // required: false,
    index: true,
  },
  storeAddress: {
    type: String,
    // required: false,
    index: true,
  },
  storeDescription: {
    type: String,
    // required: false,
    index: true,
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
    index: true,
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
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

providerPortfolioModal.index({
  storeName: 1,
  storeCategory: 1,
  storeSubCategory: 1,
  storeAddress: 1,
  storeDescription: 1,
});

module.exports = mongoose.model("ProviderPortfolio", providerPortfolioModal);
