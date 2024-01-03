const cloudinary = require("../config/cloudinary");

const deleteCloudinaryImage = async (images) => {
  for (const image of images) {
    if (image.imgPublicId) {
      const res = await cloudinary.uploader.destroy(image.imgPublicId);
      console.log("image Delete", res);
    }
  }
};

module.exports = deleteCloudinaryImage;
