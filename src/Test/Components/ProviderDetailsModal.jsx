import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import CatIcon from "../../assets/Development/FoodAndBeverage.png";
import phoneCall from "../../assets/Development/phonecall.png";
import locationIcon from "../../assets/Development/placeholder.png";
import webIcon from "../../assets/Development/web.png";
import Email from "../../assets/Development/email.png";
const ProviderDetailsModal = ({
  showProviderDetialsModal,
  setShowProviderDetialsModal,
  portfolio,
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  function handleCloseModal() {
    setShowProviderDetialsModal(false);
  }

  function handleReadMore() {
    setShowFullDescription(!showFullDescription);
  }
  return (
    <Modal
      show={showProviderDetialsModal}
      onHide={handleCloseModal}
      id="providerDetailsModal"
      centered
    >
      <Modal.Body>
        <div className="text-end" onClick={handleCloseModal}>
          <RxCross2 size={25} color="black" className="pointer" />
        </div>
        <h4 className="text-center">Provider Details</h4>
        <div className="frame-parent">
          <div className="frame-wrapper">
            <div className="raybella-nails-parent">
              <div className="raybella-nails"> {portfolio?.storeName}</div>

              <div className="row gap-2">
                <div className="frame-group">
                  <div className="rectangle-parent">
                    <img className="frame-child" alt="" src={locationIcon} />

                    <div className="north-lake-shore align-self-center">
                      {portfolio?.storeAddress}
                    </div>
                  </div>
                </div>
                <div className="d-flex ms-1 mt-2">
                  <img className="frame-item" alt="" src={CatIcon} />

                  <div
                    className="north-lake-shore"
                    style={{
                      marginLeft: "0.75rem",
                    }}
                  >
                    {portfolio?.storeCategory}
                  </div>
                  <div className="north-lake-shore">/</div>
                  <div className="north-lake-shore">
                    {portfolio?.storeSubCategory}
                  </div>
                </div>
              </div>

              <div className="frame-group provider-details-contact ms-1 mt-2">
                <div className="rectangle-group">
                  <img className="frame-item" alt="" src={webIcon} />

                  <Link target="_blank" className="north-lake-shore ">
                    Web Site
                  </Link>
                </div>
                <div className="rectangle-group">
                  <img className="frame-item" alt="" src={phoneCall} />

                  <div className="north-lake-shore">
                    {portfolio?.storeContactDetails}
                  </div>
                </div>
                <div className="rectangle-group">
                  <img className="frame-item" alt="" src={Email} />

                  <div className="north-lake-shore">
                    {portfolio?.storeEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-this-service-parent">
            <div className="about-this-service">About This Service</div>
            <div className="promotional-value-expires">
              {showFullDescription ? (
                <>{portfolio?.storeDescription}</>
              ) : (
                <>
                  {portfolio?.storeDescription?.slice(0, 250)}
                  <button
                    onClick={handleReadMore}
                    style={{
                      color: "green",
                      border: "0",
                      backgroundColor: "unset",
                      padding: "0",
                    }}
                    className="read-more-link pointer ms-1"
                  >
                    Read More &#8594;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProviderDetailsModal;
