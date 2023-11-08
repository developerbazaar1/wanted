export function castAddAdvert(formData, user, portfolio_id) {
  const data = {
    advertTitle: formData?.advert_title,
    whereToShow: formData?.userSearch,
    advertCategory: formData?.adcategory,
    advertSubCategory: formData?.subCategory,
    advertLocation: formData?.ad_location,
    advertPrice: formData?.adPrice,
    advertDescription: formData?.exampleTextarea,
    advertPostalCode: formData?.adPostalCode,
    advertImages: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg_5-70ZYLlEVmHIgasofVWzdKVJb52PbKJTNjX5gxdvFGyABFQr8GOipuss8h4kT5Akw&usqp=CAU",
    ],
    provider_portfolio_id: portfolio_id,
    provider_id: user.id,
  };
  console.log(data);
  return data;
}
