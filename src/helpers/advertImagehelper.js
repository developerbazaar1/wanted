const cloudinary = require("../config/cloudinary");

// Middleware for handling file upload

const handleFileUpload = (fieldName) => async (req, res, next) => {
  // console.log(req.files, "files");
  // console.log(typeof req.body.portfolioImageCheckbox);
  if (req.body.portfolioImageCheckbox === "true") {
    // console.log(req.body.portfolioImageCheckbox);
    next();
    return;
  }
  // console.log("After next");
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Array to store file URLs
    const fileUrls = [];

    // Process each file
    for (const file of req.files) {
      // Generate a unique filename for each file
      let fileNameParts = file.originalname.split(".");
      let fileNameOnly = fileNameParts.slice(0, -1).join(".");
      const uniqueFilename =
        Date.now() + "-" + Math.round(Math.random() * 1000) + fileNameOnly;
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedvendor",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        public_id: uniqueFilename,
      });

      // Push the file URL to the array
      fileUrls.push(uploadedImage.url);
    }

    // Attach the array of file URLs to req
    req[fieldName] = fileUrls;
    next();
  } catch (error) {
    console.error("File upload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  handleFileUpload,
};
