import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../service/auth";
import { getUserSubscription } from "../config/axiosUtils";
import { useDispatch } from "react-redux";
import { DatedFormated } from "../helper/ToDate";
import addCardImage from "../assets/plan-card01.png";
import { setSubscription } from "../features/subscriptionSlice";

const Subscriptions = ({ handleSelectsub, selectedSubscription, loading }) => {
  const dispatch = useDispatch();
  const { token, user, portfolio_id } = useAuth();
  const [subscription, setsubscription] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getUserSubscription(token, user.id, portfolio_id);
        setsubscription(res.data.result);
        // setsubscription([]);
        dispatch(
          setSubscription({
            subscriptions: res.data.result,
          })
        );
      } catch (error) {
        console.error(error);
        setError("Failed to Load Subscription. Please try again later.");
      }
    };

    fetchSubscription();
  }, [loading]);

  if (error) {
    return <h5 className="text-center my-5">{error}</h5>;
  }

  if (!subscription) {
    return <h5 className="text-center my-5">Loading Subscription...</h5>;
  }

  return (
    <>
      <section className="card-section">
        <div className="row justify-content-center mt-5 pb-5">
          <div className="col-md-12 col-sm-12 col-xs-12 justify-content-center">
            <div className="select-plan-head">
              <h4 className="text-center">Available Subscription</h4>
            </div>
            <div className="text-center d-flex flex-column flex-md-row gap-4  justify-content-center align-items-center">
              {subscription?.length !== 0 ? (
                subscription?.map((sub) => (
                  <div
                    key={sub?._id}
                    className={`card-plan pointer`}
                    onClick={() => handleSelectsub(sub)}
                  >
                    <div className="plan-card-image">
                      <img
                        className="w-50px"
                        src={addCardImage}
                        alt="Image for Plan Card"
                      />
                    </div>
                    <h2 className="p-card-title mt-2">
                      {sub?.subscriptionPlanName}
                    </h2>
                    <div className="plan-price-status mt-2 d-flex flex-column">
                      <h2 className="mb-0">
                        &euro; {sub?.subscriptionPlanPrice}
                      </h2>
                    </div>
                    <div className="d-flex flex-column gap-1 my-1">
                      <div className="d-flex justify-content-between">
                        <span className="add_advert_show">Ads Lefts</span>
                        <span className="add-advert_day">
                          {sub?.remainingAds} Ads
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span className="add_advert_show">Expired On</span>
                        <span className="add-advert_day">
                          {DatedFormated(sub?.expiryDate)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <button className="add_advert_select_plan_btn mt-1">
                        {selectedSubscription === sub
                          ? "Selected"
                          : "Select Plan"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <h5>
                    Oops! It looks like your subscription is inactive Or You
                    don&#39;t have ads left in It. To continue Publishing Your
                    ads, please consider purchasing a Plan. Thank you
                  </h5>
                </>
              )}
            </div>
          </div>

          <div className="text-center">
            {subscription ? (
              <button
                className="mt-2 advert_pay_btn"
                disabled={!selectedSubscription}
              >
                {selectedSubscription
                  ? `You have selected ${selectedSubscription.subscriptionPlanName}`
                  : "Select a Plan"}
              </button>
            ) : (
              <Link to="/buy-now">
                <button className="mt-2 advert_pay_btn">Buy Now</button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {selectedSubscription && (
        <section className="payment-conform-section">
          <div className="row justify-content-center">
            <div className="col col-md-8 col-lg-6 text-center">
              <div>
                <button
                  className="payment_final_submission_btn mt-2"
                  type="submit"
                  form="add-advert-form"
                  disabled={loading}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Subscriptions;
