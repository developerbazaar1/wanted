import Logo from "./Logo";
import "../css/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="  pt-5 md-py-5 text-center white blac__background md-pl-4">
      <div className="footer_container pb-5">
        <div className="footer_discription_div">
          <div className="footer_logo">
            <Logo />
          </div>
          <p className="footer-font">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it.
          </p>
        </div>
        <div className="text-lg-start">
          <h5 className="md-mb-3">Categories</h5>
          <ul className="list-group gap-2 Foorer_margin-top footer-font">
            <li className="list__style-none">Beauty & Spas</li>
            <li className="list__style-none">Food & Beverage</li>
            <li className="list__style-none">Health & Fitness</li>
            <li className="list__style-none">Women's Fashion</li>
            <li className="list__style-none">Men's & Fashion</li>
            <li className="list__style-none">Salon</li>
            <li className="list__style-none">Fun Activities</li>
            <li className="list__style-none">Tours & Travel</li>
          </ul>
        </div>
        <div className="text-lg-start">
          <h5 className="md-mb-3">Sell On Wanted</h5>
          <ul className="list-group gap-2 Foorer_margin-topn footer-font">
            <li className="list__style-none">
              <Link to="#">Join As Provider</Link>
            </li>

            <li className="list__style-none">
              <Link to="#">How Does It Work For Providers</Link>
            </li>
            <li className="list__style-none">
              <Link to="#">Sponsor Your Coupons</Link>
            </li>
          </ul>
        </div>
        <div className="text-lg-start">
          <h5 className="md-mb-3">Quick Links</h5>
          <ul className="list-group gap-2 Foorer_margin-top footer-font">
            <li className="list__style-none">
              <Link to="/signup">Sing Up</Link>
            </li>
            <li className="list__style-none">
              <Link to="#"> Become A Vendor</Link>
            </li>
            <li className="list__style-none">
              <Link to="#"> Get Wanted App</Link>
            </li>
            <li className="list__style-none">
              <Link to="#">Help</Link>
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
          Developer <span className="red">Bazzar</span>
        </span>{" "}
        Technologies
      </div>
    </div>
  );
}

export default Footer;
