import { useEffect, useState } from "react";
import "../css/ComponentsCSS/favoruite.css";
import { WishListAPi } from "../config/AxiosUtils";
import { useToken, useWishList } from "../service/auth";
import { toast } from "react-toastify";
import Spiner from "./Spiner";
import { FilledFavouriteIcon } from "../utils/SvgElements";
import { useDispatch } from "react-redux";
import { wishList as SetstoreWishList } from "../features/wishList";
const Wishlist: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [WishList, setWishList] = useState({
    fav: [],
    status: "",
    message: "",
  });

  const token = useToken();
  function RemoveWishList(Advert_id: string): void {
    setLoading(true);
    WishListAPi.UpdateWishList(token, Advert_id)
      .then((res) => {
        dispatch(
          SetstoreWishList({
            wishList: res.data.wishlist,
          })
        );
        // console.log(res);
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        console.log(e.response);
        toast.error(e.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // console.log(WishList);

  const wishlist = useWishList();

  useEffect(() => {
    if (wishlist.length > 0) {
      setWishList({
        fav: wishlist,
        status: "success",
        message: "success",
      });
    } else {
      setWishList({
        fav: [],
        status: "error",
        message: "Not Wishlist",
      });
    }
  }, [wishlist]);

  // console.log(WishList);

  if (WishList?.fav?.length === 0) {
    return <div>No WishList Found Please add One!</div>;
  }

  return (
    <div className="favoruite_container">
      {WishList?.fav?.map((favourite: any) => (
        <div className="row border_5" key={favourite._id}>
          <div className="col-5 p-0 col-md-3">
            <div className="image-container">
              <img
                src={favourite?.advert[0]?.advertImage?.imgUrl}
                alt="food"
                className="img-responsive"
              />
              <div
                className="favoruite_icons pointer"
                onClick={() => RemoveWishList(favourite?.advert_id)}
              >
                {FilledFavouriteIcon}
              </div>
            </div>
          </div>
          <div className="col-7 col-md-9">
            <div className="favoruite__details">
              <div className="Desacription">
                <p className="">
                  {favourite?.advert[0]?.advertDescription
                    .split(" ")
                    .slice(0, 10)
                    .join(" ")}
                </p>
              </div>
              <div className="">{favourite?.provider[0].storeName}</div>
            </div>
          </div>
        </div>
      ))}

      <div>
        <button className="wishlist_view_all_btn">View all</button>
      </div>

      <Spiner loading={loading} />
    </div>
  );
};

export default Wishlist;
