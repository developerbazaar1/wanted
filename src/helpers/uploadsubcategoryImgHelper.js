const cloudinary = require("../config/cloudinary");
const { BAD_REQUEST } = require("../httpStatusCode");

// Middleware for handling file upload

const subcategoryImageUploaderHelper =
  (fieldName) => async (req, res, next) => {
    // let file = req.file;
    let { subCatImgUrl } = req.body;

    // condition to check wether subcategoryImage upload is  or not
    // if user is providing the subImgCatUrl then no need to uupload file
    if (subCatImgUrl) {
      next();
      return;
    }

    // console.log(req.file);
    if (req.file === undefined) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please Provide the Subcategory Image" });
    }
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const uniqueFilename =
        Date.now() + "-" + Math.round(Math.random() * 1000) + "subcate";
      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedAdmin",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
        public_id: uniqueFilename,
        transformation: [
          { format: "png" },
          {
            width: 626,
            height: 470,
            crop: "fill",
          },
        ],
      });

      // Attach the array of file URLs to req
      req[fieldName] = uploadedImage.url;
      next();
    } catch (error) {
      //   console.error("File upload error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = subcategoryImageUploaderHelper;
