import axiosConfig from "../axiosConfig";

export const apiGetProducts = (params) =>
  axiosConfig({
    url: "/product",
    method: "get",
    params,
  });
