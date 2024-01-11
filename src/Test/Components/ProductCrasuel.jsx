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

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // console.log(unique);
  return (
    <>
      <div className="col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-4 col-lg-4">
        <div className="d-flex gap-2">
          <h5 className="text-capitalize">{product?.productName}</h5>
          <span>{product?.product_id}</span> ||
          <span className="preview_product_price">
            $ {product?.productPrice}
          </span>
        </div>
        <Slider {...settings} className="single-advert-product-prevew">
          {product?.productImg?.map((img, index) => (
            <div
              className="carousel-item active"
              key={img?._id}
              onClick={() => setShowModal(true)}
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
          <Slider {...settings} className="zoom-slider">
            {product?.productImg?.map((img, index) => (
              <div
                key={img?._id}
                style={{
                  width: "480px",
                  height: "480px",
                  objectFit: "cover",
                }}
              >
                <img
                  src={img?.imgUrl}
                  className="d-block zoom-image"
                  alt={index}
                />
              </div>
            ))}
          </Slider>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductCrasuel;
