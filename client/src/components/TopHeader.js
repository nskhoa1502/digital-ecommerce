import React, { memo } from "react";
import { Link } from "react-router-dom";
import path from "../utils/path";

const TopHeader = () => {
  return (
    <div className="h-[50px] bg-main w-full flex items-center justify-center">
      <div className="w-main flex items-center justify-between text-white">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link className="hover:text-gray-800" to={path.LOGIN}>
          Sign In or Create Account
        </Link>
      </div>
    </div>
  );
};

export default memo(TopHeader);