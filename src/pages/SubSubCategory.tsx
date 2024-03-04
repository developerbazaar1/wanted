import NextButton from "../components/NextButton";
import { Link, useParams } from "react-router-dom";
import { useToken, useWishList } from "../service/auth";
import { useContext, useEffect, useState } from "react";
import { AdsApi, WishListAPi } from "../config/AxiosUtils";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Favourite, FilledFavouriteIconLarge } from "../utils/SvgElements";
import { wishList as SetstoreWishList } from "../features/wishList";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../features/searchContext";

const SubSubCategory = () => {
  const { services } = useParams();
  const [searchParams] = useSearchParams();
  const { taxonomyFilter } = useContext(SearchContext);
  // console.log("seach parmas", searchParams.get("search"));

  // console.log(services);

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
        // console.log(res);
        dispatch(
          SetstoreWishList({
            wishList: res?.data?.wishlist,
          })
        );
        toast.success(res.data.message);
      })
      .catch((e) => {
        // console.log(e.response);
        toast.error(e.response.data.message);
      });
  }

  // console.log("sub sub services", services);

  useEffect(() => {
    setLoading(true);
    AdsApi.getAdsBasedOnService(
      decodeURIComponent(services?.replace(/\+/g, " ") || ""),
      AdsPage,
      searchParams.get("search") || "",
      taxonomyFilter || "",
      searchParams.get("location") || "",
      searchParams.get("price") || ""
    )
      .then((res) => {
        console.log(res);

        if (res.status === 204) {
          toast.warning("No More Data Found");
          return;
        }

        if (res.status === 200 && res?.data?.services?.length === 0) {
          setAdvert({
            data: [],
            status: "error",
            message: "No advert Found",
          });
          return;
        }

        if (
          searchParams.get("search") ||
          taxonomyFilter ||
          searchParams.get("location")
        ) {
          if (AdsPage > 1) {
            setAdvert({
              data: [...adverts.data, ...res.data.services],
              status: "success",
              message: res.data.message,
            });
            return;
          }
          setAdvert({
            data: [...res.data.services],
            status: "success",
            message: res.data.message,
          });
          return;
        }

        if (AdsPage === 1) {
          setAdvert({
            data: [...res.data.services],
            status: "success",
            message: res.data.message,
          });
          return;
        }

        setAdvert({
          data: [...adverts.data, ...res.data.services],
          status: "success",
          message: res.data.message,
        });
      })

      .catch((e) => {
        // console.log(e);
        setAdvert({
          data: [],
          status: "error",
          message: e?.data?.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    AdsPage,
    searchParams.get("search"),
    taxonomyFilter,
    searchParams.get("location"),
    searchParams.get("price"),
  ]);

  // console.log(adverts.data);

  // advertOfferPrice;
  // advertPrice;

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
        No Adverts Found
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
        {adverts.data.map((advert: any) => (
          <Link
            to="details"
            state={{ advertid: advert?._id }}
            className="single_Ads p-0"
            key={advert?._id}
          >
            <div className="ads_img_div">
              <img src={advert?.advertImage?.imgUrl} alt="bannerImg" />
              <div
                className="favoruite"
                onClick={(e) => {
                  e.preventDefault();
                  RemoveAndAddWishList(advert._id);
                }}
              >
                {GetWishList.some((fav: any) => fav?.advert_id === advert?._id)
                  ? FilledFavouriteIconLarge
                  : Favourite}
              </div>
            </div>
            <div className="ads_details">
              {/* <div className="ads_cat">Beauty & Spa / Face &Skin</div> */}
              {/* <button className="whereTo-btn-all">{advert?.whereToShow}</button> */}
              <p>
                {advert?.advertDescription?.split(" ")?.slice(0, 10).join(" ")}{" "}
                {`...`}
              </p>
              <div className="provider">
                {advert?.advertStoreName || advert?.provider[0]?.storeName}
              </div>
              <div>
                <span className="price">£{advert?.advertOfferPrice}</span>
                <span className="off_price">£{advert?.advertPrice}</span>
              </div>
            </div>
          </Link>
        ))}
        <NextButton setAdsLoading={setAdsLoading} />
      </div>
    </>
  );
};

export default SubSubCategory;
