// import React from "react";
import TopNav from "../TopNav";
import { Outlet } from "react-router-dom";

const TopLayout = () => {
  return (
    <div>
      <TopNav />
      <Outlet />
    </div>
  );
};

export default TopLayout;
