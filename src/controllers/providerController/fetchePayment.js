const {
  FAILED_DEPENDENCY,
  OK,
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
} = require("../../httpStatusCode");
const PaymentModal = require("../../models/adminModel/Payment");

async function fetchedPaymentController(req, res) {
  let { provider_id, portfolio_id } = req.query;
  // console.log(provider_id, portfolio_id);

  try {
    if (!provider_id || !portfolio_id) {
      return res.status(BAD_REQUEST).json({
        status: "error",
        message: "Provider Id Or Portfolio Id is Missing",
      });
    }

    PaymentModal.find({ provider_id, portfolio_id })
      .then((payment) => {
        return res.status(OK).json({
          message: "Successfully Fetched Payment",
          payment,
        });
      })
      .catch((errr) => {
        return res.status(FAILED_DEPENDENCY).json({
          status: "error",
          message: "Failed To Load Payment Histroy Try Later",
        });
      });
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
}

module.exports = fetchedPaymentController;
