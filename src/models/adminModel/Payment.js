const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    provider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
      required: true,
    },
    portfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
      required: true,
    },
    transaction_id: {
      type: String,
      default: "test_575239315647712",
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    advert_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdvertModal",
    },
    description: {
      type: String,
    },
    amount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentModal = mongoose.model("PaymentModal", paymentSchema);

module.exports = PaymentModal;
