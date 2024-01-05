import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import Slider from "react-slick";
const ProductCrasuel = ({ product, unique }) => {
  const [settings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index) => {
    console.log("image click");
    setSelectedImage(product?.productImg[index].imgUrl);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };
  // console.log(unique);
  return (
    <>
      <div className="col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-4 col-lg-4">
        <div className="d-flex gap-2">
          <h5>{product?.productName}</h5>
          <span>{product?.product_id}</span> ||
          <span className="preview_product_price">
            $ {product?.productPrice}
          </span>
        </div>
        {/* <div
          id={`carouselExampleIndicators${unique}`}
          className="carousel slide w-30"
        >
          <div className="carousel-inner detial_product_image"></div>
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
        </div> */}

        <Slider {...settings} className="single-advert-product-prevew">
          {product?.productImg?.map((img, index) => (
            <div
              className="carousel-item active"
              key={img?._id}
              onClick={() => handleImageClick(index)}
            >
              <img
                src={img?.imgUrl}
                style={{
                  // width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
                className="d-block w-100 "
                alt={index}
              />
            </div>
          ))}
        </Slider>
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
