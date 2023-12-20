import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
const ProductCrasuel = ({ product, unique }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    setSelectedImage(product?.productImages[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  // console.log(unique);
  return (
    <>
      <div className="details_provider_products mb-2">
        <h5>{product?.productname}</h5>
        {/* //crasule for small screen */}
        <div
          id={`carouselExampleIndicators${unique}`}
          className="carousel slide d-md-none"
        >
          <div className="carousel-inner detial_product_image">
            {product?.productImages?.map((img, index) => (
              <div
                className="carousel-item active singleProduct_image"
                key={index}
                onClick={() => handleImageClick(index)}
              >
                <img src={img} className="d-block w-100 " alt={index} />
                {product?.productPrice && (
                  <div>
                    {" "}
                    <span
                      style={{
                        color: "green",
                        marginRight: "3px",
                      }}
                    >
                      $
                    </span>{" "}
                    {product?.productPrice}
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#carouselExampleIndicators${unique}`}
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#carouselExampleIndicators${unique}`}
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* <!-- Image grid for medium and larger screens --> */}
        <div className=" d-none d-md-flex detial_product_image">
          {product?.productImages?.map((img, index) => (
            <div
              className="singleProduct_image"
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <img src={img} className="img-fluid" alt={index} />
              {product?.productPrice && (
                <div>
                  {" "}
                  <span
                    style={{
                      color: "green",
                      marginRight: "3px",
                    }}
                  >
                    $
                  </span>{" "}
                  {product?.productPrice}
                </div>
              )}
            </div>
          ))}
          {/* <!-- Add more columns for additional images --> */}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} id="zoomimage" centered>
        <Modal.Body>
          <div className="zoomModalClose" onClick={handleCloseModal}>
            <RxCross2 size={25} color="black" />
          </div>
          <div>
            <img src={selectedImage} alt="Selected" className="zoom-image" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCrasuel;
