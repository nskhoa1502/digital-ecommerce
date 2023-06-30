import React from "react";
import { Banner, Sidebar } from "../../components";

const Home = () => {
  return (
    <div className="w-main flex">
      <div className="flex flex-col gap-5 w-[30%] border border-black">
        <Sidebar />
        <span>Deal daily</span>
      </div>
      <div className="flex flex-col gap-5 pl-5 w-[70%] flex-auto border border-red-500">
        <Banner />
        <span>Best Seller</span>
      </div>
    </div>
  );
};

export default Home;
