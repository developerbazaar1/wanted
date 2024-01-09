const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = require("../../httpStatusCode");
const validator = require("validator");

const providersignupValidator = (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    if (!email || !userName || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Email, user name, and password are required" });
    }

    // Check if email is a valid email address using validator
    if (!validator.isEmail(email)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid email address" });
    }

    // Check if password meets your criteria (e.g., minimum length)
    if (password.length < 6) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // Check if userName is not empty
    if (!userName) {
      return res.status(BAD_REQUEST).json({ error: "User name is required" });
    }

    // If all validations pass, call next to continue to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any unexpected errors here
    // console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
  }
};

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Email, user name, and password are required" });
    }
    if (password.length < 6) {
      return res
        .status(BAD_REQUEST)
        .json({ error: "Password must be at least 8 characters long" });
    }
    // Check if email is a valid email address using validator
    if (!validator.isEmail(email)) {
      return res.status(BAD_REQUEST).json({ error: "Invalid email address" });
    }
    // console.log("in login");

    next();
  } catch (error) {
    // console.log(error);
    res.status(INTERNAL_SERVER_ERROR).json({ error: error });
  }
};

/**
 * @provider @validation
 */

const portfolioValidator = async (req, res, next) => {
  const {
    storeName,
    storeEmail,
    storeCategory,
    storeAddress,
    storeDescription,
    storeWebsite,
    storeContactDetails,
    storeSubCategory,
    _id,
  } = req.body;
  // console.log(_id);
  // console.log(
  //   storeName,
  //   storeEmail,
  //   storeCategory,
  //   storeAddress,
  //   storeDescription,
  //   storeWebsite,
  //   storeContactDetails,
  //   storeSubCategory,
  //   _id
  // );
  try {
    if (!_id) {
      return res.status(UNAUTHORIZED).json({
        status: "error",
        message: "You Are not authorized!",
      });
    }

    if (
      !storeName ||
      !storeEmail ||
      !storeCategory ||
      !storeAddress ||
      !storeDescription ||
      !storeWebsite ||
      !storeContactDetails ||
      !storeSubCategory
      //   !storeThumbNail
    ) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please Filled the All required Field!",
      });
    }
    next();
  } catch (error) {
    return res
      .status(INTERNAL_SERVER_ERROR)

      .json({
        status: "error",
        error: "Internal server error",
      });
  }
};

/**
 * @createadvert @validator
 */

const advertValidator = async (req, res, next) => {
  const {
    advertPrice,
    offerPrice,
    advertProviderPortfolio_id,
    advertProvider_id,
    advertTitle,
    // advertCategory,
    advertLocation,
    advertPostalCode,
    advertDescription,
    whereToShow,
    // advertSubCategory,
    advertOfferPrice,
    subscription_plan_id,
    product,
  } = req.body;

  // console.log(req.body, "advert validator");
  try {
    if (!subscription_plan_id) {
      return res.status(BAD_REQUEST).json({
        status: "Error",
        message: "Please Select a subscription!",
      });
    }
    if (
      !advertTitle ||
      !whereToShow ||
      !advertLocation ||
      !advertPrice ||
      !advertDescription ||
      !advertPostalCode
    ) {
      return res.status(BAD_REQUEST).json({
        status: "Error",
        message: "Please Filled the All required Field!",
      });
    }
    // console.log(provider_portfolio_id, "portfoloio _id");
    // console.log(provider_id, "provider Id");

    if (!advertProviderPortfolio_id || !advertProvider_id) {
      return res.status(UNAUTHORIZED).json({
        status: "error",
        message: "You Are not authorized!",
      });
    }
    next();
  } catch (error) {
    // console.log("error inside the validator");
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: "Internal server error",
    });
  }
};

/**
 * @updateadvertvaladition
 */
const updateAdvertValidator = async (req, res, next) => {
  let { advertId, provider_id } = req.body;

  // console.log("This is old products", products);
  // console.log("This is new product", product);
  // return res.status(400).json("This is message");
  try {
    if (!advertId || !provider_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Addvert Id is Missing",
      });
    }
    next();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

const postAdvertAgainValidator = async (req, res, next) => {
  const {
    advertId,
    advertTitle,
    whereToShow,
    advertLocation,
    advertPrice,
    advertDescription,
    advertPostalCode,
    provider_id,
    subscription_plan_id,
  } = req.body;

  try {
    if (
      !advertId ||
      !advertTitle ||
      !whereToShow ||
      !advertLocation ||
      !advertPrice ||
      !advertDescription ||
      !advertPostalCode ||
      !provider_id
    ) {
      return res.status(BAD_REQUEST).json({
        status: "Error",
        message: "Please Filled the All required Field!",
      });
      a;
    }

    if (!subscription_plan_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Please Select a Subscription!",
      });
    }
    if (!provider_id) {
      return res.status(UNAUTHORIZED).json({
        status: "error",
        message: "You Are not authorized!",
      });
    }
    next();
  } catch (error) {
    console.log("error inside the validator", error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      error: "Internal server error",
    });
  }
};

module.exports = {
  providersignupValidator,
  loginValidator,
  portfolioValidator,
  advertValidator,
  updateAdvertValidator,
  postAdvertAgainValidator,
};
