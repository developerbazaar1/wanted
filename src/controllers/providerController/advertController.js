const mongoose = require("mongoose");
const AdvertModal = require("../../models/providerModel/advertModal");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
} = require("../../httpStatusCode");

/**
 *
 * @body {*provider_portfoloio_id and provider_id} req
 * @param {*} res
 * @param {*} next
 * @returns return the created ads
 */
const addAdvert = async (req, res, next) => {
  const {
    advertTitle,
    whereToShow,
    advertCategory,
    advertSubCategory,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    advertImages,
    provider_portfolio_id,
    provider_id,
  } = req.body;
  let { advertImageUrls } = req;
  try {
    let advertCreated = await AdvertModal.create({
      advertTitle,
      whereToShow,
      advertCategory,
      advertSubCategory,
      advertLocation,
      advertPrice,
      advertDescription,
      advertPostalCode,
      advertImages: advertImageUrls,
      advertProviderPortfolio_id: provider_portfolio_id,
      advertProvider_id: provider_id,
    });

    if (!advertCreated) {
      return res.status(CONFLICT).json({
        status: "error",
        message: "Failed to create advertisement",
      });
    } else {
      return res.status(CREATED).json({
        status: "success",
        data: advertCreated,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * get all provider ads
 * @param {*provider_id} req
 * @param {*provider ads} res
 * @param {*} next
 * @returns {*providerads}
 */

const getAdvert = async (req, res, next) => {
  const { _id } = req.query;

  try {
    const adverts = await AdvertModal.find({ advertProvider_id: _id });

    if (adverts.length === 0) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "No advertisements found for the provider",
      });
    }

    return res.status(OK).json({
      adverts,
      status: "success",
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * @param {advert_id , provider_id }
 */

const updateAdvert = async (req, res, next) => {
  console.log("request in advert updage");
  let { _id, provider_id } = req.body;
  // console.log(req.advertImageUrls);
  // console.log(_id, provider_id);
  let {
    advertTitle,
    whereToShow,
    advertCategory,
    advertSubCategory,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    advertImages,
  } = req.body;

  // ...
  console.log(advertImages);

  let updateValue = {
    advertTitle,
    whereToShow,
    advertCategory,
    advertSubCategory,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    advertImages,
  };

  if (req.advertImageUrls !== undefined && req.advertImageUrls.length > 0) {
    updateValue.advertImages = req.advertImageUrls;
  }

  console.log(updateValue, "update value");

  // ...

  // console.log(updateValue);

  let filter = {
    _id: _id,
    advertProvider_id: provider_id,
  };
  try {
    let Updateadvert = await AdvertModal.findOneAndUpdate(
      filter,
      { $set: updateValue },
      {
        returnDocument: "after",
      }
    );

    // console.log(Updateadvert);
    if (!Updateadvert) {
      return res.status(400).json({
        status: "error",
        message: "Something went wrong; please try again later.",
      });
    } else {
      return res.status(OK).json({
        status: "success",
        Updateadvert,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

/**
 * route to delete the advert.
 *@param {*advert_id , provider id}

 */

const deleteAdvert = async (req, res, next) => {
  try {
    const { _id, provider_id } = req.body;

    // console.log(_id, provider_id);

    if (!_id || !provider_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Advert ID or Provider ID is missing",
      });
    }

    const filter = {
      _id,
      advertProvider_id: provider_id,
    };

    const deletedAdvert = await AdvertModal.findOneAndDelete(filter);

    if (deletedAdvert) {
      return res.status(OK).json({
        status: "success",
        message: "Advertisement deleted successfully",
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Advertisement not found or already deleted",
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { addAdvert, getAdvert, updateAdvert, deleteAdvert };
