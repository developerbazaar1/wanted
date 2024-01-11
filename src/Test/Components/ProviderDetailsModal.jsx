import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
const ProviderDetailsModal = ({
  showProviderDetialsModal,
  setShowProviderDetialsModal,
  portfolio,
}) => {
  function handleCloseModal() {
    setShowProviderDetialsModal(false);
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
        <div className="row mb-1">
          <div className="details-left-container col-lg-6 col-12">
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label"> Name:</div>
              <div className="col-7 store-details-info">
                {portfolio?.storeName}
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label"> Email:</div>
              <div className="col-7 store-details-info">
                {" "}
                {portfolio?.storeEmail}
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label"> Contact:</div>
              <div className="col-7 store-details-info">
                {" "}
                {portfolio?.storeContactDetails}
              </div>
            </div>
          </div>

          {/* right container start */}
          <div className="details-right-container col-lg-6 col-12">
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label"> Website:</div>
              <div className="col-7 store-details-info">
                {" "}
                <Link to={portfolio?.storeWebsite} target="_blank">
                  Website Url
                </Link>
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label"> Category:</div>
              <div className="col-7 store-details-info">
                {portfolio?.storeCategory}
              </div>
            </div>
            <div className="row mb-1">
              <div className="col-5 store-detaisl-label">Sub-Category:</div>
              <div className="col-7 store-details-info">
                {portfolio?.storeSubCategory}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row mb-1">
              <div className="store-detaisl-label col-3"> Location:</div>
              <div className="col-9">{portfolio?.storeAddress}</div>
            </div>
          </div>
          <div className="col-12">
            <div className="store-detaisl-label">Description:</div>
            <p className="">{portfolio?.storeDescription}</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProviderDetailsModal;
