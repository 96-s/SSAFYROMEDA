import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://127.0.0.1:8080/",
  // baseURL: "https://i8d205.p.ssafy.io/api/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
