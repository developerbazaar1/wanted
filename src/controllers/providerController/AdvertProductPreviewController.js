const { OK, INTERNAL_SERVER_ERROR } = require("../../httpStatusCode");
const advertModal = require("../../models/providerModel/advertModal");
const productsModal = require("../../models/providerModel/productsModal");
const providerPortfolio = require("../../models/providerModel/providerPortfolio");

const AdvertProductPreviewController = async (req, res, next) => {
  //   console.log("request is coming");
  const { advert_id, advertProvider_id } = req.query;
  //   console.log(advert_id, advertProvider_id);

  try {
    const adverts = await advertModal.find({
      advertProvider_id: advertProvider_id,
    });

    const Portfolio = await providerPortfolio.findOne({
      providerId: advertProvider_id,
    });

    const product = await productsModal.find({
      productProvider_id: advertProvider_id,
    });

    let advertPreview = {
      adverts,
      Portfolio,
      product,
    };

    return res.status(OK).json({
      status: "success",
      message: "successfully get the advert detials ",
      advertPreview,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const GetOnlyAdvertPreview = async (req, res, next) => {
  //   console.log("request is coming");
  const { advert_id, advertProvider_id } = req.query;

  // console.log(advert_id, advertProvider_id);

  try {
    const adverts = await advertModal.find({
      advertProvider_id: advertProvider_id,
      _id: { $ne: advert_id },
    });

    const advert = await advertModal.findOne({
      _id: advert_id,
    });

    const Portfolio = await providerPortfolio.findOne({
      providerId: advertProvider_id,
    });

    const product = await productsModal.find({
      productProvider_id: advertProvider_id,
      advert_id: advert_id,
    });

    let advertPreview = {
      advert,
      adverts,
      Portfolio,
      product,
    };

    return res.status(OK).json({
      status: "success",
      message: "successfully get the advert detials ",
      advertPreview,
    });
  } catch (error) {
    // console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { AdvertProductPreviewController, GetOnlyAdvertPreview };
