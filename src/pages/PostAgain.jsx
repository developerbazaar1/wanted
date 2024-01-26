import { useState, useRef, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spiner from "../components/Spiner";
import { ProctedApi } from "../config/axiosUtils";
import { castPostAgainAdvert } from "../helper/castAddAdvert";
import { useAuth } from "../service/auth";
import { toast } from "react-toastify";
import ImagePreview from "../components/ImagePreview";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import {
  useCategory,
  useSubCategory,
  useSubSubCategory,
} from "../service/categoryhelper";
import EditAdvertProducts from "../components/EditAdvertProducts";
import ProductForm from "../components/ProductForm";
import Subscriptions from "../components/Subscriptions";

const PostAgain = () => {
  let { _id } = useLocation().state;
  const [subscription, setsubscription] = useState(null);
  const [selectedSubscription, setselectedSubscription] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setfileName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { user, token } = useAuth();
  const fileInputRef = useRef(null);
  // const [selectedSubscription, setselectedSubscription] = useState(null);
  const [advert, setAdvert] = useState(null);
  const { subcategory } = useSubCategory();
  const { subsubcategory } = useSubSubCategory();
  const { category } = useCategory();

  // handle drag and drop
  // console.log(state);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // console.log(advert);

  //function to handle category change

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
    setValue("img", e.dataTransfer.files[0]);
    setfileName(file.name);
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
    const filename = e?.target?.files[0].name;

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
    setValue("mainImg", e.target.files[0]);
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
    // reset("img", "");
    // reset();
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const handleAdvertUpdate = (formData) => {
    if (loading) {
      return;
    }
    formData["subscription_plan_id"] = selectedSubscription._id;
    // return console.log("this is form data", formData);
    setLoading(true);
    const data = castPostAgainAdvert(formData, advert?._id, user?.id);

    let numOfOldProduct = formData.products.length;
    ProctedApi.postAgainAdvert(data, token, numOfOldProduct)
      .then((res) => {
        toast.success(res?.data?.message);
        console.log(res);
        setTimeout(() => {
          window.location.reload();
        }, [1000]);

        // setRefresh((val) => !val);
      })
      .catch((e) => {
        console.log(e);
        toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(subcategory);

  const handleSelectsub = (sub) => {
    setselectedSubscription(sub);
  };

  useEffect(() => {
    setLoading(true);
    ProctedApi.getSingleAdvert(token, _id)
      .then((res) => {
        setAdvert(res?.data?.advert);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [_id, refresh]);

  useEffect(() => {
    reset(advert);
  }, [advert]);

  // console.log(getValues("porducts"));
  let product = watch("addProduct");

  // console.log("default selected sub category", selectedCategory);
  return (
    <>
      <Spiner loading={loading} />
      <main className="app-content">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="row">
              {/* <!-- top head --> */}
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-left self-center">
                <div className="back-btn">
                  <Link to="/advert" className="b-btn">
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
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-center self-center">
                <div className="top-heading mt-3">
                  <h1>Post Again Advert Details</h1>
                </div>
              </div>
              {/* <!-- top image --> */}
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-end"></div>
            </div>
          </div>
        </div>

        {/* <!-- ::  row start here --> */}
        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div id="form" className="form-container">
              {/* <!-- add book form start--> */}
              <form
                onSubmit={handleSubmit(handleAdvertUpdate)}
                className="w-100"
                id="add-advert-form"
              >
                {/* <!-- form row start at lower div --> */}
                <div className=" cst-add-new-form row">
                  {/* <!-- field col 01 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertTitle ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="title">
                        Advert Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertTitle"
                        placeholder="Enter your advert title"
                        {...register("advertTitle", {
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

                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div className="form-group">
                      <label className="form-head" htmlFor="show-ad">
                        Where To Show:
                      </label>
                      <div
                        className={`d-flex flex-column flex-md-row justify-content-between where_to_show_group ${
                          errors?.whereToShow ? "whrer_To_show_error" : ""
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
                            name="whereToShow"
                            value="Live Ads"
                            id="liveads"
                            {...register("whereToShow", {
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
                            {...register("whereToShow", {
                              required: true,
                            })}
                            className="radioColor"
                            type="radio"
                            name="whereToShow"
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
                            {...register("whereToShow", {
                              required: true,
                            })}
                            className="radioColor"
                            type="radio"
                            name="whereToShow"
                            id="service"
                            value="Service"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 03 start --> */}
                  {/* <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertCategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="category">
                        Advert Category
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="advertCategory"
                        placeholder="Enter your advert Category"
                        {...register("advertCategory", {
                          required: true,
                        })}
                        onChange={handleCategoryChange}
                      >
                        {category?.map((cat) => (
                          <option key={cat._id} value={`${cat?.categoryName}`}>
                            {cat?.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 04 start --> */}
                  {/* <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertSubCategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="sub-ad">
                        Advert Sub Category
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="advertSubCategory"
                        {...register("advertSubCategory", {
                          required: true,
                        })}
                      >
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
                        {/* <option value={`Cafe & Treats`}>Cafe & Treats</option> 
                      </select>
                    </div>
                  </div> */}
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 05 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertPostalCode ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertPostalCode">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertPostalCode"
                        placeholder="Enter your advert Postal Code"
                        {...register("advertPostalCode", {
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
                        errors?.advertPrice ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertPrice">
                        Advert Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertPrice"
                        placeholder="Enter your advert price"
                        {...register("advertPrice", {
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
                            message: "Enter Valid Offer Price",
                          },
                        })}
                      />
                    </div>
                  </div>

                  {/* post code feild section */}

                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.advertLocation ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertLocation">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="advertLocation"
                        placeholder="Enter location"
                        {...register("advertLocation", {
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
                        errors?.advertDescription ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertDescription">
                        Advert Description
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter your store description"
                        id="advertDescription"
                        rows="6"
                        name="answer"
                        {...register("advertDescription", {
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
                      >
                        <input
                          name="file1"
                          type="file"
                          className=" protfilo_image_input_field"
                          data-height="100"
                          data-allowed-file-extensions="jpg jpeg png"
                          ref={fileInputRef}
                          id="file_upload"
                          onChange={handleImageSelect}
                        />
                        {/* message to show when no image have has been selected start */}
                        {!selectedImage && (
                          <div className="protfilo_image_icons ">
                            <AiOutlineCloudUpload />

                            <span
                              style={{
                                zIndex: "999",
                              }}
                            >
                              Drag Or Upload Your Thumbnail Image Here
                            </span>
                          </div>
                        )}
                        {/* message to show when no image have has been selected end */}
                        {/* image preview container  start */}

                        <ImagePreview
                          selectedImage={selectedImage}
                          fileName={fileName}
                          removeImagePreview={removeImagePreview}
                          portfolioImgUrl={advert?.advertImage?.imgUrl}
                        />
                        {/* image preview container start end */}
                      </div>
                      <small className="form-text text-muted upload-info mt-1">
                        PNG or JPG no bigger than 5MB and 800px wide and tall.
                      </small>
                    </div>
                    {/* <!-- field col  enc :: dropify--> */}
                  </div>

                  {/* <!-- field col end --> */}

                  {/* Add more Product */}

                  <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.ad_location ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="AddMoreProduct">
                        Do You Want To Add More Products ?
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
                          How Many Products do you have?
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

                  {/* //components for advert product */}
                  {advert?.products?.length > 0 &&
                    advert?.products?.map((productEelement, i) => (
                      <EditAdvertProducts
                        Products={advert?.products}
                        key={productEelement._id}
                        productEelement={productEelement}
                        Localsubcategory={subcategory}
                        Localsubsubcategory={subsubcategory}
                        Localcategory={category}
                        i={i}
                        register={register}
                        setValue={setValue}
                        advertId={advert._id}
                        loading={loading}
                        setLoading={setLoading}
                        token={token}
                        setRefresh={setRefresh}
                        errors={errors}
                      />
                    ))}
                </div>
              </form>
            </div>
          </div>
        </div>

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

export default PostAgain;
