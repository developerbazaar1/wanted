const mongoose = require("mongoose");

const advertModal = new mongoose.Schema(
  {
    advertProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
    },
    advertProviderPortfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
    },
    advertTitle: {
      type: String,
      required: true,
    },
    advertVisibility: {
      type: Boolean,
      required: true,
      default: false,
    },
    advertStatus: {
      type: String,
      required: true,
      enum: ["active", "expired"],
      default: "active",
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
    advertExpiryDate: {
      type: Date,
    },
    subscription_plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubscriptionModal",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdvertModal", advertModal);
