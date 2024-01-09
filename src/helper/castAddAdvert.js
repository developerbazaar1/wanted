export function castAddAdvert(formData, user, portfolio_id) {
  // console.log(formData);
  // console.log(formData?.subscriptionId, "This is subscription id");
  let data = new FormData();
  data.append("advertTitle", formData?.advert_title);
  data.append("whereToShow", formData?.userSearch);
  // data.append("advertCategory", formData?.adcategory);
  // data.append("advertSubCategory", formData?.subCategory);
  data.append("advertLocation", formData?.ad_location);
  data.append("advertPrice", formData?.adPrice);
  data.append("advertDescription", formData?.exampleTextarea);
  data.append("advertPostalCode", formData?.adPostalCode);
  data.append("advertProviderPortfolio_id", portfolio_id);
  data.append("advertProvider_id", user.id);
  data.append("portfolioImageCheckbox", formData.portfolioImageCheckbox);
  data.append("advertOfferPrice", formData.advertOfferPrice);
  if (formData?.product?.length > 0) {
    if (formData?.addProduct === "YesAddProduct") {
      console.log("yes product");
      data.append("product", JSON.stringify(formData.product));
    }
  }
  if (formData?.productImg?.length > 0) {
    formData.productImg.forEach((product, ParentIndex) => {
      product.forEach((productimg) => {
        data.append(`productImg${ParentIndex + 1}`, productimg);
      });
    });
  }
  if (formData?.portfolioImageCheckbox === false) {
    data.append("mainImg", formData.img);
    console.log("advert mainImg");
  }
  data.append("subscription_plan_id", formData.subscription_plan_id);
  return data;
}

export function castEditadvertData(formData, _id, provider_id) {
  let data = new FormData();
  data.append("advertId", _id);
  data.append("provider_id", provider_id);
  // data.append("advertCategory", formData.advertCategory);
  data.append("advertTitle", formData?.advertTitle);
  // data.append("advertSubCategory", formData?.advertSubCategory);
  data.append("advertDescription", formData?.advertDescription);
  data.append("advertLocation", formData?.advertLocation);
  data.append("advertPrice", formData?.advertPrice);
  data.append("advertOfferPrice", formData?.advertOfferPrice);
  data.append("advertPostalCode", formData?.advertPostalCode);
  if (formData?.mainImg) {
    data.append("mainImg", formData.mainImg);
    // console.log("advert mainImg");
  }

  // console.log("number of products in cast", formData.porducts.length);
  if (formData?.products?.length > 0) {
    // console.log("old product in cast", formData?.products);
    data.append("products", JSON.stringify(formData.products));
  }
  if (formData?.product?.length > 0) {
    console.log("new product in cast", formData?.product);
    data.append("product", JSON.stringify(formData.product));
  }

  if (formData?.productImg?.length > 0) {
    formData.productImg.forEach((product, ParentIndex) => {
      product.forEach((productimg) => {
        data.append(`productImg${ParentIndex + 1}`, productimg);
      });
    });
  }

  if (formData.oldProductImg) {
    formData.oldProductImg.forEach((oldProductimg, mainIndex) => {
      oldProductimg.forEach((img) => {
        data.append(`oldProductImg${mainIndex + 1}`, img);
      });
      // console.log("old Product Img", oldProductimg);
    });
  }

  return data;
}
//this function is used to cast
export function castPostAgainAdvert(formData, _id, provider_id) {
  let data = new FormData();
  data.append("advertId", _id);
  data.append("provider_id", provider_id);
  // data.append("advertCategory", formData.advertCategory);
  data.append("advertTitle", formData?.advertTitle);
  // data.append("advertSubCategory", formData?.advertSubCategory);
  data.append("advertDescription", formData?.advertDescription);
  data.append("advertLocation", formData?.advertLocation);
  data.append("advertPrice", formData?.advertPrice);
  data.append("advertOfferPrice", formData?.advertOfferPrice);
  data.append("advertPostalCode", formData?.advertPostalCode);
  data.append("subscription_plan_id", formData.subscription_plan_id);
  data.append("whereToShow", formData.whereToShow);
  if (formData?.mainImg) {
    data.append("mainImg", formData.mainImg);
    // console.log("advert mainImg");
  }

  // console.log("number of products in cast", formData.porducts.length);
  if (formData?.products?.length > 0) {
    // console.log("old product in cast", formData?.products);
    data.append("products", JSON.stringify(formData.products));
  }
  if (formData?.product?.length > 0) {
    if (formData?.addProduct === "YesAddProduct") {
      // console.log("new product in cast", formData?.product);
      data.append("product", JSON.stringify(formData.product));
    }
  }

  if (formData?.productImg?.length > 0) {
    formData.productImg.forEach((product, ParentIndex) => {
      product.forEach((productimg) => {
        data.append(`productImg${ParentIndex + 1}`, productimg);
      });
    });
  }

  if (formData.oldProductImg) {
    formData.oldProductImg.forEach((oldProductimg, mainIndex) => {
      oldProductimg.forEach((img) => {
        data.append(`oldProductImg${mainIndex + 1}`, img);
      });
      // console.log("old Product Img", oldProductimg);
    });
  }

  return data;
}

export function castPortfolioData(formData, id) {
  let data = new FormData();
  data.append("_id", id);
  data.append("storeName", formData?.store_name);
  data.append("storeAddress", formData?.store_address);
  data.append("storeEmail", formData?.store_email);
  data.append("storeCategory", formData?.store_category);
  data.append("storeDescription", formData?.store_description);
  data.append("storeWebsite", formData?.store_website);
  data.append("storeContactDetails", formData?.store_contact);
  data.append("storeSubCategory", formData?.store_subcategory);
  data.append("storeThumbNail", formData?.storeThumbNail);
  if (formData?.img) {
    console.log("yes there is imga");
    data.append("img", formData?.img);
  }
  return data;
}
