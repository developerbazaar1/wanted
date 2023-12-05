const mongoose = require("mongoose");

const userRewardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModal",
    required: true,
  },
  vendorName: {
    type: String,
  },
  points: {
    type: Number,
  },
  userRewards: {
    type: Number,
  },
  rewardLog: {
    rewardDescription: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    pointCollected: {
      type: Number,
    },
    rewardUsed: {
      type: Number,
    },
  },
});

module.exports = mongoose.model("UserReward", userRewardSchema);
