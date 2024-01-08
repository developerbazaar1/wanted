const jwt = require("jsonwebtoken");
const ProviderUser = require("../models/providerModel/providerUser");

async function auth(req, res, next) {
  const token = req.header("Authorization");
  // console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded._id);
    let id = decoded._id;
    const user = await ProviderUser.findById(id);
    console.log(user);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized Token This is illegal!",
      });
    }
    next();
  } catch (e) {
    res.status(401).json({
      message: "Unauthorized frist create a account and login!",
    });
  }
}

module.exports = auth;
