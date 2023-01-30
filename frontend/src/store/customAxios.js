import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://192.168.100.139/",
  // baseURL: "http://i8d205.p.ssafy.io:80/api/v1",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
