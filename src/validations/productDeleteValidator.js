const { BAD_REQUEST } = require("../httpStatusCode");
const mongoose = require("mongoose");

const productDeleteValidator = async (req, res, next) => {
  try {
    const { advertId, productId } = req.query;
    console.log(advertId);
    console.log("inside the productDelete Validator");

    if (
      !mongoose.Types.ObjectId.isValid(advertId) ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide Valid Advert Id and Product Id",
        status: "error",
      });
    }

    if (!advertId || !productId) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide the Advert Id and Product Id",
        status: "error",
      });
    }

    next();
  } catch (e) {
    return res.status(BAD_REQUEST).json({
      message: "Internal Server Error!",
      status: "error",
    });
  }
};

module.exports = productDeleteValidator;
