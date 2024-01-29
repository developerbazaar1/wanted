import "../css/Details.css";
import { Link, useLocation } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";
import Spiner from "../components/Spiner";
import { useEffect, useState } from "react";
import { AdsApi, WishListAPi } from "../config/AxiosUtils";
import {
  FilledFavouriteIconLarge,
  contactIcon,
  facebookIcon,
  gamilIcon,
  pintreIcon,
  twitterIcon,
  webIcon,
} from "../utils/SvgElements";
import ProductCrasuel from "../components/ProductCrasuel";
import { useToken, useWishList } from "../service/auth";
import { toast } from "react-toastify";
import { wishList as SetstoreWishList } from "../features/wishList";
import { useDispatch } from "react-redux";
import ProviderDetailsModal from "../components/ProviderDetailsModal";
const Details = () => {
  const GetWishList = useWishList();
  const dispatch = useDispatch();
  const [showProviderDetialsModal, setShowProviderDetialsModal] =
    useState(false);

  const [previewData, setpreviewData] = useState<{
    data: any;
    status: string;
    error: string;
  }>({
    data: {},
    status: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);
  const token = useToken();
  const { advertid } = useLocation().state;

  console.log("This is advert id", advertid);

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
  // RemoveAndAddWishList()

  useEffect(() => {
    setLoading(true);
    AdsApi.getOnlyAdvertPreviewData(advertid)
      .then((res) => {
        // console.log(res?.data);
        setpreviewData({
          data: JSON.parse(res?.data?.advertPreview),
          status: "successfull",
          error: "",
        });
      })
      .catch(() => {
        // console.log(e);

        setpreviewData({
          data: {},
          error: "something Went Wrong Try Later!",
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [advertid]);

  if (loading) {
    return (
      <div
        style={{
          height: "50vh",
          textAlign: "center",
        }}
      >
        <h1>Loading....</h1>
      </div>
    );
  }

  if (previewData?.status === "error") {
    return (
      <div
        style={{
          height: "50vh",
          textAlign: "center",
        }}
      >
        <h1>previewData?.error</h1>
      </div>
    );
  }

  // console.log("previe data", previewData);

  return (
    <>
      {/* {console.log(location.pathname.split("/").filter((x) => x))}
      <div className="d-none d-sm-block">
        {location?.pathname
          ?.split("/")
          ?.filter((x) => x)
          ?.map((element, index) => (
            <span key={index}> {element}</span>
          ))}
      </div> */}
      <Spiner loading={loading} />
      <div
        className="mx-2  advert-preview-container my-4  mx-md-auto"
        key={advertid}
      >
        <div className="details">
          {/* // mobile None div */}
          <div className="details_location  d-none d-md-flex">
            <div className="detail_provider">
              <div className="advert-title-info-icon">
                <h3>{previewData?.data?.advert?.advertTitle}</h3>
                <FaInfoCircle
                  color="#17c737"
                  size={22}
                  onClick={() => setShowProviderDetialsModal(true)}
                />
              </div>
              <div>{previewData?.data?.advert?.advertLocation}</div>
              <div className="icon_cat_container">
                {/* <div className="detail_icon">
                  <img src={BeautySpaIcon} alt="Ico" />
                </div>
                <div>
                  {previewData?.data?.advert?.advertCategory}/
                  {previewData?.data?.advert?.advertSubCategory}
                </div> */}
              </div>
              {/* icon for provider Details */}
              <div
                className="details_provider_favoruite"
                onClick={() =>
                  RemoveAndAddWishList(previewData?.data?.advert._id)
                }
              >
                {GetWishList.some(
                  (fav: any) => fav.advert_id === previewData?.data?.advert?._id
                ) ? (
                  FilledFavouriteIconLarge
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="favoruite_grey"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="details_contact">
              <div className="contact_us">
                {contactIcon}
                <button>Contact Us</button>
              </div>
              <div className="visit_our_web_site">
                {webIcon}
                <button>
                  <Link
                    to={previewData?.data?.Portfolio?.storeWebsite}
                    target="_blank"
                    className="text-black"
                  >
                    Visit Our Websites
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="detial_img_main_div">
            <div
              id="mainImagCrasule"
              className="carousel slide details_image_div"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="details_image_div carousel-item active">
                  <img
                    src={previewData?.data?.advert?.advertImage?.imgUrl}
                    alt="FaceAndSkin"
                  />
                </div>
              </div>
            </div>

            {/* description for large screen */}
            <div className="details_description  d-none d-md-flex ">
              <h3>About This Service</h3>
              <p>{previewData?.data?.advert?.advertDescription}</p>
              <div className="social_head">Share This Advert</div>
              <div className="social_group">
                <div>
                  <Link target="_blank" to="https://gmail.com">
                    {gamilIcon}
                  </Link>
                  <Link target="_blank" to="https://facebook.com">
                    {facebookIcon}
                  </Link>
                  <Link target="_blank" to="https://twitter.com">
                    {twitterIcon}
                  </Link>
                  <Link target="_blank" to="https://pintres.com">
                    {pintreIcon}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="details_location  d-md-none">
            <div className="detail_provider">
              <div className="advert-title-info-icon">
                <h3>{previewData?.data?.advert?.advertTitle}</h3>{" "}
                <FaInfoCircle
                  color="#17c737"
                  size={20}
                  onClick={() => setShowProviderDetialsModal(true)}
                />
              </div>
              <div>{previewData?.data?.advert?.advertLocation}</div>
              <div className="icon_cat_container">
                {/* <div className="detail_icon">
                  <img src={BeautySpaIcon} alt="Ico" />
                </div>
                <div>
                  {previewData?.data?.advert?.advertCategory}/
                  {previewData?.data?.advert?.advertSubCategory}
                </div> */}
              </div>
              <div
                className="details_provider_favoruite"
                onClick={() =>
                  RemoveAndAddWishList(previewData?.data?.advert._id)
                }
              >
                {GetWishList.some(
                  (fav: any) => fav.advert_id === previewData?.data?.advert?._id
                ) ? (
                  FilledFavouriteIconLarge
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="favoruite_grey"
                    xmlns="https://www.w3.org/2000/svg"
                  >
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                  </svg>
                )}
              </div>
            </div>
            <div className="details_contact">
              <div className="contact_us">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1493_1037)">
                    <path
                      d="M17.6013 2.81998C15.9116 1.13035 13.6651 0.199918 11.2757 0.200012C10.8842 0.200012 10.5669 0.517372 10.5669 0.908827C10.5669 1.30028 10.8843 1.61764 11.2757 1.61764C13.2865 1.61755 15.1769 2.40055 16.5988 3.82243C18.0208 5.24431 18.8038 7.13486 18.8037 9.14572C18.8037 9.53718 19.121 9.85454 19.5125 9.85454C19.904 9.85454 20.2213 9.53718 20.2213 9.14582C20.2214 6.75617 19.291 4.5096 17.6013 2.81998Z"
                      fill="black"
                    />
                    <path
                      d="M14.6855 9.14582C14.6855 9.53727 15.0028 9.85463 15.3944 9.85454C15.7858 9.85454 16.1031 9.53718 16.1031 9.14572C16.1029 6.48436 13.9374 4.31889 11.2758 4.31851C11.2757 4.31851 11.2759 4.31851 11.2758 4.31851C10.8843 4.31851 10.567 4.63577 10.5669 5.02723C10.5669 5.41868 10.8842 5.73604 11.2756 5.73614C13.1557 5.73642 14.6853 7.26595 14.6855 9.14582Z"
                      fill="black"
                    />
                    <path
                      d="M13.117 12.7598C12.0366 12.7039 11.4862 13.5074 11.2222 13.8934C11.0011 14.2165 11.0839 14.6576 11.4071 14.8786C11.7302 15.0997 12.1713 15.0169 12.3923 14.6938C12.7042 14.2378 12.8455 14.166 13.0371 14.1751C13.6506 14.2472 16.0667 16.0177 16.3086 16.5714C16.3693 16.7344 16.3671 16.8942 16.3019 17.0886C16.0483 17.8415 15.6284 18.3705 15.0874 18.6185C14.5735 18.8541 13.9434 18.8328 13.2657 18.557C10.735 17.5255 8.52407 16.0861 6.69438 14.2785C6.69363 14.2777 6.69287 14.2771 6.69221 14.2763C4.88842 12.4484 3.45161 10.2403 2.42184 7.71354C2.14597 7.03525 2.12461 6.40507 2.36022 5.89122C2.60821 5.35026 3.13727 4.93036 3.88946 4.67698C4.08453 4.61158 4.24406 4.6095 4.40558 4.66961C4.96119 4.9124 6.73162 7.32842 6.80307 7.93497C6.81328 8.13382 6.74098 8.27501 6.28535 8.58633C5.96213 8.8071 5.87906 9.24817 6.09993 9.57139C6.3207 9.89461 6.76167 9.97759 7.08499 9.75681C7.47115 9.49314 8.27447 8.94423 8.21871 7.86012C8.15728 6.72772 5.95448 3.72887 4.90193 3.34186C4.43383 3.16739 3.94144 3.16437 3.4379 3.33335C2.30493 3.71488 1.48668 4.39515 1.0716 5.30055C0.66899 6.17891 0.681748 7.19799 1.10893 8.24817C2.21099 10.9523 3.7529 13.3183 5.69174 15.2807C5.69647 15.2856 5.70129 15.2903 5.7062 15.2949C7.66726 17.2302 10.0305 18.7692 12.731 19.87C13.2718 20.0899 13.8044 20.2 14.3137 20.2C14.7932 20.2 15.2523 20.1025 15.6782 19.9072C16.5837 19.4922 17.2638 18.6741 17.6457 17.5404C17.8143 17.0378 17.8115 16.5456 17.6384 16.0796C17.25 15.0243 14.2512 12.8214 13.117 12.7598Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1493_1037">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5 0.200012)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <button>Contact Us</button>
              </div>
              <div className="visit_our_web_site">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1493_1044)">
                    <path
                      d="M18.4858 5.6765C18.2916 5.77048 18.2104 6.00408 18.3043 6.19826C18.9112 7.45244 19.219 8.79876 19.219 10.2C19.219 15.2833 15.0834 19.4188 10.0002 19.4188C8.00767 19.4188 6.05731 18.7641 4.46731 17.5688C4.67497 17.1332 4.59895 16.5951 4.23876 16.2349C3.78185 15.778 3.03841 15.778 2.58146 16.2349C2.12454 16.6918 2.12454 17.4353 2.58146 17.8922C2.93493 18.2457 3.46747 18.3305 3.90778 18.1245C5.6488 19.4646 7.80075 20.2 10.0002 20.2C15.5142 20.2 20.0002 15.714 20.0002 10.2C20.0002 8.67994 19.6662 7.21908 19.0075 5.85798C18.9136 5.6638 18.68 5.58255 18.4858 5.6765Z"
                      fill="black"
                    />
                    <path
                      d="M1.41602 14.5346C1.61227 14.445 1.69867 14.2133 1.60902 14.017C1.05973 12.8146 0.78125 11.5303 0.78125 10.2C0.78125 5.11677 4.91676 0.981262 10 0.981262C11.9613 0.981262 13.817 1.58388 15.3935 2.72786C15.1195 3.17872 15.1768 3.77587 15.5661 4.16517C16.023 4.62208 16.7664 4.62208 17.2234 4.16517C17.6803 3.70825 17.6803 2.96482 17.2234 2.50786C16.9001 2.18454 16.4334 2.09036 16.0261 2.22458C14.2916 0.910442 12.19 0.200012 10 0.200012C4.48598 0.200012 0 4.68599 0 10.2C0 11.6431 0.302266 13.0366 0.898398 14.3416C0.987578 14.5369 1.21883 14.6247 1.41602 14.5346Z"
                      fill="black"
                    />
                    <path
                      d="M10 2.77814C6.17945 2.77814 2.57812 5.81275 2.57812 10.2C2.57812 14.2637 5.87887 17.6219 10 17.6219C14.1203 17.6219 17.4219 14.2658 17.4219 10.2C17.4219 6.1363 14.1211 2.77814 10 2.77814ZM7.90922 3.89689C7.10199 4.85646 6.61348 6.22599 6.36066 7.46564H3.94875C4.70922 5.78943 6.14633 4.48318 7.90922 3.89689ZM3.35938 10.2C3.35938 9.52056 3.46215 8.86466 3.65266 8.24689L6.22684 8.2465C6.1391 8.87525 6.09375 9.53126 6.09375 10.2C6.09375 10.8688 6.1391 11.5244 6.22684 12.1531H3.65266C3.46215 11.5354 3.35938 10.8795 3.35938 10.2ZM3.94879 12.9344H6.3607C6.61344 14.1738 7.10191 15.5434 7.90926 16.5031C6.14633 15.9168 4.70922 14.6106 3.94879 12.9344ZM9.60938 16.7864C8.53438 16.4867 7.61043 14.972 7.16289 12.9344H9.60938V16.7864ZM9.60938 12.1531H7.01879C6.92551 11.5328 6.875 10.8763 6.875 10.2C6.875 9.52376 6.92555 8.86724 7.01879 8.24689H9.60938V12.1531ZM9.60938 7.46564H7.16289C7.61043 5.42798 8.53438 3.91333 9.60938 3.61365V7.46564ZM10.3906 3.61365C11.4656 3.91333 12.3896 5.42802 12.8371 7.46564H10.3906V3.61365ZM10.3906 8.24689H12.9812C13.0745 8.86724 13.125 9.52376 13.125 10.2C13.125 10.8763 13.0745 11.5328 12.9812 12.1531H10.3906V8.24689ZM10.3906 16.7864V12.934L12.8371 12.9344C12.3896 14.972 11.4656 16.4867 10.3906 16.7864ZM12.0908 16.5031C12.8984 15.5432 13.3867 14.1733 13.6393 12.934H16.0512C15.2908 14.6106 13.8537 15.9168 12.0908 16.5031ZM16.6406 10.2C16.6406 10.8795 16.5379 11.5354 16.3473 12.1531H13.7732C13.8609 11.5244 13.9062 10.8688 13.9062 10.2C13.9062 9.53126 13.8609 8.87564 13.7732 8.24689H16.3473C16.5379 8.86466 16.6406 9.52056 16.6406 10.2ZM13.6393 7.46564C13.3866 6.22626 12.8981 4.85657 12.0907 3.89689C13.8536 4.48318 15.2908 5.78943 16.0512 7.46564H13.6393Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1493_1044">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0 0.200012)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <button>
                  {" "}
                  <Link
                    to={previewData?.data?.Portfolio?.storeWebsite}
                    target="_blank"
                    className="text-black"
                  >
                    Visit Our Websites
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="details_description  d-md-none">
            <h3>About This Service</h3>
            <p>{previewData?.data?.advert?.advertDescription}</p>
            <div className="social_head">Share This Advert</div>
            <div className="social_group">
              <div>
                <Link target="_blank" to="https://gmail.com">
                  {gamilIcon}
                </Link>
                <Link target="_blank" to="https://facebook.com">
                  {facebookIcon}
                </Link>
                <Link target="_blank" to="https://twitter.com">
                  {twitterIcon}
                </Link>
                <Link target="_blank" to="https://pintres.com">
                  {pintreIcon}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {previewData?.data?.products?.map((element: any) => (
          <div key={element.title}>
            <h3 className="mt-4 text-capitalize">{element.title}</h3>
            <div className="row prduct-preview-main-container">
              {element?.items?.map((product: any) => (
                <ProductCrasuel key={product?._id} product={product} />
              ))}
            </div>
          </div>
        ))}

        {previewData?.data?.adverts?.length > 0 && (
          <>
            <h5 className="my-3">More Ads From This Provider</h5>
            <div className="details_ads">
              {previewData?.data?.adverts?.map((ads: any) => (
                <Link
                  to={`.`}
                  state={{ advertid: ads._id }}
                  className="details_provider_ads"
                  key={ads?._id}
                >
                  <div>
                    <div className="detials_provider_img">
                      <img src={ads?.advertImage?.imgUrl} alt="adsImage" />
                      {/* <div className="details_favoruite">
                        <svg
                          viewBox="0 0 24 24"
                          className="unfilled"
                          xmlns="https://www.w3.org/2000/svg"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                      </div> */}
                    </div>
                    <div className="details_ads_description">
                      <button className="container_ads_button">
                        {ads?.whereToShow}
                      </button>
                      <p>{ads?.advertDescription.slice(0, 60)}</p>
                      <div className="details_ads_description_provider">
                        {previewData?.data?.Portfolio?.storeName}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* <button className="show_more_ads_btn">
              Show All Ads From This Provider
            </button> */}
          </>
        )}
      </div>

      <ProviderDetailsModal
        showProviderDetialsModal={showProviderDetialsModal}
        setShowProviderDetialsModal={setShowProviderDetialsModal}
        portfolio={previewData?.data?.Portfolio}
      />
    </>
  );
};

export default Details;
