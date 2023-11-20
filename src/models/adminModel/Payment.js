const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
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
});

const PaymentModal = mongoose.model("PaymentModal", paymentSchema);

module.exports = PaymentModal;
