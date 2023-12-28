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
          <div className="details_image_div carousel-item active">
            <img src={advertImages?.imgUrl} alt="FaceAndSkin" />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainAdvertImagesCarousel;
