import Group from "../assets/Group.svg";
import PrivacyPolic from "../assets/Encrpyted file.svg";
import TermCondition from "../assets/Audit.svg";
import { Link } from "react-router-dom";

const LoginFooter: React.FC = () => {
  return (
    <>
      <div className="top__nav ">
        <div className="d-flex flex-row  gap-3 py-1 align-items-center footer_top__border top_button_nav ">
          <Link to="/about" className="d-flex gap-2 align-items-center">
            <span className="icon__size d-flex aligin-item-center">
              <img src={Group} alt="app" />
            </span>
            <span>About Us</span>
          </Link>
          <Link to="/privacypolicy" className="d-flex gap-2 align-items-center">
            <span className="icon__size d-flex aligin-item-center">
              <img src={PrivacyPolic} alt="Vender" />
            </span>
            <span>Privacy Policy</span>
          </Link>
          <Link
            to="/term-condition"
            className="d-flex gap-2 align-items-center "
          >
            <span className="icon__size d-flex aligin-item-center">
              <img src={TermCondition} alt="Help" />
            </span>
            <span>Terms & Condition</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginFooter;
