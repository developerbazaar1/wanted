const mongoose = require("mongoose");
const ProductsModal = require("../../models/providerModel/productsModal");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
} = require("../../httpStatusCode");

/**
 * route to add products
 * @param {*providerid , providerportfolioId} req
 * @param {products} res
 * @returns products
 */

const addProductController = async (req, res, next) => {
  try {
    const { productname, productProvider_id, producProviderPortfolio_id } =
      req.body;

    if (!productProvider_id || !producProviderPortfolio_id) {
      return res.status(BAD_REQUEST).json({
        status: "Bad request",
        message: "please provider userId and profileId",
      });
    }

    if (!productname) {
      return res.status(BAD_REQUEST).json({
        status: "Bad request",
        message: "Please product name!",
      });
    }
    const productCreated = await ProductsModal.create({
      productname,
      productProvider_id,
      producProviderPortfolio_id,
    });

    if (!productCreated) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Failed to Create Products try again!",
      });
    } else {
      return res.status(CREATED).json({
        status: "success",
        message: "Products addes sucfessfully",
        product: productCreated,
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
 * route to get the all provider products
 */

const getProductController = async (req, res, next) => {
  const { _id } = req.query;
  console.log(_id, "in get product controller id");
  try {
    const product = await ProductsModal.find({ productProvider_id: _id });

    if (product.length === 0) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "No product found for the provider",
      });
    }

    return res.status(OK).json({
      product,
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
 * controller to delete product
 * @param {*product_id, provider_id} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deleteProductController = async (req, res, next) => {
  try {
    const { _id, provider_id } = req.body;

    // console.log(_id, provider_id);

    if (!_id || !provider_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Product ID or Provider ID is missing",
      });
    }

    const filter = {
      _id,
      productProvider_id: provider_id,
    };

    const deleteProduct = await ProductsModal.findOneAndDelete(filter);

    if (deleteProduct) {
      return res.status(OK).json({
        status: "success",
        message: "Product deleted successfully",
      });
    } else {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Product not found or already deleted",
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
 * updateProduct controller
 * @param {product_id, provider_id} req
 * @param {* updated product} res
 * @returns
 */

const updateProductController = async (req, res) => {
  try {
    let { _id, provider_id, productname } = req.body;

    if (!_id || !provider_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Product ID or Provider ID is missing",
      });
    }

    if (!productname) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please provider the ProductName",
      });
    }
    let filter = {
      _id: _id,
      productProvider_id: provider_id,
    };

    let updateValue = {
      productname,
    };

    // console.log(filter);

    let Updateproduct = await ProductsModal.findOneAndUpdate(
      filter,
      { $set: updateValue },
      {
        returnDocument: "after",
      }
    );

    // console.log(Updateproduct);
    if (!Updateproduct) {
      return res.status(400).json({
        status: "error",
        message: "Something went wrong; please try again later.",
      });
    } else {
      return res.status(OK).json({
        status: "success",
        Updateproduct,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const updateProductImageController = async (req, res) => {
  try {
    let { _id, provider_id, productImages } = req.body;

    console.log(productImages, "user provided images");

    let updateImgUrl = req.productImages;
    if (!_id || !provider_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Product ID or Provider ID is missing",
      });
    }

    if (!productImages) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please Provider the Previous Product Image Array",
      });
    }
    let filter = {
      _id: _id,
      productProvider_id: provider_id,
    };

    for (let i = 0; i < updateImgUrl.length; i++) {
      productImages[i] = updateImgUrl[i];
    }

    let updateValue = {
      productImages,
    };

    // console.log(filter);

    let Updateproduct = await ProductsModal.findOneAndUpdate(
      filter,
      { $set: updateValue },
      {
        returnDocument: "after",
      }
    );

    // console.log(updateImgUrl);

    if (updateImgUrl) {
      return res.status(OK).json({
        message: "image recived",
        Updateproduct: Updateproduct,
      });
    }
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  addProductController,
  getProductController,
  deleteProductController,
  updateProductController,
  updateProductImageController,
};
