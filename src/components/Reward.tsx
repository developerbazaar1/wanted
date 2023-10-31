import { useState } from "react";
import "../css/ComponentsCSS/reward.css";
import RewardModal from "./RewardModal";

const Reward = () => {
  const [showRewardModal, setshowRewardModal] = useState<boolean>(false);

  //function to open Reward modal
  const openRewardModal = (): void => {
    setshowRewardModal(true);
  };
  return (
    <div className="tabel_container">
      <RewardModal
        showRewardModal={showRewardModal}
        setshowRewardModal={setshowRewardModal}
      />
      <div className="sub_container">
        <table className="">
          <thead>
            <tr className="row  py-1 ">
              <th className="col-2 quicksand-550-18">S.NO</th>
              <th className="col  quicksand-550-18">Vendor Name</th>
              <th className="col-2 quicksand-550-18">Points</th>
              <th className="col-2 quicksand-550-18">Rewards</th>
              <th className="col quicksand-550-18">View Log</th>
            </tr>
          </thead>
          <tbody className="mt-1">
            <tr className="row py-1">
              <td className="col-2 quicksand-500-16">01</td>
              <td className="col quicksand-500-16">Raybella Nails</td>
              <td className="col-2 quicksand-500-16">5</td>
              <td className="col-2 quicksand-500-16">2</td>
              <td className="col quicksand-500-16">
                <button className=" reward_button" onClick={openRewardModal}>
                  View Log
                </button>
              </td>
            </tr>
            <tr className="row  py-1">
              <td className="col-2 quicksand-500-16">01</td>
              <td className="col quicksand-500-16">Raybella Nails</td>
              <td className="col-2 quicksand-500-16">5</td>
              <td className="col-2 quicksand-500-16">2</td>
              <td className="col quicksand-500-16">
                <button className=" reward_button" onClick={openRewardModal}>
                  View Log
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td className="parrot pointer lato_600_16">View All</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default Reward;
