import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
const MainAdvertImagesCarousel = ({ advertImages }) => {
  return (
    <>
      <div
        id="mainImagCrasule"
        className="carousel slide details_image_div"
        data-ride="carousel"
      >
        <div className="carousel-inner">
          {advertImages?.map((img) => (
            <div
              className="details_image_div carousel-item active"
              key={img._id}
            >
              <img src={img.imgUrl} alt="FaceAndSkin" />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target={`#mainImagCrasule`}
          data-bs-slide="prev"
        >
          <FaChevronLeft size={38} color="green" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target={`#mainImagCrasule`}
          data-bs-slide="next"
        >
          {/* <span aria-hidden="true"></span> */}

          <FaChevronRight
            // className="carousel-control-next-icon"
            size={38}
            color="green"
          />
        </button>
      </div>
    </>
  );
};

export default MainAdvertImagesCarousel;
