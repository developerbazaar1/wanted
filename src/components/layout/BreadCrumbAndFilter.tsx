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

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbArray: Breadcrumb[] = [];
    let path = "";

    pathnames.forEach((pathName) => {
      path += `/${pathName}`;
      breadcrumbArray.push({
        label: pathName,
        link: path,
      });
    });

    setBreadcrumbs(breadcrumbArray);
  }, [location]);

  const isHomeRoute = location.pathname === "/";

  return (
    <div className="bread_filter_container">
      <div className="fileteAnBreadCrump">
        <div className="d-flex bread_crumb_link">
          {isHomeRoute ? (
            <Link to="/" className="text-black">
              Home
            </Link>
          ) : (
            <Link to="/" className="text-black">
              Home /
            </Link>
          )}
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index}>
              <Link to={breadcrumb.link} className="text-black">
                {breadcrumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && " / "}
            </span>
          ))}
        </div>
        <div className="d-flex">&nbsp;</div>
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
