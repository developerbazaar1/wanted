import { useState } from "react";
import CustomerinquiryModal from "../components/CustomerinquiryModal";
import CustomerTop from "../components/CustomerTop";
const CustomerEnq = () => {
  const [showinquiryModal, setshowinquiryModal] = useState(false);
  return (
    <>
      <CustomerinquiryModal
        showinquiryModal={showinquiryModal}
        setshowinquiryModal={setshowinquiryModal}
      />
      <main className="app-content">
        <CustomerTop />
        {/* filter icons  div start*/}
        <div>
          <div className="dropdown">
            <button
              className="inq_filter_button"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="25"
                viewBox="0 0 20 14"
                fill="none"
              >
                <g clipPath="url(#clip0_1021_934)">
                  <path
                    d="M19.4238 12.793L19.9023 13.9551L18.6914 14.4531C18.7305 14.6484 18.75 14.847 18.75 15.0488C18.75 15.2507 18.7305 15.4492 18.6914 15.6445L19.9023 16.1426L19.4238 17.3047L18.2129 16.7969C17.985 17.1289 17.7051 17.4089 17.373 17.6367L17.8809 18.8477L16.7188 19.3262L16.2207 18.1152C16.0254 18.1543 15.8268 18.1738 15.625 18.1738C15.4232 18.1738 15.2246 18.1543 15.0293 18.1152L14.5312 19.3262L13.3691 18.8477L13.877 17.6367C13.5449 17.4089 13.265 17.1289 13.0371 16.7969L11.8262 17.3047L11.3477 16.1426L12.5586 15.6445C12.5195 15.4492 12.5 15.2507 12.5 15.0488C12.5 14.847 12.5195 14.6484 12.5586 14.4531L11.3477 13.9551L11.8262 12.793L13.0371 13.3008C13.265 12.9688 13.5449 12.6888 13.877 12.4609L13.3691 11.25L14.5312 10.7715L15.0293 11.9824C15.2246 11.9434 15.4232 11.9238 15.625 11.9238C15.8268 11.9238 16.0254 11.9434 16.2207 11.9824L16.7188 10.7715L17.8809 11.25L17.373 12.4609C17.7051 12.6888 17.985 12.9688 18.2129 13.3008L19.4238 12.793ZM17.5 15.0488C17.5 14.7884 17.4512 14.5443 17.3535 14.3164C17.2559 14.0885 17.1224 13.89 16.9531 13.7207C16.7839 13.5514 16.5853 13.418 16.3574 13.3203C16.1296 13.2227 15.8854 13.1738 15.625 13.1738C15.3646 13.1738 15.1204 13.2227 14.8926 13.3203C14.6647 13.418 14.4661 13.5514 14.2969 13.7207C14.1276 13.89 13.9941 14.0885 13.8965 14.3164C13.7988 14.5443 13.75 14.7884 13.75 15.0488C13.75 15.3092 13.7988 15.5534 13.8965 15.7812C13.9941 16.0091 14.1276 16.2077 14.2969 16.377C14.4661 16.5462 14.6647 16.6797 14.8926 16.7773C15.1204 16.875 15.3646 16.9238 15.625 16.9238C15.8854 16.9238 16.1296 16.875 16.3574 16.7773C16.5853 16.6797 16.7839 16.5462 16.9531 16.377C17.1224 16.2077 17.2559 16.0091 17.3535 15.7812C17.4512 15.5534 17.5 15.3092 17.5 15.0488ZM0 0.673828H20V2.8125L12.5 10.3125C12.4349 10.3776 12.3503 10.4525 12.2461 10.5371C12.1419 10.6217 12.028 10.7129 11.9043 10.8105C11.7806 10.9082 11.6602 10.9961 11.543 11.0742C11.4258 11.1523 11.3281 11.2272 11.25 11.2988V9.78516L18.75 2.28516V1.92383H1.25V2.28516L8.75 9.78516V16.9238H10.3418C10.4199 17.1452 10.5078 17.36 10.6055 17.5684C10.7031 17.7767 10.8171 17.9785 10.9473 18.1738H7.5V10.3125L0 2.8125V0.673828Z"
                    fill="#333333"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1021_934">
                    <rect
                      width="124"
                      height="18.6523"
                      fill="white"
                      transform="translate(0 0.673828)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <ul
              className="dropdown-menu
            "
              style={{
                minWidth: "8.7rem",
              }}
            >
              <li
                className=""
                style={{
                  borderBottom: "1px solid black",
                  paddingBottom: "5px",
                  paddingLeft: "7px",
                  cursor: "pointer",
                }}
              >
                <span className="">Action</span>
              </li>
              <li
                style={{
                  paddingLeft: "7px",
                  cursor: "pointer",
                }}
              >
                <span className="">Sort By Category</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
            <div className="table-responsive pay-table">
              <table className="table">
                <thead className="r-thed">
                  <tr className="text-center">
                    <th></th>
                    <th>S.No.</th>
                    <th>Date</th>
                    <th>Category</th>
                    <th>Product Name</th>
                    <th>Inquiry Details </th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td></td>
                    <td className="serial">01</td>
                    <td className="">16/11/2023</td>
                    <td className="">food & Beverage</td>
                    <td className="">Bars</td>
                    <td className="">
                      <button
                        onClick={() => setshowinquiryModal(true)}
                        className="show-enq text-green"
                      >
                        See Inquiry Details{" "}
                      </button>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr className="text-center">
                    <td></td>
                    <td className="serial">01</td>
                    <td className="">17/11/2023</td>
                    <td className="">Health & Fitness</td>
                    <td className="">Gyms</td>
                    <td className="">
                      <button
                        onClick={() => setshowinquiryModal(true)}
                        className="show-enq text-green"
                      >
                        See Inquiry Details{" "}
                      </button>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CustomerEnq;
