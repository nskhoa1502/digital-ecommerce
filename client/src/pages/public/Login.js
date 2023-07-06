import React, { useCallback, useEffect, useState } from "react";
import { Button, InputField } from "../../components";
import { apiLogin, apiRegister } from "../../apis/user";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, ...data } = payload;
    try {
      if (isRegister) {
        console.log(payload);
        const response = await apiRegister(payload);
        console.log(response);
      } else {
        const response = await apiLogin(data);
        console.log(response);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  }, [JSON.stringify(payload)]);

  useEffect(() => {
    setPayload({ email: "", password: "", firstname: "", lastname: "" });
  }, [isRegister]);
  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg"
        alt=""
        className="w-full object-cover h-full"
      />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]  w-1/2">
          <h1 className="text-[20px] font-semibold text-main mb-5">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Register" : `Login`}
            handleOnClick={handleSubmit}
            fullWidth
          />
          <div className="flex items-center justify-between my-2  w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go to Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
