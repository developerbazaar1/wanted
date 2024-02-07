// import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../service/auth";
import { useContext } from "react";
import { SearchContext } from "../../features/searchContext";
const UserProfile = () => {
  const { user } = useAuth();
  const { updatetaxonomyFilterQuery } = useContext(SearchContext);
  // console.log(user);

  return (
    <>
      <div>
        <Link
          to="/profile"
          onClick={() => {
            updatetaxonomyFilterQuery("");
          }}
          state={{ reset: "resetSearch" }}
          className="user__profile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <g clipPath="url(#clip0_1967_211)">
              <path
                d="M10.2618 7.20327C11.2216 6.50328 11.8466 5.37043 11.8466 4.0942C11.8466 1.97343 10.1212 0.248047 8.00044 0.248047C5.87967 0.248047 4.15429 1.97343 4.15429 4.0942C4.15429 5.37043 4.77928 6.50328 5.7391 7.20327C3.35316 8.11631 1.6543 10.4296 1.6543 13.1327C1.6543 14.2991 2.60325 15.248 3.76968 15.248H12.2312C13.3976 15.248 14.3466 14.2991 14.3466 13.1327C14.3466 10.4296 12.6477 8.11631 10.2618 7.20327ZM5.30814 4.0942C5.30814 2.60967 6.51591 1.4019 8.00044 1.4019C9.48497 1.4019 10.6927 2.60967 10.6927 4.0942C10.6927 5.57873 9.48497 6.78652 8.00044 6.78652C6.51591 6.78652 5.30814 5.57873 5.30814 4.0942ZM12.2312 14.0942H3.76968C3.23949 14.0942 2.80815 13.6629 2.80815 13.1326C2.80815 10.2696 5.13737 7.94032 8.00047 7.94032C10.8636 7.94032 13.1928 10.2695 13.1928 13.1326C13.1928 13.6629 12.7614 14.0942 12.2312 14.0942Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1967_211">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0.5 0.248047)"
                />
              </clipPath>
            </defs>
          </svg>
          <div>{user?.userName}</div>
        </Link>
      </div>
    </>
  );
};

export default UserProfile;
