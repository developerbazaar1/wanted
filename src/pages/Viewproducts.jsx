import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductUploadImageModal from "../components/productUploadImageModal";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import Spiner from "../components/Spiner";
import { DatedFormated } from "../helper/ToDate";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ProductEditModal from "../components/ProductEditModal";
import NoProductImg from "../assets/Noproductimg.png";
import NoDataFound from "../components/NoDataFound";
const Viewproducts = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const { user, token, portfolio_id } = useAuth();
  const [showProductImgModal, setshowProductImgModal] = useState(false);
  const [showEditProductModal, setshowEditProductModal] = useState(false);
  const [editProductImgData, setEditProductImgData] = useState(null);
  const [products, setProduct] = useState([]);
  const [EditProduct, setEditProduct] = useState(null);

  const { register, formState: handleSubmit } = useForm();

  const {
    register: registerForm2,
    // formState: { errors: errorsForm2 },
    handleSubmit: handleSubmitForm2,
  } = useForm({
    defaultValues: {
      prduct_name: EditProduct?.productname,
    },
  });

  const handleProductEditModal = (product) => {
    console.log("rahul");
    setEditProduct(product);
    setshowEditProductModal(true);
  };

  const handelProductImgEditModal = (product) => {
    setEditProductImgData(product);
    setshowProductImgModal(true);
  };

  let getProduct = () => {
    setLoading(true);
    ProctedApi.getProduct(user.id, token)
      .then((res) => {
        console.log(res.data.product);
        setProduct(res.data.product);
      })
      .catch(() => {
        // console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addProduct = async (formData) => {
    setLoading(false);
    let data = {
      ...formData,
      productProvider_id: user.id,
      producProviderPortfolio_id: portfolio_id,
    };
    // console.log(data);
    ProctedApi.addProduct(data, token)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);

        setProduct((prev) => [...prev, res?.data?.product]);
      })
      .catch((e) => {
        console.log(e);
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }
        toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //function to delete the product
  let removeProduct = (productId) => {
    setLoading(true);
    let data = {
      _id: productId,
      provider_id: user.id,
    };

    // console.log(data);
    ProctedApi.deleteProduct(data, token)
      .then((res) => {
        console.log(res);
        setProduct(products.filter((product) => product._id !== productId));
        toast.success(res?.data?.message);
      })
      .catch((e) => {
        console.log(e);
        if (e?.message === "Network Error") {
          return toast.error(e?.message);
        }
        toast.error("Something Went Wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //function to handle functionality

  // let editProduct = (editproduct) => {
  //   setEditProduct(editproduct);
  //   setshowEditProduct(true);
  // };

  useEffect(() => {
    getProduct();
  }, [refresh]);
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
                  <Link to="../" className="b-btn">
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
                  <h1>Your Product List</h1>
                </div>
                <div className="head-search mt-4">
                  <form
                    onSubmit={handleSubmitForm2(addProduct)}
                    className="input-group justify-content-center"
                  >
                    <input
                      type="text"
                      className="input-product"
                      id="productname"
                      placeholder="Enter your product Name"
                      autoComplete="off"
                      {...register("productname", {
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
                    <button
                      className="button--submit"
                      value="Add Category"
                      type="submit"
                    >
                      Add Products
                    </button>
                  </form>
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
            <div className="table-responsive">
              <table className="table">
                <thead className="r-thed">
                  <tr>
                    <th>S.No.</th>
                    <th>Date</th>
                    {/* <th>Category</th> */}
                    <th>Product Name</th>
                    <th>Add Product Image</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products?.length ? (
                    products?.map((product, index) => (
                      <tr key={product._id}>
                        <td className="serial">0 {index + 1}</td>
                        <td className="">
                          {DatedFormated(product?.createdAt)}
                        </td>
                        {/* <td className="">Beauty & Spa</td> */}
                        <td className="">{product?.productname}</td>
                        <td className="">
                          <span
                            onClick={() => handelProductImgEditModal(product)}
                            className="add-product-model pointer"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            {" "}
                            <span className="mx-2 pb-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 30 30"
                                fill="none"
                              >
                                <path
                                  d="M14.9998 25.1998C9.35981 25.1998 4.7998 20.6398 4.7998 14.9998C4.7998 9.35981 9.35981 4.7998 14.9998 4.7998C20.6398 4.7998 25.1998 9.35981 25.1998 14.9998C25.1998 20.6398 20.6398 25.1998 14.9998 25.1998ZM14.9998 5.9998C10.0198 5.9998 5.9998 10.0198 5.9998 14.9998C5.9998 19.9798 10.0198 23.9998 14.9998 23.9998C19.9798 23.9998 23.9998 19.9798 23.9998 14.9998C23.9998 10.0198 19.9798 5.9998 14.9998 5.9998Z"
                                  fill="#17C737"
                                />
                                <path
                                  d="M9.6001 14.3999H20.4001V15.5999H9.6001V14.3999Z"
                                  fill="#17C737"
                                />
                                <path
                                  d="M14.3999 9.6001H15.5999V20.4001H14.3999V9.6001Z"
                                  fill="#17C737"
                                />
                              </svg>
                            </span>
                            Add Product Images
                          </span>
                        </td>
                        <td>
                          <div
                            href="#"
                            className="edit-product text-green pointer"
                            onClick={() => handleProductEditModal(product)}
                          >
                            <span className="mx-2 text">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M17.7948 2.20493C17.4906 1.90063 17.1294 1.65925 16.7318 1.49457C16.3343 1.32988 15.9082 1.24512 15.4779 1.24512C15.0476 1.24512 14.6216 1.32988 14.224 1.49457C13.8265 1.65925 13.4653 1.90063 13.1611 2.20493L3.32106 12.0449C2.85372 12.5126 2.52046 13.0971 2.35606 13.7374L1.26856 17.9699C1.24159 18.0752 1.24256 18.1858 1.27136 18.2906C1.30017 18.3954 1.35581 18.4909 1.43281 18.5676C1.5098 18.6444 1.60548 18.6997 1.7104 18.7282C1.81532 18.7566 1.92584 18.7572 2.03106 18.7299L6.26231 17.6437C6.90279 17.4796 7.48736 17.1463 7.95481 16.6787L17.7948 6.83868C18.0991 6.53444 18.3405 6.17324 18.5052 5.77571C18.6699 5.37818 18.7546 4.9521 18.7546 4.5218C18.7546 4.09151 18.6699 3.66543 18.5052 3.26789C18.3405 2.87036 18.0991 2.50916 17.7948 2.20493ZM14.0448 3.08868C14.4249 2.70859 14.9404 2.49506 15.4779 2.49506C16.0155 2.49506 16.531 2.70859 16.9111 3.08868C17.2912 3.46876 17.5047 3.98427 17.5047 4.5218C17.5047 5.05933 17.2912 5.57484 16.9111 5.95492L15.9373 6.92868L13.0711 4.06242L14.0448 3.08868ZM12.1873 4.94618L15.0536 7.81242L7.07106 15.7949C6.76153 16.1039 6.37473 16.324 5.95106 16.4324L2.74231 17.2574L3.56731 14.0487C3.67491 13.6247 3.89518 13.2377 4.20481 12.9287L12.1873 4.94618Z"
                                  fill="#17C737"
                                />
                              </svg>
                            </span>
                            Edit
                          </div>
                        </td>
                        <td onClick={() => removeProduct(product._id)}>
                          <a href="#" className="product-delete text-red">
                            <span className="mx-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                              >
                                <path
                                  d="M8.5 4H11.5C11.5 3.60218 11.342 3.22064 11.0607 2.93934C10.7794 2.65804 10.3978 2.5 10 2.5C9.60218 2.5 9.22064 2.65804 8.93934 2.93934C8.65804 3.22064 8.5 3.60218 8.5 4ZM7.5 4C7.5 3.33696 7.76339 2.70107 8.23223 2.23223C8.70107 1.76339 9.33696 1.5 10 1.5C10.663 1.5 11.2989 1.76339 11.7678 2.23223C12.2366 2.70107 12.5 3.33696 12.5 4H17.5C17.6326 4 17.7598 4.05268 17.8536 4.14645C17.9473 4.24021 18 4.36739 18 4.5C18 4.63261 17.9473 4.75979 17.8536 4.85355C17.7598 4.94732 17.6326 5 17.5 5H16.446L15.252 15.344C15.1676 16.0752 14.8173 16.7498 14.2679 17.2396C13.7184 17.7293 13.008 17.9999 12.272 18H7.728C6.99195 17.9999 6.28161 17.7293 5.73214 17.2396C5.18266 16.7498 4.8324 16.0752 4.748 15.344L3.554 5H2.5C2.36739 5 2.24021 4.94732 2.14645 4.85355C2.05268 4.75979 2 4.63261 2 4.5C2 4.36739 2.05268 4.24021 2.14645 4.14645C2.24021 4.05268 2.36739 4 2.5 4H7.5ZM5.741 15.23C5.79743 15.7174 6.03105 16.167 6.39742 16.4934C6.76379 16.8198 7.23735 17.0001 7.728 17H12.272C12.7627 17.0001 13.2362 16.8198 13.6026 16.4934C13.969 16.167 14.2026 15.7174 14.259 15.23L15.439 5H4.561L5.741 15.23ZM8.5 7.5C8.63261 7.5 8.75979 7.55268 8.85355 7.64645C8.94732 7.74021 9 7.86739 9 8V14C9 14.1326 8.94732 14.2598 8.85355 14.3536C8.75979 14.4473 8.63261 14.5 8.5 14.5C8.36739 14.5 8.24021 14.4473 8.14645 14.3536C8.05268 14.2598 8 14.1326 8 14V8C8 7.86739 8.05268 7.74021 8.14645 7.64645C8.24021 7.55268 8.36739 7.5 8.5 7.5ZM12 8C12 7.86739 11.9473 7.74021 11.8536 7.64645C11.7598 7.55268 11.6326 7.5 11.5 7.5C11.3674 7.5 11.2402 7.55268 11.1464 7.64645C11.0527 7.74021 11 7.86739 11 8V14C11 14.1326 11.0527 14.2598 11.1464 14.3536C11.2402 14.4473 11.3674 14.5 11.5 14.5C11.6326 14.5 11.7598 14.4473 11.8536 14.3536C11.9473 14.2598 12 14.1326 12 14V8Z"
                                  fill="#FF0000"
                                />
                              </svg>
                            </span>{" "}
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center">
                        <NoDataFound
                          img={NoProductImg}
                          title={`No Products Found`}
                          description={`Add Your Amazing Products to Showcase`}
                        />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <!-- section end here --> */}
      </main>

      {/* edit products modal start */}
      <div className="div">
        <ProductEditModal
          showEditProductModal={showEditProductModal}
          setshowEditProductModal={setshowEditProductModal}
          EditProduct={EditProduct}
          setRefresh={setRefresh}
        />
      </div>
      {/* edit products modal end */}

      {/* add img modal start */}
      <ProductUploadImageModal
        showProductImgModal={showProductImgModal}
        setshowProductImgModal={setshowProductImgModal}
        editProductImgData={editProductImgData}
        setRefresh={setRefresh}
        setProduct={setProduct}
      />
      {/* add img modal end*/}
    </>
  );
};

export default Viewproducts;
