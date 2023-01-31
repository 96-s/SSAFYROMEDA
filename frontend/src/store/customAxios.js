import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://192.168.100.139:8080/",
  // baseURL: "https://i8d205.p.ssafy.io/api/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
