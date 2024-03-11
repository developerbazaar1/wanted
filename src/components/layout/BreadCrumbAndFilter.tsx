import React, { useEffect, useState } from "react";
import {
  // Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "../../css/ComponentsCSS/BreadCrumbAndFilter.css";
import { useForm } from "react-hook-form";
// import { SearchContext } from "../../features/searchContext";

const breadNav = {
  backgroundColor: "#C9FFD3",
};

interface Breadcrumb {
  label: string;
  link: string | null;
}

// const splitLink = (lable: string): string[] => {
//   const splitedlable = lable.split("-");
//   return splitedlable;
// };

interface priceFilterType {
  priceFilter: string;
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>;
  radiusFilter: string;
  setRadiusFilter: React.Dispatch<React.SetStateAction<string>>;
}

const BreadCrumbAndFilter = ({
  priceFilter,
  setPriceFilter,
  radiusFilter,
  setRadiusFilter,
}: priceFilterType) => {
  const { register, watch } = useForm();
  // const { updatetaxonomyFilterQuery } = useContext(SearchContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  // const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [pathstate, setPathstate] = useState<string[]>();

  const pathnames = location.pathname.split("/").filter((x) => x);

  //function to set set the filterPrice
  function handleSetFilter(filter: string) {
    // const newSearchParams = new URLSearchParams();

    setSearchParams((prev) => {
      prev.set("price", filter);
      return prev;
    });
    // console.log("Old serach Params", searchParams.toString());

    // Check if other search parameters exist
    // if (searchParams) {
    //   searchParams.forEach((value, key) => {
    //     newSearchParams.set(key, value);
    //   });
    //   newSearchParams.set("rahul", "kumar");
    // }

    // console.log("All other serach parmas", newSearchParams.toString());
    // return;
    setPriceFilter(filter);
    if (pathnames.includes("details")) {
      if (pathnames.includes("services")) {
        navigate(`/services/search?${searchParams.toString()}`);
        return;
      }
      navigate(`${pathnames[0]}?${searchParams.toString()}`);
      return;
    }

    if (pathnames.length === 0 || pathnames.includes("services")) {
      navigate(`/services/search?${searchParams.toString()}`);
      return;
    }
    setSearchParams((prev) => {
      prev.set("price", filter);
      return prev;
    });
  }

  useEffect(() => {
    if (watch("distance")) {
      setSearchParams((prev) => {
        prev.set("radius", watch("distance"));
        return prev;
      });

      setRadiusFilter(watch("distance"));

      if (pathnames.includes("details")) {
        if (pathnames.includes("services")) {
          navigate(`/services/search?${searchParams.toString()}`);
          return;
        }
        navigate(`${pathnames[0]}?${searchParams.toString()}`);
        return;
      }

      if (pathnames.length === 0 || pathnames.includes("services")) {
        navigate(`/services/search?${searchParams.toString()}`);
        return;
      }
      setSearchParams((prev) => {
        prev.set("radius", watch("distance"));
        return prev;
      });
    }
  }, [watch("distance")]);

  useEffect(() => {
    // console.log("path name", pathnames);
    setPathstate(pathnames);

    const breadcrumbArray: Breadcrumb[] = [];
    let path = "";
    pathnames.forEach((pathName, index) => {
      path += `/${pathName}`;
      const link = index === pathnames.length - 1 ? null : path;
      breadcrumbArray.push({
        label: decodeURIComponent(pathName.replace(/\+/g, " ")),
        link: link,
      });
    });

    setBreadcrumbs(breadcrumbArray);
  }, [location]);

  return (
    <div className="bread_filter_container">
      <div className="fileteAnBreadCrump">
        <div className=" bread_crumb_link  d-none d-md-flex">
          {/* {isHomeRoute ? (
            <span className="text-black">Home</span>
          ) : (
            <Link to="/" className="text-black">
              Home /
            </Link>
          )} */}

          {/* This is code for breadcrumbs */}
          {/* {breadcrumbs?.length !== 1
            ? breadcrumbs.map((breadcrumb, index) => (
                <span key={index}>
                  {breadcrumb.link !== null ? (
                    <Link
                      to={
                        breadcrumb?.label === "services" ? "/" : breadcrumb.link
                      }
                      state={{ reset: "resetSearch" }}
                      onClick={() => updatetaxonomyFilterQuery("")}
                      className="text-black text-capitalize"
                    >
                      {splitLink(breadcrumb.label)?.map(
                        (element) => element + " "
                      )}
                    </Link>
                  ) : (
                    <span className="text-black text-capitalize">
                      {splitLink(breadcrumb.label)?.map((element) => element)}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && " / "}
                </span>
              ))
            : ""} */}
          <div className="price-distance-filter-container">
            <div className="dropdown">
              <button
                className={`dropdown-toggle featured-filter-box`}
                type="button"
                id="priceFilter"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {priceFilter
                  ? priceFilter === "ascending"
                    ? "Low to High"
                    : "High to Low"
                  : "Price"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="priceFilter">
                <li>
                  <span
                    className="dropdown-item"
                    onClick={() => handleSetFilter("ascending")}
                  >
                    Price: Low to High
                  </span>
                </li>
                <li onClick={() => handleSetFilter("descending")}>
                  <span className="dropdown-item">Price: High to Low</span>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="featured-filter-box"
                type="button"
                id="distanceFilter"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {radiusFilter ? `${radiusFilter} mil` : "Distance"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="distanceFilter">
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="any"
                    value="any"
                    {...register("distance")}
                    name="distance"
                  />{" "}
                  <label htmlFor="any" aria-label="">
                    Any Distance
                  </label>
                </li>
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="1m"
                    value="1"
                    {...register("distance")}
                    name="distance"
                  />{" "}
                  <label htmlFor="1m" className="">
                    Within 1.0 mi
                  </label>
                </li>
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="5m"
                    {...register("distance")}
                    name="distance"
                    value="5"
                  />{" "}
                  <label htmlFor="5m" className="">
                    Within 5.0 mi
                  </label>
                </li>
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="10m"
                    {...register("distance")}
                    name="distance"
                    value="10"
                  />{" "}
                  <label htmlFor="10m" className="">
                    Within 10.0 mi
                  </label>
                </li>
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="20m"
                    {...register("distance")}
                    name="distance"
                    value="20"
                  />{" "}
                  <label htmlFor="20m" className="">
                    Within 20.0 mi
                  </label>
                </li>
                <li className="dropdown-item">
                  <input
                    type="radio"
                    id="50m"
                    {...register("distance")}
                    name="distance"
                    value="50"
                  />{" "}
                  <label htmlFor="50m" className="">
                    Within 50.0 mi
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="d-none d-md-flex">&nbsp;</div>
        <div className="filterNav">
          <NavLink
            to={`live-ads?${searchParams.toString()}`}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Live Ads
          </NavLink>

          <NavLink
            to={`latest-offers?${searchParams.toString()}`}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Latest Offers
          </NavLink>
          <NavLink
            to={`/?${searchParams.toString()}`}
            className={pathstate?.includes("services") ? "active-nav-bg" : ""}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Services
          </NavLink>
          <NavLink
            to={`all?${searchParams.toString()}`}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            All
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default BreadCrumbAndFilter;
