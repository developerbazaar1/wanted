import ProviderTop from "../assets/provider-top-img.png";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { useDispatch } from "react-redux";
import { updateProtfolio } from "../features/authSlice";
import { toast } from "react-toastify";
import Spiner from "../components/Spiner";
import { castPortfolioData } from "../helper/castAddAdvert";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import ImagePreview from "../components/ImagePreview";
import { useCategory, useSubCategory } from "../service/categoryhelper";
import { getCurrentLocation } from "../helper/getCurrentLocation";
const ProviderProtfilo = () => {
  const { subcategory } = useSubCategory();
  const { category } = useCategory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user, token, portfolio } = useAuth();
  // console.log("portfolio", portfolio);
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setfileName] = useState("");
  // const [portfolioData, setPortPolioData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      store_name: portfolio?.storeName,
      store_website: portfolio?.storeWebsite,
      store_email: portfolio?.storeEmail,
      store_contact: portfolio?.storeContactDetails,
      store_category: portfolio?.storeCategory,
      store_subcategory: portfolio?.storeSubCategory,
      store_address: portfolio?.storeAddress,
      store_description: portfolio?.storeDescription,
      storeThumbNail: portfolio?.storeThumbNail,
    },
  });

  /**
   *
   * @param {function to handle categoryChange}
   */

  const handleCategoryChange = (event) => {
    console.log("inside the subCategory");
    const selectedValue = event.target.value;
    const selectedCat = category.find(
      (cat) => cat.categoryName === selectedValue
    );
    setSelectedCategory(selectedCat);
  };

  // handle drag and drop
  const handlePortfolio = (formData) => {
    // console.log(formData);
    let data = castPortfolioData(formData, user.id);

    console.log(data);
    setLoading(true);
    // return;
    ProctedApi.CreatPortfolio(data, token)
      .then((response) => {
        console.log(response.data);
        dispatch(
          updateProtfolio({
            portfolioProfile: response?.data?.data,
          })
        );
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        // console.log(error);
        if (error?.message === "Network Error") {
          return toast.error(error?.message);
        }
        toast.success(error?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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

  useEffect(() => {
    //This is Used to set the store address for new user
    if (!portfolio?.storeAddress) {
      getCurrentLocation()
        .then((res) => {
          // console.log(res);
          if (res?.formattedAddress?.postalCode) {
            setValue("store_address", res?.formattedAddress?.formattedAddress);
          } else {
            let addres = `${res?.formattedAddress?.placeLabel} , ${res?.formattedAddress?.formattedAddress}`;
            setValue("store_address", addres);
          }
          // setValue("ad_location", res.address);
        })
        .catch((e) => {
          alert("Failed to Load current Location Try Including manually");
        });
    }
  });

  useEffect(() => {
    // console.log("portfoloio category", portfolio?.storeCategory);
    let subCat;

    if (portfolio?.storeCategory === undefined) {
      // subCat = category?.[0];
    } else {
      subCat = category?.find(
        (element) => element?.categoryName === portfolio?.storeCategory
      );
    }
    setSelectedCategory(subCat);
  }, [portfolio]);
  // console.log("This is selected category", selectedCategory);
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
                  <h1>Provider Portfolio</h1>
                  <p className="mb-0">Showcase Your Business</p>
                  <p className="para-2 mt-2">
                    Elevate your brand presence and offerings.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-center self-center">
                <div className="create-add-btn">
                  <Link to="/viewproducts" className="add-adwart-btn">
                    View/Add Your Store Products{" "}
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
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-end">
                <div className="top-image">
                  <img className="t-img w-150" src={ProviderTop} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ::  row start here --> */}
        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div id="form" className="form-container">
              {/* <!-- add book form start--> */}
              <form
                onSubmit={handleSubmit(handlePortfolio)}
                className="w-100"
                id="provider-form"
              >
                {/* <!-- form row start at lower div --> */}
                <div className=" cst-add-new-form row">
                  {/* <!-- field col 01 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_name ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_name">
                        Store Name
                      </label>
                      <input
                        type="text"
                        className="form-control "
                        id="store_name"
                        placeholder="Enter your store name "
                        {...register("store_name", {
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 02 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_website ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_website">
                        Store Website
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="store_website"
                        placeholder="Enter your store website link"
                        {...register("store_website", {
                          pattern: {
                            value: /^(https?|ftp):\/\/[A-Z0-9.-]+\.[A-Z]{2,}/i,
                            message: "Invalid URL",
                          },
                          required: {
                            value: true,
                          },
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 03 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_email ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_email">
                        Store Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="store_email"
                        placeholder="Enter your store email address"
                        {...register("store_email", {
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email Address",
                          },
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 04 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_contact ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_contact">
                        Store Contact Details
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="store_contact"
                        placeholder="Enter your store contact details"
                        {...register("store_contact", {
                          // pattern:{
                          //   value:,
                          //   message:"Enter valid number"
                          // },
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                  {/* <!-- field col end --> */}
                  {/* <!-- field col 05 start --> */}
                  <div className="col-lg-6 col-sm-6 col-md-6 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_category ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_category">
                        Store Category
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="store_category"
                        placeholder="Enter your store category"
                        {...register("store_category", {
                          required: true,
                        })}
                        onChange={handleCategoryChange}
                      >
                        <option> Select Category </option>
                        {category?.map((element) => (
                          <option
                            key={element?._id}
                            value={element?.categoryName}
                          >
                            {element?.categoryName}
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
                        errors?.store_subcategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_subcategory">
                        Store Sub-Category
                      </label>
                      <select
                        type="text"
                        className="form-control"
                        id="store_subcategory"
                        placeholder="Enter your store sub-category"
                        {...register("store_subcategory", {
                          required: true,
                        })}
                      >
                        {/* <option>Select Sub Category</option> */}
                        {!portfolio?.storeSubCategory && (
                          <option>Select Sub Category</option>
                        )}
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
                  {/* <!-- field col 06 start --> */}
                  <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                    <div
                      className={`form-group ${
                        errors?.store_address ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_address">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="store_address"
                        placeholder="Enter your store address"
                        {...register("store_address", {
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
                        errors?.store_description ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="store_description">
                        Store Description
                      </label>
                      <textarea
                        className="form-control"
                        placeholder="Enter your store description"
                        id="store_description"
                        rows="6"
                        name="answer"
                        {...register("store_description", {
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
                    <div className="form-group protfilo_image_upload">
                      <label className="form-head mb-2" htmlFor="file_upload">
                        Upload File
                      </label>
                      <div
                        onDragOver={preventDefault}
                        onDragEnter={preventDefault}
                        onDrop={handleImageDrop}
                      >
                        <input
                          name="file1"
                          type="file"
                          multiple={true}
                          className=" protfilo_image_input_field"
                          // data-height="100"
                          // data-allowed-file-extensions="jpg jpeg png"
                          id="file_upload"
                          ref={fileInputRef}
                          onChange={handleImageSelect}
                          // {...register("file_upload", {
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
                        <ImagePreview
                          selectedImage={selectedImage}
                          fileName={fileName}
                          removeImagePreview={removeImagePreview}
                          advertUrl={portfolio?.storeThumbNail}
                        />
                        {/* image preview container start end */}
                      </div>

                      <small className="form-text text-muted upload-info mt-1">
                        PNG or JPG no bigger than 5MB and 800px wide and tall.
                      </small>
                    </div>

                    {/* <Dropify /> */}

                    {/* <!-- field col  enc :: dropify--> */}
                  </div>
                  {/* <!-- field col end --> */}
                </div>
                {/* <!-- :: submit button --> */}
                <div className="form-group terms mt-2 mb-2 text-center">
                  <button
                    type="submit"
                    className=" provider_protfilo_save_button"
                    disabled={loading}
                  >
                    Save Updates
                  </button>
                </div>
                {/* <!-- :: end submit button --> */}
              </form>
              {/* <!-- add book form up end --> */}
            </div>
          </div>
        </div>
        {/* <!-- section end here --> */}
      </main>
    </>
  );
};

export default ProviderProtfilo;
