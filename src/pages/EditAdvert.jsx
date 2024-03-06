import { useState, useRef, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spiner from "../components/Spiner";
import { GoogleAPI, ProctedApi } from "../config/axiosUtils";
import { castEditadvertData } from "../helper/castAddAdvert";
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

const EditAdvertData = () => {
  const [inputActive, setInputActive] = useState(false);
  const inputRef = useRef();

  const handleInputFocus = () => {
    console.log("This is on Focused is called");
    setInputActive(true);
  };

  let { _id } = useLocation().state;
  const [selectedImage, setSelectedImage] = useState(null);
  const [locTypeAhead, setLocTypeAhead] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fileName, setfileName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const { user, token } = useAuth();
  const fileInputRef = useRef(null);
  const [advert, setAdvert] = useState(null);
  const { subcategory } = useSubCategory();
  const { subsubcategory } = useSubSubCategory();
  const { category } = useCategory();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

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
    console.log("function is firing", formData);
    // return;
    setLoading(true);
    const data = castEditadvertData(formData, advert?._id, user?.id);
    // console.log("inside the advert update", formData);
    // return;
    // console.log();

    let numOfOldProduct = formData.products.length;
    ProctedApi.updateAdvert(data, token, numOfOldProduct)
      .then((res) => {
        toast.success(res?.data?.message);
        console.log(res);
        // setAdvert(res.data.data);
        // setValue()
        // addProduct;
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

  function loadAdvert() {
    setLoading(true);
    ProctedApi.getSingleAdvert(token, _id)
      .then((res) => {
        // console.log(res);
        setAdvert(res.data.advert);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
        // return res;
      });
  }

  //  function to set the  location value after selecting
  const setSelectedLocation = (value) => {
    setValue("advertLocation", value);
    setInputActive(false);
  };

  const handleClickOutside = () => {
    console.log("This is ref", inputRef);
    if (inputRef.current) {
      console.log("This is event it is not Calling");
    }
  };

  // Attach click event listener when the component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const FetchLocationTypeAhead = async () => {
    try {
      const response = await GoogleAPI.locationTypeAhead(
        watch("advertLocation") || ""
      );

      console.log(response.data);
      setLocTypeAhead(response?.data?.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchLocationTypeAhead();
  }, [watch("advertLocation")]);

  useEffect(() => {
    reset(advert);
  }, [advert]);

  useEffect(() => {
    loadAdvert();
  }, [refresh]);

  // console.log("live test");

  // variable to store number of products to be added
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
                  <h1>Edit Advert Details</h1>
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
                id="advertedit-form"
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
                          pattern: {
                            value: /^[ A-Za-z0-9._%+-]*$/,
                            message: "Invalid String",
                          },
                        })}
                      />
                    </div>
                  </div>

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

                  <div className="col-lg-6 col-sm-12 col-md-6 col-xs-12">
                    <div
                      className={`form-group position-relative ${
                        errors?.advertLocation ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="advertLocation">
                        Location
                      </label>
                      <input
                        type="search"
                        className="form-control"
                        id="advertLocation"
                        placeholder="Enter location"
                        autoComplete="off"
                        onFocus={handleInputFocus}
                        ref={inputRef}
                        {...register("advertLocation", {
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
                      subcategory={subcategory}
                      category={category}
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

                <button
                  type="submit"
                  className="advertUpdate-btn"
                  id="advertedit-form"
                  disabled={loading}
                >
                  Save
                </button>
              </form>
              {/* <!-- add book form up end --> */}
            </div>
          </div>
        </div>
        {/* <!-- form section end here --> */}
      </main>
    </>
  );
};

export default EditAdvertData;
