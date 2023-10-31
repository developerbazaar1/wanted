import { BrowserRouter, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/resetsucess" element={<ResetPassworConform />} />
           */}

          {/* <Route element={<TopNav />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotassword" element={<ForgotPassword />} />
          <Route path="/resetsucess" element={<ResetPassworConform />} />
          <Route path="/test" element={<Test />} />

          <Route element={<NavBar />}>
            <Route index element={<DashBoard />} />
            <Route path="advert" element={<Advert />} />
            <Route path="addAdvert" element={<AddAdvert />} />
            <Route path="reward_hub" element={<Reward />} />
            <Route path="payment_history" element={<PaymentHistroy />} />
            <Route path="provider_portfolio" element={<ProviderProtfilo />} />
            <Route path="customer_enqry" element={<CustomerEnq />} />
            <Route path="account" element={<Account />} />
            <Route path="viewproducts" element={<Viewproducts />} />
            <Route path="postagain" element={<PostAgain />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
