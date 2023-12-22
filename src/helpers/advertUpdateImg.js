const cloudinary = require("../config/cloudinary");

// Middleware for handling file upload

const advertUpdateImg = (fieldName) => async (req, res, next) => {
  if (req.files === undefined) {
    next();
    return;
  }
  try {
    const fileUrls = [];
    // Process each file
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

    // Attach the array of file URLs to req
    req[fieldName] = fileUrls;

    next();
  } catch (error) {
    // console.error("File upload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  advertUpdateImg,
};
