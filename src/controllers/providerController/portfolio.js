const {
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  OK,
  CONFLICT,
} = require("../../httpStatusCode");
const providerPortfolio = require("../../models/providerModel/providerPortfolio");
const ProviderPortfolio = require("../../models/providerModel/providerPortfolio");

const createPortofolio = async (req, res, next) => {
  console.log(req.portfolioImageUrls);

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

  let updateData = {
    storeName,
    storeEmail,
    storeCategory,
    storeAddress,
    storeDescription,
    storeWebsite,
    storeContactDetails,
    storeSubCategory,
    storeThumbNail,
    isCompleted: true,
  };

  if (
    req.portfolioImageUrls !== undefined &&
    req.portfolioImageUrls.length > 0
  ) {
    updateData.storeThumbNail = req.portfolioImageUrls;
  }

  try {
    const providerPortfolio = await ProviderPortfolio.findOneAndUpdate(
      { providerId: _id },
      updateData,
      { returnDocument: "after" }
    );

    if (!providerPortfolio) {
      return res
        .status(CONFLICT)
        .json({ message: "Failed to create portfolio" });
    } else {
      return res.status(OK).json({
        message: "portfolio updated successfully!",
        data: providerPortfolio,
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
