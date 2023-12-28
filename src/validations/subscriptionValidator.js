const { body, validationResult } = require("express-validator");
const { INTERNAL_SERVER_ERROR } = require("../httpStatusCode");

/**
 *
 * @param {*plan_id provider_id provider_portfolio_id expiryDate numberof_ads remaningAds} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const isCustomISO8601 = (value) => {
  return /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(value);
};

async function subscriptionValidator(req, res, next) {
  try {
    await Promise.all(
      [
        body("plan_id").isMongoId().withMessage("Invalid plan ID").bail(),
        body("provider_id")
          .isMongoId()
          .withMessage("Invalid provider ID")
          .bail(),
        body("expiryDate")
          .custom(isCustomISO8601)
          .withMessage("Invalid date format")
          .bail(),
        body("numberof_ads")
          .isInt()
          .withMessage("Number of ads must be an integer")
          .bail(),
        body("remainingAds")
          .isInt()
          .withMessage("Remaining ads must be an integer")
          .bail(),
      ].map((validation) => validation.run(req))
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = subscriptionValidator;
