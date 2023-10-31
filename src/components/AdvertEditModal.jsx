import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
const AdvertEditModal = ({ showAdvertModal, setshowAdvertModal }) => {
  const [imagesPrveiw, setimagesPrveiw] = useState([]);
  const numEmptyDivs = 5 - (imagesPrveiw ? imagesPrveiw.length : 0);
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

  const handleCloseadvetModal = () => {
    setshowAdvertModal(false);
  };
  return (
    <>
      <div>
        <div className="div">
          <Modal
            show={showAdvertModal}
            onHide={handleCloseadvetModal}
            id="edit_advert_modal"
            centered
          >
            <Modal.Body className="row">
              <div className="advert-edit-modal d-flex justify-content-between">
                <div className="text-center head">Advert Details</div>
                <div className="d-flex">
                  <button className="advert-mange-post-again-btn">
                    <Link to="/postagain">Post Again</Link>
                  </button>
                </div>
              </div>

              <div>
                <div className="manage-advert-input-grup d-flex gap-4 flex-column flex-md-row">
                  <div className="left-input">
                    <div className="advert-title-input">
                      <label
                        htmlFor="adverttitle"
                        className="d-flex justify-content-between "
                      >
                        <span className="manage-advert-label">Add Title:</span>
                        <span>
                          <svg
                            className="pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <textarea
                        className="w-100  editadevert_input"
                        rows="2"
                        name="adverttitle"
                        id="adverttitle"
                        placeholder="Up to 37% Off on Nail Spa/Salon - Shellac / No-Chip / Gel"
                      />
                    </div>
                    <div className="advert-subCategory-input d-flex flex-column">
                      <label
                        htmlFor="advertcategory"
                        className="d-flex justify-content-between"
                      >
                        <span className="manage-advert-label">Category:</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <input
                        className="editadevert_input w-100"
                        type="text"
                        id="advertcategory"
                        name="advertcategory"
                        placeholder="Beauty & Spa"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wheretshow"
                        className="manage-advert-label"
                      >
                        Where To Show:
                      </label>
                      <input
                        type="text"
                        id="wheretshow"
                        placeholder="Live Ads"
                        name="wheretshow"
                        className="w-100 editadevert_input"
                      />
                    </div>
                  </div>
                  <div className="right-input">
                    <div className="advert-description-input">
                      <label
                        htmlFor="advertdescription"
                        className="d-flex justify-content-between "
                      >
                        <span className="manage-advert-label">
                          Add Description:
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <textarea
                        className="w-100 editadevert_input"
                        rows="2"
                        name="advertdescription"
                        id="advertdescription"
                        placeholder="Up to 37% Off on Nail Spa/Salon - Shellac / No-Chip / Gel"
                      />
                    </div>
                    <div className="advert-subCategory-input d-flex flex-column">
                      <label
                        htmlFor="advertsubCategory"
                        className="d-flex justify-content-between"
                      >
                        <span className="manage-advert-label">
                          Sub Category:
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            className="pointer"
                          >
                            <path
                              d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                      </label>
                      <input
                        className="editadevert_input w-100"
                        type="text"
                        id="advertsubCategory"
                        placeholder="Beauty & Spa"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="advertplanprice"
                        className="manage-advert-label"
                      >
                        Advert Price Plan:
                      </label>
                      <input
                        type="text"
                        id="advertplanprice"
                        placeholder="Live Ads"
                        name="advertplanprice"
                        className="w-100 editadevert_input"
                      />
                    </div>
                  </div>
                </div>
                <div className="manage-advert-image-grup mt-2">
                  <label
                    htmlFor="advertmanageimg"
                    className="d-flex justify-content-between position-relative"
                  >
                    <span className="manage-advert-label">Advert Images:</span>
                    <span>
                      <input
                        type="file"
                        id="advertmanageimg"
                        className="advert_edit_imag_picker"
                        onChange={handleImageSelect}
                      />
                      <svg
                        className="pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M18.295 2.20493C17.9908 1.90063 17.6296 1.65925 17.232 1.49457C16.8345 1.32988 16.4084 1.24512 15.9781 1.24512C15.5478 1.24512 15.1217 1.32988 14.7242 1.49457C14.3267 1.65925 13.9655 1.90063 13.6612 2.20493L3.82124 12.0449C3.35391 12.5126 3.02065 13.0971 2.85624 13.7374L1.76874 17.9699C1.74178 18.0752 1.74274 18.1858 1.77155 18.2906C1.80035 18.3954 1.856 18.4909 1.93299 18.5676C2.00999 18.6444 2.10566 18.6997 2.21058 18.7282C2.3155 18.7566 2.42602 18.7572 2.53124 18.7299L6.7625 17.6437C7.40297 17.4796 7.98754 17.1463 8.45499 16.6787L18.295 6.83868C18.5993 6.53444 18.8407 6.17324 19.0054 5.77571C19.17 5.37818 19.2548 4.9521 19.2548 4.5218C19.2548 4.09151 19.17 3.66543 19.0054 3.26789C18.8407 2.87036 18.5993 2.50916 18.295 2.20493ZM14.545 3.08868C14.9251 2.70859 15.4406 2.49506 15.9781 2.49506C16.5156 2.49506 17.0312 2.70859 17.4112 3.08868C17.7913 3.46876 18.0049 3.98427 18.0049 4.5218C18.0049 5.05933 17.7913 5.57484 17.4112 5.95492L16.4375 6.92868L13.5712 4.06242L14.545 3.08868ZM12.6875 4.94618L15.5537 7.81242L7.57124 15.7949C7.26171 16.1039 6.87492 16.324 6.45124 16.4324L3.24249 17.2574L4.06749 14.0487C4.17509 13.6247 4.39537 13.2377 4.70499 12.9287L12.6875 4.94618Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                  </label>
                  <div>
                    {imagesPrveiw?.map((img, index) => (
                      <div key={index}>
                        <img src={img} alt={`preview-${index}`} className="" />
                      </div>
                    ))}

                    {Array.from({ length: numEmptyDivs }, (_, index) => (
                      <div key={index}></div>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <button
                    className="mt-3 edit_product_modal_btn"
                    onClick={handleCloseadvetModal}
                  >
                    Save Details
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

export default AdvertEditModal;
