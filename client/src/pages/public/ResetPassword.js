import React, { useState } from "react";
import { Button } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
import path from "../../utils/path";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();
  //   console.log(token);

  const handleResetPassword = async () => {
    console.log({ password, token });
    try {
      const response = await apiResetPassword({ password, token });
      console.log(response.data.message, { theme: "colored" });
      navigate(`/${path.HOME}`);
    } catch (error) {
      console.error(error.response.data);
      toast.error(error.response.data.message, { theme: "colored" });
      //   navigate(`/${path.HOME}`);
    }
  };
  return (
    <>
      <div className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-white py-8 flex items-center flex-col">
        <div className="flex flex-col gap-4">
          <label htmlFor="password">Enter your new password:</label>
          <input
            type="password"
            id="password"
            className="w-[800px] border-b pb-2 outline-none placeholder:text-sm px-4 py-2 "
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end items-center  w-full gap-5">
            <Button
              name={"Submit"}
              handleOnClick={handleResetPassword}
              fullWidth
              // eslint-disable-next-line react/style-prop-object
              style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
