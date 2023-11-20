const { body, validationResult } = require("express-validator");

const planValidator = [
  // Use express-validator to define validations
  body("plan_name")
    .trim()
    .escape()
    .isString()
    .notEmpty()
    .withMessage("Plan name is required and must be a string"),
  body("plan_price")
    .isNumeric()
    .escape()
    .notEmpty()
    .withMessage("Plan price is required and must be a number"),
  body("no_of_ads")
    .isInt()
    .escape()
    .notEmpty()
    .withMessage("Number of ads is required and must be an integer"),
  body("validity")
    .isInt()
    .escape()
    .notEmpty()
    .withMessage("Validity is required and must be an integer"),
  body("frequency").isIn(["daily", "weekly", "monthly"]).notEmpty(),
  // Custom validation logic can be added here

  // Middleware function to handle validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    // If validation passes, proceed to the next middleware
    next();
  },
];

module.exports = {
  planValidator,
};
