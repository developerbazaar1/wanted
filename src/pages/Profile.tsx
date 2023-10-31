import DefaulProfileImg from "../assets/development/defaultProfileImage.jpg";
import Logout from "../assets/logout.png";
import "../css/profile.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Reward from "../assets/gift-card.png";
import Wishlist from "../assets/wishlist.png";
import Seeting_log from "../assets/settings.png";
import QrCode from "../assets/qr-code.png";
const Profile = () => {
  const navigate = useNavigate();
  const activeStyles = {
    backgroundColor: "#C9FFD3",
    boxShadow:
      "0px -4px 2px rgba(0, 0, 0, 0.1), 1px -5px 5px rgba(0, 0, 0, 0.1),  0 5px 5px rgba(0, 0, 0, 0)",
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("wantedToken");
    console.log("logout button is pressed");

    navigate("/login");
  };
  return (
    <>
      <div className="white__background">
        <div className="main_conatienr">
          <div className="main_dig">
            <div className="profile__container">
              <div className="profile_subcontainer">
                <div className="profile_section">
                  <img
                    src={DefaulProfileImg}
                    alt="profile"
                    className="profile_img"
                  />
                  <h3 className="name quicksand-500-24 ">Angela L. Callahan</h3>
                  <div
                    className="pointer"
                    onClick={(event: unknown) => handleLogout(event)}
                  >
                    <img src={Logout} alt="Logout" className="logout_icon" />
                    <span className="quicksand-500-18 ">Logout</span>
                  </div>
                </div>
                <div className="profile_navigation_section">
                  <NavLink
                    to="reward"
                    className=" textdecrotation_none"
                    style={({ isActive }) => (isActive ? activeStyles : {})}
                  >
                    <img src={Reward} alt="Reward" className="reward_icon" />
                    <div className="quicksand-500-18 reward">
                      <span className="d-none md-d-inline">Your</span> Rewards
                    </div>
                  </NavLink>
                  <NavLink
                    to="wishlist"
                    className=" textdecrotation_none"
                    style={({ isActive }) => (isActive ? activeStyles : {})}
                  >
                    <img
                      src={Wishlist}
                      alt="wishlist"
                      className="wishlist_icon"
                    />
                    <div className=" wishlist quicksand-500-18">
                      <span className="d-none md-d-inline">Your</span>
                      Wishlist
                    </div>
                  </NavLink>
                  <NavLink
                    to="."
                    end
                    className="textdecrotation_none"
                    style={({ isActive }) => (isActive ? activeStyles : {})}
                  >
                    <img
                      src={Seeting_log}
                      alt="setting"
                      className="setting_icon"
                    />
                    <div className="seeting accountSetting quicksand-500-18">
                      <span className="d-none md-d-inline">Account</span>
                      Setting
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="setting_content">
                <Outlet />
              </div>
            </div>
            <div className="qr__container">
              <div>
                <h3 className="qr_code_heading">Your QR Code</h3>
                <img src={QrCode} alt="" className="qr_image" />
                <h6>Your 10 Digit Code:</h6>
                <div>
                  <strong>9845654567</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
