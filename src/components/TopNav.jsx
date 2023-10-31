import helpDesk from "../assets/Help desk.svg";
import AppStore from "../assets/AppStore.png";
import { GiShoppingCart } from "react-icons/gi";
import { Link } from "react-router-dom";
const TopNav = () => {
  return (
    <>
      <div className="top__nav">
        <div className="d-flex flex-row justify-content-end gap-3 py-1 align-items-center top_bootm-border">
          <Link to="#" className="d-flex gap-2 align-items-center text-light">
            <span className="icon__size d-flex aligin-item-center">
              <img src={AppStore} alt="app" />
            </span>
            <span>Get the Wanted Apps</span>
          </Link>
          <Link to="#" className="d-flex gap-2 align-items-center text-light">
            <span className="icon__size d-flex aligin-item-center">
              <GiShoppingCart />
            </span>
            <span>Become a Customer</span>
          </Link>
          <Link to="#" className="d-flex gap-2 align-items-center text-light">
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
