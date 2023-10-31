import { useState } from "react";
import "../NavComponents/navbar.css";
import Modal from "react-bootstrap/Modal";
import ThirdModal from "./ThirdModal";
type Props = {
  showModal2: boolean;
  setShowModal2: React.Dispatch<React.SetStateAction<boolean>>;
};
const SecondModal = ({ showModal2, setShowModal2 }: Props) => {
  const [showModal3, setShowModal3] = useState<boolean>(false);
  const handleClose = () => setShowModal2(false);
  const modaThirdOpen = () => {
    handleClose();
    setShowModal3(true);
  };

  return (
    <>
      <ThirdModal showModal3={showModal3} setShowModal3={setShowModal3} />
      <div>
        <Modal show={showModal2} onHide={handleClose} id="modal_two" centered>
          <Modal.Body className="y">
            <div className="modal_two_Content_container">
              <h5 className="modal_one_head">Thank you for choosing us.</h5>

              <div>
                <h6 className="text-center modal_sub_head mb-4">
                  Kindly provide the following details for better assistance:
                </h6>
                <div className="modalTwo_inputAGroup">
                  <div className="modalTwoName">
                    <label htmlFor="Name" className="moda_two_label">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      id="Name"
                      className="moda_two_input"
                    />
                  </div>

                  <div className="modalTwoPame">
                    <label htmlFor="phoneNumber" className="moda_two_label">
                      Phone no.
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Phone No."
                      name="phoneNumber"
                      id="phoneNumber"
                      className="moda_two_input"
                    />
                  </div>
                  <div className="modalTwoEmail">
                    <label htmlFor="email" className="moda_two_label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      name="email"
                      id="email"
                      className="moda_two_input"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="modal_one_btn" onClick={modaThirdOpen}>
                  Next
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default SecondModal;
