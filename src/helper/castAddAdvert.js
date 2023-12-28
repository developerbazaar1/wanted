export function castAddAdvert(formData, user, portfolio_id) {
  // console.log(formData);
  // console.log(formData?.subscriptionId, "This is subscription id");
  let data = new FormData();
  data.append("advertTitle", formData?.advert_title);
  data.append("whereToShow", formData?.userSearch);
  data.append("advertCategory", formData?.adcategory);
  data.append("advertSubCategory", formData?.subCategory);
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

export function castEditadvertData(
  formData,
  _id,
  provider_id,
  img,
  editAdvertData
) {
  let data = new FormData();
  data.append("_id", _id);
  data.append("provider_id", provider_id);
  data.append("advertTitle", formData?.adverttitle);
  data.append("whereToShow", formData?.wheretshow);
  data.append("advertCategory", formData?.advertcategory);
  data.append("advertSubCategory", formData?.advertsubCategory);
  data.append("advertDescription", formData?.advertdescription);
  if (img.length) {
    img.forEach((file) => {
      data.append("img", file);
    });
  }
  // console.log("old image url", editAdvertData.advertImages.length);
  if (editAdvertData.advertImages.length > 0) {
    editAdvertData.advertImages.forEach((url) => {
      // console.log("old image url", url);
      let ToJson = JSON.stringify(url);
      data.append("oldImgUrl", ToJson);
    });
  }
  // console.log(editAdvertData.advertImages);
  // data.append("oldImgUrl", editAdvertData.advertImages);
  return data;
}
//this function is used to cast
export function castPostAgainAdvert(formData, id, provider_id, portfolio_id) {
  let data = new FormData();
  data.append("id", id);
  data.append("provider_portfolio_id", portfolio_id);
  data.append("provider_id", provider_id);
  data.append("advertTitle", formData?.advert_title);
  data.append("whereToShow", formData?.userSearch);
  data.append("advertCategory", formData?.adcategory);
  data.append("advertSubCategory", formData?.subCategory);
  data.append("advertDescription", formData?.advertDescription);
  data.append("advertLocation", formData?.advertLocation);
  data.append("advertPostalCode", formData?.adPostalCode);
  data.append("advertPrice", formData?.adPrice);
  data.append("subscription_plan_id", formData.subscription_plan_id);
  if (formData?.img) {
    console.log("yes ther is imga");
    data.append("img", formData?.img);
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
