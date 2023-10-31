import Logo from "../components/Logo.jsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.jsx";
import Mail from "../assets/Mail.svg";
// import "../css/login.css";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="login__bg forgot__password__container">
        <TopNav />
        <div className="Forgot_Logo">
          <Logo />
        </div>
        <div className="login__container container flex-grow-1 ">
          <div className="forgot__container">
            <div className="d-flex mb-2">
              <Link to="/login">
                <IoIosArrowRoundBack className="auth_back_button text-light" />
              </Link>
              <h3 className="forgot_password_heading width_100">
                Forgot Your Password?
              </h3>
            </div>
            <p className="fortgot_description text-light">
              No worries, we&rsquo;ll help you reset it
            </p>
            <form>
              <div className="forgot_password_input_container">
                <div className="mb-2 position-relative">
                  <img src={Mail} alt="main" className="input__icon" />
                  <input
                    name="fullName"
                    type="email"
                    id="full_name"
                    placeholder="Enter Email Address"
                    className=" input__padding login__input"
                  />
                </div>
              </div>
              <div className="login__buttons ">
                <div className="d-block text-align-center ">
                  <button className="auth__button">SUBMIT</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <LoginFooter />
      </div>
    </>
  );
};

export default ForgotPassword;
