// import { useState } from "react";
import "../NavComponents/navbar.css";
import Modal from "react-bootstrap/Modal";
type Props = {
  showModal3: boolean;
  setShowModal3: React.Dispatch<React.SetStateAction<boolean>>;
};
const ThirdModal = ({ showModal3, setShowModal3 }: Props) => {
  const handleClose = () => setShowModal3(false);

  return (
    <>
      <div>
        <Modal show={showModal3} onHide={handleClose} id="modal_three" centered>
          <Modal.Body className="y">
            <div className="modal_three_Content_container">
              <h6 className="text-center">
                Kindly fill the following details for better assistance:
              </h6>

              <div>
                <div className="modalthree_inputAGroup">
                  <div className="modalThreeCategroy dropdown-center">
                    <label htmlFor="modalThreecategroy">Select Category</label>
                    <select
                      name="modalThreecategroy"
                      id="modalThreecategroy"
                      form="categroy"
                      className="modalThreecategroy modal_ther_input_font"
                    >
                      <option value="">select category</option>
                      <option value="Beauty & Spa">Beauty & Spa</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="Health & Fitness">Health & Fitness</option>
                      <option value="Home Applicances">Home Applicances</option>
                      <option value="Tours & Travel">Tours & Travel</option>
                    </select>{" "}
                    {/* <a
                      id="thirdModal_drop_down"
                      className="dropdown-toggle modal_ther_input_font"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="true"
                    >
                      Select Category
                    </a>
                    <ul className="dropdown-menu dropdown-menu-lg-end w-100 modal_dropDown">
                      <li className="dropdown-item ">Beauty & Spa</li>
                      <li className="dropdown-item">Food & Beverages</li>

                      <li className="dropdown-item">Health & Fitness</li>
                      <li className="dropdown-item">Women's Fashion</li>
                      <li className="dropdown-item">Men's Fashion</li>
                      <li className="dropdown-item">Home Applicances</li>
                      <li className="dropdown-item">Fun Activities</li>
                      <li className="dropdown-item">Tours & Travel</li>
                    </ul> */}
                  </div>

                  <div className="modalThree_desc">
                    <label htmlFor="modalThreeDescr">Enter Description</label>
                    <textarea
                      placeholder="Write Description"
                      name="modalThreeDescr"
                      id="modalThreeDescr"
                      className="modal_ther_input_font"
                    />
                  </div>
                  <div className="modalThreeOtherinfo">
                    <label htmlFor="modalThreeOtherinfo">
                      Other Information
                    </label>
                    <textarea
                      placeholder="Write Information"
                      name="modalThreeOtherinfo"
                      id="modalThreeOtherinfo"
                      className="modal_ther_input_font"
                    />
                  </div>
                  <div className="modalThreeLocation">
                    <label htmlFor="Location">Location</label>
                    <input
                      type="text"
                      placeholder="Enter Location"
                      name="Location"
                      id="Location"
                      className="modal_ther_input_font"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="modal_one_btn" onClick={handleClose}>
                  Submit
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default ThirdModal;
