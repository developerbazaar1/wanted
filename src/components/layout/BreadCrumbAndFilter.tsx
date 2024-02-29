import React, { useEffect, useState } from "react";
import {
  // Link,
  NavLink,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import "../../css/ComponentsCSS/BreadCrumbAndFilter.css";
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

const BreadCrumbAndFilter: React.FC = () => {
  // const { updatetaxonomyFilterQuery } = useContext(SearchContext);
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  // const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [pathstate, setPathstate] = useState<string[]>();

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
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
            <div className="btn-group">
              <button
                type="button"
                className="dropdown-toggle featured-filter-box"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Price
              </button>
              <ul className="dropdown-menu">
                <li>
                  <span className="dropdown-item">Price: Low to High</span>
                </li>
                <li>
                  <span className="dropdown-item">Price: High to Low</span>
                </li>
              </ul>
            </div>
            <button className="featured-filter-box">Distance</button>
          </div>
        </div>
        <div className="d-none d-md-flex">&nbsp;</div>
        <div className="filterNav">
          <NavLink
            to={`live-ads${
              searchParams.get("search")
                ? `?search=${searchParams.get("search")}`
                : ""
            }${
              searchParams.get("location")
                ? `${
                    searchParams.get("search") ? "&" : "?"
                  }location=${searchParams.get("location")}`
                : ""
            }`}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Live Ads
          </NavLink>

          <NavLink
            to={`latest-offers${
              searchParams.get("search")
                ? `?search=${searchParams.get("search")}`
                : ""
            }${
              searchParams.get("location")
                ? `${
                    searchParams.get("search") ? "&" : "?"
                  }location=${searchParams.get("location")}`
                : ""
            }`}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Latest Offers
          </NavLink>
          <NavLink
            to={`/${
              searchParams.get("search")
                ? `?search=${searchParams.get("search")}`
                : ""
            }${
              searchParams.get("location")
                ? `${
                    searchParams.get("search") ? "&" : "?"
                  }location=${searchParams.get("location")}`
                : ""
            }`}
            className={pathstate?.includes("services") ? "active-nav-bg" : ""}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Services
          </NavLink>
          <NavLink
            to={`all${
              searchParams.get("search")
                ? `?search=${searchParams.get("search")}`
                : ""
            }${
              searchParams.get("location")
                ? `${
                    searchParams.get("search") ? "&" : "?"
                  }location=${searchParams.get("location")}`
                : ""
            }`}
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
