const { OK, BAD_REQUEST } = require("../httpStatusCode");
const CategroyModal = require("../models/adminModel/category");
const SubcategoryModal = require("../models/adminModel/subCategory");
const SubSubCategoryModal = require("../models/adminModel/subSubCategoryModal");
const AdvertModal = require("../models/providerModel/advertModal");
const axios = require("axios");

const getCategoryController = async (req, res, async) => {
  try {
    let { search } = req.query;
    let query = {};
    if (search) {
      query = { categoryName: { $regex: new RegExp(search, "i") } };
    }

    console.log(search);
    await CategroyModal.find(query)
      .select({
        _id: 1,
        categoryName: 1,
        categoryImage: 1,
        categoryIcon: 1,
      })
      .then((category) => {
        res.status(OK).json({
          status: "success",
          category,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load category",
        });
      });
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

const getsubCategoryController = async (req, res, async) => {
  try {
    let subCategory = await SubcategoryModal.find({})
      .select({
        _id: 1,
        category_id: 1,
        subCategoryName: 1,
        subCatImg: 1,
      })
      .then((subcategory) => {
        res.status(OK).json({
          status: "success",
          subcategory,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load Sub category",
        });
      });
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};
const getsubSubCategoryController = async (req, res, async) => {
  try {
    let subCategory = await SubSubCategoryModal.find({})
      .then((subSubCategory) => {
        res.status(OK).json({
          status: "success",
          subSubCategory,
        });
      })
      .catch((error) => {
        res.status(BAD_REQUEST).json({
          status: "error",
          message: "failed to load Sub category",
        });
      });

    // console.log(subCategory);
    // console.log(SubSubCategoryModal);
  } catch (error) {
    // console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

/**
 * controller that return type ahead location based on search string
 * @param {input} req
 * @param {*} res
 */
const getTypeAheadController = async (req, res) => {
  try {
    const apiKey = process.env.GOOGLEMAPAPIKEY;
    const input = req.query.input; // Assuming input is passed as a query parameter
    const location = "40.76999,-122.44696";
    const radius = "50000";
    const types = "postal_code|locality|sublocality";
    const language = "en-GB";
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&location=${location}&radius=${radius}&types=${types}&key=${apiKey}&language=${language}&components=country:GB`;

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching location data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching location data" });
  }
};

//controller that fetched the query search type ahead

const getQueryTypeAheadController = async (req, res) => {
  const input = req.query.input;
  try {
    // Perform the autocomplete search using AdvertModal.aggregate
    const data = await AdvertModal.aggregate([
      {
        $match: {
          $or: [
            {
              "products.productTitle": {
                $regex: new RegExp(`.*${input}.*`, "i"),
              },
            },
            {
              "products.productName": {
                $regex: new RegExp(`.*${input}.*`, "i"),
              },
            },
            {
              advertTitle: {
                $regex: new RegExp(`.*${input}.*`, "i"),
              },
            },
          ],
        },
      },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          advertTitle: 1,
          "products.productTitle": 1,
          "products.productName": 1,
          "products._id": 1,
        },
      },
    ]);

    // Filter and transform data

    let formatedData = [];
    data.forEach((element) => {
      if (element?.advertTitle.match(new RegExp(`.*${input}.*`, "i"))) {
        formatedData.push({
          _id: Math.random() + Date.now().toString(),
          name: element?.advertTitle,
        });
      }
      element?.products?.forEach((productElement) => {
        if (
          productElement?.productTitle?.match(new RegExp(`.*${input}.*`, "i"))
        ) {
          formatedData.push({
            _id: Math.random() + Date.now().toString(),
            name: productElement?.productTitle,
          });
        }
        if (
          productElement?.productName?.match(new RegExp(`.*${input}.*`, "i"))
        ) {
          formatedData.push({
            _id: Math.random() + Date.now().toString(),
            name: productElement?.productName,
          });
        }
      });
    });

    // Limit the array to 10 elements
    formatedData = formatedData.slice(0, 9);
    res.status(200).json({
      predections: formatedData,
    });
  } catch (error) {
    console.log(error);
    // Handle errors
    const status = error.status || 500;
    const message =
      error.message || "Internal server error. Please try again later.";
    res.status(status).json({ error: message });
  }
};

module.exports = {
  getCategoryController,
  getsubCategoryController,
  getsubSubCategoryController,
  getTypeAheadController,
  getQueryTypeAheadController,
};
