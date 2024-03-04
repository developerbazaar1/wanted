const mongoose = require("mongoose");

const advertModal = new mongoose.Schema({
  advertStoreName: {
    type: String,
    // required: false,
    index: true,
  },
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
    index: true,
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
    // required: true,
  },
  advertLocation: {
    type: String,
    required: true,
    index: true,
  },
  advertPostalCode: {
    type: String,
    required: true,
    index: true,
  },
  advertDescription: {
    type: String,
    required: true,
    index: true,
  },
  whereToShow: {
    type: String,
    enum: ["Live Ads", "Latest Offers", "Services"],
    required: true,
  },
  advertSubCategory: {
    type: String,
    // required: true,
  },
  advertPrice: {
    type: Number,
    required: true,
  },
  advertOfferPrice: {
    type: Number,
  },
  advertImage: {
    imgUrl: {
      type: String,
    },
    imgPublicId: {
      type: String,
    },
  },
  products: [
    {
      productTitle: {
        type: String,
        required: true,
        index: true,
      },

      productName: {
        type: String,
        required: true,
        index: true,
      },
      product_id: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        // required: true,
        index: true,
      },
      subcategory: {
        type: String,
        // required: true,
        index: true,
      },
      subsubcategory: {
        type: String,
        index: true,
      },
      productImg: [
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
  ],
  advertExpiryDate: {
    type: Date,
  },
  subscription_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubscriptionModal",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

advertModal.index({
  advertTitle: 1,
  advertLocation: 1,
  advertPostalCode: 1,
  "products.productTitle": 1,
  "products.productName": 1,
  "products.product_id": 1,
  "products.productPrice": 1,
  "products.category": 1,
  "products.subcategory": 1,
  "products.subsubcategory": 1,
});

module.exports = mongoose.model("AdvertModal", advertModal);