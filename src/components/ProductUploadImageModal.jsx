import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
// import reviewImage from "../assets/CustomerEnquryTop.png";

const ProductUploadImageModal = ({
  showProductImgModal,
  setshowProductImgModal,
}) => {
  const [imagesPrveiw, setimagesPrveiw] = useState([]);
  const handleClose = () => setshowProductImgModal(false);
  const numEmptyDivs = 5 - (imagesPrveiw ? imagesPrveiw.length : 0);

  // handele image select by user
  const handleImageSelect = (e) => {
    const files = e.target.files;
    const selected = [];

    for (let i = 0; i < files.length; i++) {
      if (imagesPrveiw.length === 5) {
        return alert("No More images allowed !");
      }
      if (files[i] && files[i].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          selected.push(e.target.result);
          setimagesPrveiw([...imagesPrveiw, selected]); // Update the state with all selected images.
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  //   handel image by drag and drop

  const handleImageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      if (files[i] && files[i].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (data) => {
          setimagesPrveiw((prevImages) => [...prevImages, data.target.result]); // Update the state with the data URL of the selected image.
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const preventDefault = (e) => {
    e.preventDefault();
  };
  return (
    <>
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
                  <label className="form-head mb-2" htmlFor="file_upload">
                    Your Can add 5 images
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

                    <div className="protfilo_image_icons">
                      <AiOutlineCloudUpload />

                      <span>Drag Or Upload Your Thumbnail Image Here</span>
                    </div>

                    {/* message to show when no image have has been selected end */}
                    {/* image preview container  start */}

                    {/* <div className="protfilo_image_preview_container">
                          <div className="preview_image_div">
                            <img
                              
                              alt="loading"
                              className="protfilo_prew_image"
                            />
                          </div>
                          <button
                            className="protfilo_prew_image_remove_button"
                            
                          >
                            Remove
                          </button>

                          <span className="protfilo_preview_image_name">
                          
                          </span>
                        </div> */}

                    {/* image preview container start end */}
                  </div>

                  <small className="form-text text-muted upload-info mt-1">
                    PNG or JPG no bigger than 800px wide and tall.
                  </small>
                </div>
                {/* //drag and drop image container end */}

                {/* products image review products start */}

                <div className="add_productImgrewive_container mt-3">
                  {imagesPrveiw?.map((img, index) => (
                    <div key={index}>
                      <img src={img} alt={`preview-${index}`} className="" />
                    </div>
                  ))}

                  {Array.from({ length: numEmptyDivs }, (_, index) => (
                    <div key={index}></div>
                  ))}
                </div>
                {/* products image review products end */}

                <div className="text-center mt-4">
                  <button
                    className="edit_product_modal_btn"
                    onClick={handleClose}
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
