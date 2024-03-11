import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/psd",
  "image/ai",
  "image/avif",
];
import { useForm } from "react-hook-form";
import { GoogleAPI, ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { castAddAdvert } from "../helper/castAddAdvert";
import { toast } from "react-toastify";
import Spiner from "../components/Spiner";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import {
  useCategory,
  useSubCategory,
  useSubSubCategory,
} from "../service/categoryhelper";
import AddAdvertTopHead from "../components/AddAdvertTopHead";
import Subscriptions from "../components/Subscriptions";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
const AddAdvert = () => {
  const inputRef = useRef();
  const navigate = useNavigate();
  const [subscription, setsubscription] = useState(null);
  const [locTypeAhead, setLocTypeAhead] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSubscription, setselectedSubscription] = useState(null);
  const { token, user, portfolio_id } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setfileName] = useState("");
  const [, setSelectedCategory] = useState(null);

  const fileInputRef = useRef(null);
  const { subcategory } = useSubCategory();
  const { category } = useCategory();
  const { subsubcategory } = useSubSubCategory();
  const [inputActive, setInputActive] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    const selectedCat = category.find(
      (cat) => cat.categoryName === selectedValue
    );
    setSelectedCategory(selectedCat);
  };

  const handleInputFocus = () => {
    // console.log("This is on Focused is called");
    setInputActive(true);
  };

  const HandleAddadvertSubmit = (formData) => {
    formData["subscription_plan_id"] = selectedSubscription._id;
    setLoading(true);
    const data = castAddAdvert(formData, user, portfolio_id);

    ProctedApi.AddAdvert(data, token)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          reset();
          setSelectedImage();
          toast.success("created");
          // console.log("navigating");
          navigate("/advert");
        }
      })
      .catch((e) => {
        // console.log(e, "error");
        // console.log(e?.response?.data?.message);
        return toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * @handle drag and drop
   */

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    console.log(file);
    if (!ImgSizeCheck(file.size)) {
      toast.error("File size exceeds the limit of 5 MB");
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Selected file is not a valid image format");
      return;
    }

    setfileName(file.name);
    setValue("img", e.dataTransfer.files[0]);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //functin to select image
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
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

    setValue("img", e?.target?.files[0]);
    console.log("image is receving");
    const filename = e?.target?.files[0].name;
    setfileName(filename);
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImagePreview = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSelectedImage(null);
    setfileName("");
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const handleSelectsub = (sub) => {
    setselectedSubscription(sub);
  };

  let product = watch("addProduct");

  //  function to set the  location value after selecting
  const setSelectedLocation = (value) => {
    setValue("ad_location", value);
    const elements = document.getElementsByClassName("type-ahead-options");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      element.style.display = "none";
    }
  };

  const FetchLocationTypeAhead = async () => {
    try {
      // const elements = document.getElementsByClassName("type-ahead-options");
      // for (let i = 0; i < elements.length; i++) {
      //   const element = elements[i];

      //   if (element.style.display === "none") {
      //     element.style.display = "block";
      //   }
      // }

      const response = await GoogleAPI.locationTypeAhead(
        watch("ad_location") || ""
      );

      // console.log(response.data);
      setLocTypeAhead(response?.data?.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  //  function to set the  location value after selecting
  // const setSelectedLocation = (value) => {
  //   setValue("ad_location", value);
  //   setInputActive(false);
  // };

  const handleClickOutside = (e) => {
    console.log("This is ref", inputRef);
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      console.log("Inside the curret ref");
      setInputActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    FetchLocationTypeAhead();
  }, [watch("ad_location")]);

  // console.log("This is location Type ahead", locTypeAhead);y

  return (
    <>
      <Spiner loading={loading} />
      <main className="app-content">
        {subscription?.length == 0 && (
          <h5 className="text-center fw-bold">
            Oops! It looks like your subscription is inactive Or You don&#39;t
            have ads left in It. To continue Publishing Your ads, please
            consider purchasing a Subscription. Thank you
          </h5>
        )}
        <AddAdvertTopHead />
        {/* <!-- ::  row start here --> */}
        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div id="form" className="form-container">
              {/* <!-- add book form start--> */}
              <form
                onSubmit={handleSubmit(HandleAddadvertSubmit)}
                className="w-100"
                id="add-advert-form"
              >
                {/* <!-- form row start at lower div --> */}
                <div className=" cst-add-new-form row">
                  {/* <!-- field col 01 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advert_title ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="title">
                        Advert Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advert_title"
                        placeholder="Enter your advert title"
                        {...register("advert_title", {
                          pattern: {
                            value: /^[ A-Za-z0-9._%+-]*$/,
                            message: "Invalid String",
                          },
                          required: {
                            value: true,
                            message: "Title is Required",
                          },
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 02 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <label className="form-head" htmlFor="show-ad">
                        Where To Show:
                      </label>
                      <div
                        className={`d-flex flex-column flex-md-row justify-content-between where_to_show_group ${
                          errors?.userSearch ? "whrer_To_show_error" : ""
                        }`}
                      >
                        <div className="d-flex align-items-center gap-3 justify-content-between">
                          <label
                            className="form-head mb-0 custom_advert_label"
                            htmlFor="liveads"
                          >
                            Live Ads
                          </label>
                          <input
                            className="radioColor"
                            type="radio"
                            name="userSearch"
                            value="Live Ads"
                            id="liveads"
                            {...register("userSearch", {
                              required: true,
                            })}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-3 justify-content-between">
                          <label
                            className="form-head mb-0 custom_advert_label"
                            htmlFor="latestoffer"
                          >
                            Latest Offers
                          </label>

                          <input
                            {...register("userSearch", {
                              required: true,
                            })}
                            className="radioColor"
                            type="radio"
                            name="userSearch"
                            id="latestoffer"
                            value="Latest Offers"
                          />
                        </div>

                        <div className="d-flex align-items-center gap-3 justify-content-between">
                          <label
                            className="form-head mb-0 custom_advert_label"
                            htmlFor="service"
                          >
                            Services
                          </label>
                          <input
                            {...register("userSearch", {
                              required: true,
                            })}
                            className="radioColor"
                            type="radio"
                            name="userSearch"
                            id="service"
                            value="Services"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- field col 0e start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertStoreName ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertStoreName">
                        Store Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertStoreName"
                        placeholder="Enter your store address"
                        {...register("advertStoreName", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col 0e end --> */}
                  {/* <!-- field col 05 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.adPostalCode ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="adPostalCode">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adPostalCode"
                        placeholder="Enter your advert Postal Code"
                        {...register("adPostalCode", {
                          required: {
                            value: true,
                            message: "Postal Code is Required",
                          },
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 05 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.adPrice ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="price">
                        Advert Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adPrice"
                        placeholder="Enter your advert price"
                        {...register("adPrice", {
                          pattern: {
                            value: /^\d+$/,
                            message: "Enter Valid Price",
                          },
                          required: {
                            value: true,
                            message: "Price is Required",
                          },
                        })}
                      />
                    </div>
                  </div>

                  {/* offer price div start */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertOfferPrice ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertOfferPrice">
                        Advert Offer Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertOfferPrice"
                        placeholder="Enter your advert price"
                        {...register("advertOfferPrice", {
                          pattern: {
                            value: /^\d+$/,
                            message: "Enter Valid Advert Offer Price",
                          },
                        })}
                      />
                    </div>
                  </div>
                  {/* offer price div end */}
                  {/* post code feild section */}
                  <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    <div
                      className={`form-group position-relative ${
                        errors?.ad_location ? "error_pesudo" : ""
                      }`}
                      ref={inputRef}
                    >
                      <label className="form-head" htmlFor="location">
                        Location
                      </label>
                      <input
                        type="search"
                        className="form-control "
                        id="ad_location"
                        placeholder="Enter location"
                        autoComplete="off"
                        onFocus={handleInputFocus}
                        {...register("ad_location", {
                          required: true,
                        })}
                      />

                      {inputActive && locTypeAhead?.length > 0 && (
                        <ul className="type-ahead-options">
                          {locTypeAhead?.map((typeAhead) => (
                            <li
                              className="type-ahead-option"
                              key={typeAhead?.place_id}
                              onClick={() =>
                                setSelectedLocation(typeAhead?.description)
                              }
                            >
                              <span className="icon icon--medium icon--beacon">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="21"
                                  height="21"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                >
                                  <g clipPath="url(#clip0_1661_1098)">
                                    <path
                                      d="M7.5 2.84375C5.48071 2.84375 3.83789 4.48657 3.83789 6.50586C3.83789 8.52515 5.48071 10.168 7.5 10.168C7.84104 10.168 8.17896 10.121 8.50436 10.0284C8.81561 9.9398 8.99607 9.61566 8.90751 9.30441C8.81889 8.99319 8.4948 8.81267 8.18353 8.90129C7.96251 8.96419 7.73253 8.99609 7.5 8.99609C6.12688 8.99609 5.00977 7.87897 5.00977 6.50586C5.00977 5.13274 6.12688 4.01562 7.5 4.01562C8.87312 4.01562 9.99023 5.13274 9.99023 6.50586C9.99023 6.75017 9.95508 6.99131 9.88573 7.22255C9.79277 7.53251 9.9687 7.85914 10.2787 7.9521C10.5887 8.045 10.9152 7.86916 11.0082 7.55917C11.1103 7.21865 11.1621 6.86428 11.1621 6.50586C11.1621 4.48657 9.51929 2.84375 7.5 2.84375Z"
                                      fill="#353535"
                                    />
                                    <path
                                      d="M11.7444 2.25676C10.6103 1.12391 9.10289 0.5 7.49991 0.5C5.8969 0.5 4.38955 1.12391 3.25547 2.25679C2.1215 3.38958 1.49599 4.89608 1.49414 6.50009C1.49528 7.66771 1.8196 8.76318 2.48558 9.84916C3.06229 10.7895 3.81149 11.61 4.60468 12.4786C5.38242 13.3303 6.18659 14.2111 6.82884 15.2271C6.93621 15.397 7.12318 15.5 7.32413 15.5H7.67569C7.87664 15.5 8.06361 15.397 8.17099 15.2271C8.81323 14.211 9.6174 13.3303 10.3951 12.4786C11.1883 11.61 11.9375 10.7895 12.5142 9.84913C13.1803 8.76315 13.5045 7.66766 13.5057 6.4988C13.5039 4.89605 12.8783 3.38955 11.7444 2.25676ZM9.52978 11.6884C8.83825 12.4457 8.12672 13.225 7.49991 14.1212C6.87314 13.225 6.16157 12.4457 5.47005 11.6884C3.96656 10.0419 2.66807 8.61992 2.66602 6.50018C2.66906 3.83785 4.83756 1.67188 7.49991 1.67188C10.1623 1.67188 12.3308 3.83785 12.3338 6.49892C12.3318 8.61992 11.0333 10.0419 9.52978 11.6884Z"
                                      fill="#353535"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_1661_1098">
                                      <rect
                                        width="15"
                                        height="15"
                                        fill="white"
                                        transform="translate(0 0.5)"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </span>

                              <div className="text-part-container">
                                <div className="keyword-highlight-text-wrapper type-ahead-option-primary-text">
                                  <span className="type-ahead-option-highlight">
                                    {typeAhead?.description}
                                  </span>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* <!-- field col end --> */}
                  {/* <!-- field col 07 start --> */}
                  <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.exampleTextarea ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="description">
                        Advert Description
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter your store description"
                        id="exampleTextarea"
                        rows="6"
                        name="answer"
                        {...register("exampleTextarea", {
                          required: true,
                        })}
                      ></textarea>
                      <div className="text-end">
                        <small className="text-muted " id="wordCount">
                          Word Count: 0 / 500
                        </small>
                      </div>
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 07 start --> */}
                  <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                    {/* <!-- field col  start :: dropify--> */}
                    <div className="form-group protfilo_image_upload">
                      <label className="form-head mb-0 row">
                        <span
                          className="col-12 col-lg-4"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          Upload Main Image
                        </span>
                        <label
                          htmlFor="portfolioImageCheckbox"
                          className="col-12 col-lg-8 text-lg-end"
                        >
                          <input
                            type="checkbox"
                            id="portfolioImageCheckbox"
                            {...register("portfolioImageCheckbox", {})}
                          />{" "}
                          Select Image From Portfolio
                        </label>
                      </label>

                      <div
                        onDragOver={preventDefault}
                        onDragEnter={preventDefault}
                        onDrop={handleImageDrop}
                        // className={`
                        //  ${errors?.img ? "input_filed_error" : ""}
                        // `}
                      >
                        <input
                          name="file1"
                          type="file"
                          className=" protfilo_image_input_field"
                          id="file_upload"
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                          // {...register("img", {
                          //   required: true,
                          // })}
                        />
                        {/* message to show when no image have has been selected start */}
                        {!selectedImage && (
                          <div className="protfilo_image_icons">
                            <AiOutlineCloudUpload />
                            <span>Drag Or Upload Advert Main Images</span>
                          </div>
                        )}
                        {/* message to show when no image have has been selected end */}
                        {/* image preview container  start */}

                        {selectedImage && (
                          <div className="protfilo_image_preview_container">
                            <div className="preview_image_div">
                              <img
                                src={selectedImage}
                                alt="loading"
                                className="protfilo_prew_image"
                              />
                            </div>
                            <button
                              className="protfilo_prew_image_remove_button"
                              onClick={removeImagePreview}
                            >
                              Remove
                            </button>

                            <span className="protfilo_preview_image_name">
                              {fileName}
                            </span>
                          </div>
                        )}
                        {/* image preview container start end */}
                      </div>

                      <small className="form-text text-muted upload-info mt-1">
                        PNG or JPG no bigger than 5MB and 800px wide and tall.
                      </small>
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.ad_location ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="AddMoreProduct">
                        Do You Want To Add Products ?
                      </label>
                      <div className="where_to_show_group d-flex">
                        <div className="d-flex align-items-center gap-3 justify-content-between">
                          <label
                            className="form-head mb-0 custom_advert_label"
                            htmlFor="YesAddProduct"
                          >
                            Yes
                          </label>
                          <input
                            className="radioColor"
                            type="radio"
                            name="addProduct"
                            value="YesAddProduct"
                            id="YesAddProduct"
                            {...register("addProduct")}
                          />
                        </div>
                        <div className="d-flex align-items-center gap-3 justify-content-between">
                          <label
                            className="form-head mb-0 custom_advert_label"
                            htmlFor="NoAddProduct"
                          >
                            No
                          </label>
                          <input
                            className="radioColor"
                            type="radio"
                            name="addProduct"
                            value="NoAddProduct"
                            id="NoAddProduct"
                            {...register("addProduct")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {product === "YesAddProduct" && (
                    <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                      <div className={`form-group`}>
                        <label className="form-head" htmlFor="location">
                          How Many Product do you have?
                        </label>
                        <select
                          type="text"
                          className="form-control"
                          id="numberofProduct"
                          placeholder="Enter location"
                          {...register("numberofProduct")}
                          // onChange={}
                        >
                          <option>Select The Number Of Product</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Conditionally render product upload forms using ProductForms component */}
                  {product === "YesAddProduct" && (
                    <ProductForm
                      numProducts={parseInt(watch("numberofProduct")) || 0}
                      register={register}
                      setValue={setValue}
                      errors={errors}
                      category={category}
                      subcategory={subcategory}
                      subsubcategory={subsubcategory}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <!-- form section end here --> */}
        <Subscriptions
          subscription={subscription}
          setsubscription={setsubscription}
          handleSelectsub={handleSelectsub}
          selectedSubscription={selectedSubscription}
          loading={loading}
        />
      </main>
    </>
  );
};

export default AddAdvert;
