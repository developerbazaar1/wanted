const cloudinary = require("cloudinary");
const { INTERNAL_SERVER_ERROR } = require("../httpStatusCode");

const profileImageHelper = (fieldName) => async (req, res, next) => {
  let file = req.file;
  try {
    if (req.file === undefined) {
      next();
      return;
    }

    let imgUrls = await uploadToCloudinary(req.file);
    req.urls = imgUrls;
    console.log(req.urls);
    next();
  } catch (error) {
    console.error("ERROR IN CATCH BLOCK->", error);
    const status = error.status || INTERNAL_SERVER_ERROR;
    const message = error.message || "Internal server error, try later!";

    return res.status(status).json({
      error: message,
      status: "error",
    });
  }
};

const uploadToCloudinary = async (file) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  let dataURI = "data:" + file.mimetype + ";base64," + b64;

  const uploadedImage = await cloudinary.uploader.upload(dataURI, {
    upload_preset: "wantedvendor",
    allowed_formats: ["png", "jpg", "jpeg", "jfif", "webp", "avif"],
    unique_filename: true,
    use_filename: false,
  });

  return {
    imgUrl: uploadedImage.url,
    imgPublicId: uploadedImage.public_id,
  };
};

module.exports = {
  profileImageHelper,
};
