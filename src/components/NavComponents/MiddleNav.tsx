import { useEffect, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import FirstModal from "./FirstModal";
import { FilterIcon, PostalIcon, SerachIcon } from "../../utils/SvgElements";
import { useForm } from "react-hook-form";
import { useServices } from "../../service/auth";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

interface serachVlue {
  searchQuery: string;
  postalCode: string;
  taxonomy: string | null;
}

const MiddleNav = () => {
  const [, setSearchParams] = useSearchParams();
  const location = useLocation().pathname;

  // console.log("location", location);

  const [showModal1, setShowModal1] = useState<boolean>(false);
  const [selectedCateogries, setselectedCateogries] = useState<string>("");
  const navigate = useNavigate();
  const { category, subCategory, SubSubCategory } = useServices();
  const { register, handleSubmit, reset } = useForm<serachVlue>();

  // const startSearchFunction = () => {
  //   setShowModal1(true);
  // };

  const pathnames = location.split("/").filter((x) => x);
  console.log(pathnames);

  function handelFormDubmit(formData: {
    searchQuery: string;
    postalCode: string;
    taxonomy: string | null;
  }) {
    if (!formData.searchQuery || !formData.postalCode) {
      formData["taxonomy"] = selectedCateogries;
    }

    if (formData.searchQuery || formData.postalCode) {
      setselectedCateogries("");
      formData["taxonomy"] = "";
    }

    if (!formData.taxonomy && !formData.searchQuery && !formData.postalCode) {
      toast.error("Please Enter a Serach Query");
      return;
    }
    const { taxonomy, searchQuery, postalCode } = formData;

    const SearchQuery = taxonomy || searchQuery || postalCode || "";

    if (pathnames.includes("details")) {
      reset();
      navigate(`${pathnames[0]}?serach=${SearchQuery}`);
      return;
    }

    setSearchParams({ serach: SearchQuery });
    reset();
  }

  function handleSelectedDropDown(service: string) {
    setselectedCateogries(service);
    // setDropdownOpen(true);
    const dropDown = document.getElementById("mainDorpwDoen");
    dropDown?.classList.remove("show");
  }

  // whenever location change rest the selectedDropDown
  useEffect(() => {
    setselectedCateogries("");
  }, [location]);

  // function to list the filter category

  function ListFilter(condition: string, service: any[]): JSX.Element | null {
    const filteredData = service.filter(
      (element) => element.subcategory_id === condition
    );

    let jsxElement = null;
    if (filteredData.length > 0) {
      jsxElement = (
        <ul className="dropdown-menu dropdown-submenu dropw_down_menu">
          {filteredData.map((subsubCatElement) => (
            <li
              key={subsubCatElement._id}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectedDropDown(subsubCatElement?.subSubCategoryName);
              }}
            >
              <span className="dropdown-item">
                {subsubCatElement?.subSubCategoryName}
              </span>
            </li>
          ))}
        </ul>
      );
    }

    return jsxElement;
  }

  return (
    <>
      <FirstModal showModal1={showModal1} setShowModal1={setShowModal1} />
      <div className="">
        <div className="nav_search">
          <form className="" onSubmit={handleSubmit(handelFormDubmit)}>
            <div className="search__input__conatiner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 20 20"
                fill="none"
                className="search_icon"
              >
                <path
                  d="M0 6.06682C0 9.13633 2.4972 11.6335 5.56671 11.6335C6.62565 11.6335 7.61637 11.3362 8.46005 10.8209C10.7564 13.7424 11.079 14.0652 11.1878 14.174L11.9999 14.9861C12.6853 15.6715 13.8005 15.6715 14.486 14.9861C14.8286 14.6434 15 14.1932 15 13.743C15 13.2929 14.8286 12.8427 14.486 12.5L13.6739 11.688C13.5657 11.5798 13.242 11.2562 10.3124 8.97352C10.8328 8.12694 11.1334 7.13138 11.1334 6.06682C11.1334 5.23041 10.9523 4.42604 10.5952 3.67609C10.456 3.3839 10.1064 3.25985 9.8142 3.39899C9.52201 3.53816 9.39787 3.88783 9.53712 4.17997C9.81871 4.7713 9.96148 5.40611 9.96148 6.06682C9.96148 8.4901 7.98999 10.4616 5.56671 10.4616C3.14343 10.4616 1.17194 8.4901 1.17194 6.06682C1.17194 3.64354 3.14343 1.67205 5.56671 1.67205C6.36044 1.67205 7.13802 1.88572 7.81537 2.29001C8.09324 2.45587 8.45299 2.36504 8.61885 2.08715C8.78471 1.80922 8.69388 1.44952 8.41599 1.28367C7.5571 0.771031 6.57185 0.500079 5.56671 0.500079C2.4972 0.500108 0 2.99733 0 6.06682ZM12.8452 12.5166L13.6573 13.3287C13.8857 13.5571 13.8857 13.9289 13.6573 14.1574C13.4288 14.3858 13.0571 14.3858 12.8286 14.1574L12.0166 13.3453C11.8714 13.2001 11.3354 12.5824 9.39069 10.1084C9.46142 10.0415 9.5305 9.97277 9.59765 9.90225C12.0852 11.8406 12.7013 12.3727 12.8452 12.5166ZM4.28479 3.10917C4.58167 2.98034 4.92674 3.11658 5.0556 3.41346C5.08856 3.4894 5.10415 3.56857 5.10415 3.64641C5.10415 3.87283 4.97219 4.08838 4.75128 4.18425C4.00077 4.50993 3.51582 5.24886 3.51582 6.06682C3.51582 6.39045 3.25348 6.65279 2.92985 6.65279C2.60622 6.65279 2.34388 6.39045 2.34388 6.06682C2.34388 4.78173 3.10573 3.62078 4.28479 3.10917Z"
                  fill="#353535"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by keywords"
                className="search__input"
                {...register("searchQuery")}
              />
            </div>
            {/* filter categroy div */}
            <div className="filter__conatiner d-none d-lg-block">
              {FilterIcon}
              {/* <span className="search__input">All Categories</span> */}
              <div className="search__input">
                <div className="dropdown">
                  <a
                    className="app-menu__item"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="true"
                    type="button"
                  >
                    <span className="app-menu__label__2">
                      {selectedCateogries
                        ? selectedCateogries
                        : "All Categories"}
                    </span>
                  </a>
                  <ul
                    className={`dropdown-menu dropw_down_menu`}
                    id="mainDorpwDoen"
                    aria-labelledby="dropdownMenuLink"
                  >
                    {category?.map((element: any) => (
                      <li
                        className="border_bottom"
                        key={element._id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectedDropDown(element.categoryName);
                        }}
                      >
                        <a className="dropdown-item">
                          <span>{element.categoryName}</span>
                          <AiOutlineRight />
                        </a>

                        <ul className="dropdown-menu dropdown-submenu dropw_down_menu">
                          {subCategory
                            .filter(
                              (subCatFilter: any) =>
                                subCatFilter.category_id === element._id
                            )
                            .map((subCateElement: any) => (
                              <li
                                key={subCateElement._id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectedDropDown(
                                    subCateElement.subCategoryName
                                  );
                                }}
                              >
                                <a className="dropdown-item custom_drop_down_item">
                                  {subCateElement.subCategoryName}
                                  <AiOutlineRight />
                                </a>

                                {/* multilevel drop down */}
                                {ListFilter(subCateElement._id, SubSubCategory)}
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="postal__input__container">
              {PostalIcon}
              <input
                type="text"
                className="postal__input"
                placeholder="Your postal code"
                {...register("postalCode")}
              />
            </div>
            <div className="searButoon_container">
              <button>
                <span className="searchbuttonText d-none d-lg-inline">
                  Search
                </span>
                {SerachIcon}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default MiddleNav;
