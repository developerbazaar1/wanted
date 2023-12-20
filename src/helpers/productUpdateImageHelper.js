const cloudinary = require("../config/cloudinary");

const productUpdateImg = (fieldName) => async (req, res, next) => {
  console.log(req.files, "files provided by user");
  if (req.files === undefined) {
    next();
    return;
  }
  try {
    const fileUrls = [];
    for (const file of req.files) {
      const uniqueFilename =
        Date.now() + "-" + Math.round(Math.random() * 1000) + file.originalname;
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedvendor",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        public_id: "wantedvendor/" + uniqueFilename,
      });
      // console.log("products image", uploadedImage);
      // console.log("unique file name", uniqueFilename);
      // console.log("This is original file Name", file.originalname);
      fileUrls.push(uploadedImage.url);
    }

    console.log();
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
