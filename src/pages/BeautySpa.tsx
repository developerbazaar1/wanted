import { Link } from "react-router-dom";
import FaceAndSkin from "../assets/development/FaceAndSkin.png";
import "../css/LiveAds.css";
const BeautySpa = () => {
  const runYourFunction = () => {
    // Implement your function here
    console.log("Favorite icon clicked!");
    // Add your functionality here
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    runYourFunction();
  };
  return (
    <div className="container_live justify-content-start">
      <Link to="/details" className="single_Ads p-0">
        <div>
          <div className="ads_img_div">
            <img src={FaceAndSkin} alt="faceAndSkin" />
            <div
              className="favoruite"
              onClick={(event: any) => handleFavoriteClick(event)}
            >
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
            <div className="ads_cat">Beauty & Spa / Face &Skin</div>
            <p>$59 for One Targeted Facial Treatment with One Add-On</p>
            <div className="provider">Oasis Face Bar</div>
            <div>
              <span className="price">£39.99</span>
              <span className="off_price">£86.5</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BeautySpa;
