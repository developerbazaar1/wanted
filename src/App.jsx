import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/Signup";
// import Test from "./Test";
import NavBar from "./components/Layout/NavBar";
import DashBoard from "./pages/DashBoard";
import Reward from "./pages/Reward";
import PaymentHistroy from "./pages/PaymentHistroy";
import ProviderProtfilo from "./pages/ProviderProtfilo";
import CustomerEnq from "./pages/CustomerEnq";
import Login from "./pages/Login";
import ResetPassworConform from "./pages/ResetPassworConform";
import Account from "./pages/Account";
import Viewproducts from "./pages/Viewproducts";
import Advert from "./pages/Advert";
import AddAdvert from "./pages/AddAdvert";
import PostAgain from "./pages/PostAgain";
import ProtectedRoutes from "./components/withAuthorization";
import { useAuth } from "./service/auth";
import { useDispatch } from "react-redux";
// import FileUpload from "./FileUpload";
import { useEffect } from "react";
import { categoriesApi, getUserSubscription } from "./config/axiosUtils";
import { setcategory } from "./features/categorySlice";
import { setsubcategory } from "./features/subcategorySlice";
import { setSubscription } from "./features/subscriptionSlice";
import Plans from "./components/Plans";
import AdvertProductPreview from "./Test/AdvertProductPreview";
import OnlyAdvertProductPreview from "./Test/OnlyPreviewPage";
function App() {
  const { isLoggedIn, token, portfolio_id, user } = useAuth();
  const dispatch = useDispatch();
  /**
   * this function fetch the categories and set it
   */
  const fetchCategories = async () => {
    categoriesApi
      .getCategory()
      .then((res) => {
        // console.log(res);
        dispatch(
          setcategory({
            category: res?.data?.category,
          })
        );
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  /**
   * this function fetch the sub categories and set it
   */
  const fetchsubCategories = async () => {
    categoriesApi
      .subgetCategory()
      .then((res) => {
        // console.log(res);
        dispatch(
          setsubcategory({
            subcategory: res?.data?.subcategory,
          })
        );
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const fetchsubscription = async () => {
    getUserSubscription(token, user?.id, portfolio_id)
      .then((res) => {
        // console.log(res.data.result);
        // let sub = res.data.result;
        dispatch(
          setSubscription({
            subscriptions: res.data.result,
          })
        );
      })
      .catch(() => {
        // console.log(e);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchsubCategories();
    fetchsubscription();
  });
  return (
    <>
      <BrowserRouter>
        <Routes errorElement={<div> this is error </div>}>
          {/* <Route path="/resetsucess" element={<ResetPassworConform />} />
           */}

          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="/forgotassword" element={<ForgotPassword />} />
          <Route path="/resetsucess" element={<ResetPassworConform />} />
          {/* <Route path="/test" element={<FileUpload />} /> */}
          {/* <Route path="test" element={<ProviderProtfilo />} /> */}

          <Route element={<NavBar />}>
            <Route
              index
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<DashBoard />}
                />
              }
            />
            {/*profile advert Product Preview */}
            {/* <Route
              path=":advertid"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<AdvertProductPreview />}
                />
              }
            /> */}

            {/* this route show particular preview  Page */}
            <Route
              path="advertpreview/:advertid"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<OnlyAdvertProductPreview />}
                />
              }
            />

            <Route
              path="advert"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<Advert />}
                />
              }
            />
            <Route
              path="addAdvert"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<AddAdvert />}
                />
              }
            />
            <Route
              path="reward_hub"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<Reward />}
                />
              }
            />
            <Route
              path="payment_history"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<PaymentHistroy />}
                />
              }
            />

            <Route
              path="plans"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<Plans />}
                />
              }
            />

            <Route
              path="provider_portfolio"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<ProviderProtfilo />}
                />
              }
            />
            <Route
              path="customer_enqry"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<CustomerEnq />}
                />
              }
            />
            <Route
              path="account"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<Account />}
                />
              }
            />
            <Route
              path="viewproducts"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<Viewproducts />}
                />
              }
            />
            <Route
              path="postagain"
              element={
                <ProtectedRoutes
                  isLoggedIn={isLoggedIn}
                  component={<PostAgain />}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
