import axios from "axios";

export const customAxios = axios.create({
  baseURL: "https://i8d205.p.ssafy.io/api/",
  // baseURL: "http://192.168.100.66:8080/api/", 창민
  // baseURL: "http://192.168.100.139:8000/api/",
  // baseURL: "http://127.0.0.1:8080/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
