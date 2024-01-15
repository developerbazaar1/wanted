const {
  INTERNAL_SERVER_ERROR,
  OK,
  BAD_REQUEST,
  NO_CONTENT,
} = require("../../httpStatusCode");
const advertModal = require("../../models/providerModel/advertModal");

const SerachAdvertAndProductController = async (req, res, next) => {
  let { postalCode, taxonomy, searchQuery, page = 1, pageSize = 6 } = req.query;
  try {
    if (postalCode) {
      advertModal
        .aggregate([
          {
            $match: {
              advertStatus: "active",
              advertVisibility: true,
              advertPostalCode: {
                $regex: new RegExp(`^${postalCode}`), // Use ^ for matching the start of the postal code
                $options: "i", // Case-insensitive matching
              },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: (page - 1) * pageSize,
          },
          {
            $limit: parseInt(pageSize),
          },
        ])
        .then((result) => {
          return res.status(OK).json({
            data: result,
            status: "success",
          });
        })
        .catch((e) => {
          console.log(e);
          throw new Error(e);
        });
    } else if (taxonomy) {
      advertModal
        .aggregate([
          {
            $match: {
              advertStatus: "active",
              advertVisibility: true,
              $or: [
                {
                  "products.category": {
                    $in: [new RegExp(`.*${taxonomy}.*`, "i")],
                  },
                },
                {
                  "products.subcategory": {
                    $in: [new RegExp(`.*${taxonomy}.*`, "i")],
                  },
                },
                {
                  "products.subsubcategory": {
                    $in: [new RegExp(`.*${taxonomy}.*`, "i")],
                  },
                },
              ],
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: (page - 1) * pageSize,
          },
          {
            $limit: parseInt(pageSize),
          },
        ])
        .then((result) => {
          return res.status(OK).json({
            data: result,
            status: "success",
          });
        })
        .catch((e) => {
          console.log(e);
          throw new Error(e);
        });
    } else if (searchQuery) {
      advertModal
        .aggregate([
          {
            $lookup: {
              from: "providerportfolios", // Replace with your actual collection name for providers
              localField: "advertProviderPortfolio_id", // Replace with the field in advertModal that links to providers
              foreignField: "_id", // Replace with the corresponding field in providers
              as: "provider",
            },
          },
          {
            $match: {
              advertStatus: "active",
              advertVisibility: true,
              $or: [
                {
                  advertLocation: {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  advertTitle: {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "products.productTitle": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "products.productName": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "products.category": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "products.subcategory": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "products.subsubcategory": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },

                {
                  "provider.storeName": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
                {
                  "provider.storeAddress": {
                    $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                  },
                },
              ],
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $skip: (page - 1) * pageSize,
          },
          {
            $limit: parseInt(pageSize),
          },
        ])
        .then((result) => {
          if (result.length <= 0) {
            return res.status(OK).json({
              data: result,
              status: "success",
              message: "No advert Found",
            });
          }

          return res.status(OK).json({
            data: result,
            status: "success",
            message: "Successfuly fetched data",
          });
        })
        .catch((e) => {
          console.log(e);
          throw new Error(e);
        });
    } else {
      return res.status(BAD_REQUEST).json({
        error: "Please provide a search query",
        status: "error",
      });
    }
  } catch (error) {
    console.error("ERROR IN CATCH BLOCK->", JSON.stringify(error, null, 2));
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

module.exports = { SerachAdvertAndProductController };
