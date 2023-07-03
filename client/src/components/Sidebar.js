import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/thunks/appThunks";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="flex flex-col">
      {categories?.length > 0 &&
        categories?.map((el) => (
          <NavLink
            key={createSlug(el.title)}
            to={createSlug(el.title)}
            className={({ isActive }) =>
              isActive
                ? `bg-main text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main`
                : `px-5 pt-[15px] pb-[14px] text-sm hover:text-main`
            }
          >
            {el.title}
          </NavLink>
        ))}
    </div>
  );
};

export default Sidebar;
