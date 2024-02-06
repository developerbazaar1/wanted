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
import { ProctedApi } from "../config/axiosUtils";
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
import { getCurrentLocation } from "../helper/getCurrentLocation";
import AddAdvertTopHead from "../components/AddAdvertTopHead";
import Subscriptions from "../components/Subscriptions";
import ProductForm from "../components/ProductForm";
import { useNavigate } from "react-router-dom";
const AddAdvert = () => {
  const navigate = useNavigate();
  const [subscription, setsubscription] = useState(null);
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
      .catch(() => {
        alert("Failed to Load current Location Try Adding manually");
      });
  }, []);

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
