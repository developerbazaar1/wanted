const mongoose = require("mongoose");

const productsModal = new mongoose.Schema(
  {
    productname: {
      type: String,
    },
    productProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
    },
    producProviderPortfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
    },
    productImages: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductsModal", productsModal);
