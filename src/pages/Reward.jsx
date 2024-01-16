import { Link } from "react-router-dom";
import RewardTop from "../assets/rewards-top-img.png";

const Reward = () => {
  return (
    <>
      <main className="app-content">
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
                  <h1>Rewards Hub</h1>
                  <p className="mb-0">Track Customer Bonuses</p>
                  <p className="para-2 mt-1">
                    Monitor Customer Loyalty Rewards
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-center self-center">
                <div className="create-add-btn">
                  <div className="text-info-rewards ">
                    <p className="text-white">
                      Rewards Can Only Redeem From Mobile App
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- top image --> */}
              <div className="col-md-4 col-lg-4 col-sm-12 col-xs-12 text-end">
                <div className="top-image">
                  <img className="t-img w-150" src={RewardTop} alt="loading" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- ::  row start here --> */}
        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="table-responsive">
              <table className="table">
                <thead className="r-thed">
                  <tr className="text-center">
                    <th>S.No.</th>
                    <th>Date</th>
                    <th>User Name</th>
                    <th>Reward Description</th>
                    <th width="20%">Points Collected</th>
                    <th>Rewards Used</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="serial">01</td>
                    <td className="">12/09/2023</td>
                    <td className="user">Percy Boyle</td>
                    <td className="">Free Hair cut</td>
                    <td className="reward-gain">
                      5 Points{" "}
                      <span className="float-end mx-4 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M10.8002 3.58594L15.6643 10.2219H12.6299V16.4141H9.0002V10.2219H5.93457L10.8002 3.58594Z"
                            fill="#17C737"
                          />
                        </svg>
                      </span>
                    </td>
                    <td>2 Rewards</td>
                  </tr>
                  <tr className="text-center">
                    <td className="serial">02</td>
                    <td className="">08/09/2023</td>
                    <td className="user">Debbie Brennan</td>
                    <td className="">Free Hair Spa</td>
                    <td className="reward-loss">
                      9 Points{" "}
                      <span className="float-end mx-4 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M10.8004 16.4141L5.93633 9.77813H8.9707L8.9707 3.58594H12.6004L12.6004 9.77813H15.666L10.8004 16.4141Z"
                            fill="#FF0000"
                          />
                        </svg>
                      </span>
                    </td>
                    <td>1 Rewards</td>
                  </tr>
                  <tr className="text-center">
                    <td className="serial">03</td>
                    <td className="">05/09/2023</td>
                    <td className="user">Jack</td>
                    <td className="">Free Nail Art</td>
                    <td className="reward-loss">
                      5 Points ( Redeem){" "}
                      <span className="float-end mx-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M10.8004 16.4141L5.93633 9.77813H8.9707L8.9707 3.58594H12.6004L12.6004 9.77813H15.666L10.8004 16.4141Z"
                            fill="#FF0000"
                          />
                        </svg>
                      </span>
                    </td>
                    <td>1 Reward</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!-- section end here --> */}
      </main>
    </>
  );
};

export default Reward;
