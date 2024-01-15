// uploadMiddleware.js
const multer = require("multer");

const storage = multer.memoryStorage();
const allowedFormats = ["png", "jpg", "jpeg", "jfif", "webp", "avif"];

const fileFilter = (req, file, cb) => {
  const fileExt = file.originalname.split(".").pop().toLowerCase();
  if (allowedFormats.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

const handleUpload = (req, res, next) => {
  upload.single("img")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).json({
        error: err.message,
        status: "error",
      });
    } else if (err) {
      res.status(500).json({
        error: "Internal server error",
        status: "error",
      });
    } else {
      next();
    }
  });
};

module.exports = { handleUpload };
