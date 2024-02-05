const { query } = require("express");
const {
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NO_CONTENT,
} = require("../../httpStatusCode");
const CategoryModal = require("../../models/adminModel/category");
const subCategory = require("../../models/adminModel/subCategory");
const advertModal = require("../../models/providerModel/advertModal");

const servicesController = async (req, res, next) => {
  // let { service } = req.query;
  try {
    const services = await CategoryModal.find({}).select({
      _id: 1,
      categoryName: 1,
      categoryImage: 1,
      categoryIcon: 1,
    });

    // console.log(services);
    if (services) {
      return res.status(OK).json({
        status: "success",
        message: "Successfully fetched the services",
        services: JSON.stringify(services),
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

//controller to fetch sub category of particular category
const servicesSubController = async (req, res, next) => {
  let { _id, search } = req.query;
  try {
    let query = {
      category_id: _id,
    };

    if (search) {
      query = {
        category_id: _id,
        subCategoryName: { $regex: new RegExp(search, "i") },
      };
    }

    const services = await subCategory.find(query).select({
      _id: 1,
      category_id: 1,
      subCategoryName: 1,
      subCatImg: 1,
    });

    // console.log(services);
    if (services) {
      return res.status(OK).json({
        status: "success",
        message: "Successfully fetched the services",
        services: JSON.stringify(services),
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

//controller to get single sub service advert baded on sub category.

// const getSingleSubservice = async (req, res, next) => {
//   try {
//     const {
//       page = 1,
//       pageSize = 6,
//       searchQuery,
//       taxnomay,
//       location,
//     } = req.query;
//     let { _id } = req.params;
//     // console.log(_id);
//     let services = await advertModal.aggregate([
//       {
//         $match: {
//           advertStatus: "active",
//           advertVisibility: true,
//           whereToShow: "Service",
//           $and: [
//             {
//               "products.subcategory": {
//                 $in: [new RegExp(`.*${_id}.*`, "i")],
//               },
//             },
//           ],
//           $or: [
//             {
//               "products.subcategory": {
//                 $in: [new RegExp(`.*${searchQuery}.*`, "i")],
//               },
//             },
//             {
//               "products.subsubcategory": {
//                 $in: [new RegExp(`.*${searchQuery}.*`, "i")],
//               },
//             },
//             {
//               advertPostalCode: {
//                 $regex: new RegExp(`^${searchQuery}`), // Use ^ for matching the start of the postal code
//                 $options: "i", // Case-insensitive matching
//               },
//             },
//             {
//               advertLocation: {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               advertTitle: {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "products.productTitle": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "products.productName": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "products.category": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "products.subcategory": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "products.subsubcategory": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },

//             {
//               "provider.storeName": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//             {
//               "provider.storeAddress": {
//                 $regex: new RegExp(`.*${searchQuery}.*`, "i"),
//               },
//             },
//           ],
//         },
//       },
//       {
//         $lookup: {
//           from: "providerportfolios", // Replace with your actual collection name for providers
//           localField: "advertProviderPortfolio_id", // Replace with the field in advertModal that links to providers
//           foreignField: "_id",
//           pipeline: [
//             {
//               $project: {
//                 _id: 1,
//                 storeName: 1,
//               },
//             },
//           ], // Replace with the corresponding field in providers
//           as: "provider",
//         },
//       },
//       {
//         $sort: { createdAt: -1 },
//       },
//       {
//         $skip: (page - 1) * pageSize,
//       },
//       {
//         $limit: parseInt(pageSize),
//       },
//       {
//         $project: {
//           _id: 1,
//           advertProvider_id: 1,
//           advertProviderPortfolio_id: 1,
//           advertTitle: 1,
//           advertDescription: 1,
//           advertImage: 1,
//           whereToShow: 1,
//           provider: 1,
//           advertPrice: 1,
//           advertOfferPrice: 1,
//           // products: 1,
//         },
//       },
//     ]);

//     if (page > 1 && services.length === 0) {
//       return res.status(NO_CONTENT).json({
//         status: true,
//         message: "No More Advert Found",
//         services,
//       });
//     }

//     if (services.length === 0) {
//       return res.status(OK).json({
//         status: true,
//         message: "No Advert Found!",
//         services,
//       });
//     }

//     if (services) {
//       return res.status(OK).json({
//         status: true,
//         message: "Data fetched successfylly",
//         services,
//       });
//     }
//   } catch (error) {
//     // console.log(error);
//     console.error("ERROR IN CATCH BLOCK->", JSON.stringify(error, null, 2));
//     const status = error.status || INTERNAL_SERVER_ERROR;
//     const message = error.message || "Internal server error, try later!";

//     return res.status(status).json({
//       error: message,
//       status: "error",
//     });
//   }
// };

const getSingleSubservice = async (req, res, next) => {
  try {
    const {
      _id,
      page = 1,
      pageSize = 6,
      searchQuery,
      taxonomy,
      location,
    } = req.query;

    // console.log(_id);
    let services = await advertModal.aggregate([
      {
        $lookup: {
          from: "providerportfolios", // Replace with your actual collection name for providers
          localField: "advertProviderPortfolio_id", // Replace with the field in advertModal that links to providers
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 1,
                storeName: 1,
              },
            },
          ], // Replace with the corresponding field in providers
          as: "provider",
        },
      },
      {
        $match: {
          advertStatus: "active",
          advertVisibility: true,
          whereToShow: "Service",
          $and: [
            ...(_id
              ? [
                  {
                    "products.subcategory": {
                      $in: [new RegExp(`.*${_id}.*`, "i")],
                    },
                  },
                ]
              : [{}]),

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
                        "provider.storeName": {
                          $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                        },
                      },
                      {
                        advertStoreName: {
                          $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                        },
                      },
                      {
                        advertTitle: {
                          $regex: new RegExp(`.*${searchQuery}.*`, "i"),
                        },
                      },
                      {
                        advertDescription: {
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
            ...(location
              ? [
                  {
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
                ]
              : [{}]),
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
      {
        $project: {
          _id: 1,
          advertStoreName: 1,
          advertProvider_id: 1,
          advertProviderPortfolio_id: 1,
          advertTitle: 1,
          advertDescription: 1,
          advertImage: 1,
          whereToShow: 1,
          provider: 1,
          advertPrice: 1,
          advertOfferPrice: 1,
          products: 1,
        },
      },
    ]);

    // console.log(services);

    if (page > 1 && services.length === 0) {
      return res.status(NO_CONTENT).json({
        status: true,
        message: "No More Advert Found",
        services,
      });
    }

    if (services.length === 0) {
      return res.status(OK).json({
        status: true,
        message: "No Advert Found !",
        services,
      });
    }

    if (services) {
      return res.status(OK).json({
        status: true,
        message: "Data fetched successfylly",
        services,
      });
    }
  } catch (error) {
    // console.log(error);
    console.error("ERROR IN CATCH BLOCK->", JSON.stringify(error, null, 2));
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

module.exports = {
  servicesController,
  servicesSubController,
  getSingleSubservice,
};
