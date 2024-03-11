const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
  NO_CONTENT,
} = require("../../httpStatusCode");
const mongoose = require("mongoose");
const advertModal = require("../../models/providerModel/advertModal");
const providerPortfolio = require("../../models/providerModel/providerPortfolio");
const { transformProducts } = require("../../helpers/advertProductsDataFormat");
const getGeoCode = require("../../helpers/ConvertGeocoding");

const liveAndLatestOfferController = async (req, res, next) => {
  const {
    page = 1,
    pageSize = 15,
    adstypes,
    searchQuery,
    taxonomy = decodeURIComponent(req?.query?.taxonomy),
    location,
    priceFilter,
    radius,
  } = req.query;
  try {
    // console.log("This is radius", typeof radius);
    // Convert radius from miles to meters (for MongoDB's $geoNear)
    const radiusMeters = parseFloat(radius) * 1609.34; // 1 mile = 1609.34 meters
    let pipeline = [];
    let cordinate;
    if (location) {
      cordinate = await getGeoCode(location);
    }

    if (radius && location && radius != "any") {
      pipeline.push({
        $geoNear: {
          near: { type: "Point", coordinates: [cordinate.lng, cordinate.lat] },
          distanceField: "dist.calculated",
          maxDistance: radiusMeters,
          spherical: true,
        },
      });
    }

    if ((location && !radius) || (location && radius === "any")) {
      // console.log("This is radius", radius, "This is Location", location);
      pipeline.push({
        $match: {
          $or: [
            {
              advertPostalCode: {
                $regex: new RegExp(`^${location}`),
                $options: "i",
              },
            },
            {
              advertLocation: {
                $regex: new RegExp(`.*${location}.*`, "i"),
              },
            },
            {
              "provider.storeAddress": {
                $regex: new RegExp(`.*${location}.*`, "i"),
              },
            },
          ],
        },
      });
    }

    pipeline.push(
      {
        $match: {
          advertStatus: "active",
          advertVisibility: true,
          ...(adstypes && { whereToShow: adstypes }),
        },
      },
      {
        $lookup: {
          from: "providerportfolios",
          localField: "advertProviderPortfolio_id",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $unwind: "$provider",
      },
      {
        $match: {
          $and: [
            ...(searchQuery
              ? [
                  {
                    $or: [
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
                        advertTitle: {
                          $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                        },
                      },
                    ],
                  },
                ]
              : [{}]),
            ...(taxonomy
              ? [
                  {
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
                ]
              : [{}]),
          ],
        },
      },
      {
        $sort: {
          ...(priceFilter
            ? priceFilter === "ascending"
              ? { advertOfferPrice: 1 }
              : { advertOfferPrice: -1 }
            : { createdAt: -1 }),
        },
      },

      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: parseInt(pageSize),
      }
    );

    const ads = await advertModal.aggregate(pipeline);
    if (ads.length === 0 && page > 1) {
      return res.status(NO_CONTENT).json({
        status: "false",
        message: "No more Advert Found !",
        data: [],
      });
    }

    if (ads.length === 0) {
      return res.status(OK).json({
        status: "success",
        message: "No Adverts Found",
        data: [],
      });
    }

    res.status(OK).json({
      success: "true",
      data: JSON.stringify(ads),
      message: "successfully fetched data",
    });
  } catch (error) {
    console.error(error);

    if (error.status) {
      res
        .status(error.status)
        .json({ success: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ success: "error", message: "Internal server error" });
    }
  }
};

const GetAdvertDetails = async (req, res, next) => {
  const { advert_id } = req.query;

  try {
    const _id = new mongoose.Types.ObjectId(advert_id);

    const advert = await advertModal.findOne({ _id });

    const adverts = await advertModal.find({
      advertProvider_id: advert.advertProvider_id,
      _id: { $ne: advert_id },
    });
    const Portfolio = await providerPortfolio.findOne({
      providerId: advert.advertProvider_id,
    });

    products = transformProducts(advert.products);
    // console.log(advert);
    // advert.products = products;
    let advertPreview = {
      advert,
      adverts,
      Portfolio,
      products,
    };

    return res.status(OK).json({
      status: "success",
      message: "successfully get the advert detials ",
      advertPreview: JSON.stringify(advertPreview),
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { liveAndLatestOfferController, GetAdvertDetails };
