import BeautySpa from "../assets/development/BeautyAndSpa.png";
import BeautySpaBack from "../assets/development/BeauthyAndSpaBack.jpg";
import FoodBeverageBack from "../assets/development/FoodBeverageBack.png";
import FoodBeverage from "../assets/development/FoodAndBeverage.png";
import HealthFitnessBack from "../assets/development/HealthFitnessBack.png";
import HealthFitnes from "../assets/development/HealthAndFitness.png";
import WomenFashionBack from "../assets/development/WomenFashionBack.png";
import WomenFashion from "../assets/development/WomensFashion.png";
import MenFashionBack from "../assets/development/MenFashionBack.png";
import MenFashion from "../assets/development/MensFashion.png";
import HomeApplanciesBack from "../assets/development/HomeApplanciesBack.png";
import HomeApplancies from "../assets/development/HomeApplancies.png";
import FunActivitiesBack from "../assets/development/FunActivitiesBack.png";
import FunActivities from "../assets/development/FunActivities.png";
import TourTravelBack from "../assets/development/ToursTravelBack.png";
import TourTravel from "../assets/development/ToursAndTravel.png";
import "../css/Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className="container_home">
        <div className="single_cat p-0">
          <Link to="/service/beauty">
            <div className="post_cat_img_div">
              <img src={BeautySpaBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={BeautySpa} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Beauty & Spa</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/food">
            <div className="post_cat_img_div">
              <img src={FoodBeverageBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={FoodBeverage} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Food & Beverage</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={HealthFitnessBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={HealthFitnes} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Health & Fitness</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={WomenFashionBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={WomenFashion} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Women’s Fashion</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={MenFashionBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={MenFashion} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Men’s Fashion</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={HomeApplanciesBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={HomeApplancies} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Home Applancies</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={FunActivitiesBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={FunActivities} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Fun Activities</div>
            </div>
          </Link>
        </div>
        <div className="single_cat p-0">
          <Link to="/service/subcategory">
            <div className="post_cat_img_div">
              <img src={TourTravelBack} alt="Beauty&Spa" />
            </div>
            <div className="cat_icon_container">
              <div className="cat_icon_img_div">
                <img src={TourTravel} alt="Beauty&Spa" />
              </div>
              <div className="cat_name">Tours & Travel</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
