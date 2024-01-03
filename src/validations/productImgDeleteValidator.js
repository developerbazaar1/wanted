const { default: mongoose } = require("mongoose");
const { BAD_REQUEST } = require("../httpStatusCode");

const productImgDeleteValidator = async (req, res, next) => {
  try {
    const { advertId, productId, imageId } = req.query;

    if (
      !mongoose.Types.ObjectId.isValid(advertId) ||
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(imageId)
    ) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide Valid Advert Id and Product Id and Image Id",
        status: "error",
      });
    }

    if (!advertId || !productId || !imageId) {
      return res.status(BAD_REQUEST).json({
        message: "Please Provide the Advert Id ,Image Id and Product Id",
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

module.exports = productImgDeleteValidator;
