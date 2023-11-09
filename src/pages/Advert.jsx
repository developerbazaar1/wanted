import { Link } from "react-router-dom";
import AdvertTop from "../assets/advert-top-img.png";
import AdvertEditModal from "../components/AdvertEditModal";
import { useEffect, useState } from "react";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import Spiner from "../components/Spiner";
import { toast } from "react-toastify";
import { DatedFormated } from "../helper/ToDate";
const Advert = () => {
  const [showAdvertModal, setshowAdvertModal] = useState(false);
  const [checkBox, setcheckBox] = useState(true);
  const [loading, setLoading] = useState(false);
  const [adverts, setAdvert] = useState([]);
  const { user, token } = useAuth();
  let getUserAdvert = () => {
    // console.log(user.id);
    setLoading(true);
    ProctedApi.getAdvert(user.id, token)
      .then((res) => {
        setAdvert(res.data.adverts);
        console.log(res.data.adverts);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Went Wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let removeAdvert = (advertId) => {
    setLoading(true);
    let data = {
      _id: advertId,
      provider_id: user.id,
    };

    // console.log(data);
    ProctedApi.deleteAdvert(data, token)
      .then((res) => {
        console.log(res);
        setAdvert(adverts.filter((advert) => advert._id !== advertId));
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleCheckbox = () => {
    setcheckBox(!checkBox);
  };

  useEffect(() => {
    getUserAdvert();
  }, []);

  return (
    <div>
      <Spiner loading={loading} />
      <main className="advert-content">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="row gap-5 gap-md-0">
              {/* <!-- top head --> */}

              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-left self-center">
                <div className="back-btn">
                  <Link to=".." className="b-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1710_5743)">
                        <path
                          d="M8.67222 5.13338L3.33333 10.5L8.67222 15.8667C8.72044 15.93 8.7817 15.9823 8.85185 16.0198C8.922 16.0574 8.99941 16.0795 9.07884 16.0846C9.15827 16.0896 9.23785 16.0776 9.31221 16.0492C9.38658 16.0208 9.45397 15.9768 9.50985 15.9202C9.56572 15.8635 9.60876 15.7955 9.63606 15.7207C9.66336 15.6459 9.67428 15.5662 9.66808 15.4868C9.66188 15.4075 9.6387 15.3304 9.60012 15.2608C9.56153 15.1912 9.50845 15.1307 9.44444 15.0834L5.45 11.0556H16.0778C16.2251 11.0556 16.3664 10.9971 16.4706 10.8929C16.5748 10.7887 16.6333 10.6474 16.6333 10.5C16.6333 10.3527 16.5748 10.2114 16.4706 10.1072C16.3664 10.003 16.2251 9.94449 16.0778 9.94449H5.45L9.44444 5.91672C9.54832 5.8121 9.60639 5.67051 9.60586 5.52308C9.60534 5.37566 9.54628 5.23448 9.44167 5.1306C9.33705 5.02673 9.19546 4.96866 9.04804 4.96918C8.90061 4.9697 8.75943 5.02877 8.65556 5.13338H8.67222Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1710_5743">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="matrix(0 -1 1 0 0 20.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>{" "}
                    Back
                  </Link>
                </div>
                <div className="top-head mt-3">
                  <h1>Advert Showcase</h1>
                  <p className="mb-0">Display Your Advertisements</p>
                  <p className="para-2 mt-2">A Space for Your Ad Campaigns</p>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-center self-center">
                <div className="create-add-btn">
                  <Link to="/addAdvert" className="add-adwart-btn">
                    Add A New Advert{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_1090_405)">
                        <path
                          d="M9.71875 13.5149V10.7805H6.98438C6.55286 10.7805 6.20312 10.4308 6.20312 9.99924C6.20312 9.56787 6.55286 9.21799 6.98438 9.21799H9.71875V6.48361C9.71875 6.05225 10.0685 5.70236 10.5 5.70236C10.9315 5.70236 11.2812 6.05225 11.2812 6.48361V9.21799H14.0156C14.4471 9.21799 14.7969 9.56787 14.7969 9.99924C14.7969 10.4308 14.4471 10.7805 14.0156 10.7805H11.2812V13.5149C11.2812 13.9464 10.9315 14.2961 10.5 14.2961C10.0685 14.2961 9.71875 13.9464 9.71875 13.5149ZM17.5711 2.92892C15.6823 1.04019 13.1711 0 10.5 0C7.82895 0 5.31766 1.04019 3.42892 2.92892C1.54019 4.81766 0.5 7.32895 0.5 10C0.5 12.6711 1.54019 15.1823 3.42892 17.0711C5.31766 18.9598 7.82895 20 10.5 20C12.3286 20 14.1179 19.5016 15.6743 18.5588C16.0434 18.3353 16.1613 17.8549 15.9378 17.486C15.7142 17.1169 15.2337 16.9989 14.8648 17.2224C13.5525 18.0173 12.0431 18.4375 10.5 18.4375C5.8476 18.4375 2.0625 14.6524 2.0625 10C2.0625 5.3476 5.8476 1.5625 10.5 1.5625C15.1524 1.5625 18.9375 5.3476 18.9375 10C18.9375 11.6637 18.4428 13.2829 17.5068 14.6831C17.267 15.0417 17.3634 15.5269 17.7221 15.7668C18.0807 16.0065 18.5659 15.91 18.8058 15.5515C19.9141 13.8936 20.5 11.9739 20.5 10C20.5 7.32895 19.4598 4.81766 17.5711 2.92892Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1090_405">
                          <rect
                            width="20"
                            height="20"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </Link>
                </div>
              </div>
              {/* <!-- top image --> */}
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 advert_top_img_container">
                <div className="advert-top-image">
                  <img className="" src={AdvertTop} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="advert__tabel_container">
        <div className="advert-table">
          <table className="table">
            <thead className="r-thed">
              <tr>
                <th>S.No.</th>
                <th>Advert Name</th>
                <th>Where To Show</th>
                <th>Advert Price</th>
                <th>Creating Date</th>
                <th>Expire Date</th>
                <th>Status</th>
                <th>Manage Advert</th>
                <th>Show/Hide Ads</th>
              </tr>
            </thead>
            <tbody>
              {adverts
                ? adverts?.map((advert, index) => (
                    <tr key={index}>
                      <td className="serial">{index + 1}</td>
                      <td className="advert_name_cell">
                        {advert?.advertTitle}
                      </td>
                      <td className="user">{advert?.whereToShow}</td>
                      <td className="">£{advert?.advertPrice}</td>
                      <td className="">{DatedFormated(advert?.createdAt)}</td>
                      <td>15/03/2023</td>
                      <td
                        style={{
                          color: "#2df54f",
                        }}
                      >
                        {advert?.advertStatus ? "Active" : "Pending"}
                      </td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="tabel_manage_advert_button dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            Manage Advert
                          </button>
                          <ul className="dropdown-menu">
                            <li
                              className="pointer text-center advert_edit"
                              onClick={() => setshowAdvertModal(true)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                className="me-2"
                              >
                                <path
                                  d="M17.7948 2.20493C17.4906 1.90063 17.1294 1.65925 16.7318 1.49457C16.3343 1.32988 15.9082 1.24512 15.4779 1.24512C15.0476 1.24512 14.6216 1.32988 14.224 1.49457C13.8265 1.65925 13.4653 1.90063 13.1611 2.20493L3.32106 12.0449C2.85372 12.5126 2.52046 13.0971 2.35606 13.7374L1.26856 17.9699C1.24159 18.0752 1.24256 18.1858 1.27136 18.2906C1.30017 18.3954 1.35581 18.4909 1.43281 18.5676C1.5098 18.6444 1.60548 18.6997 1.7104 18.7282C1.81532 18.7566 1.92584 18.7572 2.03106 18.7299L6.26231 17.6437C6.90279 17.4796 7.48736 17.1463 7.95481 16.6787L17.7948 6.83868C18.0991 6.53444 18.3405 6.17324 18.5052 5.77571C18.6699 5.37818 18.7546 4.9521 18.7546 4.5218C18.7546 4.09151 18.6699 3.66543 18.5052 3.26789C18.3405 2.87036 18.0991 2.50916 17.7948 2.20493ZM14.0448 3.08868C14.4249 2.70859 14.9404 2.49506 15.4779 2.49506C16.0155 2.49506 16.531 2.70859 16.9111 3.08868C17.2912 3.46876 17.5047 3.98427 17.5047 4.5218C17.5047 5.05933 17.2912 5.57484 16.9111 5.95492L15.9373 6.92868L13.0711 4.06242L14.0448 3.08868ZM12.1873 4.94618L15.0536 7.81242L7.07106 15.7949C6.76153 16.1039 6.37473 16.324 5.95106 16.4324L2.74231 17.2574L3.56731 14.0487C3.67491 13.6247 3.89518 13.2377 4.20481 12.9287L12.1873 4.94618Z"
                                  fill="#17C737"
                                />
                              </svg>
                              <span>edit</span>
                            </li>
                            <li
                              className="pointer text-center mt-2 delete_advert"
                              onClick={() => removeAdvert(advert._id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="17"
                                viewBox="0 0 16 17"
                                fill="none"
                                className="me-2"
                              >
                                <path
                                  d="M6.5 3H9.5C9.5 2.60218 9.34196 2.22064 9.06066 1.93934C8.77936 1.65804 8.39782 1.5 8 1.5C7.60218 1.5 7.22064 1.65804 6.93934 1.93934C6.65804 2.22064 6.5 2.60218 6.5 3ZM5.5 3C5.5 2.33696 5.76339 1.70107 6.23223 1.23223C6.70107 0.763392 7.33696 0.5 8 0.5C8.66304 0.5 9.29893 0.763392 9.76777 1.23223C10.2366 1.70107 10.5 2.33696 10.5 3H15.5C15.6326 3 15.7598 3.05268 15.8536 3.14645C15.9473 3.24021 16 3.36739 16 3.5C16 3.63261 15.9473 3.75979 15.8536 3.85355C15.7598 3.94732 15.6326 4 15.5 4H14.446L13.252 14.344C13.1676 15.0752 12.8173 15.7498 12.2679 16.2396C11.7184 16.7293 11.008 16.9999 10.272 17H5.728C4.99195 16.9999 4.28161 16.7293 3.73214 16.2396C3.18266 15.7498 2.8324 15.0752 2.748 14.344L1.554 4H0.5C0.367392 4 0.240215 3.94732 0.146447 3.85355C0.0526785 3.75979 0 3.63261 0 3.5C0 3.36739 0.0526785 3.24021 0.146447 3.14645C0.240215 3.05268 0.367392 3 0.5 3H5.5ZM3.741 14.23C3.79743 14.7174 4.03105 15.167 4.39742 15.4934C4.76379 15.8198 5.23735 16.0001 5.728 16H10.272C10.7627 16.0001 11.2362 15.8198 11.6026 15.4934C11.969 15.167 12.2026 14.7174 12.259 14.23L13.439 4H2.561L3.741 14.23ZM6.5 6.5C6.63261 6.5 6.75979 6.55268 6.85355 6.64645C6.94732 6.74021 7 6.86739 7 7V13C7 13.1326 6.94732 13.2598 6.85355 13.3536C6.75979 13.4473 6.63261 13.5 6.5 13.5C6.36739 13.5 6.24021 13.4473 6.14645 13.3536C6.05268 13.2598 6 13.1326 6 13V7C6 6.86739 6.05268 6.74021 6.14645 6.64645C6.24021 6.55268 6.36739 6.5 6.5 6.5ZM10 7C10 6.86739 9.94732 6.74021 9.85355 6.64645C9.75979 6.55268 9.63261 6.5 9.5 6.5C9.36739 6.5 9.24021 6.55268 9.14645 6.64645C9.05268 6.74021 9 6.86739 9 7V13C9 13.1326 9.05268 13.2598 9.14645 13.3536C9.24021 13.4473 9.36739 13.5 9.5 13.5C9.63261 13.5 9.75979 13.4473 9.85355 13.3536C9.94732 13.2598 10 13.1326 10 13V7Z"
                                  fill="#FF0000"
                                />
                              </svg>
                              <span>Delete</span>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={checkBox}
                            onChange={toggleCheckbox}
                          />
                          <span className="slider round"></span>
                        </label>
                      </td>
                    </tr>
                  ))
                : "NO Advert Found!"}

              {/* <!-- Add more rows as needed --> */}
            </tbody>
          </table>
        </div>
      </div>
      <AdvertEditModal
        showAdvertModal={showAdvertModal}
        setshowAdvertModal={setshowAdvertModal}
      />
    </div>
  );
};

export default Advert;
