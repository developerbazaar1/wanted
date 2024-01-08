const profileImageHelper = (fieldName) => async (req, res, next) => {
  let file = req.file;
  if (req.file === undefined) {
    next();
    return;
  }

  try {
  } catch (error) {}
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
  profileImageHelper,
};
