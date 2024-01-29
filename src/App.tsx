import Reward from "./components/Reward.tsx";
import Setting from "./components/Setting.tsx";
import Wishlist from "./components/Wishlist.tsx";
import Layout from "./components/layout/Layout.tsx";
import ForgotPassword from "./pages/ForgotPassword.tsx";
import Home from "./pages/Home.tsx";
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
import ResetPassworConform from "./pages/ResetPassworConform.tsx";
import All from "./pages/All.tsx";
import Test from "./Test.tsx";
import AuthChecked from "./components/layout/AuthChecked.tsx";
import ProctedRoute from "./components/layout/ProctedRoute.tsx";
import { ReactElement, useContext, useEffect } from "react";
import { ServicesAPi, WishListAPi } from "./config/AxiosUtils.ts";
import { useDispatch } from "react-redux";
import {
  LoadCategory,
  LoadSubCategory,
  LoadSubSubCategory,
} from "./features/taxonomy.ts";
import { useToken } from "./service/auth.ts";
import { wishList } from "./features/wishList.ts";
import SearchResult from "./pages/SearchResult.tsx";
import SubSubCategory from "./pages/SubSubCategory.tsx";
import { SearchContext, SearchProvider } from "./features/searchContext.tsx";

// interface ClearSerachPropsProps {
//   components: ReactElement;
// }

// const ClearSearch: React.FC<ClearSerachPropsProps> = ({ components }) => {
//   const { updateSearchQuery } = useContext(SearchContext);
//   useEffect(() => {
//     updateSearchQuery("");
//   });

//   return components;
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<AuthChecked components={<Login />} />} />
      <Route
        path="/resetsucess"
        element={<AuthChecked components={<ResetPassworConform />} />}
      />
      <Route path="/signup" element={<AuthChecked components={<SignUp />} />} />
      <Route
        path="/forgotassword"
        element={<AuthChecked components={<ForgotPassword />} />}
      />
      <Route path="/test" element={<Test />} />

      <Route element={<Layout />}>
        <Route element={<BreadCrumbAndFilter />}>
          {/* <Route path="serach" element={<SearchResult />} /> */}
          <Route index element={<Home />} />
          <Route path="service/:subcategory" element={<SubCategory />} />
          <Route
            path="service/:subcategory/:services"
            element={<SubSubCategory />}
          />
          <Route
            path="liveads"
            element={<LiveAds />}
            errorElement={<div> this is for error element</div>}
          />
          <Route path="latestOppers" element={<LatestOffers />} />
          {/* <Route path="Foodbeverage" element={<All />} /> */}
          <Route path="all" element={<All />} />
          {/* <Route path=":page/details" element={<Details />} /> */}
          <Route path=":page/:page?/:page?/details" element={<Details />} />
          {/* <Route path=":details" element={<Details />} /> */}
        </Route>
        <Route
          path="/profile"
          element={<ProctedRoute components={<Profile />} />}
        >
          <Route index element={<Setting />} />
          <Route path="reward" element={<Reward />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Route>
    </>
  )
);

const App: React.FC = () => {
  const dispatch = useDispatch();

  const token = useToken();

  useEffect(() => {
    ServicesAPi.GetCategoryServices()
      .then((res) => {
        // console.log(res.data.category);
        dispatch(
          LoadCategory({
            category: res.data.category,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
    ServicesAPi.GetSubCategoryServices()
      .then((res) => {
        dispatch(
          LoadSubCategory({
            subCategory: res.data.subcategory,
          })
        );
        // console.log(res.data.subcategory);
      })
      .catch((e) => {
        console.log(e);
      });

    ServicesAPi.GetSubSubCategoryServices()
      .then((res) => {
        // console.log(res.data.subSubCategory);
        dispatch(
          LoadSubSubCategory({
            SubSubCategory: res.data.subSubCategory,
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });

    //load user wishlist

    if (token) {
      WishListAPi.GetWishList(token)
        .then((res) => {
          // console.log("whislist", res.data.favourite);
          dispatch(
            wishList({
              wishList: JSON.parse(res.data.favourite),
            })
          );
        })
        .catch((e) => {
          console.error(e.response);
        });
    }
  }, []);

  return (
    <>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </>
  );
};

export default App;
