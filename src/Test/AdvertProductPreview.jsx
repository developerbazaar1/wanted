import BeautySpaIcon from "../assets/development/BeautyAndSpa.png";
// import FaceAndSkin from "../assets/development/BeauthyAndSpaBack.jpg";
import "./AdvertProductPreview.css";

// import FaceMassage1 from "../assets/development/FacilaMassage1.png";
// import FaceMassage2 from "../assets/development/FacilaMassage2.png";
// import FaceMassage3 from "../assets/development/FacilaMassage3.png";
import { useAuth } from "../service/auth";
import { useEffect, useState } from "react";
import { getPreviewAdvertData } from "../config/axiosUtils";
import { Link, useParams } from "react-router-dom";
import Spiner from "../components/Spiner";

const Crasule = ({ product }) => {
  return (
    <div className="details_provider_products mb-2">
      <h5>{product?.productname}</h5>
      {/* //crasule for small screen */}
      <div id="carouselExampleIndicators" className="carousel slide d-md-none">
        <div className="carousel-inner">
          {product?.productImages?.map((img, index) => (
            <div className="carousel-item active" key={index}>
              <img src={img} className="d-block w-100 " alt={index} />
            </div>
          ))}
          {/* <!-- Add more carousel items for additional images --> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* <!-- Image grid for medium and larger screens --> */}
      <div className=" d-none d-md-flex detial_product_image">
        {product?.productImages?.map((img, index) => (
          <div className="" key={index}>
            <img src={img} className="img-fluid" alt={index} />
          </div>
        ))}
        {/* <!-- Add more columns for additional images --> */}
      </div>
    </div>
  );
};

const AdvertProductPreview = () => {
  const [previewData, setpreviewData] = useState({
    data: {},
    status: "",
    error: "",
  });

  const [loading, setLoading] = useState(false);
  let { advertid } = useParams();
  const { user, token } = useAuth();
  //   console.log(token);

  //   console.log("preview data", previewData?.data?.adverts);
  //   console.log("preview product", previewData?.data?.product);

  useEffect(() => {
    setLoading(true);
    getPreviewAdvertData(token, advertid, user?.id)
      .then((res) => {
        // console.log(res);
        setpreviewData({
          data: res?.data?.advertPreview,
          status: "successfull",
        });
      })
      .catch((e) => {
        // console.log(e);
        setpreviewData({
          error: "something Went Wrong Try Later!",
          status: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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

  return (
    <>
      <Spiner loading={loading} />
      <div className="mx-2  advert-preview-container my-4  mx-md-auto">
        <div className="details">
          {/* // mobile None div */}
          <div className="details_location  d-none d-md-flex">
            <div className="detail_provider">
              <h3>{previewData?.data?.Portfolio?.storeName}</h3>
              <div>{previewData?.data?.Portfolio?.storeAddress}</div>
              <div className="icon_cat_container">
                <div className="detail_icon">
                  <img src={BeautySpaIcon} alt="Ico" />
                </div>
                <div>
                  {previewData?.data?.Portfolio?.storeCategory}/
                  {previewData?.data?.Portfolio?.storeSubCategory}
                </div>
              </div>

              <div className="details_provider_favoruite">
                <svg
                  viewBox="0 0 24 24"
                  className="favoruite_grey"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
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
                  <Link to={previewData?.data?.Portfolio?.storeWebsite}>
                    Visit Our Websites
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="detial_img_main_div">
            <div className="details_image_div ">
              <img
                src={previewData?.data?.Portfolio?.storeThumbNail}
                alt="FaceAndSkin"
              />
            </div>

            {/* description for large screen */}
            <div className="details_description  d-none d-md-flex ">
              <h3>About This Service</h3>
              <p>
                {previewData?.data?.Portfolio?.storeDescription}
                <span className="details_read_more">Read More</span>
              </p>
              <div className="social_head">Share This Deal</div>
              <div className="social_group">
                <div>
                  <a href="https://gmail.ocm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M4.46401 3.57129H15.5354C16.1284 3.57125 16.6989 3.79811 17.1299 4.20534C17.5609 4.61257 17.8197 5.16928 17.8533 5.76129L17.8569 5.89272V14.107C17.8569 14.7 17.63 15.2705 17.2228 15.7015C16.8156 16.1325 16.2589 16.3913 15.6669 16.4249L15.5354 16.4284H4.46401C3.87105 16.4285 3.30056 16.2016 2.86956 15.7944C2.43855 15.3872 2.17972 14.8304 2.14615 14.2384L2.14258 14.107V5.89272C2.14254 5.29976 2.3694 4.72927 2.77663 4.29827C3.18386 3.86727 3.74057 3.60843 4.33258 3.57486L4.46401 3.57129ZM16.7854 7.78915L10.2469 11.1891C10.1835 11.2221 10.1143 11.242 10.0431 11.2477C9.97197 11.2535 9.90039 11.245 9.83258 11.2227L9.75258 11.1891L3.21401 7.78915V14.107C3.21402 14.4207 3.33199 14.7229 3.54449 14.9537C3.757 15.1845 4.04851 15.3269 4.36115 15.3527L4.46401 15.357H15.5354C15.8493 15.357 16.1516 15.2389 16.3824 15.0263C16.6132 14.8136 16.7555 14.5219 16.7811 14.2091L16.7854 14.107V7.78915ZM15.5354 4.64272H4.46401C4.1503 4.64273 3.84807 4.7607 3.6173 4.9732C3.38653 5.18571 3.24411 5.47722 3.21829 5.78986L3.21401 5.89272V6.58129L9.99972 10.1099L16.7854 6.58129V5.89272C16.7854 5.5789 16.6673 5.27657 16.4547 5.04578C16.242 4.815 15.9503 4.67265 15.6376 4.647L15.5354 4.64272Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a href="https://facebook.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.3327 9.99984C18.3327 5.39984 14.5993 1.6665 9.99935 1.6665C5.39935 1.6665 1.66602 5.39984 1.66602 9.99984C1.66602 14.0332 4.53268 17.3915 8.33268 18.1665V12.4998H6.66602V9.99984H8.33268V7.9165C8.33268 6.30817 9.64102 4.99984 11.2493 4.99984H13.3327V7.49984H11.666C11.2077 7.49984 10.8327 7.87484 10.8327 8.33317V9.99984H13.3327V12.4998H10.8327V18.2915C15.041 17.8748 18.3327 14.3248 18.3327 9.99984Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a href="https://twitter.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.3327 4.83351C17.7063 5.10525 17.0439 5.28489 16.366 5.36684C17.0812 4.93961 17.6171 4.26749 17.8743 3.47517C17.2023 3.87523 16.4667 4.15709 15.6993 4.30851C15.1865 3.75232 14.5035 3.38209 13.7575 3.25588C13.0116 3.12968 12.2448 3.25464 11.5775 3.61117C10.9102 3.96769 10.3801 4.53562 10.0704 5.22587C9.76064 5.91613 9.68876 6.68967 9.86602 7.42517C8.5072 7.35645 7.17805 7.00264 5.96489 6.38673C4.75174 5.77082 3.68172 4.90659 2.82435 3.85017C2.52363 4.37531 2.36561 4.97003 2.36602 5.57517C2.36495 6.13716 2.50286 6.69069 2.76748 7.18648C3.03209 7.68227 3.4152 8.10493 3.88268 8.41684C3.33933 8.40206 2.80759 8.25626 2.33268 7.99184V8.03351C2.33675 8.82092 2.61268 9.58275 3.11378 10.1901C3.61488 10.7975 4.3104 11.2132 5.08268 11.3668C4.7854 11.4573 4.47674 11.505 4.16602 11.5085C3.95092 11.506 3.73637 11.4865 3.52435 11.4502C3.74427 12.1275 4.16987 12.7195 4.74191 13.1436C5.31395 13.5678 6.004 13.8031 6.71602 13.8168C5.51368 14.7629 4.02925 15.2792 2.49935 15.2835C2.22079 15.2844 1.94246 15.2677 1.66602 15.2335C3.22804 16.2421 5.04836 16.7774 6.90768 16.7752C8.19076 16.7885 9.46363 16.546 10.6519 16.0619C11.8403 15.5778 12.9202 14.8617 13.8287 13.9556C14.7372 13.0494 15.456 11.9713 15.9431 10.7843C16.4303 9.59719 16.676 8.32495 16.666 7.04184V6.60017C17.3199 6.11252 17.8839 5.5147 18.3327 4.83351Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                  <a href="https://pintres.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M7.53268 17.9498C8.33268 18.1915 9.14102 18.3332 9.99935 18.3332C12.2095 18.3332 14.3291 17.4552 15.8919 15.8924C17.4547 14.3296 18.3327 12.21 18.3327 9.99984C18.3327 8.90549 18.1171 7.82185 17.6983 6.81081C17.2796 5.79976 16.6657 4.8811 15.8919 4.10728C15.1181 3.33346 14.1994 2.71963 13.1884 2.30084C12.1773 1.88205 11.0937 1.6665 9.99935 1.6665C8.905 1.6665 7.82137 1.88205 6.81032 2.30084C5.79927 2.71963 4.88061 3.33346 4.10679 4.10728C2.54399 5.67008 1.66602 7.7897 1.66602 9.99984C1.66602 13.5415 3.89102 16.5832 7.03268 17.7832C6.95768 17.1332 6.88268 16.0582 7.03268 15.3165L7.99102 11.1998C7.99102 11.1998 7.74935 10.7165 7.74935 9.94984C7.74935 8.79984 8.46602 7.9415 9.28268 7.9415C9.99935 7.9415 10.3327 8.4665 10.3327 9.1415C10.3327 9.85817 9.85768 10.8832 9.61602 11.8665C9.47435 12.6832 10.0493 13.3998 10.8827 13.3998C12.366 13.3998 13.516 11.8165 13.516 9.58317C13.516 7.58317 12.0827 6.2165 10.0243 6.2165C7.67435 6.2165 6.29102 7.9665 6.29102 9.80817C6.29102 10.5248 6.52435 11.2498 6.90768 11.7248C6.98268 11.7748 6.98268 11.8415 6.95768 11.9665L6.71602 12.8748C6.71602 13.0165 6.62435 13.0665 6.48268 12.9665C5.41602 12.4998 4.79935 10.9832 4.79935 9.75817C4.79935 7.12484 6.66602 4.73317 10.266 4.73317C13.1327 4.73317 15.366 6.7915 15.366 9.52484C15.366 12.3915 13.591 14.6915 11.0493 14.6915C10.241 14.6915 9.44935 14.2582 9.16602 13.7498L8.60768 15.7248C8.41602 16.4415 7.89102 17.3998 7.53268 17.9748V17.9498Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="details_location  d-md-none">
            <div className="detail_provider">
              <h3>{previewData?.data?.Portfolio?.storeName}</h3>
              <div>{previewData?.data?.Portfolio?.storeAddress}</div>
              <div className="icon_cat_container">
                <div className="detail_icon">
                  <img src={BeautySpaIcon} alt="Ico" />
                </div>
                <div>
                  {previewData?.data?.Portfolio?.storeCategory}/
                  {previewData?.data?.Portfolio?.storeSubCategory}
                </div>
              </div>
              <div className="details_provider_favoruite">
                <svg
                  viewBox="0 0 24 24"
                  className="favoruite_grey"
                  xmlns="https://www.w3.org/2000/svg"
                >
                  <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                </svg>
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
                  <Link to={previewData?.data?.Portfolio?.storeWebsite}>
                    Visit Our Websites
                  </Link>
                </button>
              </div>
            </div>
          </div>
          <div className="details_description  d-md-none">
            <h3>About This Service</h3>
            <p>
              {previewData?.data?.Portfolio?.storeDescription}
              <span className="details_read_more">Read More</span>
            </p>
            <div className="social_head">Share This Deal</div>
            <div className="social_group">
              <div>
                <a href="https://gmail.ocm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4.46401 3.57129H15.5354C16.1284 3.57125 16.6989 3.79811 17.1299 4.20534C17.5609 4.61257 17.8197 5.16928 17.8533 5.76129L17.8569 5.89272V14.107C17.8569 14.7 17.63 15.2705 17.2228 15.7015C16.8156 16.1325 16.2589 16.3913 15.6669 16.4249L15.5354 16.4284H4.46401C3.87105 16.4285 3.30056 16.2016 2.86956 15.7944C2.43855 15.3872 2.17972 14.8304 2.14615 14.2384L2.14258 14.107V5.89272C2.14254 5.29976 2.3694 4.72927 2.77663 4.29827C3.18386 3.86727 3.74057 3.60843 4.33258 3.57486L4.46401 3.57129ZM16.7854 7.78915L10.2469 11.1891C10.1835 11.2221 10.1143 11.242 10.0431 11.2477C9.97197 11.2535 9.90039 11.245 9.83258 11.2227L9.75258 11.1891L3.21401 7.78915V14.107C3.21402 14.4207 3.33199 14.7229 3.54449 14.9537C3.757 15.1845 4.04851 15.3269 4.36115 15.3527L4.46401 15.357H15.5354C15.8493 15.357 16.1516 15.2389 16.3824 15.0263C16.6132 14.8136 16.7555 14.5219 16.7811 14.2091L16.7854 14.107V7.78915ZM15.5354 4.64272H4.46401C4.1503 4.64273 3.84807 4.7607 3.6173 4.9732C3.38653 5.18571 3.24411 5.47722 3.21829 5.78986L3.21401 5.89272V6.58129L9.99972 10.1099L16.7854 6.58129V5.89272C16.7854 5.5789 16.6673 5.27657 16.4547 5.04578C16.242 4.815 15.9503 4.67265 15.6376 4.647L15.5354 4.64272Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a href="https://facebook.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3327 9.99984C18.3327 5.39984 14.5993 1.6665 9.99935 1.6665C5.39935 1.6665 1.66602 5.39984 1.66602 9.99984C1.66602 14.0332 4.53268 17.3915 8.33268 18.1665V12.4998H6.66602V9.99984H8.33268V7.9165C8.33268 6.30817 9.64102 4.99984 11.2493 4.99984H13.3327V7.49984H11.666C11.2077 7.49984 10.8327 7.87484 10.8327 8.33317V9.99984H13.3327V12.4998H10.8327V18.2915C15.041 17.8748 18.3327 14.3248 18.3327 9.99984Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a href="https://twitter.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M18.3327 4.83351C17.7063 5.10525 17.0439 5.28489 16.366 5.36684C17.0812 4.93961 17.6171 4.26749 17.8743 3.47517C17.2023 3.87523 16.4667 4.15709 15.6993 4.30851C15.1865 3.75232 14.5035 3.38209 13.7575 3.25588C13.0116 3.12968 12.2448 3.25464 11.5775 3.61117C10.9102 3.96769 10.3801 4.53562 10.0704 5.22587C9.76064 5.91613 9.68876 6.68967 9.86602 7.42517C8.5072 7.35645 7.17805 7.00264 5.96489 6.38673C4.75174 5.77082 3.68172 4.90659 2.82435 3.85017C2.52363 4.37531 2.36561 4.97003 2.36602 5.57517C2.36495 6.13716 2.50286 6.69069 2.76748 7.18648C3.03209 7.68227 3.4152 8.10493 3.88268 8.41684C3.33933 8.40206 2.80759 8.25626 2.33268 7.99184V8.03351C2.33675 8.82092 2.61268 9.58275 3.11378 10.1901C3.61488 10.7975 4.3104 11.2132 5.08268 11.3668C4.7854 11.4573 4.47674 11.505 4.16602 11.5085C3.95092 11.506 3.73637 11.4865 3.52435 11.4502C3.74427 12.1275 4.16987 12.7195 4.74191 13.1436C5.31395 13.5678 6.004 13.8031 6.71602 13.8168C5.51368 14.7629 4.02925 15.2792 2.49935 15.2835C2.22079 15.2844 1.94246 15.2677 1.66602 15.2335C3.22804 16.2421 5.04836 16.7774 6.90768 16.7752C8.19076 16.7885 9.46363 16.546 10.6519 16.0619C11.8403 15.5778 12.9202 14.8617 13.8287 13.9556C14.7372 13.0494 15.456 11.9713 15.9431 10.7843C16.4303 9.59719 16.676 8.32495 16.666 7.04184V6.60017C17.3199 6.11252 17.8839 5.5147 18.3327 4.83351Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a href="https://pintres.com">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M7.53268 17.9498C8.33268 18.1915 9.14102 18.3332 9.99935 18.3332C12.2095 18.3332 14.3291 17.4552 15.8919 15.8924C17.4547 14.3296 18.3327 12.21 18.3327 9.99984C18.3327 8.90549 18.1171 7.82185 17.6983 6.81081C17.2796 5.79976 16.6657 4.8811 15.8919 4.10728C15.1181 3.33346 14.1994 2.71963 13.1884 2.30084C12.1773 1.88205 11.0937 1.6665 9.99935 1.6665C8.905 1.6665 7.82137 1.88205 6.81032 2.30084C5.79927 2.71963 4.88061 3.33346 4.10679 4.10728C2.54399 5.67008 1.66602 7.7897 1.66602 9.99984C1.66602 13.5415 3.89102 16.5832 7.03268 17.7832C6.95768 17.1332 6.88268 16.0582 7.03268 15.3165L7.99102 11.1998C7.99102 11.1998 7.74935 10.7165 7.74935 9.94984C7.74935 8.79984 8.46602 7.9415 9.28268 7.9415C9.99935 7.9415 10.3327 8.4665 10.3327 9.1415C10.3327 9.85817 9.85768 10.8832 9.61602 11.8665C9.47435 12.6832 10.0493 13.3998 10.8827 13.3998C12.366 13.3998 13.516 11.8165 13.516 9.58317C13.516 7.58317 12.0827 6.2165 10.0243 6.2165C7.67435 6.2165 6.29102 7.9665 6.29102 9.80817C6.29102 10.5248 6.52435 11.2498 6.90768 11.7248C6.98268 11.7748 6.98268 11.8415 6.95768 11.9665L6.71602 12.8748C6.71602 13.0165 6.62435 13.0665 6.48268 12.9665C5.41602 12.4998 4.79935 10.9832 4.79935 9.75817C4.79935 7.12484 6.66602 4.73317 10.266 4.73317C13.1327 4.73317 15.366 6.7915 15.366 9.52484C15.366 12.3915 13.591 14.6915 11.0493 14.6915C10.241 14.6915 9.44935 14.2582 9.16602 13.7498L8.60768 15.7248C8.41602 16.4415 7.89102 17.3998 7.53268 17.9748V17.9498Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <h2>Provider Products</h2>

        {previewData?.data?.product?.map((product) => (
          <Crasule key={product?._id} product={product} />
        ))}
        {/* {crasule("No-Chip Manicure")} */}
        <h5>More Ads from this provider</h5>
        <div className="details_ads">
          {previewData?.data?.adverts?.map((ads) => (
            <Link to="#" className="details_provider_ads" key={ads?._id}>
              <div>
                <div className="detials_provider_img">
                  <img src={ads?.advertImages[0]} alt="adsImage" />
                  <div className="details_favoruite">
                    <svg
                      viewBox="0 0 24 24"
                      className="unfilled"
                      xmlns="https://www.w3.org/2000/svg"
                    >
                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                    </svg>
                  </div>
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
        <button className="show_more_ads_btn">
          Show all Ads from this provider
        </button>
      </div>
    </>
  );
};

export default AdvertProductPreview;
