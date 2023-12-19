import { Link, Outlet, useNavigate } from "react-router-dom";
import navLogo from "../../assets/logo.png";
import "../../css/MyCss.css";
import Footer from "./Footer";
import { BiUser } from "react-icons/bi";
import TopNav from "../TopNav";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useAuth } from "../../service/auth";
const NavBar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const toekn = localStorage.getItem("wantedPtoken");

  const handleLogout = () => {
    localStorage.removeItem("wantedPtoken");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <TopNav />
      </div>
      <div className="vendor_nav">
        <div>
          <Link to="/" className="vendor_log_container">
            <img src={navLogo} alt="log" />
          </Link>

          <div className="vendor_profile_container hover_black">
            {toekn && (
              <Link to="../" className="vendor_profile_name text-light">
                <BiUser className="vendor_profile_icon" />

                <div>{user?.userName}</div>
              </Link>
            )}

            <div className="vendor_logout" onClick={() => handleLogout()}>
              <svg
                className=""
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <g clipPath="url(#clip0_2161_381)">
                  <path
                    d="M13.5038 6.78732L12.0488 5.33186C11.82 5.10296 11.449 5.10293 11.2202 5.33171C10.9913 5.56052 10.9913 5.9315 11.22 6.16034L11.6752 6.61561H10.0286C9.70495 6.61561 9.44263 6.87794 9.44263 7.20155C9.44263 7.52516 9.70495 7.78748 10.0286 7.78748H11.6751L11.22 8.24272C10.9913 8.47159 10.9913 8.84258 11.2202 9.07135C11.3346 9.18573 11.4845 9.24289 11.6344 9.24289C11.7844 9.24289 11.9344 9.18564 12.0488 9.07121L13.5038 7.61577C13.7326 7.387 13.7326 7.0161 13.5038 6.78732Z"
                    fill="white"
                  />
                  <path
                    d="M11.6177 10.4265C11.2941 10.4265 11.0318 10.6889 11.0318 11.0125V11.1152C11.0318 11.7619 10.5056 12.288 9.85893 12.288H7.96437C7.66835 12.288 7.41889 12.5088 7.3828 12.8025C7.33891 13.1599 7.13401 13.4726 6.82059 13.6604C6.50914 13.847 6.13572 13.8788 5.79606 13.7475L3.24639 12.7621C2.7978 12.5887 2.49633 12.1491 2.49633 11.6682V2.39779C2.49633 2.38889 2.49613 2.38007 2.49572 2.37125C2.4961 2.36246 2.49633 2.35361 2.49633 2.34471C2.49633 2.04225 2.61141 1.76618 2.80008 1.55797L6.64179 3.04273C7.09039 3.21611 7.39185 3.65574 7.39185 4.13664V9.94426C7.39185 10.2679 7.65417 10.5302 7.97779 10.5302C8.3014 10.5302 8.56372 10.2679 8.56372 9.94426V4.13664C8.56372 3.6613 8.42163 3.20287 8.15286 2.81082C7.88407 2.4188 7.50766 2.12103 7.06428 1.94964L5.05177 1.17187H9.8589C10.5056 1.17187 11.0317 1.69801 11.0317 2.34471V3.40777C11.0317 3.73138 11.2941 3.99371 11.6177 3.99371C11.9413 3.99371 12.2036 3.73138 12.2036 3.40777V2.34471C12.2036 1.05181 11.1518 0 9.8589 0H3.66917C2.37627 0 1.32446 1.05181 1.32446 2.34471C1.32446 2.35361 1.32467 2.36243 1.32508 2.37125C1.3247 2.38004 1.32446 2.38889 1.32446 2.39779V11.6682C1.32446 12.1436 1.46655 12.602 1.73532 12.9941C2.00412 13.3861 2.38052 13.6838 2.8239 13.8552L5.37357 14.8407C5.64948 14.9473 5.93662 15.0001 6.22215 15C6.63922 15 7.05286 14.8874 7.42296 14.6656C7.8935 14.3836 8.24166 13.9589 8.42286 13.4599H9.8589C11.1518 13.4599 12.2036 12.4081 12.2036 11.1152V11.0125C12.2036 10.6889 11.9413 10.4265 11.6177 10.4265Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2161_381">
                    <rect width="15" height="15" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>{toekn ? "Logout" : "Login"}</div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <Footer />
    </>
  );
};

export default NavBar;
