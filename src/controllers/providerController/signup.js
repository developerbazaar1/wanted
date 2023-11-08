const { encryptPassword } = require("../../config/utlis");
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  CREATED,
} = require("../../httpStatusCode");
const jwt = require("jsonwebtoken");
const ProviderUser = require("../../models/providerModel/providerUser");
const ProviderPortfolio = require("../../models/providerModel/providerPortfolio");
const mongoose = require("mongoose");

const signup = async (req, res) => {
  const { email, password, userName } = req.body;
  const session = await mongoose.startSession();

  const transactionOptions = {
    readPreference: "primary",
    readConcern: { level: "local" },
    writeConcern: { w: "majority" },
  };

  let createdUser;
  let portfolio_id; // Declare a variable to store the created user

  try {
    const userExists = await ProviderUser.findOne({ email });

    if (userExists) {
      return res
        .status(BAD_REQUEST)
        .json("User already exists with this email address!");
    }

    const hashPassword = await encryptPassword(password);
    const providerCreationStart = await session.withTransaction(async () => {
      const user = await ProviderUser.create(
        [
          {
            userName: userName,
            email: email,
            password: hashPassword,
            phoneNumber: "",
          },
        ],
        { session }
      );

      if (!user) {
        await session.abortTransaction();
        console.log("Failed to create account");
        throw new Error("Failed to Create account");
      }

      createdUser = user[0]; // Store the created user

      const providerPortfolioCreation = await ProviderPortfolio.create(
        [
          {
            providerId: user[0]._id,
          },
        ],
        { session }
      );
      // createdUser[providerPortfolioCreation[0][providerId]] =
      //   providerPortfolioCreation[0].providerId;

      if (!providerPortfolioCreation) {
        await session.abortTransaction();
        throw new Error("Failed to Setup provider portfolio");
      }

      portfolio_id = providerPortfolioCreation[0]._id;
    }, transactionOptions);

    if (providerCreationStart) {
      const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Account created successfully",
        user: {
          userName: createdUser.userName,
          email: createdUser.email,
          phoneNumber: createdUser.phoneNumber,
          _id: createdUser._id,
        }, // Include the created user in the response
        portfolio_id,
        token: token,
      });
    }
  } catch (error) {
    console.log(error, "in provider signup router");
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  } finally {
    await session.endSession();
  }
};

module.exports = { signup };
