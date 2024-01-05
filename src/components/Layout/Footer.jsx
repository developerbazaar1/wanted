import { Link } from "react-router-dom";
import navLogo from "../../assets/logo.png";
import { ToastContainer } from "react-toastify";

function Footer() {
  return (
    <>
      <div className="  pt-5 md-py-5 text-center white blac__background md-pl-4">
        <div className="footer_container pb-5">
          <div className="footer_discription_div">
            <div className="venodr_footer_log">
              <img src={navLogo} alt="loading" />
            </div>
            <p className="footer-font">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it.
            </p>
          </div>
          <div className="text-lg-start">
            <h5 className="md-mb-3">Categories</h5>
            <ul className="list-group gap-2 Foorer_margin-top footer-font">
              <li className="list__style-none">Beauty & Spas</li>
              <li className="list__style-none">Food & Beverage</li>
              <li className="list__style-none">Health & Fitness</li>
              <li className="list__style-none">Women &apos;s Fashion</li>
              <li className="list__style-none">Men&apos;s & Fashion</li>
              <li className="list__style-none">Salon</li>
              <li className="list__style-none">Fun Activities</li>
              <li className="list__style-none">Tours & Travel</li>
            </ul>
          </div>
          <div className="text-lg-start">
            <h5 className="md-mb-3">Sell On Wanted</h5>
            <ul className="list-group gap-2 Foorer_margin-topn footer-font">
              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  Join As Customer
                </Link>
              </li>

              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  How Does It Work For Providers
                </Link>
              </li>
              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  Sponsor Your Coupons
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-lg-start">
            <h5 className="md-mb-3">Quick Links</h5>
            <ul className="list-group gap-2 Foorer_margin-top footer-font">
              <li className="list__style-none">
                <Link to="/signup" className="footer-font">
                  Sign Up
                </Link>
              </li>
              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  {" "}
                  Become A Customer
                </Link>
              </li>
              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  {" "}
                  Get Wanted App
                </Link>
              </li>
              <li className="list__style-none">
                <Link to="#" className="footer-font">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="col border-top border-2 font_quick_hand"
          style={{
            padding: " 0.76rem 0 1.25rem 0",
          }}
        >
          &#xa9; 2023 - All Rights Reserved | Designed & Developed By{" "}
          <span className="parrot">
            Developer <span className="red">Bazaar</span>
          </span>{" "}
          Technologies
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
    </>
  );
}

export default Footer;
