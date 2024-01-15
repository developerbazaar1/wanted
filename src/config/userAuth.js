const jwt = require("jsonwebtoken");
const userModal = require("../models/userModels/userModal");

async function userAuth(req, res, next) {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // console.log("decode", decoded._id);
    let id = decoded._id;
    const user = await userModal.findById(id);
    // console.log("user", user);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Token This is illegal!",
      });
    }
    req.user = user;
    // console.log(user);
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized frist create a account and login!",
    });
  }
}

module.exports = userAuth;
