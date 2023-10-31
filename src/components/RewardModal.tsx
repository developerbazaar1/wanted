// import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../css/ComponentsCSS/RewardModal.css";
import { RxCross2 } from "react-icons/rx";
type Props = {
  showRewardModal: boolean;
  setshowRewardModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const RewardModal = ({ showRewardModal, setshowRewardModal }: Props) => {
  // reward modal close
  const handleClose = () => setshowRewardModal(false);

  return (
    <div>
      <div className="div">
        <Modal
          show={showRewardModal}
          onHide={handleClose}
          id="mod_width"
          centered
        >
          <Modal.Body className="row modal_body">
            <div className="modal_heading">
              <div className="text-center quicksand-500-24 ">
                {" "}
                Reward Details
              </div>
              <div className="modal_close pointer " onClick={handleClose}>
                <RxCross2 />
              </div>
            </div>
            <div className="col-7">
              <ul className="ps-0 mb-0 ul_gap">
                <li className="list__style-none  quicksand-550-16">Date:</li>
                <li className="list__style-none quicksand-550-16">
                  Vendor Name:
                </li>
                <li className="list__style-none quicksand-550-16">
                  Reward Description:
                </li>
                <li className="list__style-none quicksand-550-16">
                  Point Collected:
                </li>
                <li className="list__style-none quicksand-550-16">
                  Reward Used:
                </li>
              </ul>
            </div>
            <div className="col-5">
              <ul className="ps-0 mb-0 quicksand-500-16 ul_gap">
                <li className="list__style-none">12/09/2023</li>

                <li className="list__style-none">Raybella Nails</li>
                <li className="list__style-none">Free Hair</li>
                <li className="list__style-none">5</li>
                <li className="list__style-none">2</li>
              </ul>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default RewardModal;
