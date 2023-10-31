import Modal from "react-bootstrap/Modal";
import { RxCross2 } from "react-icons/rx";

const CustomerinquiryModal = ({ showinquiryModal, setshowinquiryModal }) => {
  const handleClose = () => setshowinquiryModal(false);

  return (
    <div>
      <div className="div">
        <Modal
          show={showinquiryModal}
          onHide={handleClose}
          id="inq_mod_width"
          centered
        >
          <Modal.Body className="row">
            <div className="modal_heading">
              <div className="text-center quicksand-500-24 ">
                {" "}
                Inquiry Details
              </div>
              <div className="modal_close pointer " onClick={handleClose}>
                <RxCross2 />
              </div>
            </div>
            <div className="col-6 d-flex flex-column gap-3 ">
              <div className="vendor_inq_modal_name_container">
                <label
                  htmlFor="modal_inq_customer_name"
                  className="modal_inq_customer_name"
                >
                  Customer Name:
                </label>
                <div className="inq_modal_label_font">Allyson Rollins</div>
              </div>
              <div className="vendor_inq_modal_phone_container">
                <label
                  htmlFor="modal_inq_customer_phone "
                  className="modal_inq_customer_phone"
                >
                  Phone N.:
                </label>
                <div className="inq_modal_label_font">90009-90009</div>
              </div>
            </div>
            <div className="col-6 d-flex flex-column gap-3">
              <div className="vendor_inq_modal_date_container">
                <label
                  htmlFor="modal_inq_customer_date "
                  className="modal_inq_customer_date"
                >
                  Date & Time:
                </label>
                <div className="inq_modal_label_font">
                  Tuesday, 12 Sept 2023
                </div>
              </div>
              <div className="vendor_inq_modal_email_container">
                <label
                  htmlFor="modal_inq_customer_email "
                  className="modal_inq_customer_email"
                >
                  Email Address:
                </label>
                <div className="inq_modal_label_font">abc@gmail.com</div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default CustomerinquiryModal;
