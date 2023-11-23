const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    plan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
      required: true,
    },
    provider_portfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    numberof_ads: {
      type: String,
      required: true,
    },
    remainingAds: {
      type: String,
      required: true,
    },
    subscriptionPlanName: {
      type: String,
      required: true,
    },

    subscriptionPlanPrice: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const SubscriptionModal = mongoose.model(
  "SubscriptionModal",
  subscriptionSchema
);

module.exports = SubscriptionModal;
