// import Test from "./Test.tsx";

// import Test from "./Test.tsx";
// import Footer from "./components/Footer.tsx";
import Reward from "./components/Reward.tsx";
import Setting from "./components/Setting.tsx";
import Wishlist from "./components/Wishlist.tsx";
import Layout from "./components/layout/Layout.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Home from "./pages/Home.tsx";
import "./pages/Login.jsx";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import SignUp from "./pages/SingnUp.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BreadCrumbAndFilter from "./components/layout/BreadCrumbAndFilter.tsx";
import LiveAds from "./pages/LiveAds.tsx";
import LatestOffers from "./pages/LatestOffers.tsx";
import Details from "./pages/Details.tsx";
import SubCategory from "./pages/SubCategory.tsx";
import BeautySpa from "./pages/BeautySpa.tsx";
import ResetPassworConform from "./pages/ResetPassworConform.tsx";
import All from "./pages/All.tsx";
import Test from "./Test.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/resetsucess" element={<ResetPassworConform />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgotassword" element={<ForgotPassword />} />
      <Route path="/test" element={<Test />} />
      <Route element={<Layout />}>
        <Route element={<BreadCrumbAndFilter />}>
          <Route index element={<Home />} />
          <Route path="service/:subcategory" element={<SubCategory />} />
          <Route
            path="/service/:subbategory/:something"
            element={<BeautySpa />}
          />
          <Route path="liveads" element={<LiveAds />} />
          <Route path="latestOppers" element={<LatestOffers />} />
          <Route path="Foodbeverage" element={<All />} />
          <Route path="all" element={<Home />} />
          <Route path=":page/details" element={<Details />} />
          <Route path="/details" element={<Details />} />
        </Route>
        <Route path="/profile" element={<Profile />}>
          <Route path="reward" element={<Reward />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route index element={<Setting />} />
        </Route>
      </Route>
    </>
  )
);
const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
