const cloudinary = require("../config/cloudinary");

// Middleware for handling file upload

const handlePortfolioImg = (fieldName) => async (req, res, next) => {
  let file = req.file;
  //   console.log(req.file);
  if (req.file === undefined) {
    // console.log("no file");
    next();
    return;
  }
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    // Process each file
    // Generate a unique filename for each file
    const uniqueFilename =
      Date.now() + "-" + Math.round(Math.random() * 1000) + file.originalname;
    const uploadedImage = await cloudinary.uploader.upload(dataURI, {
      upload_preset: "wantedvendor",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      public_id: "wantedvendor/" + uniqueFilename,
    });

    // Attach the array of file URLs to req
    req[fieldName] = uploadedImage.url;
    next();
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handlePortfolioImg,
};
