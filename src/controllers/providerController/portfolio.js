const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
} = require("../../httpStatusCode");
const providerPortfolio = require("../../models/providerModel/providerPortfolio");
const ProviderPortfolio = require("../../models/providerModel/providerPortfolio");

const createPortofolio = async (req, res, next) => {
  const {
    storeName,
    storeEmail,
    storeCategory,
    storeAddress,
    storeDescription,
    storeWebsite,
    storeContactDetails,
    storeSubCategory,
    storeThumbNail,
    _id,
  } = req.body;

  try {
    const providerPortfolio = await ProviderPortfolio.findOneAndUpdate(
      { providerId: _id },

      {
        storeName,
        storeEmail,
        storeCategory,
        storeAddress,
        storeDescription,
        storeWebsite,
        storeContactDetails,
        storeSubCategory,
        storeThumbNail,
      },
      { returnDocument: "after" }
    );

    if (!providerPortfolio) {
      return res
        .status(CONFLICT)
        .json({ message: "Failed to create portfolio" });
    } else {
      return res.status(OK).json(providerPortfolio);
    }
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {*provider_id} req
 * @returns {*provider_portfolio}
 */

const getPortfolio = async (req, res, next) => {
  const { _id } = req.query;
  console.log(_id);
  try {
    const providerPortfolio = await ProviderPortfolio.findOne({
      providerId: _id,
    });
    console.log(providerPortfolio);
    if (providerPortfolio) {
      return res.status(OK).json({
        providerPortfolio,
        message: "Success",
      });
    } else {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Server Error",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { createPortofolio, getPortfolio };
