const deleteCloudinaryImage = require("../../helpers/CloudinaryDeleteImghelper");
const AdvertModal = require("../../models/providerModel/advertModal");

// Route to delete a particular product by ID
const deleteAdvertProductController = async (req, res) => {
  const { advertId, productId } = req.query;

  try {
    const originalAdvert = await AdvertModal.findById(advertId);

    if (!originalAdvert) {
      return res.status(404).json({
        status: "error",
        message: "Advert not found",
      });
    }

    const existingProduct = originalAdvert.products.find(
      (p) => p._id.toString() === productId
    );

    if (!existingProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found in the specified advert",
      });
    }

    const advert = await AdvertModal.findByIdAndUpdate(
      advertId,
      {
        $pull: { products: { _id: productId } },
      },
      { new: true }
    );

    if (!advert) {
      return res.status(404).json({
        status: "error",
        message: "Advert not found",
      });
    }

    // Assuming productImg is an array of objects containing imgUrl and imgPublicId
    const deletedProduct = originalAdvert.products.find(
      (p) => p._id.toString() === productId
    );
    // console.log(deletedProduct);
    await deleteCloudinaryImage(deletedProduct.productImg);

    res.json({
      status: "success",
      message: "Product deleted successfully",
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

// Route to delete a particular product image by product ID and image ID
const deleteProductImgController = async (req, res) => {
  const { advertId, productId, imageId } = req.query;

  try {
    // Get the original document before the update
    const originalAdvert = await AdvertModal.findById(advertId);

    if (!originalAdvert) {
      return res.status(404).json({
        status: "error",
        message: "Advert Not Found",
      });
    }

    // Find the product and the image to be deleted
    const deletedImage = originalAdvert.products
      .find((p) => p._id.toString() === productId)
      .productImg.find((img) => img._id.toString() === imageId);

    // Find the if image is not exit
    // console.log(deletedImage);
    if (!deletedImage) {
      return res.status(404).json({
        status: "error",
        message: "Image is Not Found",
      });
    }

    // Update the document and pull the image
    const advert = await AdvertModal.findByIdAndUpdate(
      advertId,
      {
        $pull: { "products.$[p].productImg": { _id: imageId } },
      },
      {
        arrayFilters: [{ "p._id": productId }],
        new: true,
      }
    );

    // console.log("advert is ", advert);

    res.json({
      status: "success",
      message: "Product image deleted successfully",
      data: advert.products.find((p) => p._id.toString() === productId)
        .productImg,
    });

    // Now you can use the deletedImage object for further processing (e.g., deleting from Cloudinary)
    await deleteCloudinaryImage([deletedImage]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = { deleteAdvertProductController, deleteProductImgController };
