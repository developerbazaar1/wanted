const { INTERNAL_SERVER_ERROR } = require("../httpStatusCode");

const AdvertAndProductDataCast = async (req, res, next) => {
  // console.log("this is files", req.files);
  // return res.status(404).json("error");
  let {
    advertTitle,
    advertPostalCode,
    advertPrice,
    advertLocation,
    advertOfferPrice,
    advertDescription,
    products,
    product,
    advertImage,
  } = req.body;

  try {
    if (req?.fileUrls?.mainImg) {
      advertImage = req?.fileUrls?.mainImg;
    }
    // console.log("this is old products before  parsing", products);

    if (products) {
      products = JSON.parse(products);
    }

    if (product) {
      req.body["newProducts"] = JSON.parse(product);
    }

    if (req.fileUrls) {
      for (let i = 0; i < req.query.numOfOldProduct; i++) {
        let newImgUrl = req.fileUrls[`oldProductImg${i + 1}`] || [];
        // console.log("new product url", newImgUrl);
        products[i].productImg.push(...newImgUrl);
      }
    }

    // this is used to associate new product images to new product
    if (req?.body?.newProducts) {
      for (let i = 0; i < req?.body?.newProducts?.length; i++) {
        let productImgKey = `productImg${i + 1}`;
        let productImgArray = req.fileUrls[productImgKey];
        req.body.newProducts[i].productImg = productImgArray;
      }
      // console.log("old products", products);
      if (!products) {
        products = req.body.newProducts;
      } else {
        products = products.concat(req.body.newProducts);
      }
      // console.log("after concat products", products);

      // log
    }

    req.body["updateFields"] = {
      advertTitle,
      advertPostalCode,
      advertPrice,
      advertLocation,
      advertOfferPrice,
      advertDescription,
      products,
      advertImage,
    };

    // console.log("files url", req.fileUrls);

    // console.log("upload values", req.body["updateFields"]);

    next();
  } catch (error) {
    console.log("error in advertProduct Cast Controller->", error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = AdvertAndProductDataCast;
