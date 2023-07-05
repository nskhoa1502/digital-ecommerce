import React, { useState } from "react";
import { formatMoney, renderStarFromNumber } from "../utils/helpers";
import newLabel from "../assets/new.png";
import trendingLabel from "../assets/trending.png";
import { SelectOption } from "./";
import icons from "../utils/icons";
import { Link } from "react-router-dom";
import path from "../utils/path";

const { AiFillEye, FiMenu, BsFillSuitHeartFill } = icons;

const Product = ({ productData, isNew, pid }) => {
  const [isShowOption, setIsShowOption] = useState(false);

  return (
    <div className="w-full px-5  ">
      <Link
        to={`/${path.DETAIL_PRODUCT}/${productData?._id}/${productData?.title}`}
        className="w-full  py-[15px] flex flex-col items-center"
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsShowOption(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsShowOption(false);
        }}
      >
        <div className="w-full relative">
          {isShowOption && (
            <div className="absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2">
              <SelectOption icon={<AiFillEye />} />
              <SelectOption icon={<FiMenu />} />
              <SelectOption icon={<BsFillSuitHeartFill />} />
            </div>
          )}
          <img
            src={`${productData?.thumb} || https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg`}
            alt=""
            className="w-[274px] h-[274px] object-contain"
          />
          <img
            src={isNew ? newLabel : trendingLabel}
            alt=""
            className={`absolute top-0 right-0 h-[30px] w-[90px] object-cover`}
          />
        </div>
        <div className="flex flex-col gap-2 mt-[15px] items-start w-full">
          <span className="flex">
            {renderStarFromNumber(productData?.totalRatings)}
          </span>
          <span className="line-clamp-1">{productData?.title}</span>
          <span>{formatMoney(productData?.price)} VND</span>
        </div>
      </Link>
    </div>
  );
};

export default Product;
