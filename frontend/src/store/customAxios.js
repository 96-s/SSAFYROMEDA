import axios from "axios";

export const customAxios = axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "http://i8d205.p.ssafy.io:80/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});
