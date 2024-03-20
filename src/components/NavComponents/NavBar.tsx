import "./navbar.css";
import navLogo from "../../assets/logo.png";
import UserProfile from "./UserProfile";
import MiddleNav from "./MiddleNav";
import { Link, useSearchParams } from "react-router-dom";
import LoginSingupButton from "./LoginSingupButton";
// import taxonomy from "../../features/taxonomy";

const NavBar = ({ setPriceFilter, setRadiusFilter }: any) => {
  const [searchParams] = useSearchParams();
  const token = localStorage.getItem("userwantedToken");

  // Function to generate query string with encoded parameters if they exist
  const generateQueryString = () => {
    const locationValue = searchParams.get("location");
    const locationParam = locationValue
      ? `location=${encodeURIComponent(locationValue)}`
      : "";

    const taxonomyValue = searchParams.get("taxonomy");
    const taxonomyParam = taxonomyValue
      ? `taxonomy=${encodeURIComponent(taxonomyValue)}`
      : "";

    return `/?${locationParam}${
      locationParam && taxonomyParam ? "&" : ""
    }${taxonomyParam}`;
  };

  return (
    <div className="white__background">
      <div className="nav_container">
        <div className="mobile_top sm-none ">
          <div className="">
            <div className="logo_div">
              {/* Generate Link with conditional parameters */}
              <Link
                to={generateQueryString()}
                onClick={() => {
                  setPriceFilter("");
                  setRadiusFilter("");
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
