import { FadeLoader } from "react-spinners";
const override: any = {
  display: "inherit",
  position: "relative",
  fontSize: "0px",
  top: "20px !important",
  left: "20px !important",
  width: "60px !important",
  height: "60px !important",
};

interface spinerType {
  loading: boolean;
}

const Spiner = ({ loading }: spinerType) => {
  if (!loading) return null;

  return (
    <div className="spinner_loader">
      <FadeLoader cssOverride={override} color="#2bc924" loading={loading} />
    </div>
  );
};

export default Spiner;
