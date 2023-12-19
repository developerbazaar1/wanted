const cloudinary = require("../config/cloudinary");
const { BAD_REQUEST } = require("../httpStatusCode");

// Middleware for handling file upload
const handeCatImgAndIconHelper = (fieldName) => async (req, res, next) => {
  const files = req.files;

  if (!files || Object.keys(files).length < 2) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "Please provide both the Category Icon and Image" });
  }

  try {
    const processedFiles = {};

    for (const fileField in files) {
      const file = files[fileField][0];

      // Process each file
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;

      // Generate a unique filename for each file
      const uniqueFilename =
        Date.now() + "-" + Math.round(Math.random() * 1000) + file.originalname;

      let uploadParams = {
        upload_preset: "wantedAdmin",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        public_id: uniqueFilename,
        transformation: [{ format: "png" }],
      };

      if (fileField === "categoryImage") {
        // Resize category image
        uploadParams.transformation.push({
          width: 1000,
          height: 667,
          crop: "fill",
        });
      } else if (fileField === "categoryIcon") {
        // Resize category icon
        uploadParams.transformation.push({
          width: 512,
          height: 512,
          crop: "fill",
        });
      }

      // Upload file to Cloudinary with resizing and format conversion
      const uploadedFile = await cloudinary.uploader.upload(
        dataURI,
        uploadParams
      );

      // Attach the file URL to the processedFiles object
      processedFiles[fileField] = uploadedFile.url;
    }

    // Attach the processedFiles object to req
    req[fieldName] = processedFiles;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handeCatImgAndIconHelper;

// module.exports default = handeCatSubImgAndIconHelper
