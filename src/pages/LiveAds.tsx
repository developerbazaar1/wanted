import { useEffect, useState } from "react";
import "../css/LiveAds.css";
import NextButton from "../components/NextButton";
import { Link, useSearchParams } from "react-router-dom";
import { AdsApi, WishListAPi } from "../config/AxiosUtils";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useToken, useWishList } from "../service/auth";
import { Favourite, FilledFavouriteIconLarge } from "../utils/SvgElements";
import { useDispatch } from "react-redux";
import { wishList as SetstoreWishList } from "../features/wishList";
const LiveAds = () => {
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const [adverts, setAdvert] = useState<{
    data: any;
    status: string;
    message: string;
  }>({
    data: [],
    status: "",
    message: "",
  });
  const GetWishList = useWishList();
  const [loading, setLoading] = useState(false);
  const [AdsPage, setAdsLoading] = useState(1);
  const token = useToken();

  function RemoveAndAddWishList(Advert_id: string): void {
    WishListAPi.UpdateWishList(token, Advert_id)
      .then((res) => {
        console.log(res);
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
      });
  }

  function FetchData() {
    setLoading(true);
    AdsApi.getAdsBaedOnType(
      `Live Ads`,
      AdsPage,
      6,
      searchParams.get("serach") || ""
    )

      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          // toast.warning("No More data found");
          return;
        }

        if (res.status === 200 && res?.data?.data?.length === 0) {
          return toast.warning("No Data Found");
        }

        if (searchParams.get("serach") || "") {
          if (AdsPage > 1) {
            setAdvert({
              data: [...adverts.data, ...JSON.parse(res.data.data)],
              status: "success",
              message: res.data.message,
            });
            return;
          }
          setAdvert({
            data: [...JSON.parse(res.data.data)],
            status: "success",
            message: res.data.message,
          });
          return;
        }

        setAdvert({
          data: [...adverts.data, ...JSON.parse(res.data.data)],
          status: "success",
          message: res.data.message,
        });
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
  }

  useEffect(() => {
    setAdsLoading(1);
  }, [searchParams.get("serach")]);

  useEffect(() => {
    FetchData();
  }, [AdsPage, searchParams.get("serach")]);

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

  // console.log("This is wishlist", GetWishList);

  return (
    <>
      <div className="container_live">
        {adverts.data.map((advert: any) => (
          <div className="single_Ads p-0" key={advert._id}>
            <div className="ads_img_div">
              <img src={advert?.advertImage?.imgUrl} alt="bannerImg" />
              <div
                className="favoruite"
                onClick={() => RemoveAndAddWishList(advert._id)}
              >
                {GetWishList.some((fav: any) => fav.advert_id === advert._id)
                  ? FilledFavouriteIconLarge
                  : Favourite}
              </div>
            </div>
            <Link
              to="details"
              className="ads_details"
              state={{ advertid: advert._id }}
            >
              {/* <div className="ads_cat">Beauty & Spa / Face &Skin</div> */}
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

export default LiveAds;