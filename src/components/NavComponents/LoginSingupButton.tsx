import { Link } from "react-router-dom";
import login from "../../assets/Login.svg";
import signup from "../../assets/signup.svg";
const LoginSingupButton = () => {
  return (
    <>
      <div className="nav_login_profile">
        <div className="auth">
          <div>
            <Link to="/login" className="login">
              <img
                src={login}
                alt="login"
                style={{
                  width: "16px",
                  height: "16px",
                }}
              />
              <span>Login</span>
            </Link>
          </div>
          <div>
            <Link to="signup" className="signUp">
              <img src={signup} alt="login" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSingupButton;
