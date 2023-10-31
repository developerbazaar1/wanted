import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Logo: React.FC = () => {
  return (
    <Link to="/" className="main__logo">
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
