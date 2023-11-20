const mongoose = require("mongoose");
const {
  OK,
  FAILED_DEPENDENCY,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  BAD_REQUEST,
} = require("../../httpStatusCode");

const Plan = require("../../models/adminModel/PlansSchema");

/**
 *
 * @param {*plan_name, plan_price, no_of_ads, validity, frequency} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

const addPlanController = async (req, res, next) => {
  let { plan_name, plan_price, no_of_ads, validity, frequency } = req.body;
  //   console.log(plan_name, plan_price, no_of_ads, validity, frequency);

  try {
    let plan = await Plan.create({
      plan_name,
      plan_price,
      no_of_ads,
      validity,
      frequency,
    });

    if (!plan) {
      return res.status(FAILED_DEPENDENCY).json({
        status: "error",
        message: "Plan To Create Plan",
      });
    }

    return res.status(OK).json({
      status: "success",
      message: "Plan Created Successfully",
      plan,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {* plan_name, plan_price, no_of_ads, validity, frequency} req
 * @param {*Plan id to update} req
 * @returns
 */
const updatePlanController = async (req, res, next) => {
  let { plan_name, plan_price, no_of_ads, validity, frequency } = req.body;
  let { _id } = req.query;

  //   console.log(plan_name, plan_price, no_of_ads, validity, frequency);

  let updateValue = {
    plan_name,
    plan_price,
    no_of_ads,
    validity,
    frequency,
  };

  try {
    let existingPlan = await Plan.findById(_id);

    if (!existingPlan) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Plan not found",
      });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(
      _id,
      { $set: updateValue },
      { returnDocument: "after" }
    );
    console.log(updatedPlan);
    if (!updatedPlan) {
      return res.status(FAILED_DEPENDENCY).json({
        status: "error",
        message: "Failed To Update Plan",
      });
    }

    return res.status(OK).json({
      status: "success",
      message: "Plan Updated Successfully",
      updatedPlan,
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {plan_id} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const deletePlanController = async (req, res, next) => {
  let { _id } = req.query;
  //   console.log(plan_name, plan_price, no_of_ads, validity, frequency);

  if (!_id) {
    return res.status(BAD_REQUEST).json({
      status: "error",
      message: "Provide Plan To Be Deleted",
    });
  }

  try {
    let existingPlan = await Plan.findById(_id);

    if (!existingPlan) {
      return res.status(NOT_FOUND).json({
        status: "error",
        message: "Plan not found",
      });
    }

    const deleteProduct = await Plan.findByIdAndDelete(_id);

    if (!deleteProduct) {
      return res.status(INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: "Failed To Delete Plan",
      });
    }
    return res.status(OK).json({
      status: "success",
      message: "Plan Delted  Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns all the plans
 */
const getPlanController = async (req, res) => {
  try {
    let plan = await Plan.find({});
    return res.status(OK).json({
      status: "Success",
      message: "All plan is Fetched Successfylly",
      plan,
    });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  addPlanController,
  updatePlanController,
  deletePlanController,
  getPlanController,
};
