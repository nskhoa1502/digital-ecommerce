import React, { memo } from "react";

const Countdown = ({ unit, number }) => {
  return (
    <div className="w-[30%] h-[60px] border border-black flex flex-col items-center justify-center bg-[#f4f4f4] rounded-sm">
      <span className="text-[18px] text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(Countdown);