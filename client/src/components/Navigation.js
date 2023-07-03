import React from "react";
import { navigation } from "../utils/constant";
import { NavLink } from "react-router-dom";

// const notActivedStyle =

const Navigation = () => {
  return (
    <div className="mb-6 py-2 w-main h-[48px] text-sm  flex items-center">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "pr-12 hover:text-main text-main"
              : "pr-12 hover:text-main"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navigation;
