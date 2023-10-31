import { useState } from "react";
import "../NavComponents/navbar.css";
import Modal from "react-bootstrap/Modal";
import SecondModal from "./SecondModal";
type Props = {
  showModal1: boolean;
  setShowModal1: React.Dispatch<React.SetStateAction<boolean>>;
};
const FirstModal = ({ showModal1, setShowModal1 }: Props) => {
  const [showModal2, setShowModal2] = useState<boolean>(false);
  const [assistSearch, setassistSearch] = useState<boolean>(false);
  const handleClose = () => {
    setShowModal1(false);
    setassistSearch(false);
  };
  const modaTow = () => {
    handleClose();
    if (assistSearch === true) {
      setShowModal2(true);
    }
  };

  return (
    <>
      <div>
        <SecondModal showModal2={showModal2} setShowModal2={setShowModal2} />
        <Modal show={showModal1} onHide={handleClose} id="modal_one" centered>
          <Modal.Body className="y">
            <div className="modal_one_Content_container">
              <h5 className="modal_one_head">
                Kindly select your provider search option:
              </h5>
              <div className="label_group">
                <div className=" my-3 userSearch">
                  <input
                    className="user_search_input"
                    type="radio"
                    name="userSearch"
                    id="userSearch"
                    onClick={() => setassistSearch(false)}
                  />
                  <label className="user-serach-label" htmlFor="userSearch">
                    Search on Your Own
                  </label>
                </div>
                <div className=" my-3 assistSearch">
                  <input
                    className="assist_search_input"
                    type="radio"
                    name="userSearch"
                    id="assistSearch"
                    onClick={() => setassistSearch(true)}
                  />
                  <label className="assist-serach-label" htmlFor="assistSearch">
                    Allow Us to Assist You
                  </label>
                </div>
              </div>
              <div>
                <button className="modal_one_btn" onClick={modaTow}>
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

export default FirstModal;
