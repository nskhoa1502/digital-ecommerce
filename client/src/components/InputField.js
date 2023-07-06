import React, { useState } from "react";

const InputField = ({ value, setValue, nameKey, type }) => {
  return (
    <div className="w-full relative">
      {value?.trim() !== "" && (
        <label
          className="text-[10px] absolute top-0 left-[12px] block bg-white px-1 animate-slide-top-sm"
          htmlFor={nameKey}
        >
          {nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        </label>
      )}
      <input
        type={type || "text"}
        name={nameKey}
        id={nameKey}
        className="outline-none px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic"
        placeholder={nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
      />
    </div>
  );
};

export default InputField;
