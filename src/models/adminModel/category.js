const mongoose = require("mongoose");

const categoryScehma = new mongoose.Schema(
  {
    categoryName: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryModal", categoryScehma);
