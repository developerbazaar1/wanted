// import { BiLogoPlayStore } from "react-icons/bi";
import Shop from "../assets/Shop.svg";
import helpDesk from "../assets/Help desk.svg";
import AppStore from "../assets/AppStore.png";
import { Link } from "react-router-dom";
const TopNav: React.FC = () => {
  return (
    <>
      <div className="top__nav">
        <div className=" flex-row top_button_nav   gap-3 py-1 align-items-center top_bootm-border">
          <Link to="#" className="d-flex gap-2 align-items-center">
            {/* <div className="d-flex gap-2 align-items-center"> */}
            <span className="icon__size d-flex aligin-item-center">
              {/* <BiLogoPlayStore /> */}
              <img src={AppStore} alt="app" />
            </span>
            <span>Get the Wanted Apps</span>
            {/* </div> */}
          </Link>
          <Link to="#" className="d-flex gap-2 align-items-center">
            <span className="icon__size d-flex aligin-item-center">
              <img src={Shop} alt="Vender" />
            </span>
            <span>Become a Vendor</span>
          </Link>
          <Link to="#" className="d-flex gap-2 align-items-center ">
            <span className="icon__size d-flex aligin-item-center">
              <img src={helpDesk} alt="Help" />
            </span>
            <span>Help</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopNav;
