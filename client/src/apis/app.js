import axiosConfig from "../axiosConfig";

export const apiGetCategory = () =>
  axiosConfig({
    url: "/prodCategory",
    method: "get",
  });
