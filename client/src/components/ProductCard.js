import React from "react";
import { formatMoney, renderStarFromNumber } from "../utils/helpers";

const ProductCard = ({ price, title, totalRatings, img }) => {
  return (
    <div className="w-1/3 flex-auto mb-[20px] ">
      <div className="border flex mx-[10px]  ">
        <img src={img} alt="products" className="w-[90px] object-contain p-4" />
        <div className="flex flex-col gap-2 mt-[15px] items-start w-full text-xs">
          <span className="line-clamp-1 capitalize text-sm">
            {title?.toLowerCase()}
          </span>
          <span className="flex">{renderStarFromNumber(totalRatings)}</span>
          <span>{formatMoney(price)} VND</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
