import Logo from "../components/Logo.tsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.tsx";
import Mail from "../assets/Mail.svg";
import { useForm } from "react-hook-form";

import Account from "../assets/Account.svg";
import "../css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginInputTypes } from "../utils/Types.ts";
// import { useAuth } from "../service/auth.ts";
// import { useAppSelector } from "../app/hooks.ts";
import { useAuth } from "../service/auth.ts";
const Login: React.FC = () => {
  const navigate = useNavigate();

  // const count = useAppSelector((state) => state.auth);
  const { user } = useAuth();
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputTypes>();

  const handleLogin = (data: unknown) => {
    console.log(data);

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
              Welcome back to savings!
              <span> Log in now</span>
            </h3>
            <p className="login__description">
              Unlock deals with your account credentials
            </p>
            <form onSubmit={handleSubmit(handleLogin)}>
              <div>
                <div className="mb-3 position-relative">
                  <img src={Mail} alt="main" className="input__icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="form-control input__padding login__input"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid Email Address",
                      },
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                    })}
                  />
                </div>
                <div className="auth_error">{errors?.email?.message}</div>
                <div className="position-relative">
                  <img src={Account} alt="main" className="input__icon" />
                  <input
                    type="password"
                    className="form-control input__padding login__input"
                    id="password"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                </div>
                <div className="auth_error">{errors?.password?.message}</div>
              </div>
              <div className="login__buttons ">
                <div className="py-2 d-flex justify-content-center align-item-center gap-1">
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
                <div className="d-block text-align-center pb-3">
                  <button className="auth__button" type="submit">
                    LOGIN
                  </button>
                </div>
              </div>
              <div className="mb-3">
                <Link
                  to="/forgotassword"
                  style={{
                    color: "#17c737",
                    // textDecoration: "underline",
                  }}
                  className="forgot__password text-decoration-underline"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </form>
            <div>
              New To Wanted?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#17c737",
                }}
              >
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
