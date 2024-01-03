const userSubscriptionPlan = require("../../models/providerModel/ProviderSubscriptionModal");
const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
} = require("../../httpStatusCode");
const Plan = require("../../models/adminModel/PlansSchema");
const PaymentModal = require("../../models/adminModel/Payment");

async function addsubscriptionController(req, res, next) {
  let {
    plan_id,
    provider_id,
    provider_portfolio_id,
    expiryDate,
    numberof_ads,
    remainingAds,
    transaction_id,
  } = req.body;

  try {
    const plan = await Plan.findById(plan_id);

    const existsubscription = await userSubscriptionPlan.find({
      provider_id: provider_id,
      plan_id: plan_id,
      subscriptionStatus: "active",
      remainingAds: { $gt: 0 },
    });

    // console.log("existed subscription", existsubscription);

    if (existsubscription.length > 0) {
      return res.status(CONFLICT).json({
        message: "subscription already exit!",
        status: "error",
      });
    }
    PaymentModal.create({
      provider_id,
      portfolio_id: provider_portfolio_id,
      transaction_id,
      currency: "euro",
      status: true,
      amount: plan.plan_price,
      description: plan.plan_name,
    });
    userSubscriptionPlan
      .create({
        plan_id,
        provider_id,
        provider_portfolio_id,
        expiryDate,
        numberof_ads,
        remainingAds,
        subscriptionPlanName: plan?.plan_name,
        subscriptionPlanPrice: plan?.plan_price,
      })
      .then((result) => {
        // console.log("created subscription", result);
        return res.status(OK).json({
          message: "subscription added successfully",
          status: "success",
          result,
        });
      })
      .catch((e) => {
        // console.log(e);
        return res.status(BAD_REQUEST).json({
          message: e._message,
          status: "error",
        });
      });
  } catch (error) {
    // console.log(error);
    return res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}

async function getProviderSubscription(req, res, next) {
  let { provider_id, provider_portfolio_id } = req.query;
  // console.log(provider_id, provider_portfolio_id);
  try {
    // and remainingAds is greater than zero
    const activeSubscriptions = await userSubscriptionPlan
      .find({
        provider_id: provider_id,
        provider_portfolio_id: provider_portfolio_id,
        subscriptionStatus: "active",
        remainingAds: { $gt: "0" },
      })
      .then((result) => {
        // console.log("active subscription", result);
        return res.status(OK).json({
          status: "success",
          message: "successfylly fetched subscription",
          result,
        });
      })
      .catch((e) => {
        // console.log(e);
        return res.status(BAD_REQUEST).json({
          status: "error",
          message: "subscription not found",
        });
      });

    return activeSubscriptions;
  } catch (error) {
    console.error(error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
}
module.exports = { addsubscriptionController, getProviderSubscription };
