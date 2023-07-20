import axiosConfig from "../axiosConfig";

export const apiRegister = (data) =>
  axiosConfig({
    url: "/user/register",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiLogin = (data) =>
  axiosConfig({
    url: "/user/login",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiForgotPassword = (data) =>
  axiosConfig({
    url: "/user/forgotpassword",
    method: "post",
    data,
    withCredentials: true,
  });
export const apiResetPassword = (data) =>
  axiosConfig({
    url: "/user/resetpassword",
    method: "put",
    data,
  });
