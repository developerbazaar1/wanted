import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import FirstModal from "./FirstModal";
import {
  FilterIcon,
  PostalIcon,
  PostalIconForTypeahead,
  SerachIcon,
} from "../../utils/SvgElements";
import { useForm } from "react-hook-form";
import { useServices } from "../../service/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { showArrowCheck } from "../../utils/CastintoFormData";
import { SearchContext } from "../../features/searchContext";
import { GoogleAPI } from "../../config/AxiosUtils";

interface serachVlue {
  searchQuery: string;
  postalCode: string;
  taxonomy: string;
}

const MiddleNav = () => {
  const [, setSearchParams] = useSearchParams();

  const [locTypeAhead, setLocTypeAhead] = useState([]);
  const [queryTypeAheadstate, setQueryTypeAhead] = useState([]);
  const location = useLocation().pathname;
  const state = useLocation()?.state;
  const selectRef = useRef<HTMLDivElement | null>(null);
  const selectLocAheadRef = useRef<HTMLDivElement | null>(null);
  const [activeTypeAhead, setActiveTypeAhead] = useState(false);
  const [activeLocationAhead, setActiveLocationAhead] = useState(false);

  const { taxonomyFilter, updatetaxonomyFilterQuery } =
    useContext(SearchContext);

  const [showModal1, setShowModal1] = useState<boolean>(false);
  const navigate = useNavigate();
  const { category, subCategory, SubSubCategory } = useServices();
  const { register, handleSubmit, setValue, reset, watch } =
    useForm<serachVlue>();

  const pathnames = location.split("/").filter((x) => x);

  function handelFormDubmit(formData: {
    searchQuery: string;
    postalCode: string;
  }) {
    if (!formData.searchQuery && !formData.postalCode && !taxonomyFilter) {
      formData.postalCode = "UK";
      setValue("postalCode", "London,   UK");
    }

    // console.log(formData);

    const { searchQuery, postalCode } = formData;

    // redirect user to there home page when serach is submit from details Page.

    if (pathnames.includes("details")) {
      if (pathnames.includes("services")) {
        navigate(
          `/services/search?search=${searchQuery || ""}&location=${
            postalCode || ""
          }`
        );
        return;
      }
      navigate(
        `${pathnames[0]}?search=${searchQuery || ""}&location=${
          postalCode || ""
        }`
      );
      return;
    }

    if (pathnames.length === 0 || pathnames.includes("services")) {
      navigate(
        `/services/search?search=${searchQuery || ""}&location=${
          postalCode || ""
        }`
      );
      return;
    }

    const SearchObject: any = {};
    if (searchQuery) {
      SearchObject["search"] = searchQuery;
    }
    if (postalCode) {
      SearchObject["location"] = postalCode;
    }
    setSearchParams(SearchObject);
  }

  function handleSelectedDropDown(service: string) {
    updatetaxonomyFilterQuery(service);
    const dropDown = document.getElementById("mainDorpwDoen");
    dropDown?.classList.remove("show");
    if (pathnames.length === 0 || pathnames.includes(`services`)) {
      navigate(`/services/search`);
    }
  }

  useEffect(() => {
    // function to set the filtre category and sub-category based on selected category
    /**
     * reset the form when user click on the logo
     */
    if (state?.reset) {
      reset();
    }

    if (pathnames.includes("services")) {
      // when path name include search do not reset the category
      if (pathnames.includes("search")) {
        return;
      }
      if (pathnames.length > 2) {
        updatetaxonomyFilterQuery(
          decodeURIComponent(pathnames[2].replace(/\+/g, " "))
        );
      } else {
        updatetaxonomyFilterQuery(
          decodeURIComponent(pathnames[1].replace(/\+/g, " "))
        );
      }
    }
  }, [location]);

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

  //  function to set the  location value after selecting
  const setSelectedLocation = (value: any) => {
    setValue("postalCode", value);
    setActiveLocationAhead(false);
  };

  //function that active type on focuse
  const handleInputFocus = () => {
    setActiveTypeAhead(true);
  };
  const handleLocationTypeAhead = () => {
    setActiveLocationAhead(true);
  };

  //function to fetch the type-ahead-result
  const fetchquerytypeAhead = async () => {
    try {
      const response = await GoogleAPI.queryTypeAhead(
        watch("searchQuery") || ""
      );
      console.log("this is query type-ahead", response.data.predections);
      setQueryTypeAhead(response.data.predections);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchquerytypeAhead();
  }, [watch("searchQuery")]);
  //function to fetch the type-ahead-result
  const FetchLocationTypeAhead = async () => {
    try {
      const response = await GoogleAPI.locationTypeAhead(
        watch("postalCode") || ""
      );
      console.log(response.data);
      setLocTypeAhead(response?.data?.predictions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchLocationTypeAhead();
  }, [watch("postalCode")]);

  useEffect(() => {
    // Function to handle clicks outside the postal__input__container
    function handleClickOutside(event: MouseEvent) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setActiveTypeAhead(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the postal__input__container
    function handleClickOutsideOfLocation(event: MouseEvent) {
      if (
        selectLocAheadRef.current &&
        !selectLocAheadRef.current.contains(event.target as Node)
      ) {
        setActiveLocationAhead(false);
        false;
      }
    }
    document.addEventListener("click", handleClickOutsideOfLocation);
    return () => {
      document.removeEventListener("click", handleClickOutsideOfLocation);
    };
  }, []);

  return (
    <>
      <FirstModal showModal1={showModal1} setShowModal1={setShowModal1} />
      <div className="">
        <div className="nav_search">
          <form className="" onSubmit={handleSubmit(handelFormDubmit)}>
            <div
              className="search__input__conatiner position-relative"
              ref={selectRef}
            >
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
                type="search"
                placeholder="Search by keywords"
                className="search__input"
                autoComplete="off"
                onFocus={handleInputFocus}
                {...register("searchQuery")}
              />

              {activeTypeAhead && queryTypeAheadstate?.length > 0 && (
                <div className={`location-ahead-container`}>
                  <ul className="type-ahead-options">
                    {queryTypeAheadstate?.map((queryTypeAhead: any) => (
                      <li
                        className="type-ahead-option"
                        key={queryTypeAhead?._id}
                        onClick={() => {
                          setValue("searchQuery", queryTypeAhead.name);
                          setActiveTypeAhead(false);
                        }}
                      >
                        <span className="icon icon--medium icon--beacon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 20 20"
                            fill="none"
                            className=""
                          >
                            <path
                              d="M0 6.06682C0 9.13633 2.4972 11.6335 5.56671 11.6335C6.62565 11.6335 7.61637 11.3362 8.46005 10.8209C10.7564 13.7424 11.079 14.0652 11.1878 14.174L11.9999 14.9861C12.6853 15.6715 13.8005 15.6715 14.486 14.9861C14.8286 14.6434 15 14.1932 15 13.743C15 13.2929 14.8286 12.8427 14.486 12.5L13.6739 11.688C13.5657 11.5798 13.242 11.2562 10.3124 8.97352C10.8328 8.12694 11.1334 7.13138 11.1334 6.06682C11.1334 5.23041 10.9523 4.42604 10.5952 3.67609C10.456 3.3839 10.1064 3.25985 9.8142 3.39899C9.52201 3.53816 9.39787 3.88783 9.53712 4.17997C9.81871 4.7713 9.96148 5.40611 9.96148 6.06682C9.96148 8.4901 7.98999 10.4616 5.56671 10.4616C3.14343 10.4616 1.17194 8.4901 1.17194 6.06682C1.17194 3.64354 3.14343 1.67205 5.56671 1.67205C6.36044 1.67205 7.13802 1.88572 7.81537 2.29001C8.09324 2.45587 8.45299 2.36504 8.61885 2.08715C8.78471 1.80922 8.69388 1.44952 8.41599 1.28367C7.5571 0.771031 6.57185 0.500079 5.56671 0.500079C2.4972 0.500108 0 2.99733 0 6.06682ZM12.8452 12.5166L13.6573 13.3287C13.8857 13.5571 13.8857 13.9289 13.6573 14.1574C13.4288 14.3858 13.0571 14.3858 12.8286 14.1574L12.0166 13.3453C11.8714 13.2001 11.3354 12.5824 9.39069 10.1084C9.46142 10.0415 9.5305 9.97277 9.59765 9.90225C12.0852 11.8406 12.7013 12.3727 12.8452 12.5166ZM4.28479 3.10917C4.58167 2.98034 4.92674 3.11658 5.0556 3.41346C5.08856 3.4894 5.10415 3.56857 5.10415 3.64641C5.10415 3.87283 4.97219 4.08838 4.75128 4.18425C4.00077 4.50993 3.51582 5.24886 3.51582 6.06682C3.51582 6.39045 3.25348 6.65279 2.92985 6.65279C2.60622 6.65279 2.34388 6.39045 2.34388 6.06682C2.34388 4.78173 3.10573 3.62078 4.28479 3.10917Z"
                              fill="#353535"
                            />
                          </svg>
                        </span>

                        <div className="text-part-container">
                          <div className="keyword-highlight-text-wrapper type-ahead-option-primary-text">
                            <span className="type-ahead-option-highlight">
                              {queryTypeAhead.name}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
                      {taxonomyFilter ? (
                        <span className="text-danger">{taxonomyFilter}</span>
                      ) : (
                        "All Categories"
                      )}
                    </span>
                  </a>
                  <ul
                    className={`dropdown-menu dropw_down_menu dropw_down_menu_border`}
                    id="mainDorpwDoen"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li
                      className="border_bottom"
                      onClick={() => handleSelectedDropDown("")}
                    >
                      <a className="dropdown-item">
                        <span>{"All Categories"}</span>
                      </a>
                    </li>
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
                          {/* show the arrow only if the child exist */}
                          {showArrowCheck(element._id, subCategory, "Cat") ? (
                            <AiOutlineRight />
                          ) : (
                            ""
                          )}
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

                                  {showArrowCheck(
                                    subCateElement._id,
                                    SubSubCategory,
                                    "subCat"
                                  ) ? (
                                    <AiOutlineRight />
                                  ) : (
                                    ""
                                  )}
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
            <div className="postal__input__container" ref={selectLocAheadRef}>
              {PostalIcon}
              <input
                type="search"
                id="mobilesearch"
                className="postal__input"
                placeholder="Your postal code"
                autoComplete="off"
                aria-label="Search"
                onFocus={handleLocationTypeAhead}
                {...register("postalCode")}
              />

              {activeLocationAhead && locTypeAhead?.length > 0 && (
                <div className={`location-ahead-container`}>
                  <ul className="type-ahead-options">
                    {locTypeAhead?.map((typeAhead: any) => (
                      <li
                        className="type-ahead-option"
                        key={typeAhead?.place_id}
                        onClick={() =>
                          setSelectedLocation(typeAhead?.description)
                        }
                      >
                        <span className="icon icon--medium icon--beacon">
                          {PostalIconForTypeahead}
                        </span>

                        <div className="text-part-container">
                          <div className="keyword-highlight-text-wrapper type-ahead-option-primary-text">
                            <span className="type-ahead-option-highlight">
                              {typeAhead?.description}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
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
      {/* <form className="d-flex flex-row position-relative">
        <input
          type="search"
          className="form-control"
          id="example-search-input"
        />

        <button
          className="btn btn-outline-success border-0 position-absolute end-0"
          type="submit"
        >
          <i className="fa fa-search pointer" role="button"></i>
        </button>
      </form> */}
    </>
  );
};

export default MiddleNav;
