import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";
import { ImgSizeCheck } from "../helper/imageSizeCheck";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import Spiner from "./Spiner";
const ProductUploadImageModal = ({
  showProductImgModal,
  setshowProductImgModal,
  editProductImgData,
  setRefresh,
  setProduct,
}) => {
  const [loading, setLoading] = useState(false);
  const [imagesPrveiw, setimagesPrveiw] = useState([]);
  const [img, setImg] = useState([]);
  const handleClose = () => {
    setimagesPrveiw([]);
    setImg([]);
    setshowProductImgModal(false);
  };

  // const numEmptyDivs = 3 - (imagesPrveiw ? imagesPrveiw.length : 0);
  const { token, user } = useAuth();
  // handele image select by user
  const handleImageSelect = (e) => {
    const files = e.target.files;
    const selected = [];
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/")) {
        toast.error("Selected file is not an image");
        return;
      }
      if (!ImgSizeCheck(files[i].size)) {
        toast.error("File size exceeds the limit of 5 MB");
        return;
      }
      if (files[i] && files[i].type.startsWith("image/")) {
        setImg((img) => [...img, files[i]]);
        const reader = new FileReader();
        reader.onload = (e) => {
          selected.push(e.target.result);
          setimagesPrveiw((prevImages) => [...prevImages, e.target.result]);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  //   handel image by drag and drop

  const handleImageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    // console.log(files);

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/")) {
        toast.error("Selected file is not an image");
        return;
      }

      if (!ImgSizeCheck(files[i].size)) {
        toast.error("File size exceeds the limit of 5 MB");
        return;
      }
      // setImg([...img, files[i]]);
      setImg((img) => [...img, files[i]]);
      if (files[i] && files[i].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (data) => {
          setimagesPrveiw((prevImages) => [...prevImages, data.target.result]); // Update the state with the data URL of the selected image.
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const handeImageUpdate = () => {
    setLoading(true);
    let data = new FormData();
    // console.log("This is the images", img);
    // return;
    data.append("_id", editProductImgData?._id);
    data.append("provider_id", user.id);
    editProductImgData?.productImages?.forEach((url) => {
      data.append("productImages", url);
    });
    img.forEach((file) => {
      data.append("img", file);
    });
    // console.log(data);
    // console.log(img, "images");
    // return;
    ProctedApi.updateProductImg(data, token)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        let updateProduct = res?.data?.Updateproduct;
        handleClose();
        setProduct((prevProducts) =>
          prevProducts?.map((product) =>
            product._id === updateProduct._id ? updateProduct : product
          )
        );
      })
      .catch((e) => {
        console.log(e);
        toast.error("Something Went wrong try later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
  // useEffect(() => {}, [editProductImgData]);

  return (
    <>
      <Spiner loading={loading} />
      <div>
        <div className="div">
          <Modal
            show={showProductImgModal}
            onHide={handleClose}
            id="productAddImg_mod_width"
            centered
          >
            <Modal.Body>
              <div>
                <div className="edit_product_modal_head">
                  <div className="text-center">Upload Your Product Images</div>
                  <div className="modal_close pointer " onClick={handleClose}>
                    <RxCross2 />
                  </div>
                </div>
                {/* //drag and drop image container start */}
                <div className="add_prduct_img_container">
                  {/* <label className="form-head mb-2" htmlFor="file_upload">
                    Your Can add 3 images
                  </label> */}
                  <div
                    onDragOver={preventDefault}
                    onDragEnter={preventDefault}
                    onDrop={handleImageDrop}
                  >
                    <input
                      name="file1"
                      type="file"
                      className=" protfilo_image_input_field"
                      multiple
                      id="file_upload"
                      onChange={handleImageSelect}
                    />
                    {/* message to show when no image have has been selected start */}

                    <div className="protfilo_image_icons">
                      <AiOutlineCloudUpload />

                      <span>Drag Or Upload Your Product Images Here</span>
                    </div>

                    {/* message to show when no image have has been selected end */}
                    {/* image preview container  start */}
                    {/* image preview container start end */}
                  </div>

                  <small className="form-text text-muted upload-info mt-1">
                    PNG or JPG no bigger than 800px wide and tall.
                  </small>
                </div>
                {/* //drag and drop image container end */}
                {/* products image review products start */}

                <div className="add_productImgrewive_container">
                  {Array.from(
                    {
                      length:
                        editProductImgData?.productImages.length + img?.length,
                    },
                    (_, index) => (
                      <div key={index}>
                        <img
                          src={
                            imagesPrveiw[index]
                              ? imagesPrveiw[index]
                              : editProductImgData?.productImages[index] // Replace with your placeholder image path
                          }
                          alt={`preview-${index}`}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* products image review products end */}
                <div className="text-center mt-4">
                  <button
                    className="edit_product_modal_btn"
                    onClick={handeImageUpdate}
                    disabled={loading}
                  >
                    Upload Images
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ProductUploadImageModal;
