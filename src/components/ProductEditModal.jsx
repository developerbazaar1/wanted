import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { toast } from "react-toastify";
import Spiner from "./Spiner";
const ProductEditModal = ({
  showEditProductModal,
  setshowEditProductModal,
  EditProduct,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const [adverts, setAdvert] = useState([]);
  const { token, user } = useAuth();
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    setValue,
  } = useForm();

  let handleEdit = (formData) => {
    console.log(formData);
    const data = {
      productname: formData?.prduct_name,
      _id: EditProduct?._id,
      provider_id: user.id,
      advert_id: formData?.advert_id,
      productPrice: formData?.productPrice,
    };
    ProctedApi.updateProduct(data, token)
      .then((res) => {
        console.log(res);
        setRefresh((setval) => !setval);
        toast.success(res?.data?.message);
        handleClose();
      })
      .catch((e) => {
        // console.log(e);
        toast.error(e?.response?.data?.message);
      })
      .finally(() => {
        setLoading(false);
      });
    // console.log(EditProduct, "edit Product");
  };

  const handleClose = () => {
    setshowEditProductModal(false);
  };

  useEffect(() => {
    const getUserAdvert = () => {
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

    getUserAdvert();
  }, []);

  useEffect(() => {
    setValue("prduct_name", EditProduct?.productname);
    setValue("productPrice", EditProduct?.productPrice);
    setValue("advert_id", EditProduct?.advert_id);
  });
  return (
    <>
      <Spiner loading={loading} />
      <Modal
        show={showEditProductModal}
        onHide={handleClose}
        id="editProduct_mod_width"
        centered
      >
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmitForm2(handleEdit)} className="row">
              <div className="edit_product_modal_head">
                <div className="text-center"> Edit Product Details</div>
                <div className="modal_close pointer " onClick={handleClose}>
                  <RxCross2 />
                </div>
              </div>
              <div className="col-5 d-flex flex-column gap-3 product_edit_modal_name">
                {/* <div>Product Category</div> */}
                <div>Product Name</div>
              </div>
              <div className="col-7 d-flex flex-column gap-3">
                <div className="d-flex gap-3">
                  <input
                    type="text"
                    id="prduct_name"
                    placeholder="Prduct Name"
                    className="edit_product_input"
                    // defaultValue={`${EditProduct?.productname}`}
                    {...registerForm2("prduct_name")}
                  />
                  <label htmlFor="prduct_name">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.7948 2.20493C17.4906 1.90063 17.1294 1.65925 16.7318 1.49457C16.3343 1.32988 15.9082 1.24512 15.4779 1.24512C15.0476 1.24512 14.6216 1.32988 14.224 1.49457C13.8265 1.65925 13.4653 1.90063 13.1611 2.20493L3.32106 12.0449C2.85372 12.5126 2.52046 13.0971 2.35606 13.7374L1.26856 17.9699C1.24159 18.0752 1.24256 18.1858 1.27136 18.2906C1.30017 18.3954 1.35581 18.4909 1.43281 18.5676C1.5098 18.6444 1.60548 18.6997 1.7104 18.7282C1.81532 18.7566 1.92584 18.7572 2.03106 18.7299L6.26231 17.6437C6.90279 17.4796 7.48736 17.1463 7.95481 16.6787L17.7948 6.83868C18.0991 6.53444 18.3405 6.17324 18.5052 5.77571C18.6699 5.37818 18.7546 4.9521 18.7546 4.5218C18.7546 4.09151 18.6699 3.66543 18.5052 3.26789C18.3405 2.87036 18.0991 2.50916 17.7948 2.20493ZM14.0448 3.08868C14.4249 2.70859 14.9404 2.49506 15.4779 2.49506C16.0155 2.49506 16.531 2.70859 16.9111 3.08868C17.2912 3.46876 17.5047 3.98427 17.5047 4.5218C17.5047 5.05933 17.2912 5.57484 16.9111 5.95492L15.9373 6.92868L13.0711 4.06242L14.0448 3.08868ZM12.1873 4.94618L15.0536 7.81242L7.07106 15.7949C6.76153 16.1039 6.37473 16.324 5.95106 16.4324L2.74231 17.2574L3.56731 14.0487C3.67491 13.6247 3.89518 13.2377 4.20481 12.9287L12.1873 4.94618Z"
                        fill="#353535"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div className="col-5 d-flex flex-column gap-3 product_edit_modal_name my-2">
                {/* <div>Product price</div> */}
                <div>Product Price</div>
              </div>
              <div className="col-7 d-flex flex-column gap-3 my-2">
                <div className="d-flex gap-3">
                  <input
                    type="text"
                    id="productPrice"
                    placeholder="Product Price"
                    className="edit_product_input"
                    {...registerForm2("productPrice", {
                      pattern: {
                        value: /^\d+$/,
                        message: "Enter Valid Price",
                      },
                      // required: {
                      //   value: true,
                      //   message: "Price is Required",
                      // },
                    })}
                  />
                  <label htmlFor="productPrice">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.7948 2.20493C17.4906 1.90063 17.1294 1.65925 16.7318 1.49457C16.3343 1.32988 15.9082 1.24512 15.4779 1.24512C15.0476 1.24512 14.6216 1.32988 14.224 1.49457C13.8265 1.65925 13.4653 1.90063 13.1611 2.20493L3.32106 12.0449C2.85372 12.5126 2.52046 13.0971 2.35606 13.7374L1.26856 17.9699C1.24159 18.0752 1.24256 18.1858 1.27136 18.2906C1.30017 18.3954 1.35581 18.4909 1.43281 18.5676C1.5098 18.6444 1.60548 18.6997 1.7104 18.7282C1.81532 18.7566 1.92584 18.7572 2.03106 18.7299L6.26231 17.6437C6.90279 17.4796 7.48736 17.1463 7.95481 16.6787L17.7948 6.83868C18.0991 6.53444 18.3405 6.17324 18.5052 5.77571C18.6699 5.37818 18.7546 4.9521 18.7546 4.5218C18.7546 4.09151 18.6699 3.66543 18.5052 3.26789C18.3405 2.87036 18.0991 2.50916 17.7948 2.20493ZM14.0448 3.08868C14.4249 2.70859 14.9404 2.49506 15.4779 2.49506C16.0155 2.49506 16.531 2.70859 16.9111 3.08868C17.2912 3.46876 17.5047 3.98427 17.5047 4.5218C17.5047 5.05933 17.2912 5.57484 16.9111 5.95492L15.9373 6.92868L13.0711 4.06242L14.0448 3.08868ZM12.1873 4.94618L15.0536 7.81242L7.07106 15.7949C6.76153 16.1039 6.37473 16.324 5.95106 16.4324L2.74231 17.2574L3.56731 14.0487C3.67491 13.6247 3.89518 13.2377 4.20481 12.9287L12.1873 4.94618Z"
                        fill="#353535"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div className="col-5 d-flex flex-column gap-3 product_edit_modal_name">
                {/* <div>Product price</div> */}
                <div className="">Select Advert</div>
              </div>
              <div className="col-7 d-flex flex-column gap-3 ">
                <div className="d-flex gap-3">
                  <select
                    type="text"
                    id="advert_id"
                    placeholder="Prduct Name"
                    className="edit_product_input"
                    {...registerForm2("advert_id")}
                  >
                    <option value="">Select Advert</option>

                    {adverts?.map((advert) => (
                      <option key={advert._id} value={advert?._id}>
                        {advert?.advertTitle}
                      </option>
                    ))}
                    {/* <option value="">Advert 1</option> */}
                  </select>
                  <label htmlFor="advert_id">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M17.7948 2.20493C17.4906 1.90063 17.1294 1.65925 16.7318 1.49457C16.3343 1.32988 15.9082 1.24512 15.4779 1.24512C15.0476 1.24512 14.6216 1.32988 14.224 1.49457C13.8265 1.65925 13.4653 1.90063 13.1611 2.20493L3.32106 12.0449C2.85372 12.5126 2.52046 13.0971 2.35606 13.7374L1.26856 17.9699C1.24159 18.0752 1.24256 18.1858 1.27136 18.2906C1.30017 18.3954 1.35581 18.4909 1.43281 18.5676C1.5098 18.6444 1.60548 18.6997 1.7104 18.7282C1.81532 18.7566 1.92584 18.7572 2.03106 18.7299L6.26231 17.6437C6.90279 17.4796 7.48736 17.1463 7.95481 16.6787L17.7948 6.83868C18.0991 6.53444 18.3405 6.17324 18.5052 5.77571C18.6699 5.37818 18.7546 4.9521 18.7546 4.5218C18.7546 4.09151 18.6699 3.66543 18.5052 3.26789C18.3405 2.87036 18.0991 2.50916 17.7948 2.20493ZM14.0448 3.08868C14.4249 2.70859 14.9404 2.49506 15.4779 2.49506C16.0155 2.49506 16.531 2.70859 16.9111 3.08868C17.2912 3.46876 17.5047 3.98427 17.5047 4.5218C17.5047 5.05933 17.2912 5.57484 16.9111 5.95492L15.9373 6.92868L13.0711 4.06242L14.0448 3.08868ZM12.1873 4.94618L15.0536 7.81242L7.07106 15.7949C6.76153 16.1039 6.37473 16.324 5.95106 16.4324L2.74231 17.2574L3.56731 14.0487C3.67491 13.6247 3.89518 13.2377 4.20481 12.9287L12.1873 4.94618Z"
                        fill="#353535"
                      />
                    </svg>
                  </label>
                </div>
              </div>
              <div className="text-center mt-4">
                <button className="edit_product_modal_btn" type="submit">
                  Save Details
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductEditModal;
