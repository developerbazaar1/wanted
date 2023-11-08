import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/Signup";
import Test from "./Test";
import NavBar from "./components/Layout/NavBar";
import DashBoard from "./pages/DashBoard";
import Reward from "./pages/Reward";
import PaymentHistroy from "./pages/PaymentHistroy";
import ProviderProtfilo from "./pages/ProviderProtfilo";
import CustomerEnq from "./pages/CustomerEnq";
import Login from "./pages/Login";
import ResetPassworConform from "./pages/ResetPassworConform";
import Account from "./pages/Account";
import Viewproducts from "./pages/viewproducts";
import Advert from "./pages/Advert";
import AddAdvert from "./pages/AddAdvert";
import PostAgain from "./pages/PostAgain";
import ProtectedRoutes from "./components/withAuthorization";
import { useAuth } from "./service/auth";
function App() {
  const { isLoggedIn } = useAuth();
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
          <Route path="/test" element={<Test />} />

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
