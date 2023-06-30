import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navigation, Sidebar, Banner } from "../../components";

const Public = () => {
  return (
    <div className="w-full  border border-blue-500 flex flex-col items-center justify-start  h-screen">
      <Header />
      <Navigation />
      <div className="w-main ">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
