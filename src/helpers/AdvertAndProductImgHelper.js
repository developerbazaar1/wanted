const cloudinary = require("../config/cloudinary");
const { OK, BAD_REQUEST } = require("../httpStatusCode");

// Middleware for handling file upload

const AdvertAndProductImgUpdateHelper = async (req, res, next) => {
  try {
    const fileUrls = {};

    // console.log("This is files", req.files);

    let { product } = req.body;

    //to check weather new product have image of not
    if (product) {
      req.body["newProducts"] = JSON.parse(product);
      for (let i = 0; i < req.body.newProducts.length; i++) {
        if (!req.files[`productImg${i + 1}`]) {
          return res.status(BAD_REQUEST).json({
            status: "error",
            message: "Please Provide the Product Images for Each Product!",
          });
        }
      }
    }
    // console.log(product);

    // return res.status(OK).json("error");

    if (!req.files) {
      next();
      return;
    }

    for (const key in req.files) {
      // console.log("test");
      if (Object.hasOwnProperty.call(req.files, key)) {
        // console.log("inside the cloud upload");
        if (key === "mainImg") {
          fileUrls[`${key}`] = await uploadToCloudinary(req.files[key][0]);
        } else {
          fileUrls[`${key}`] = await Promise.all(
            req.files[key].map((file) => uploadToCloudinary(file))
          );
        }
      }
    }

    // console.log("uploaded files urls", fileUrls);
    // return res.status(303).json("error");

    req["fileUrls"] = fileUrls;
    // console.log("This is file urls", req.fileUrls);
    // return res.status(500).send("Internal Server Error");
    next();
  } catch (error) {
    console.error("Error in advert file middleWare->", error);
    res.status(500).send("Internal Server Error");
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
  AdvertAndProductImgUpdateHelper,
};
