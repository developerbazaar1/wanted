import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
// import addCardIma1 from "../assets/plan-card01.png";
// import addCardIma2 from "../assets/plan-card02.png";
// import addCardIma3 from "../assets/plan-card03.png";
import { IoIosArrowDown } from "react-icons/io";

import { useForm } from "react-hook-form";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { castAddAdvert } from "../helper/castAddAdvert";
import { toast } from "react-toastify";
import Spiner from "../components/Spiner";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import { useCategory, useSubCategory } from "../service/categoryhelper";
import { getCurrentLocation } from "../helper/getCurrentLocation";
import AddAdvertTopHead from "../components/AddAdvertTopHead";
import Subscriptions from "../components/Subscriptions";
const AddAdvert = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSubscription, setselectedSubscription] = useState(null);
  const { token, user, portfolio_id } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setfileName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fileInputRef = useRef(null);
  const { subcategory } = useSubCategory();
  const { category } = useCategory();

  const {
    register,
    handleSubmit,
    // watch,
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

  const HandleAddadvertSubmit = (formData) => {
    formData["subscription_plan_id"] = selectedSubscription._id;
    setLoading(true);
    const data = castAddAdvert(formData, user, portfolio_id);
    ProctedApi.AddAdvert(data, token)
      .then((response) => {
        // console.log(response);
        if (response.status === 201) {
          return toast.success("created");
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
    if (!ImgSizeCheck(file.size)) {
      toast.error("File size exceeds the limit of 5 MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Selected file is not an image");
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

  useEffect(() => {
    getCurrentLocation()
      .then((res) => {
        // console.log(res);
        if (res?.formattedAddress?.postalCode) {
          setValue("ad_location", res?.formattedAddress?.formattedAddress);
        } else {
          let addres = `${res?.formattedAddress?.placeLabel} , ${res?.formattedAddress?.formattedAddress}`;
          setValue("ad_location", addres);
        }
        // setValue("ad_location", res.address);
      })
      .catch((e) => {
        alert("Failed to Load current Location Try Adding manually");
      });
  }, []);

  return (
    <>
      <Spiner loading={loading} />
      <main className="app-content">
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
                            value="liveAds"
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
                            Latest Offer
                          </label>

                          <input
                            {...register("userSearch", {
                              required: true,
                            })}
                            className="radioColor"
                            type="radio"
                            name="userSearch"
                            id="latestoffer"
                            value="latesOffer"
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
                            value="service"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 03 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.adcategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="category">
                        Advert Category
                      </label>
                      <select
                        className="form-control"
                        id="adcategory"
                        {...register("adcategory", {
                          required: true,
                        })}
                        onChange={handleCategoryChange}
                      >
                        <option value="" key="defaultcat">
                          Select Advert Category
                        </option>
                        {category?.map((cat) => (
                          <option key={cat._id} value={`${cat?.categoryName}`}>
                            {cat?.categoryName}
                          </option>
                        ))}

                        {/* <option value="category2">Category 2</option> */}
                        {/* Add more options as needed */}
                      </select>

                      <IoIosArrowDown className="category-dropw-down-toogle" />
                    </div>
                  </div>

                  {/* <!-- field col end --> */}
                  {/* <!-- field col 04 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.subCategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="sub-ad">
                        Advert Sub Category
                      </label>
                      <select
                        className="form-control"
                        id="subCategory"
                        placeholder="Enter your advert Sub Category"
                        {...register("subCategory", {
                          required: true,
                        })}
                      >
                        <option value="" key="defaultsubcat">
                          Select Advert Sub Category
                        </option>
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
                      <IoIosArrowDown className="category-dropw-down-toogle" />
                    </div>
                  </div>

                  {/* <!-- field col end --> */}
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
                          pattern: {
                            value: /^\d+$/,
                            message: "Enter a Valid Postal Code",
                          },
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

                  {/* post code feild section */}

                  <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.ad_location ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="location">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ad_location"
                        placeholder="Enter location"
                        {...register("ad_location", {
                          required: true,
                        })}
                      />
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
                      <label className="form-head mb-2" htmlFor="file_upload">
                        Upload Advert Images
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

                            <span>
                              Drag Or Upload Your Thumbnail Image Here
                            </span>
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

                    {/* <!-- field col  enc :: dropify--> */}
                  </div>
                  {/* <!-- field col end --> */}
                </div>

                {/* <button
                  className="payment_final_submission_btn mt-2"
                  type="submit"
                >
                  Submit
                </button> */}
              </form>
              {/* <!-- add book form up end --> */}
            </div>
          </div>
        </div>
        {/* <!-- form section end here --> */}
        {/* <!-- card section --> */}

        <Subscriptions
          handleSelectsub={handleSelectsub}
          selectedSubscription={selectedSubscription}
          loading={loading}
        />
        {/* <section className="card-section">
          <div className="row justify-content-center mt-5 pb-5">
            <div className="col-md-12 col-sm-12 col-xs-12 justify-content-center">
              <div className="select-plan-head">
                <h4 className="text-center">Available Subscription</h4>
              </div>
              <div className="text-center d-flex flex-column flex-md-row gap-4  justify-content-center align-items-center">
                {subscription ? (
                  subscription?.map((sub) => (
                    <div
                      key={sub?._id}
                      className={`card-plan pointer`}
                      onClick={() => handleSelectsub(sub)}
                    >
                      <div className="plan-card-image ">
                        <img
                          className="w-50px"
                          src={addCardIma1}
                          alt="Image for Plan Card"
                        />
                      </div>
                      <h2 className="p-card-title mt-2">
                        {sub?.subscriptionPlanName}
                      </h2>
                      <div className="plan-price-status mt-2 d-flex flex-column">
                        <h2 className="mb-0">
                          &euro; {sub?.subscriptionPlanPrice}
                        </h2>
                      </div>
                      <div className="d-flex flex-column gap-1 my-1">
                        <div className="d-flex justify-content-between">
                          <span className="add_advert_show">Ads Lefts</span>
                          <span className="add-advert_day">
                            {sub?.remainingAds} Ads
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="add_advert_show">Expired On</span>
                          <span className="add-advert_day">
                            {DatedFormated(sub?.expiryDate)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <button className="add_advert_select_plan_btn mt-1">
                          {selectedSubscription === sub
                            ? "Selected"
                            : "Select Plan"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <h5>
                      Oops! It looks like your subscription is inactive Or You
                      don&#39;t ads left in It. To continue Publishing Your ads,
                      please consider purchasing a Plan. Thank you
                    </h5>
                  </>
                )}
              </div>
            </div>

            <div className="text-center">
              {subscription ? (
                <button
                  className="mt-2 advert_pay_btn"
                  disabled={!selectedSubscription}
                >
                  {selectedSubscription
                    ? `You have selected ${selectedSubscription.subscriptionPlanName}`
                    : "Select a Plan"}
                </button>
              ) : (
                <Link>
                  <button className="mt-2 advert_pay_btn">Buy Now</button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {selectedSubscription && (
          <section className="payment-conform-section">
            <div className="row justify-content-center">
              <div className="col col-md-8 col-lg-6 text-center">
                <div>
                  <button
                    className="payment_final_submission_btn mt-2"
                    type="submit"
                    form="add-advert-form"
                    disabled={loading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </section>
        )} */}
      </main>
    </>
  );
};

export default AddAdvert;
