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
  data.append("provider_portfolio_id", portfolio_id);
  data.append("provider_id", user.id);
  data.append("img", formData.img);
  data.append("subscription_plan_id", formData.subscription_plan_id);
  return data;
}

export function castEditadvertData(formData, _id, provider_id) {
  let data = new FormData();
  data.append("_id", _id);
  data.append("provider_id", provider_id);
  data.append("advertTitle", formData?.adverttitle);
  data.append("whereToShow", formData?.wheretshow);
  data.append("advertCategory", formData?.advertcategory);
  data.append("advertSubCategory", formData?.advertsubCategory);
  data.append("advertDescription", formData?.advertdescription);
  if (formData?.img) {
    console.log("yes ther is imga");
    data.append("img", formData?.img);
  }
  return data;
}

export function castPostAgainAdvert(formData, id, provider_id) {
  let data = new FormData();
  data.append("_id", id);
  data.append("provider_id", provider_id);
  data.append("advertTitle", formData?.advert_title);
  data.append("whereToShow", formData?.userSearch);
  data.append("advertCategory", formData?.adcategory);
  data.append("advertSubCategory", formData?.subCategory);
  data.append("advertDescription", formData?.advertDescription);
  data.append("advertLocation", formData?.advertLocation);
  data.append("advertPostalCod", formData?.adPostalCode);
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
