const { OK, BAD_REQUEST } = require("../httpStatusCode");
const CategroyModal = require("../models/adminModel/category");
const SubcategoryModal = require("../models/adminModel/subCategory");
const SubSubCategoryModal = require("../models/adminModel/subSubCategoryModal");
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

const getTypeAheadController = async (req, res) => {
  try {
    const apiKey = "AIzaSyCx-cGRGxdiU0cYI0q5TdWvATXEsIXUYFY";
    const input = req.query.input; // Assuming input is passed as a query parameter
    const location = "40.76999,-122.44696";
    const radius = "50000";
    const types = "locality|sublocality";
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

module.exports = {
  getCategoryController,
  getsubCategoryController,
  getsubSubCategoryController,
  getTypeAheadController,
};
