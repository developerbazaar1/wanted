import Logo from "../components/Logo.jsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.jsx";
import Mail from "../assets/Mail.svg";
import Account from "../assets/Account.svg";
import { useForm } from "react-hook-form";
// import "../css/login.css";
import { Link } from "react-router-dom";
import { AuthApi } from "../config/axiosUtils.js";
import { loginSignup, updateProtfolio } from "../features/authSlice.js";
import { useDispatch } from "react-redux";
import Spiner from "../components/Spiner.jsx";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
// import { updateProtfolio } from "../features/portfolioSlice.js";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const handleLogin = (data) => {
  //   console.log(data);
  //   localStorage.setItem("wantedToken", "4343wedwe43ds43435r3");
  //   navigate("/");
  // };

  const handleLogin = (fromData) => {
    // console.log(fromData);
    setLoading(true);
    const data = {
      email: fromData.email,
      password: fromData.password,
    };
    AuthApi.Login(data)
      .then((response) => {
        // console.log(response.data);

        dispatch(
          loginSignup({
            user: response.data.user,
            token: response.data.token,
            portfolio_id: response.data.portfolio_id,
          })
        );
        dispatch(
          updateProtfolio({
            portfolioProfile: response.data.portfolio,
          })
        );

        localStorage.setItem("wantedPtoken", response.data.token);
        // navigate("/");
      })
      .catch((e) => {
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }
        toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Spiner loading={loading} />

      <div className="login__bg">
        <div>
          <TopNav />
          <div className="Login__logo">
            <Logo />
          </div>
          <div
            className="login__container container "
            style={{ height: "86vh" }}
          >
            <div>
              <h3 className="login__heading">
                Welcome back, Vendor! Manage Your Deals Here.
                {/* <span> Log in now</span> */}
              </h3>
              <p className="login__description">
                Start Managing Your Deals: Exclusive Benefits Await!
              </p>
              <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                  <div className="mb-2 position-relative">
                    <img src={Mail} alt="main" className="input__icon" />
                    <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Enter Email Address"
                      className=" input__padding login__input"
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
                      name="password"
                      type="password"
                      className=" input__padding login__input"
                      id="password"
                      placeholder="Password"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is Required",
                        },
                        minLength: {
                          value: 6,
                          message:
                            "Password must be at least 6 characters long",
                        },
                      })}
                    />
                  </div>
                  <div className="auth_error">{errors?.password?.message}</div>
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
                      // type="submit"
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
                  Sign up
                </Link>{" "}
                now!
              </div>
            </div>
          </div>
          <LoginFooter />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Login;
