import Logo from "../components/Logo.tsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.tsx";
import Mail from "../assets/Mail.svg";
import Account from "../assets/Account.svg";
import Avatar from "../assets/Avatar.svg";
import "../css/login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupInputTypes } from "../utils/Types.ts";
import { AuthApi } from "../config/AxiosUtils.ts";
import { useState } from "react";
import Spiner from "../components/Spiner.tsx";
import { ToastContainer, toast } from "react-toastify";
import { loginSignup } from "../features/authSlice.ts";
import { useDispatch } from "react-redux";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signupInputTypes>();

  const handelSignup = (data: signupInputTypes) => {
    setLoading(true);
    AuthApi.Signup(data)
      .then((res) => {
        console.log(res.data);

        dispatch(
          loginSignup({
            user: res?.data?.user,
            token: res?.data?.token,
          })
        );
        localStorage.setItem("userwantedToken", res?.data?.token);
        navigate("/");
      })
      .catch((e) => {
        console.log(e.response);
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
        <TopNav />
        <div className="Login__logo">
          <Logo />
        </div>
        <div className="login__container container" style={{ height: "86vh" }}>
          <div>
            <h3 className="login__heading">
              Unlock Savings:
              <span> Join Us and Sign Up!</span>
            </h3>
            <p className="login__description">
              Start Sparing: Exclusive Coupons Await You
            </p>
            <form onSubmit={handleSubmit(handelSignup)}>
              <div>
                <div className="mb-2 position-relative">
                  <img src={Avatar} alt="main" className="input__icon" />
                  <input
                    type="text"
                    id="userName"
                    placeholder="Enter Full Name"
                    className="form-control input__padding login__input"
                    {...register("userName", {
                      pattern: {
                        value: /^[ A-Za-z0-9._%+-]*$/,
                        message: "Invalid Name",
                      },
                      required: {
                        value: true,
                        message: "userName is Required",
                      },
                    })}
                  />
                </div>
                <div className="auth_error">{errors?.userName?.message}</div>
                <div className="mb-2 position-relative">
                  <img src={Mail} alt="main" className="input__icon" />
                  <input
                    // name="email"
                    type="email"
                    id="email"
                    placeholder="Enter Email Address"
                    className="form-control input__padding login__input"
                    {...register("email", {
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a Valid Email",
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
                      minLength: {
                        value: 6,
                        message: "Password Should be More Than 6 Characters",
                      },
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                    })}
                  />
                </div>
                <div className="auth_error">{errors?.password?.message}</div>
              </div>
              <div className="login__buttons ">
                <div>
                  <div
                    style={{
                      color: "#ff3131",
                    }}
                  >
                    {errors?.termsAndCondition?.message}
                  </div>

                  <div className="py-3 d-flex justify-content-center align-item-center gap-1">
                    <input
                      type="checkbox"
                      id="termsAndCondition"
                      {...register("termsAndCondition", {
                        required: {
                          value: true,
                          message: "Please Accept the Terms&Condition",
                        },
                      })}
                    />
                    <label
                      className="form-check-label acc-terms-label mr-2 "
                      htmlFor="checkbox"
                    >
                      Agree to Terms & Privacy to Create Account.
                    </label>
                  </div>
                </div>
                <div className="d-block text-align-center pb-3">
                  <button className="auth__button" type="submit">
                    SIGN UP
                  </button>
                </div>
              </div>
            </form>
            <div>
              Already have an account? in &nbsp;
              <Link
                to="/login"
                style={{
                  color: "#17c737",
                }}
              >
                Log in
              </Link>{" "}
              here.
            </div>
          </div>
        </div>
        <LoginFooter />
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

export default SignUp;
