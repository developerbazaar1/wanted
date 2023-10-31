import Logo from "../components/Logo.jsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.jsx";
import Mail from "../assets/Mail.svg";
import Account from "../assets/Account.svg";
// import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("wantedToken", "4343wedwe43ds43435r3");
    navigate("/");
  };
  return (
    <div className="login__bg">
      <div>
        <TopNav />
        <div className="Login__logo">
          <Logo />
        </div>
        <div className="login__container container " style={{ height: "86vh" }}>
          <div>
            <h3 className="login__heading">
              Welcome back, Vendor! Manage Your Deals Here.
              {/* <span> Log in now</span> */}
            </h3>
            <p className="login__description">
              Start Managing Your Deals: Exclusive Benefits Await!
            </p>
            <form>
              <div>
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
                    Save My Login Details
                  </label>
                </div>
                <div className="d-block text-align-center ">
                  <button
                    className="auth__button"
                    onClick={(event) => handleLogin(event)}
                  >
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <Link
                  to="/forgotassword"
                  style={{
                    color: "#17c737",
                  }}
                  className="forgot__password"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </form>
            <div>
              New To Wanted?{" "}
              <Link to="/signup" className="vendor_signup_link">
                Sing up
              </Link>{" "}
              now!
            </div>
          </div>
        </div>
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
