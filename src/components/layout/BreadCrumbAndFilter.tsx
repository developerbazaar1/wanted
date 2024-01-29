import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import "../../css/ComponentsCSS/BreadCrumbAndFilter.css";

const breadNav = {
  backgroundColor: "#C9FFD3",
};

interface Breadcrumb {
  label: string;
  link: string;
}

const BreadCrumbAndFilter: React.FC = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
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

          {breadcrumbs?.length !== 1
            ? breadcrumbs.map((breadcrumb, index) => (
                <span key={index}>
                  {breadcrumb.link !== null ? (
                    <Link
                      to={
                        breadcrumb?.label === "service" ? "/" : breadcrumb.link
                      }
                      className="text-black text-capitalize"
                    >
                      {breadcrumb.label}
                    </Link>
                  ) : (
                    <span className="text-black text-capitalize">
                      {breadcrumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && " / "}
                </span>
              ))
            : ""}
        </div>
        <div className="d-none d-md-flex">&nbsp;</div>
        <div className="filterNav">
          <NavLink
            to="liveads"
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Live Ads
          </NavLink>
          <NavLink
            to="latestOppers"
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Latest Offers
          </NavLink>
          <NavLink
            to="/"
            // end
            className={pathstate?.includes("service") ? "active-nav-bg" : ""}
            style={({ isActive }) => (isActive ? breadNav : {})}
          >
            Services
          </NavLink>
          <NavLink
            to="all"
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
