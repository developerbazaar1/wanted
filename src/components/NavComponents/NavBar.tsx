import "./navbar.css";
import navLogo from "../../assets/logo.png";
// import login from "../../assets/login.png";
import UserProfile from "./UserProfile";
import MiddleNav from "./MiddleNav";
import { Link } from "react-router-dom";
import LoginSingupButton from "./LoginSingupButton";
import { useContext } from "react";
import { SearchContext } from "../../features/searchContext";
const NavBar = ({ setPriceFilter }: any) => {
  const { updatetaxonomyFilterQuery } = useContext(SearchContext);

  const token = localStorage.getItem("userwantedToken");
  return (
    <div className="white__background">
      <div className="nav_container">
        <div className="mobile_top sm-none ">
          <div className="">
            <div className="logo_div">
              <Link
                to="/"
                onClick={() => {
                  updatetaxonomyFilterQuery("");
                  setPriceFilter("");
                }}
                state={{ reset: "resetSearch" }}
              >
                <img src={navLogo} className="nav_logo" alt="" />
              </Link>
            </div>
          </div>
          {/* nav middle section for large */}
          {/* <LoginSingupButton /> */}
          <div className="d-none d-lg-block large_middle_nav">
            <MiddleNav />
          </div>

          {/*  */}
          {token ? <UserProfile /> : <LoginSingupButton />}
        </div>
        <div className="d-lg-none">
          <MiddleNav />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
