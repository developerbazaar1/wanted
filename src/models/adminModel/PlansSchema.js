const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  plan_name: {
    type: String,
    required: true,
  },
  plan_price: {
    type: Number,
    required: true,
  },
  no_of_ads: {
    type: Number,
    required: true,
  },
  validity: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["monthly", "quarterly", "half-yearly", "yearly"],
    required: true,
  },
});

const Plan = mongoose.model("Plan", planSchema);

module.exports = Plan;
