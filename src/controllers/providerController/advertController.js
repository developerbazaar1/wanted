const mongoose = require("mongoose");
const AdvertModal = require("../../models/providerModel/advertModal");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
  SEE_OTHER,
} = require("../../httpStatusCode");
const SubscriptionModal = require("../../models/providerModel/ProviderSubscriptionModal");
const providerPortfolio = require("../../models/providerModel/providerPortfolio");

/**
 *
 * @body {*provider_portfoloio_id and provider_id} req
 * @param {*} res
 * @param {*} next
 * @returns return the created ads
 */

const AddAdvert = async (req, res, next) => {
  try {
    let {
      advertPrice,
      offerPrice,
      advertProviderPortfolio_id,
      advertProvider_id,
      advertTitle,
      advertLocation,
      advertPostalCode,
      advertDescription,
      whereToShow,
      advertOfferPrice,
      subscription_plan_id,
      product,
    } = req.body;

    const subscription = await SubscriptionModal.findById(subscription_plan_id);

    if (!subscription) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Subscription not found",
      });
    }

    // Check if there are remaining ads
    if (subscription.remainingAds <= 0) {
      return res.status(CONFLICT).json({
        status: "error",
        message: "No remaining ads in the subscription",
      });
    }
    if (req.body.portfolioImageCheckbox === "true") {
      let portfolio = await providerPortfolio.findById(
        advertProviderPortfolio_id
      );

      if (!portfolio) {
        return res
          .status(BAD_REQUEST)
          .json({ message: "Something Went Wrong!" });
      }
      req["fileUrls"].mainImg = { imgUrl: portfolio.storeThumbNail };
    }

    if (product) {
      for (let i = 0; i < product.length; i++) {
        let productImgKey = `productImg${i + 1}`;
        let productImgArray = req.fileUrls[productImgKey];
        product[i].productImg = productImgArray;
      }
    }

    // console.log(product);

    const UpdateValue = {
      advertPrice,
      advertProviderPortfolio_id,
      advertProvider_id,
      advertTitle,
      advertLocation,
      advertPostalCode,
      advertDescription,
      whereToShow,
      advertOfferPrice,
      subscription_plan_id,
      advertImage: req.fileUrls.mainImg,
      products: product,
      advertExpiryDate: subscription.expiryDate,
    };

    // console.log("update Value", UpdateValue);

    // return res.json("sucess");

    AdvertModal.create(UpdateValue)
      .then(async (result) => {
        subscription.remainingAds -= 1;
        await subscription.save();
        return res.status(CREATED).json({
          status: "success",
          message: "Successfully Created Advert",
          data: result,
        });
      })
      .catch((e) => {
        console.error("Advert Creation Error:", e);
        return res.status(500).json({
          status: "error",
          message: "Internal Server Error during Advert Creation",
        });
      });
  } catch (error) {
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
 * route to get single advert
 * @param {*_id} req
 * @param {*single advert} res
 * @returns
 */

const getSingleAdvert = async (req, res, next) => {
  const { ObjectId } = require("mongoose").Types;
  const { _id } = req.params;

  // Validate if _id is a valid ObjectId
  if (!ObjectId.isValid(_id)) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: "Invalid advertisement ID",
    });
  }

  try {
    const advert = await AdvertModal.findOne({ _id });

    if (!advert) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Advertisement not found",
      });
    }

    return res.status(OK).json({
      advert,
      status: "success",
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 * @param {advert_id , update Values }
 */
const updateAdvertController = async (req, res) => {
  try {
    let { advertId } = req.body;
    const { updateFields } = req.body;

    const advert = await AdvertModal.findByIdAndUpdate(
      advertId,
      { $set: updateFields },
      { new: true }
    );

    // console.log("updated advert", advert);

    if (!advert) {
      return res.status(404).json({
        status: "error",
        message: "Advert not found",
      });
    }

    res.json({
      status: "success",
      message: "Advert updated successfully",
      data: advert,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
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

/**
 * route to handle Post Agani advert
 */

const postAgainAdvert = async (req, res, next) => {
  const { provider_id, subscription_plan_id, advertId, whereToShow } = req.body;

  try {
    const subscription = await SubscriptionModal.findById(subscription_plan_id);
    if (!subscription) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Subscription not found",
      });
    }

    // Check if there are remaining ads
    if (subscription.remainingAds <= 0) {
      return res.status(CONFLICT).json({
        status: "error",
        message: "No remaining ads in the subscription",
      });
    }
    let {
      advertTitle,
      advertCategory,
      advertSubCategory,
      advertLocation,
      advertPrice,
      advertDescription,
      advertPostalCode,
      advertOfferPrice,
      products,
      advertImage,
    } = req.body["updateFields"];

    const postAgainValue = {
      advertTitle,
      whereToShow,
      advertCategory,
      advertSubCategory,
      advertLocation,
      advertPrice,
      advertDescription,
      advertPostalCode,
      products,
      advertOfferPrice,
      advertImage,
      advertProvider_id: provider_id,
      subscription_plan_id,
      advertExpiryDate: subscription.expiryDate,
      advertStatus: "active",
      createdAt: new Date(),
    };
    // console.log("This is post Again Value", postAgainValue);

    let filter = {
      _id: advertId,
      advertProvider_id: provider_id,
    };

    let postAgain = await AdvertModal.findOneAndUpdate(
      filter,
      { $set: postAgainValue },
      {
        returnDocument: "after",
      }
    );

    // console.log(Updateadvert);
    if (!postAgain) {
      return res.status(400).json({
        status: "error",
        message: "Something went wrong; please try again later.",
      });
    } else {
      // Decrement the remaining ads by 1
      subscription.remainingAds -= 1;
      await subscription.save();

      return res.status(OK).json({
        status: "success",
        postAgain,
        message: "Successfully Posted Advert",
      });
    }
  } catch (error) {
    console.log("Error in post Again -> ", error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const AdvertVisibilatyController = async (req, res, next) => {
  const { advertId, provider_id, advertVisibility } = req.body;
  console.log(advertVisibility);
  if (!advertId) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: "Please Provide advert Id",
    });
  } else if (!provider_id) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: "Please Provide User Id",
    });
  } else if (advertVisibility === undefined) {
    console.log("inside the advert visibality check", advertVisibility);
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: "Please Provide AdvertVisibility Status",
    });
  }
  try {
    let filter = {
      _id: advertId,
      advertProvider_id: provider_id,
    };

    AdvertModal.findOneAndUpdate(
      filter,
      { $set: { advertVisibility: advertVisibility } },
      {
        returnDocument: "after",
      }
    )
      .then((result) => {
        console.log(result);
        return res.status(OK).json({
          status: "success",
          message: "Successfully Update advert Visibality",
          result: result,
        });
      })
      .catch((e) => {
        console.log("error in advert visibality while changing", e);
        return res.status(SEE_OTHER).json({
          status: "error",
          message: e.message,
        });
      });
  } catch (error) {
    console.log("Error in advert visibality -> ", error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
// const DeleteAdvertImg = async (req, res, next) => {};

module.exports = {
  AddAdvert,
  getAdvert,
  updateAdvertController,
  getSingleAdvert,
  deleteAdvert,
  postAgainAdvert,
  AdvertVisibilatyController,
};
