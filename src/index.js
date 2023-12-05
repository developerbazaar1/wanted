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

const PORT = process.env.PORT || 3001;
const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);
