import Logo from "../components/Logo.jsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.jsx";
import Mail from "../assets/Mail.svg";
import Account from "../assets/Account.svg";
import Avatar from "../assets/Avatar.svg";
// import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handelSignup = (e) => {
    e.preventDefault();
    console.log("setting the token");

    localStorage.setItem("wantedToken", "4343wedwe43ds43435r3");
    navigate("/");
  };
  return (
    <div className="login__bg">
      <TopNav />
      <div className="Login__logo">
        <Logo />
      </div>
      <div className="login__container container" style={{ height: "86vh" }}>
        <div>
          <h3 className="login__heading">
            Unlock Coupon Deals: Partner with Us!
          </h3>
          <p className="login__description">
            Start Earning: Exclusive Vendor Benefits Await You!
          </p>
          <form>
            <div>
              <div className="mb-2 position-relative">
                <img src={Avatar} alt="main" className="input__icon" />
                <input
                  name="fullName"
                  type="email"
                  id="full_name"
                  placeholder="Enter Full Name"
                  className=" input__padding login__input"
                />
              </div>
              <div className="mb-2 position-relative">
                <img src={Mail} alt="main" className="input__icon" />
                <input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter Email Address"
                  className=" input__padding login__input"
                />
              </div>
              <div className="position-relative">
                <img src={Account} alt="main" className="input__icon" />
                <input
                  name="password"
                  type="password"
                  className=" input__padding login__input"
                  id="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="login__buttons ">
              <div className="py-3 d-flex justify-content-center align-item-center gap-3">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="savePassword form-check-input"
                />
                <label
                  className="form-check-label acc-terms-label mr-2 "
                  htmlFor="checkbox"
                >
                  Agree to Terms & Privacy to Create Account.
                </label>
              </div>
              <div className="d-block text-align-center pb-3">
                <button
                  className="auth__button"
                  onClick={(event) => handelSignup(event)}
                >
                  SIGN UP
                </button>
              </div>
            </div>
          </form>
          <div>
            Already have an account? in &nbsp;
            <Link to="/login" className="vendor_signup_link">
              Log in
            </Link>{" "}
            here.
          </div>
        </div>
      </div>
      <LoginFooter />
    </div>
  );
};

export default SignUp;
