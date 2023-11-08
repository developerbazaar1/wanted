import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import addCardIma1 from "../assets/plan-card01.png";
import addCardIma2 from "../assets/plan-card02.png";
import addCardIma3 from "../assets/plan-card03.png";
import paymentsucess from "../assets/pay-secure-img.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { castAddAdvert } from "../helper/castAddAdvert";
import { toast } from "react-toastify";
import Spiner from "../components/Spiner";
const AddAdvert = () => {
  const [loading, setLoading] = useState(false);
  const { token, user, portfolio_id } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setfileName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const HandleAddadvertSubmit = (formData) => {
    setLoading(true);
    const data = castAddAdvert(formData, user, portfolio_id);

    ProctedApi.AddAdvert(data, token)
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          return toast.success("created");
        }
      })
      .catch((e) => {
        // console.log(e, "error");
        // console.log(e.response.statusText);
        return toast.error(e.response.statusText);
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
    setfileName(filename);
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImagePreview = () => {
    setSelectedImage(null);
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
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
                  <h1>Add New Advert</h1>
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
                      <input
                        type="text"
                        className="form-control"
                        id="adcategory"
                        placeholder="Enter your advert Category"
                        {...register("adcategory", {
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
                        errors?.subCategory ? "error_pesudo" : ""
                      }`}
                    >
                      <label className="form-head" htmlFor="sub-ad">
                        Advert Sub Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="subCategory"
                        placeholder="Enter your advert Sub Category"
                        {...register("subCategory", {
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
                      >
                        <input
                          name="file1"
                          type="file"
                          className=" protfilo_image_input_field"
                          data-height="100"
                          data-allowed-file-extensions="jpg jpeg png"
                          id="file_upload"
                          onChange={handleImageSelect}
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
                        PNG or JPG no bigger than 800px wide and tall.
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
        <section className="card-section">
          <div className="row justify-content-center mt-5 pb-5">
            <div className="col-md-12 col-sm-12 col-xs-12 justify-content-center">
              <div className="select-plan-head">
                <h4 className="text-center">Choose Plan</h4>
              </div>
              <div className="text-center d-flex flex-column flex-md-row gap-4  justify-content-center align-items-center">
                {/* <!-- card-01 --> */}
                <div className="card-plan pointer">
                  <div className="plan-card-image ">
                    <img
                      className="w-50px"
                      src={addCardIma1}
                      alt="Image for Plan Card"
                    />
                  </div>
                  <h2 className="p-card-title mt-2">Starter Plan</h2>
                  <div className="plan-price-status mt-2 d-flex flex-column">
                    <h2 className="mb-0">&euro; 399</h2>
                    <span className=" plan-month"> PER MONTH </span>
                  </div>

                  <div className="d-flex flex-column gap-1 my-1">
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Ads You Show</span>
                      <span className="add-advert_day">3 Ads</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Validity For Days</span>
                      <span className="add-advert_day">3 Days</span>
                    </div>
                  </div>
                  <div>
                    <button className="add_advert_select_plan_btn mt-1">
                      Select Plan
                    </button>
                  </div>
                </div>
                {/* <!-- card-02 --> */}

                <div className="card-plan pointer">
                  <div className="plan-card-image ">
                    <img
                      className="w-50px"
                      src={addCardIma2}
                      alt="Image for Plan Card"
                    />
                  </div>
                  <h2 className="p-card-title mt-2">Starter Plan</h2>
                  <div className="plan-price-status mt-2 d-flex flex-column">
                    <h2 className="mb-0">&euro; 699</h2>
                    <span className=" plan-month"> PER MONTH </span>
                  </div>

                  <div className="d-flex flex-column gap-1 my-1">
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Ads You Show</span>
                      <span className="add-advert_day">5 Ads</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Validity For Days</span>
                      <span className="add-advert_day">5 Days</span>
                    </div>
                  </div>
                  <div>
                    <button className="add_advert_select_plan_btn mt-1">
                      Select Plan
                    </button>
                  </div>
                </div>
                {/* <!-- card-03 --> */}
                <div className="card-plan pointer">
                  <div className="plan-card-image ">
                    <img
                      className="w-50px"
                      src={addCardIma3}
                      alt="Image for Plan Card"
                    />
                  </div>
                  <h2 className="p-card-title mt-2">Starter Plan</h2>
                  <div className="plan-price-status mt-2 d-flex flex-column">
                    <h2 className="mb-0">&euro; 999</h2>
                    <span className=" plan-month"> PER MONTH </span>
                  </div>

                  <div className="d-flex flex-column gap-1 my-1">
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Ads You Show</span>
                      <span className="add-advert_day">10 Ads</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span className="add_advert_show">Validity For Days</span>
                      <span className="add-advert_day">15 Days</span>
                    </div>
                  </div>
                  <div>
                    <button className="add_advert_select_plan_btn mt-1">
                      Select Plan
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button className="mt-4 advert_pay_btn">
                Pay £399 To Purchase
              </button>
            </div>
          </div>
        </section>
        <section className="payment-conform-section">
          <div className="row justify-content-center">
            <div className="col col-md-8 col-lg-6 text-center">
              <div
                className="bg "
                style={{
                  background: "#ffffff 0% 0% no-repeat padding-box",
                }}
              >
                <div className="payment-sucess-img text-center mx-auto">
                  <img src={paymentsucess} alt="" />
                </div>
                <h3 className="payment-recived-head">Payment Received</h3>
                <p className="payment-description">
                  Please Note: Advert Details Above Cannot Be Modified After
                  Submission.
                </p>
              </div>
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
        {/* <!-- card section end here --> */}
      </main>
    </>
  );
};

export default AddAdvert;
