import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import path from "../utils/path";
import icons from "../utils/icons";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;

const Header = () => {
  return (
    <div className=" h-[110px] py-[35px] w-main flex items-center justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex text-[13px]">
        <div className="flex flex-col items-center px-6 border-r border-black">
          <span className="flex gap-1 items-center">
            <RiPhoneFill color="red" />
            <span className="font-semibold">(+1800) 000 8808</span>
          </span>
          <span>Mon-Sat 9:00AM - 8:00PM</span>
        </div>
        <div className="flex flex-col items-center px-6 border-r border-black">
          <span className="flex gap-1  items-center">
            <MdEmail color="red" />
            <span>SUPPORT@TADATHEMES.COM</span>
          </span>
          <span>Online Support 24/7</span>
        </div>

        <div className="flex items-center justify-center gap-2 px-6 border-r border-black">
          <BsHandbagFill color="red" />
          <span>0 item(s)</span>
        </div>
        <div className="flex items-center justify-center px-6 ">
          <FaUserCircle size={24} />
        </div>
      </div>
    </div>
  );
};

export default Header;
