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
      advertCategory,
      advertLocation,
      advertPostalCode,
      advertDescription,
      whereToShow,
      advertSubCategory,
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
      advertCategory,
      advertLocation,
      advertPostalCode,
      advertDescription,
      whereToShow,
      advertSubCategory,
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
 * @param {advert_id , provider_id }
 */

const updateAdvert = async (req, res, next) => {
  // console.log(typeof req.body.oldImgUrl);
  if (typeof req.body.oldImgUrl === "string") {
    req.body.oldImgUrl = [req.body.oldImgUrl];
    console.log("inside th object check", req.body.oldImgUrl);
  }

  if (req.body.oldImgUrl && Array.isArray(req.body.oldImgUrl)) {
    req.body.oldImgUrl = req.body.oldImgUrl.map((jsonString) =>
      JSON.parse(jsonString)
    );
  }

  // console.log(req.body.oldImgUrl);

  let { _id, provider_id } = req.body;
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
    advertVisibility,
  } = req.body;

  let updateValue = {
    advertTitle,
    whereToShow,
    advertCategory,
    advertSubCategory,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    advertImages: req.body.oldImgUrl,
    advertVisibility,
  };

  // console.log(typeof updateValue.advertImages);
  // console.log(updateValue.advertImages);

  if (req.advertImageUrls !== undefined && req.advertImageUrls.length > 0) {
    req.advertImageUrls.forEach((element) => {
      updateValue.advertImages.push(element);
    });
    // updateValue.advertImages = req.advertImageUrls;
  }

  // console.log(updateValue, "update value");

  // ...

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
    console.log(error);
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

/**
 * route to handle Post Agani advert
 */

const postAgainAdvert = async (req, res, next) => {
  // console.log("request in postAgainAdvert");
  const {
    advertTitle,
    whereToShow,
    advertCategory,
    advertSubCategory,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    provider_portfolio_id,
    provider_id,
    subscription_plan_id,
    advertImages,
    id,
  } = req.body;

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

    const postAgainValue = {
      advertTitle,
      whereToShow,
      advertCategory,
      advertSubCategory,
      advertLocation,
      advertPrice,
      advertDescription,
      advertPostalCode,
      advertImages,
      advertProviderPortfolio_id: provider_portfolio_id,
      advertProvider_id: provider_id,
      subscription_plan_id,
      advertExpiryDate: subscription.expiryDate,
      advertStatus: "active",
      createdAt: new Date(),
    };

    // console.log(postAgainValue);

    if (req.advertImageUrls !== undefined && req.advertImageUrls.length > 0) {
      postAgainValue.advertImages = req.advertImageUrls;
    }

    let filter = {
      _id: id,
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
  updateAdvert,
  deleteAdvert,
  postAgainAdvert,
};
