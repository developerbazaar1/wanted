import { Link } from "react-router-dom";
import AdvertTop from "../assets/advert-top-img.png";
import { useEffect, useState } from "react";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import Spiner from "../components/Spiner";
import { toast } from "react-toastify";
import { DatedFormated } from "../helper/ToDate";
import Swal from "sweetalert2";
import NoDataFound from "../components/NoDataFound";
import NoAdvertImg from "../assets/NoAdvert.png";
import { BiRepost } from "react-icons/bi";
import { TiEyeOutline } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import CustomPagination from "../components/CustomePagination";
const Advert = () => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdvert] = useState([]);
  const { user, token } = useAuth();
  const [refresh, setRefresh] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  let getUserAdvert = () => {
    // console.log(user.id);
    setLoading(true);
    ProctedApi.getAdvert(user.id, token)
      .then((res) => {
        setAdvert(res.data.adverts);
        // console.log(res.data.adverts);
      })
      .catch((e) => {
        // console.log(e);
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }

        if (e?.request?.status == 404) {
          console.log(e?.response?.data?.message);
          return toast.warning(e?.response?.data?.message);
        } else {
          toast.error("Something Went Wrong");
        }
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
        // console.log(res);
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
        setAdvert(adverts.filter((advert) => advert._id !== advertId));
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        // console.log(e);
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleCheckbox = (advert) => {
    setLoading(true);
    const updatedAdverts = adverts.map((ad) => {
      if (ad._id === advert._id) {
        return { ...ad, advertVisibility: !ad.advertVisibility };
      }
      return ad;
    });

    setAdvert(updatedAdverts);
    const data = {
      advertId: advert._id,
      advertVisibility: !advert.advertVisibility,
      provider_id: user.id,
    };
    // console.log(data);
    // return;
    ProctedApi.handleAdvertVisability(data, token)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        console.log(e);
        toast.error("Failed to update advert visibility. Please try again.");

        // Revert the state back to its original state due to the failed API update
        setAdvert(adverts);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete operation here
        removeAdvert(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "info");
      }
    });
  };

  // const handleClick = (Id) => {
  //   // Store the state in localStorage
  //   localStorage.setItem("advertId", Id);
  // };

  useEffect(() => {
    getUserAdvert();
  }, [refresh]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = adverts.slice(indexOfFirstItem, indexOfLastItem);
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
                    <IoIosArrowRoundBack size={24} />
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
                    Add A New Advert <IoMdAddCircleOutline size={22} />
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

          <div className="advert__tabel_container">
            <div className="advert-table">
              <table className="table">
                <thead className="r-thed">
                  <tr className="text-center">
                    <th>S.No.</th>
                    <th>Advert Name</th>
                    <th>Where To Show</th>
                    <th>Advert Price</th>
                    <th>Creation Date</th>
                    <th>Expiry Date</th>
                    <th>Status</th>
                    <th>Manage Advert</th>
                    <th>Show/Hide Ads</th>
                  </tr>
                </thead>
                <tbody>
                  {adverts?.length ? (
                    currentItems?.map((advert, index) => (
                      <tr key={index} className="text-center">
                        <td className="serial">
                          {index + 1 + indexOfFirstItem}
                        </td>
                        <td className="advert_name_cell">
                          {advert?.advertTitle}
                        </td>
                        <td className="user">{advert?.whereToShow}</td>
                        <td className="">£{advert?.advertPrice}</td>
                        <td className="">{DatedFormated(advert?.createdAt)}</td>
                        <td>
                          {advert?.advertExpiryDate
                            ? DatedFormated(advert?.advertExpiryDate)
                            : DatedFormated(advert?.createdAt)}
                        </td>
                        {advert.advertStatus === "active" ? (
                          <td>
                            <span
                              className="badge custom-badge"
                              style={{
                                color: "black",
                                backgroundColor: "#2df54f",
                              }}
                            >
                              Active
                            </span>
                          </td>
                        ) : (
                          <td>
                            <span className="badge text-bg-danger custom-badge">
                              expired
                            </span>
                          </td>
                        )}

                        <td>
                          {/* text-align: -webkit-center; */}
                          <div
                            className="dropdown"
                            style={{
                              textAlign: "-webkit-center",
                            }}
                          >
                            <button
                              className="tabel_manage_advert_button dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Manage Advert
                            </button>
                            <ul className="dropdown-menu manage-advertDropDown">
                              <li className="pointer">
                                <Link
                                  to={`/advert-preview`}
                                  // onClick={() => handleClick(advert._id)}
                                  state={{ advertid: advert._id }}
                                  className="advert-preview manage-advert-btn"
                                >
                                  <TiEyeOutline size={21} />
                                  <span>Preview</span>
                                </Link>
                              </li>
                              <li className="pointer  my-1 manage-advert-btn">
                                <Link
                                  to="/postagain"
                                  state={{ _id: advert._id }}
                                  className="postAgain-ling manage-advert-btn"
                                >
                                  <BiRepost size={20} />
                                  <span>Post Again</span>
                                </Link>
                              </li>
                              <li
                                className="pointer manage-advert-btn"
                                // onClick={() => handleAdvertEditModal(advert)}
                              >
                                <Link
                                  to="edit"
                                  state={{ _id: advert._id }}
                                  className="manage-advert-btn"
                                  style={{
                                    marginLeft: "2px",
                                  }}
                                >
                                  <FiEdit />
                                  <span
                                    style={{
                                      marginLeft: "2px",
                                    }}
                                  >
                                    Edit Advert Details
                                  </span>
                                </Link>
                              </li>
                              <li
                                className="pointer mt-2 delete_advert manage-advert-btn"
                                onClick={() => handleDelete(advert._id)}
                              >
                                <RiDeleteBinLine size={19} />
                                <span>Delete</span>
                              </li>
                            </ul>
                          </div>
                        </td>
                        <td>
                          <label className="switch">
                            {advert?.advertVisibility}
                            <input
                              type="checkbox"
                              checked={advert.advertVisibility}
                              onChange={() => toggleCheckbox(advert)}
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        <NoDataFound
                          img={NoAdvertImg}
                          title={`No Advert Found`}
                          description={`Add Your exclusive offer to advertize`}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <CustomPagination
                totalItems={adverts.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Advert;
