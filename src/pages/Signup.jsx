import Logo from "../components/Logo.jsx";
import TopNav from "../components/TopNav";
import LoginFooter from "../components/LoginFooter.jsx";
import Mail from "../assets/Mail.svg";
import Account from "../assets/Account.svg";
import Avatar from "../assets/Avatar.svg";
import { AuthApi } from "../config/axiosUtils.js";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSignup } from "../features/authSlice.js";
import { useDispatch } from "react-redux";

const SignUp = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelSignup = (fromData) => {
    console.log(fromData);
    const data = {
      email: fromData.email,
      password: fromData.password,
      userName: fromData.full_name,
    };
    AuthApi.Signup(data)
      .then((response) => {
        console.log(response);

        dispatch(
          loginSignup({
            user: response.data.user,
            token: response.data.token,
            portfolio_id: response?.data?.portfolio_id,
          })
        );
        localStorage.setItem("wantedPtoken", response.data.token);
        // navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
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
          <form onSubmit={handleSubmit(handelSignup)}>
            <div>
              <div className="mb-2 position-relative">
                <img src={Avatar} alt="main" className="input__icon" />
                <input
                  name="fullName"
                  type="text"
                  id="full_name"
                  placeholder="Enter Full Name"
                  className=" input__padding login__input"
                  {...register("full_name", {
                    required: {
                      value: true,
                      message: "Full Name is Required",
                    },
                    maxLength: 20,
                    pattern: {
                      value: /^.*\S.*$/,
                      message: "Invalid Name",
                    },
                  })}
                />
              </div>
              <div className="auth_error">{errors?.full_name?.message}</div>
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
                      message: "Password must be at least 6 characters long",
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
                    color: "red",
                  }}
                >
                  {errors?.termsAndCondition?.message}
                </div>
                <div className="py-3 d-flex justify-content-center align-item-center gap-3">
                  <input
                    type="checkbox"
                    name="checkbox"
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
