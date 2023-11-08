const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const providerRoute = require("../src/routes/providerRoute/provider");

const auth = require("./config/auth");
const UserRoutes = require("./routes/userRoute/userRoute");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(cors());
app.use("/provider", providerRoute);
app.use("/user", UserRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(
  PORT,
  console.log(`server is running on port ${PORT}`)
);
