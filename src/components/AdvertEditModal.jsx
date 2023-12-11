import { useEffect, useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import Spiner from "./Spiner";
import { toast } from "react-toastify";
import { castEditadvertData } from "../helper/castAddAdvert";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import { useCategory, useSubCategory } from "../service/categoryhelper";
const AdvertEditModal = ({
  showAdvertModal,
  setshowAdvertModal,
  editAdvertData,
  setRefresh,
}) => {
  console.log("edit advert data", editAdvertData);
  const [imagesPrveiw, setimagesPrveiw] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const numEmptyDivs = 5 - (imagesPrveiw ? imagesPrveiw.length : 0);
  const { subcategory } = useSubCategory();
  const { category } = useCategory();
  const { register, handleSubmit, setValue } = useForm();
  const { token, user } = useAuth();

  /**
   *
   * functin to handle category change
   * @returns
   */
  const handleCategoryChange = (event) => {
    console.log("inside the subCategory");
    const selectedValue = event.target.value;
    const selectedCat = category.find(
      (cat) => cat.categoryName === selectedValue
    );
    setSelectedCategory(selectedCat);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Selected file is not an image");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (!ImgSizeCheck(file.size)) {
      toast.error("File size exceeds the limit of 5 MB");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setimagesPrveiw(e.target.result);
      };
      reader.readAsDataURL(file);
      setValue("img", file);
    }
  };

  const handleAdvertEdit = (formData) => {
    console.log(formData);
    // return;
    // formData.append("_id", editAdvertData?._id);
    // formData.append("provider_id", user?.id);
    setLoading(true);

    const data = castEditadvertData(formData, editAdvertData?._id, user?.id);
    // console.log(data);
    // return;
    ProctedApi.updateAdvert(data, token)
      .then((res) => {
        // console.log(res);
        setRefresh((setval) => !setval);
        toast.success(res?.data?.message);
        handleCloseadvetModal();
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCloseadvetModal = () => {
    setshowAdvertModal(false);
    // setSelectedCategory(null);
  };

  useEffect(() => {
    console.log("in default setup useeffects");
    let subCat = category?.find(
      (element) => element?.categoryName === editAdvertData?.advertCategory
    );
    setSelectedCategory(subCat);
  }, [editAdvertData]);

  useEffect(() => {
    setValue("adverttitle", editAdvertData?.advertTitle);
    setValue("advertcategory", editAdvertData?.advertCategory);
    setValue("advertsubCategory", editAdvertData?.advertSubCategory);
    setValue("advertdescription", editAdvertData?.advertDescription);
    setValue("advertplanprice", editAdvertData?.advertPrice);
    setValue("wheretshow", editAdvertData?.whereToShow);
  }, [editAdvertData]);

  // useEffect(() => {}, [editAdvertData]);

  return (
    <>
      <Spiner loading={loading} />
      <div>
        <div className="div">
          <Modal
            show={showAdvertModal}
            onHide={handleCloseadvetModal}
            id="edit_advert_modal"
            centered
          >
            <Modal.Body className="row">
              <div className="advert-edit-modal d-flex justify-content-between">
                <div className="text-center head">Advert Details</div>
                <div className="d-flex">
                  <Link to="/postagain" state={{ advertData: editAdvertData }}>
                    <button className="advert-mange-post-again-btn">
                      Post Again
                    </button>
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit(handleAdvertEdit)}>
                <div className="manage-advert-input-grup d-flex gap-4 flex-column flex-md-row">
                  <div className="left-input-input-group">
                    <div className="advert-title-input">
                      <label
                        htmlFor="adverttitle"
                        className="d-flex justify-content-between "
                      >
                        <span className="manage-advert-label">Add Title:</span>
                        <span>
                          <svg
                            className="pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <textarea
                        className="w-100  editadevert_input"
                        rows="2"
                        name="adverttitle"
                        id="adverttitle"
                        // placeholder="Up to 37% Off on Nail Spa/Salon - Shellac / No-Chip / Gel"
                        {...register("adverttitle")}
                      />
                    </div>
                    <div className="advert-subCategory-input d-flex flex-column">
                      <label
                        htmlFor="advertcategory"
                        className="d-flex justify-content-between"
                      >
                        <span className="manage-advert-label">Category:</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <select
                        className="editadevert_input w-100"
                        type="text"
                        id="advertcategory"
                        name="advertcategory"
                        // placeholder="Beauty & Spa"
                        {...register("advertcategory")}
                        onChange={handleCategoryChange}
                      >
                        {category?.map((element) => (
                          <option
                            key={element?._id}
                            value={element?.categoryName}
                          >
                            {element?.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="wheretshow"
                        className="manage-advert-label"
                      >
                        Where To Show:
                      </label>

                      <select
                        name="pets"
                        id="pet-select"
                        {...register("wheretshow")}
                        className="w-100 editadevert_input"
                      >
                        {/* <option value=""></option> */}
                        {/* <option value="">--Please choose an option--</option> */}
                        <option value="liveAds">liveAds</option>
                        <option value="latesOffer">latesOffer</option>
                        <option value="service">service</option>
                      </select>
                    </div>
                  </div>
                  <div className="right-input">
                    <div className="advert-description-input">
                      <label
                        htmlFor="advertdescription"
                        className="d-flex justify-content-between "
                      >
                        <span className="manage-advert-label">
                          Add Description:
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <textarea
                        className="w-100 editadevert_input"
                        rows="2"
                        name="advertdescription"
                        id="advertdescription"
                        {...register("advertdescription")}
                        // placeholder="Up to 37% Off on Nail Spa/Salon - Shellac / No-Chip / Gel"
                      />
                    </div>
                    <div className="advert-subCategory-input d-flex flex-column">
                      <label
                        htmlFor="advertsubCategory"
                        className="d-flex justify-content-between"
                      >
                        <span className="manage-advert-label">
                          Sub Category:
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <select
                        className="editadevert_input w-100"
                        type="text"
                        id="advertsubCategory"
                        // placeholder="Beauty & Spa"
                        {...register("advertsubCategory")}
                      >
                        {/* <option value="" key="defaultsubcat">
                          Select Advert Sub Category
                        </option> */}

                        {selectedCategory &&
                          subcategory
                            ?.filter(
                              (item) =>
                                item.category_id === selectedCategory?._id
                            )
                            .map((subcate) => (
                              <option
                                key={subcate._id}
                                value={`${subcate?.subCategoryName}`}
                              >
                                {subcate?.subCategoryName}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="advertplanprice"
                        className="manage-advert-label"
                      >
                        Advert Price Plan:
                      </label>
                      <input
                        type="text"
                        id="advertplanprice"
                        // placeholder="Live Ads"
                        readOnly
                        name="advertplanprice"
                        className="w-100 editadevert_input"
                        {...register("advertplanprice")}
                      />
                    </div>
                  </div>
                </div>
                <div className="manage-advert-image-grup mt-2">
                  <label
                    htmlFor="advertmanageimg"
                    className="d-flex justify-content-between position-relative"
                  >
                    <span className="manage-advert-label">Advert Images:</span>
                    <span>
                      <input
                        type="file"
                        id="advertmanageimg"
                        className="advert_edit_imag_picker"
                        onChange={handleImageSelect}
                        ref={fileInputRef}
                      />
                      <svg
                        className="pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </label>
                  <div>
                    {/* {imagesPrveiw?.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`preview-${index}`} className="" />
                      </div>
                    ))} */}

                    <div>
                      {imagesPrveiw ? (
                        <img src={imagesPrveiw} alt={`preview`} className="" />
                      ) : (
                        <img
                          src={editAdvertData?.advertImages[0]}
                          alt={`already`}
                          className=""
                        />
                      )}
                    </div>

                    {/* {Array.from({ length: numEmptyDivs }, (_, index) => (
                      <div key={index}></div>
                    ))} */}
                  </div>
                </div>
                <div className="text-center">
                  <button className="mt-3 edit_product_modal_btn">
                    Save Details
                  </button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AdvertEditModal;
