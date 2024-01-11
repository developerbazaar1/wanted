import { useEffect, useState } from "react";
import { ProctedApi } from "../config/axiosUtils";
import { useAuth } from "../service/auth";
import { toast } from "react-toastify";
import Spiner from "../components/Spiner";
import PaymentHistroyTop from "../components/PaymentHistroyTop";
import { DatedFormated } from "../helper/ToDate";
import CustomPagination from "../components/CustomePagination";

const PaymentHistroy = () => {
  const [payments, setPayment] = useState();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  let { token, user, portfolio_id } = useAuth();
  useEffect(() => {
    function GetPaymentHistroy() {
      setLoading(true);
      ProctedApi.getPaymentHistory(token, user.id, portfolio_id)
        .then((res) => {
          setPayment(res.data.payment);
        })
        .catch((e) => {
          console.log(e);
          toast.error(e?.response?.data?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
    GetPaymentHistroy();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments?.slice(indexOfFirstItem, indexOfLastItem);

  if (payments?.length === 0) {
    return (
      <>
        <main
          style={{
            height: "300px",
            textAlign: "center",
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <h5>It looks like You haven&#39;t made any Payment yet</h5>
        </main>
      </>
    );
  }

  return (
    <>
      <Spiner loading={loading} />
      <main className="app-content">
        <PaymentHistroyTop />
        {/* <!-- ::  row start here --> */}
        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="table-responsive pay-table">
              <table className="table">
                <thead className="r-thed">
                  <tr className="text-center">
                    <th></th>
                    <th>S.No.</th>
                    <th>Date Of Payment</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((payment, index) => (
                    <tr key={payment?._id} className="text-center">
                      <td></td>
                      <td className="serial">
                        {index + 1 + indexOfFirstItem}{" "}
                      </td>
                      <td className="">{DatedFormated(payment?.createdAt)}</td>
                      <td className="user">{payment?.description}</td>
                      <td className="amount">£ {payment?.amount}</td>

                      {payment?.status ? (
                        <td className="pay-recieved">Received</td>
                      ) : (
                        <td
                          style={{
                            color: "red",
                          }}
                        >
                          Canceled
                        </td>
                      )}
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CustomPagination
              totalItems={payments?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
        {/* <!-- section end here --> */}
      </main>
    </>
  );
};

export default PaymentHistroy;
