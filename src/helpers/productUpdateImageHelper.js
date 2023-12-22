const cloudinary = require("../config/cloudinary");

const productUpdateImg = (fieldName) => async (req, res, next) => {
  // console.log("old urls", req.body.productImages);
  // console.log(req.files, "files provided by user");

  if (req.files === undefined) {
    next();
    return;
  }
  try {
    // throw new Error("error");
    const fileUrls = [];
    for (const file of req.files) {
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedvendor",
        allowed_formats: [
          "png",
          "jpg",
          "jpeg",
          "svg",
          "ico",
          "jfif",
          "webp",
          "avif",
        ],
        unique_filename: true,
        use_filename: false,
      });

      let imgUrls = {
        imgUrl: uploadedImage.url,
        imgPublicId: uploadedImage.public_id,
      };
      fileUrls.push(imgUrls);
    }

    // console.log();
    req[fieldName] = fileUrls;
    next();
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  productUpdateImg,
};
