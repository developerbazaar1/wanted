const mongoose = require("mongoose");

const advertModal = new mongoose.Schema(
  {
    advertProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
    },
    advertProviderPortfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
    },
    advertTitle: {
      type: String,
      required: true,
    },
    advertStatus: {
      type: Boolean,
      required: true,
      default: true,
    },
    advertCategory: {
      type: String,
      required: true,
    },
    advertLocation: {
      type: String,
      required: true,
    },
    advertPostalCode: {
      type: String,
      required: true,
    },
    advertDescription: {
      type: String,
      required: true,
    },
    whereToShow: {
      type: String,
      enum: ["liveAds", "latesOffer", "service"],
      required: true,
    },
    advertSubCategory: {
      type: String,
      required: true,
    },
    advertPrice: {
      type: Number,
      required: true,
    },
    advertImages: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdvertModal", advertModal);
