const { OK, INTERNAL_SERVER_ERROR } = require("../../httpStatusCode");
const userWishListModal = require("../../models/userModels/userWishListModal");
//controller to get the favourite ads of user
const GetUserWishList = async (req, res, next) => {
  try {
    // let user = req.user

    let fav = await userWishListModal.aggregate([
      {
        $match: {
          user_id: req.user._id,
        },
      },
      {
        $lookup: {
          from: "advertmodals",
          localField: "advert_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                advertProviderPortfolio_id: 1,
                advertTitle: 1,
                advertDescription: 1,
                advertProvider_id: 1,
                advertImage: 1,
              },
            },
          ],
          as: "advert",
        },
      },
      {
        $lookup: {
          from: "providerportfolios",
          localField: "advert.advertProviderPortfolio_id",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                providerId: 1,
                storeName: 1,
              },
            },
          ],
          as: "provider",
        },
      },
    ]);
    // console.log(fav);
    if (fav) {
      return res.status(OK).json({
        status: "success",
        message: "successfully fetched the user Favourite data",
        favourite: JSON.stringify(fav),
      });
    } else {
      return res.status(OK).json({
        status: "success",
        message: "no Fav found try adding one!",
        favourite: JSON.stringify(fav),
      });
    }
  } catch (error) {
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";
    console.log(error);

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

//controller to update the favourite ads of user
const updateWishList = async (req, res, next) => {
  try {
    const { advertId } = req.params;
    const userId = req.user._id;

    // Check if the ad is already in the user's wishlist
    const existingWishList = await userWishListModal.findOne({
      user_id: userId,
      advert_id: advertId,
    });

    if (existingWishList) {
      // Ad is already in the wishlist, remove it
      await userWishListModal.findOneAndRemove({
        user_id: userId,
        advert_id: advertId,
      });

      // Fetch the updated wishlist after removal
      const updatedWishList = await userWishListModal.aggregate([
        {
          $match: {
            user_id: userId,
          },
        },
        {
          $lookup: {
            from: "advertmodals",
            localField: "advert_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  advertProviderPortfolio_id: 1,
                  advertTitle: 1,
                  advertDescription: 1,
                  advertProvider_id: 1,
                  advertImage: 1,
                },
              },
            ],
            as: "advert",
          },
        },
        {
          $lookup: {
            from: "providerportfolios",
            localField: "advert.advertProviderPortfolio_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  providerId: 1,
                  storeName: 1,
                },
              },
            ],
            as: "provider",
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        message: "Ad successfully removed from wishlist",
        wishlist: updatedWishList,
      });
    } else {
      // Ad is not in the wishlist, add it
      const newWishList = new userWishListModal({
        user_id: userId,
        advert_id: advertId,
      });

      await newWishList.save();

      // Fetch the updated wishlist after addition
      const updatedWishList = await userWishListModal.aggregate([
        {
          $match: {
            user_id: userId,
          },
        },
        {
          $lookup: {
            from: "advertmodals",
            localField: "advert_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  advertProviderPortfolio_id: 1,
                  advertTitle: 1,
                  advertDescription: 1,
                  advertProvider_id: 1,
                  advertImage: 1,
                },
              },
            ],
            as: "advert",
          },
        },
        {
          $lookup: {
            from: "providerportfolios",
            localField: "advert.advertProviderPortfolio_id",
            foreignField: "_id",
            pipeline: [
              {
                $project: {
                  _id: 1,
                  providerId: 1,
                  storeName: 1,
                },
              },
            ],
            as: "provider",
          },
        },
      ]);

      return res.status(200).json({
        status: "success",
        message: "Ad successfully added to wishlist",
        wishlist: updatedWishList,
      });
    }
  } catch (error) {
    // Handle errors appropriately
    console.error(error);

    return res.status(500).json({
      error: "Internal server error",
      status: "error",
    });
  }
};

module.exports = { GetUserWishList, updateWishList };
