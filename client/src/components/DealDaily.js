import React, { useEffect, useState } from "react";
import icons from "../utils/icons";
import { apiGetProducts } from "../apis/product";
import {
  formatMoney,
  renderStarFromNumber,
  secondsToHms,
} from "../utils/helpers";
import { Countdown } from "./";
import moment from "moment";
const { AiFillStar, FiMenu } = icons;

const DealDaily = () => {
  const [dealDaily, setDealDaily] = useState(null);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expireTime, setExpireTime] = useState(false);
  let idInterval;
  const fetchDealDaily = async () => {
    try {
      const response = await apiGetProducts({
        limit: 1,
        page: Math.round(Math.random() * 10),
        totalRatings: 5,
      });
      // console.log(response?.data);
      setDealDaily(response?.data?.response[0]);

      const today = `${moment().format("MM/DD/YYYY")} 5:00:00`;
      const seconds =
        new Date(today).getTime() - new Date().getTime() + 24 * 3600 * 1000;
      const number = secondsToHms(seconds);
      setHour(number.h);
      setMinute(number.m);
      setSecond(number.s);
    } catch (error) {
      console.error(error?.response?.data || "Could not connect to server");
    }
  };
  useEffect(() => {
    fetchDealDaily();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond((prev) => prev - 1);
      } else {
        if (minute > 0) {
          setMinute((prev) => prev - 1);
          setSecond(60);
        } else {
          if (hour > 0) {
            setHour((prev) => prev - 1);
            setMinute(59);
            setSecond(60);
          } else {
            setExpireTime(!expireTime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second, minute, hour, expireTime]);

  useEffect(() => {
    clearInterval(idInterval);
    fetchDealDaily();
  }, [expireTime, idInterval]);
  return (
    <div className="w-full flex-auto">
      <h3 className="flex items-center justify-between ">
        <span className="flex-1 flex items-center justify-center">
          <AiFillStar color="red" />
        </span>
        <span className="flex-8 font-semibold text-[20px] text-center">
          DEAL DAILY
        </span>
        <span className="flex-1"></span>
      </h3>
      <div className="w-full flex flex-col items-center pt-4">
        <img
          src={`${dealDaily?.thumb} || https://tracerproducts.com/wp-content/uploads/2019/12/Product-Image-Coming-Soon.jpg`}
          alt=""
          className="w-full object-contain"
        />
        <div className="flex flex-col gap-2 mt-[15px] items-center w-full">
          <span className="flex ">
            {renderStarFromNumber(dealDaily?.totalRatings, 20)}
          </span>
          <span className="line-clamp-1 text-center">{dealDaily?.title}</span>
          <span>{formatMoney(dealDaily?.price)} VND</span>
        </div>
      </div>
      <div className="px-4 mt-4">
        <div className="flex justify-center gap-2 items-center mb-4">
          <Countdown unit={"Hours"} number={hour} />
          <Countdown unit={"Minutes"} number={minute} />
          <Countdown unit={"Seconds"} number={second} />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2"
        >
          <FiMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default DealDaily;
