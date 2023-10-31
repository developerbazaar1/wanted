import "../css/LiveAds.css";
import NextButton from "../components/NextButton";
import { Link, useLocation } from "react-router-dom";
import BeautySpan from "../assets/development/BeauthyAndSpaBack.jpg";
import FoodBeverage from "../assets/development/FoodBeverageBack.png";
import HealthFitness from "../assets/development/HealthFitnessBack.png";
import BoxingBack from "../assets/development/BoxingBack.png";
import CreditHeatlWealth from "../assets/development/CreditHeatlWealth.png";
import HomeAndComfort from "../assets/development/HomeAndComfort.png";

const LatestOffers = () => {
  const location = useLocation();
  console.log(location);

  const offers = [
    {
      PosteImage: BeautySpan,
      Cat: "Beauty & Spa / Salon",
      Description: "Up to 37% Off on Nail Spa Salon - Shellac  No-Chip  Gel",
      Provider: "Reybella Nails",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "1",
    },
    {
      PosteImage: FoodBeverage,
      Cat: "Food & Beverages / Breweries & Wineries",
      Description: "$40 for $50 Gift Card to Buffalo Creek Brewing ($50 Value)",
      Provider: "Buffalo Creek Brewing",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "2",
    },
    {
      PosteImage: HealthFitness,
      Cat: "Health & Fitness / Sports",
      Description:
        "10 Kickboxing Classes or One Month of Unlimited Kickboxing (Up to 61% Off)",
      Provider: "Mind Body Defense",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "3",
    },
    {
      PosteImage: BoxingBack,

      Cat: "Health & Fitness / Sports",
      Description:
        "Two-Hour Downtown Kayak Rental or 90-Minute Moonlight or Sunset Paddle",
      Provider: "Wateriders Kayak Tours",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "4",
    },
    {
      PosteImage: CreditHeatlWealth,
      Cat: "Men’s Fashion / Men’s Accessories",
      Description:
        "Men's Leather Wallet Credit Card Holder RFID Blocking Zipper Pocket Purse",
      Provider: "Wateriders Kayak Tours",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "5",
    },
    {
      PosteImage: HomeAndComfort,
      Cat: "Health & Fitness / Sports",
      Description:
        "Men's Leather Wallet Credit Card Holder RFID Blocking Zipper Pocket Purse",
      Provider: "Wateriders Kayak Tours",
      Price: "£39.99",
      OffPrice: "£86",
      Id: "6",
    },
  ];
  return (
    <>
      <div className="container_live">
        {offers?.map((offer) => (
          <Link to="details" className="single_Ads p-0" key={offer.Id}>
            <div>
              <div className="ads_img_div">
                <img src={`${offer.PosteImage}`} alt="faceAndSkin" />
                <div className="favoruite">
                  <svg
                    viewBox="0 0 24 24"
                    className="unfilled"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                </div>
              </div>
              <div className="ads_details">
                <div className="ads_cat">{offer.Cat}</div>
                <p>{offer.Description}</p>
                <div className="provider">{offer.Provider}</div>
                <div>
                  <span className="price">{offer.Price}</span>
                  <span className="off_price">{offer.OffPrice}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        <NextButton />
      </div>
    </>
  );
};

export default LatestOffers;
