const mongoose = require("mongoose");

const userWishlist = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModal",
    required: true,
  },
  advert_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdvertModal",
    required: true,
  },
});

module.exports = mongoose.model("UserWishList", userWishlist);
