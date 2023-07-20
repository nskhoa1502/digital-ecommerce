import React, { useCallback, useEffect, useState } from "react";
import { Button, InputField } from "../../components";
import { apiForgotPassword, apiLogin, apiRegister } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../utils/path";
import { login, register } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../utils/helpers";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [invalidFields, setInvalidFields] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resetPayload = () => {
    setPayload({
      email: "",
      mobile: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    // console.log(data);
    console.log("invalid counter", invalids);

    try {
      if (isRegister) {
        const response = await apiRegister(payload);
        Swal.fire("Success", response.data.message, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
        dispatch(
          register({
            isLoggedIn: true,
            accessToken: response.data.accessToken,
            userData: response.data.userData,
          })
        );
      } else {
        const response = await apiLogin(data);
        Swal.fire("Success", response.data.message, "success");
        // console.log(response.data);
        dispatch(
          login({
            isLoggedIn: true,
            accessToken: response.data.accessToken,
            userData: response.data.userData,
          })
        );
        navigate(`/${path.HOME}`);
      }
    } catch (error) {
      console.error(error.response.data);
      Swal.fire(
        isRegister ? "Register failed" : "Login failed",
        error.response.data.message,
        "error"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(payload), isRegister]);
  const handleForgotPassword = async () => {
    try {
      const response = await apiForgotPassword({ email });
      // console.log(response);
      toast.success(response.data.message, {
        theme: "colored",
      });
      console.log(response);
      setIsForgotPassword(false);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message, { theme: "colored" });
      setIsForgotPassword(false);
    }
  };

  return (
    <div className="w-screen h-screen relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-20 bg-white py-8 flex items-center flex-col animate-slide-left">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] border-b pb-2 outline-none placeholder:text-sm px-4 py-2 "
              placeholder="Exp: email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-end items-center  w-full gap-5">
              <Button
                name={"Back"}
                handleOnClick={() => setIsForgotPassword(false)}
                fullWidth
                // eslint-disable-next-line react/style-prop-object
                style="px-4 py-2 rounded-md text-white bg-main text-semibold my-2 w-full"
              />
              <Button
                name={"Submit"}
                handleOnClick={handleForgotPassword}
                fullWidth
                // eslint-disable-next-line react/style-prop-object
                style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2 w-full"
              />
            </div>
          </div>
        </div>
      )}
      <img
        src="https://img.freepik.com/premium-vector/online-shopping-digital-technology-with-icon-blue-background-ecommerce-online-store-marketing_252172-219.jpg"
        alt=""
        className="w-full object-cover h-full"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 flex items-center justify-center">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]  w-1/2">
          <h1 className="text-[20px] font-semibold text-main mb-5">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <>
              <div className="flex items-center gap-2 w-full">
                <InputField
                  value={payload.firstname}
                  setValue={setPayload}
                  nameKey="firstname"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
                <InputField
                  value={payload.lastname}
                  setValue={setPayload}
                  nameKey="lastname"
                  invalidFields={invalidFields}
                  setInvalidFields={setInvalidFields}
                />
              </div>
              <InputField
                value={payload.mobile}
                setValue={setPayload}
                nameKey="mobile"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />

          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : `Login`}
            handleOnClick={handleSubmit}
            fullWidth
          />
          <div className="flex items-center justify-between my-2  w-full text-sm">
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
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
