import { FadeLoader } from "react-spinners";
let override = {
  display: "inherit",
  position: "relative",
  fontSize: "0px",
  top: "20px !important",
  left: "20px !important",
  width: "60px !important",
  height: "60px !important",
};

const Spiner = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="spinner_loader">
      <FadeLoader cssOverride={override} color="#2bc924" loading={loading} />
    </div>
  );
};

export default Spiner;
