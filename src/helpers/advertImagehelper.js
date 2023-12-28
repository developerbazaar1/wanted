const cloudinary = require("../config/cloudinary");
const { BAD_REQUEST } = require("../httpStatusCode");

// Middleware for handling file upload

const advertImgAndProductHelper = async (req, res, next) => {
  try {
    const fileUrls = {};

    if (req.body.portfolioImageCheckbox === "false") {
      if (!req.files["mainImg"]) {
        return res.status(BAD_REQUEST).json({
          status: "Error",
          message: "Please Upload Advert Main Image!",
        });
      }
    }

    let { product } = req.body;
    if (product) {
      req.body["product"] = JSON.parse(product);
    }
    const uploadToCloudinary = async (file) => {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;

      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedvendor",
        allowed_formats: ["png", "jpg", "jpeg", "ico", "jfif", "webp", "avif"],
        unique_filename: true,
        use_filename: false,
      });

      return {
        imgUrl: uploadedImage.url,
        imgPublicId: uploadedImage.public_id,
      };
    };

    for (const key in req.files) {
      if (Object.hasOwnProperty.call(req.files, key)) {
        if (key === "mainImg") {
          fileUrls[`${key}`] = await uploadToCloudinary(req.files[key][0]);
        } else {
          fileUrls[`${key}`] = await Promise.all(
            req.files[key].map((file) => uploadToCloudinary(file))
          );
        }
      }
    }
    req["fileUrls"] = fileUrls;
    next();
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  advertImgAndProductHelper,
};
