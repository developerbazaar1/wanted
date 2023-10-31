import { Link } from "react-router-dom";
import LoginFooter from "../components/LoginFooter";
import Logo from "../components/Logo";
import TopNav from "../components/TopNav";
import { IoIosArrowRoundBack } from "react-icons/io";
const ResetPassworConform = () => {
  return (
    <div className="login__bg">
      <div>
        <TopNav />
        <div
          className="Login__log"
          style={{
            marginLeft: "70px",
          }}
        >
          <Logo />
        </div>

        <div className="login__container container " style={{ height: "86vh" }}>
          <div>
            <div className="d-flex ">
              <Link to="/login">
                <IoIosArrowRoundBack className="auth_back_button text-light" />
              </Link>
              <p className="login__heading text-light">
                Password Reset Instructions Sent
              </p>
            </div>
            <p className="text-light">
              No worries, we &rsquo;ll help you reset it.
            </p>
            <form>
              <div className="login__buttons mb-1">
                <div className="d-block text-align-center ">
                  <Link to="/login" className="vendor_rest_button text-light">
                    Go Back To Login
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <LoginFooter />
      </div>
    </div>
  );
};

export default ResetPassworConform;
