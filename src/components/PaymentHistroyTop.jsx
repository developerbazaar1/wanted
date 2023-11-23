import { Link } from "react-router-dom";
import PaymentTop from "../assets/payment-top-img.png";
const PaymentHistroyTop = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
          <div className="row">
            {/* <!-- top head --> */}

            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-left self-center">
              <div className="back-btn">
                <Link to=".." className="b-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="21"
                    viewBox="0 0 20 21"
                    fill="none"
                  >
                    <g clipPath="url(#clip0_1710_5743)">
                      <path
                        d="M8.67222 5.13338L3.33333 10.5L8.67222 15.8667C8.72044 15.93 8.7817 15.9823 8.85185 16.0198C8.922 16.0574 8.99941 16.0795 9.07884 16.0846C9.15827 16.0896 9.23785 16.0776 9.31221 16.0492C9.38658 16.0208 9.45397 15.9768 9.50985 15.9202C9.56572 15.8635 9.60876 15.7955 9.63606 15.7207C9.66336 15.6459 9.67428 15.5662 9.66808 15.4868C9.66188 15.4075 9.6387 15.3304 9.60012 15.2608C9.56153 15.1912 9.50845 15.1307 9.44444 15.0834L5.45 11.0556H16.0778C16.2251 11.0556 16.3664 10.9971 16.4706 10.8929C16.5748 10.7887 16.6333 10.6474 16.6333 10.5C16.6333 10.3527 16.5748 10.2114 16.4706 10.1072C16.3664 10.003 16.2251 9.94449 16.0778 9.94449H5.45L9.44444 5.91672C9.54832 5.8121 9.60639 5.67051 9.60586 5.52308C9.60534 5.37566 9.54628 5.23448 9.44167 5.1306C9.33705 5.02673 9.19546 4.96866 9.04804 4.96918C8.90061 4.9697 8.75943 5.02877 8.65556 5.13338H8.67222Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1710_5743">
                        <rect
                          width="20"
                          height="20"
                          fill="white"
                          transform="matrix(0 -1 1 0 0 20.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>{" "}
                  Back
                </Link>
              </div>
              <div className="top-head mt-3">
                <h1>Payment History</h1>
                <p className="mb-0">View Payment History</p>
                <p className="para-2 mt-1">
                  A Journey Through Your Payment Records
                </p>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-center self-center"></div>
            {/* <!-- top image --> */}
            <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-end">
              <div className="top-image">
                <img className="t-img w-150" src={PaymentTop} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentHistroyTop;
