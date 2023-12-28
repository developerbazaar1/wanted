import { GetAllPlan, ProctedApi } from "../config/axiosUtils";
import addCardIma1 from "../assets/plan-card01.png";
import { useEffect, useState } from "react";
import { useAuth } from "../service/auth";
import { castExpiryDate } from "../helper/castExpiryDate";
import Spiner from "./Spiner";
import { toast } from "react-toastify";
import paymentsucess from "../assets/pay-secure-img.png";
import { Link } from "react-router-dom";
import { setSubscription } from "../features/subscriptionSlice";
import { useDispatch } from "react-redux";
import { useSubscription } from "../service/planhelper";

const Plans = () => {
  const dispatch = useDispatch();
  const [plans, setPlans] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(undefined);
  const { token, user, portfolio_id } = useAuth();
  const [loading, setLoading] = useState(false);
  let storeSubscription = useSubscription().subscriptions;
  // console.log(storeSubscription, "This is store subscriptin");
  // console.log(subscriptions, "this is subscription");
  // this function is used to add subscription
  const handlePayment = () => {
    setLoading(true);
    let data = {
      plan_id: selectedPlan._id,
      provider_id: user.id,
      provider_portfolio_id: portfolio_id,
      expiryDate: castExpiryDate(selectedPlan?.validity),
      numberof_ads: selectedPlan.no_of_ads,
      remainingAds: selectedPlan.no_of_ads,
    };
    ProctedApi.addSubscription(data, token)
      .then((res) => {
        console.log(res);
        dispatch(
          setSubscription({
            subscriptions: [...storeSubscription, res.data.result],
          })
        );
        setStatus({ type: "success" });
        toast.success("Payment Successfully Completed");
      })
      .catch((e) => {
        console.log(e);
        if (e?.response?.status === 409) {
          toast.error(e?.response?.data?.message);
          return;
        }
        setStatus({ type: "error", error: "Payment Failed try Again Later" });
        toast.error("Payment Failed try Again Later");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    function fetchPlans() {
      GetAllPlan()
        .then((res) => {
          // console.log(res?.plan);
          const filteredPlans = res?.plan.filter(
            (plan) => !storeSubscription.some((sub) => sub.plan_id === plan._id)
          );
          setPlans(filteredPlans);
          // setPlans(res?.plan);
        })
        .catch((e) => {
          // console.error(e);
          setError("Failed to load plans. Please try again.");
        });
    }

    fetchPlans();
  }, []);

  const resetStatus = () => {
    setStatus(undefined);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    resetStatus();
  };

  if (error) {
    return <div className="text-center my-5">{error}</div>;
  }

  if (!plans) {
    return <div className="text-center my-5">Loading plans...</div>;
  }

  return (
    <>
      <Spiner loading={loading} />
      <section className="card-section">
        <div className="justify-content-center mt-5 pb-5">
          {plans?.length !== 0 ? (
            <>
              <div className="col-md-12 col-sm-12 col-xs-12 justify-content-center">
                <div className="select-plan-head">
                  <h4 className="text-center">Choose Plan</h4>
                </div>
                <div className="text-center d-flex flex-column flex-md-row gap-4  justify-content-center align-items-center">
                  {plans?.map((plan) => (
                    <div
                      key={plan?._id}
                      className={`card-plan pointer ${
                        selectedPlan === plan ? "selected-plan" : ""
                      }`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      <div className="plan-card-image ">
                        <img
                          className="w-50px"
                          src={addCardIma1}
                          alt="Image for Plan Card"
                        />
                      </div>
                      <h2 className="p-card-title mt-2">{plan?.plan_name}</h2>
                      <div className="plan-price-status mt-2 d-flex flex-column">
                        <h2 className="mb-0">&euro; {plan?.plan_price}</h2>
                        <span className=" plan-month">
                          {" "}
                          PER {plan.frequency.toUpperCase()}{" "}
                        </span>
                      </div>
                      <div className="d-flex flex-column gap-1 my-1">
                        <div className="d-flex justify-content-between">
                          <span className="add_advert_show">Ads You Show</span>
                          <span className="add-advert_day">
                            {plan?.no_of_ads} Ads
                          </span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span className="add_advert_show">
                            Validity For Days
                          </span>
                          <span className="add-advert_day">
                            {plan?.validity} Days
                          </span>
                        </div>
                      </div>
                      <div>
                        <button className="add_advert_select_plan_btn mt-1">
                          {selectedPlan === plan ? "Selected" : "Select Plan"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <button
                  className="mt-4 advert_pay_btn"
                  disabled={!selectedPlan || loading}
                  onClick={() => handlePayment()}
                >
                  {selectedPlan
                    ? `Pay £${selectedPlan.plan_price} To Purchase`
                    : "Select a Plan"}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <h5>
                  It&#39;s look like You have Ads left Go And Use That Before
                  Buying New Plans
                </h5>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="payment-conform-section mb-4">
        <div className="d-flex justify-content-center">
          <div className="col col-md-8 col-lg-6 text-center">
            {/* This is used to successfully message */}
            {status?.type === "success" && (
              <div
                className="bg "
                style={{
                  background: "#ffffff 0% 0% no-repeat padding-box",
                }}
              >
                <div className="payment-sucess-img text-center mx-auto">
                  <img src={paymentsucess} alt="" />
                </div>
                <h3 className="payment-recived-head">Payment Received</h3>
                <p className="payment-description">
                  Your Payment Has Been Successfully Received
                </p>
              </div>
            )}

            {status?.type === "error" && (
              <p
                style={{
                  color: "red",
                }}
              >
                {status?.error}
              </p>
            )}

            <div>
              <Link className="add-adwart-btn" to="/addAdvert">
                Add A New Advert{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1090_405)">
                    <path
                      d="M9.71875 13.5149V10.7805H6.98438C6.55286 10.7805 6.20312 10.4308 6.20312 9.99924C6.20312 9.56787 6.55286 9.21799 6.98438 9.21799H9.71875V6.48361C9.71875 6.05225 10.0685 5.70236 10.5 5.70236C10.9315 5.70236 11.2812 6.05225 11.2812 6.48361V9.21799H14.0156C14.4471 9.21799 14.7969 9.56787 14.7969 9.99924C14.7969 10.4308 14.4471 10.7805 14.0156 10.7805H11.2812V13.5149C11.2812 13.9464 10.9315 14.2961 10.5 14.2961C10.0685 14.2961 9.71875 13.9464 9.71875 13.5149ZM17.5711 2.92892C15.6823 1.04019 13.1711 0 10.5 0C7.82895 0 5.31766 1.04019 3.42892 2.92892C1.54019 4.81766 0.5 7.32895 0.5 10C0.5 12.6711 1.54019 15.1823 3.42892 17.0711C5.31766 18.9598 7.82895 20 10.5 20C12.3286 20 14.1179 19.5016 15.6743 18.5588C16.0434 18.3353 16.1613 17.8549 15.9378 17.486C15.7142 17.1169 15.2337 16.9989 14.8648 17.2224C13.5525 18.0173 12.0431 18.4375 10.5 18.4375C5.8476 18.4375 2.0625 14.6524 2.0625 10C2.0625 5.3476 5.8476 1.5625 10.5 1.5625C15.1524 1.5625 18.9375 5.3476 18.9375 10C18.9375 11.6637 18.4428 13.2829 17.5068 14.6831C17.267 15.0417 17.3634 15.5269 17.7221 15.7668C18.0807 16.0065 18.5659 15.91 18.8058 15.5515C19.9141 13.8936 20.5 11.9739 20.5 10C20.5 7.32895 19.4598 4.81766 17.5711 2.92892Z"
                      fill="black"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_1090_405">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(0.5)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Plans;
