const {
  NOT_FOUND,
  BAD_REQUEST,
  OK,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  CREATED,
} = require("../../httpStatusCode");

const advertModal = require("../../models/providerModel/advertModal");

const liveAndLatestOfferController = async (req, res, next) => {
  // const { type } = req.params;
  const { page = 1, pageSize = 6, adstypes } = req.query;

  // console.log("params", type);
  // console.log("query", req.query);

  try {
    const pipeline = [
      {
        $match: {
          advertStatus: "active",
          advertVisibility: true,
          whereToShow: adstypes,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: parseInt(pageSize),
      },
    ];

    const ads = await advertModal.aggregate(pipeline);

    if (ads.length === 0) {
      throw { status: 404, message: "No advertisements found." };
    }

    res.status(200).json({ success: true, data: ads });
  } catch (error) {
    console.error(error);

    if (error.status) {
      res.status(error.status).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
};

module.exports = { liveAndLatestOfferController };
