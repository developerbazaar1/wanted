const mongoose = require("mongoose");

const productsModal = new mongoose.Schema(
  {
    productname: {
      type: String,
    },
    productPrice: {
      type: Number,
    },
    productProvider_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderUser",
    },
    producProviderPortfolio_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProviderPortfolio",
    },
    advert_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdvertModal",
    },
    productImages: [
      {
        imgUrl: {
          type: String,
        },
        imgPublicId: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductsModal", productsModal);
