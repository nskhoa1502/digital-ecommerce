import React from "react";
import icons from "../utils/icons";

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full ">
      <div className="h-[103px] bg-main w-full flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO NEWSLETTER
            </span>
            <small className="text-[13px] text-gray-300">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <input
              type="text"
              name=""
              id=""
              className="placeholder:text-sm placeholder:text-black placeholder:italic placeholder:opacity-50 px-5 py-4 rounded-l-full  bg-white outline-none text-black w-full"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-white rounded-r-full flex items-center justify-center pr-4">
              <MdEmail size={20} color="red" />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] bg-gray-800 w-full flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex ">
          <div className="flex-2 flex flex-col gap-3">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address:</span>
              <span className="opacity-70">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </span>
            <span>
              <span>Phone:</span>
              <span className="opacity-70">(+1234)56789xxx</span>
            </span>
            <span>
              <span>Mail:</span>
              <span className="opacity-70">tadathemes@gmail.com</span>
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="mb-[20px] text-[15px] font-medium border-l border-main pl-[15px]">
              #DIGITALWORDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
