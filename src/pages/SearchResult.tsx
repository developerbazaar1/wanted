import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Favourite, FilledFavouriteIconLarge } from "../utils/SvgElements";
import Loader from "../components/Loader";
import { AdsApi, WishListAPi } from "../config/AxiosUtils";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useToken, useWishList } from "../service/auth";
import { wishList as SetstoreWishList } from "../features/wishList";
import NextButton from "../components/NextButton";

const SearchResult: React.FC = () => {
  const { postalCode, searchQuery, taxonomy } =
    useLocation().state.serachValue || "";
  console.log(postalCode, searchQuery, taxonomy);

  const dispatch = useDispatch();
  const [adverts, setAdvert] = useState({
    data: [],
    status: "",
    message: "",
  });

  const GetWishList = useWishList();
  // console.log("wihstik", GetWishList);

  const [loading, setLoading] = useState(false);
  const [AdsPage, setAdsLoading] = useState(1);
  const token = useToken();
  function RemoveAndAddWishList(Advert_id: string): void {
    setLoading(true);
    WishListAPi.UpdateWishList(token, Advert_id)
      .then((res) => {
        // console.log(res);
        dispatch(
          SetstoreWishList({
            wishList: res?.data?.wishlist,
          })
        );
        toast.success(res.data.message);
      })
      .catch((e) => {
        console.log(e.response);
        toast.error(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setLoading(true);
    AdsApi.getAdsBasedOnSearch(postalCode, taxonomy, searchQuery, AdsPage)
      .then((res) => {
        console.log(res);

        if (adverts.data.length !== 0 && res.data.data.length == 0) {
          toast.warning("No More data found");
          return;
        }
        if (res.status === 202) {
          setAdvert({
            data: [...JSON.parse(res.data.data)],
            status: "success",
            message: res.data.message,
          });
        } else {
          setAdvert({
            data: [...res.data.data],
            status: "success",
            message: res.data.message,
          });
        }
      })
      .catch((e) => {
        console.log(e);
        setAdvert({
          data: [],
          status: "error",
          message: e?.data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postalCode, searchQuery, taxonomy, AdsPage]);

  if (loading) {
    return (
      <div
        style={{
          position: "relative",
          height: "300px",
        }}
      >
        <Loader />;
      </div>
    );
  }
  if (adverts.data.length <= 0 && !loading) {
    return (
      <h2
        style={{
          height: "300px",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        No Advert is Found
      </h2>
    );
  }

  if (adverts.status === "error") {
    return (
      <h2
        style={{
          height: "300px",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {adverts.message}
      </h2>
    );
  }

  return (
    <>
      <div className="container_live">
        {adverts.data.map((advert) => (
          <div className="single_Ads p-0" key={advert._id}>
            <div className="ads_img_div">
              <img src={advert?.advertImage?.imgUrl} alt="bannerImg" />
              <div
                className="favoruite"
                onClick={() => RemoveAndAddWishList(advert._id)}
              >
                {GetWishList.some((fav) => fav.advert_id === advert._id)
                  ? FilledFavouriteIconLarge
                  : Favourite}
                {/* {Favourite} */}
              </div>
            </div>
            <Link
              to="details"
              className="ads_details"
              state={{ advertid: advert._id }}
            >
              {/* <div className="ads_cat">Beauty & Spa / Face &Skin</div> */}
              <button className="whereTo-btn-all">{advert?.whereToShow}</button>
              <p>
                {advert?.advertDescription?.split(" ")?.slice(0, 10).join(" ")}
              </p>
              <div className="provider">{advert?.provider?.storeName}</div>
              <div>
                <span className="price">£{advert.advertOfferPrice}</span>
                <span className="off_price">£{advert.advertPrice}</span>
              </div>
            </Link>
          </div>
        ))}
        <NextButton setAdsLoading={setAdsLoading} />
      </div>
    </>
  );
};

export default SearchResult;
