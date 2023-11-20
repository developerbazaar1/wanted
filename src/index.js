const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const providerRoute = require("../src/routes/providerRoute/provider");
const multer = require("multer");
const auth = require("./config/auth");
const UserRoutes = require("./routes/userRoute/userRoute");
const cloudinary = require("./config/cloudinary");
const AdminRoutes = require("./routes/adminRoute/adminRoute");
const CommonRoute = require("./routes/common");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/provider", providerRoute);
app.use("/user", UserRoutes);
app.use("/admin", AdminRoutes);
app.use("/common", CommonRoute);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// these are the created for image testing purpose start
app.post("/imageupload", upload.single("img"), async (req, res) => {
  try {
    // const file = req.file;
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const uploadedImage = await cloudinary.uploader.upload(dataURI, {
      upload_preset: "wantedvendor",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    });

    console.log(uploadedImage);
    return res.status(200).json({
      message: "image recived",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error,
    });
  }
});
app.post("/multipleimage", upload.array("img"), async (req, res) => {
  console.log(req.body.rahul);
  let { advertImageUrls } = req;
  // console.log(advertImageUrls);
  try {
    const uploadedImages = [];

    // Iterate over the array of files
    for (const file of req.files) {
      // Convert each file to base64
      const b64 = Buffer.from(file.buffer).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;

      // Upload each file to Cloudinary
      const uploadedImage = await cloudinary.uploader.upload(dataURI, {
        upload_preset: "wantedvendor",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
      });

      uploadedImages.push(uploadedImage);
    }

    console.log(uploadedImages);
    return res.status(200).json({
      message: "Images received and uploaded successfully",
      uploadedImages,
      fildName: req.body.rahul,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});
app.post("/testFormdata", upload.array("img"), async (req, res) => {
  console.log(req.body);
});
// these are the created for image testing purpose end
const PORT = process.env.PORT || 3001;
const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);
