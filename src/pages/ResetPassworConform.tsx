import LoginFooter from "../components/LoginFooter";
import Logo from "../components/Logo";
import TopNav from "../components/TopNav";
import "../css/login.css";
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
            <div className="d-flex">
              <IoIosArrowRoundBack className="auth_back_button" />
              <p className="login__heading">
                Password Reset Instructions Sent
                <span> Log in now</span>
              </p>
            </div>
            <p className="login__description">
              No worries, we'll help you reset it.
            </p>
            <form>
              <div></div>
              <div className="login__buttons ">
                <div className="d-block text-align-center ">
                  <button className="go_back">Go Back To Login</button>
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
