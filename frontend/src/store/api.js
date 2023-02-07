// Axios
import axios from "axios";
import { customAxios } from "./customAxios";

// const temp = localStorage.getItem("persist:root");
// const temp2 = JSON.parse(temp);
// const temp3 = JSON.parse(temp2.auth);
// const token = temp3.token;

const temp = localStorage.getItem("persist:root");
let token = "";

if (temp) {
  const temp2 = JSON.parse(temp);
  const temp3 = JSON.parse(temp2.auth);
  token = temp3.token;
}

// 회원가입 (닉네임 중복체크 및 등록)
export const createNicknameApi = async (user) =>
  await customAxios.post("users/signup", user, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

// 로그인 시 회원정보 get
export const getUserInfoApi = async (userno) =>
  await customAxios.get(`users/${userno}`, {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

// 로그아웃 요청
export const logoutRequestApi = async (userno) =>
  await customAxios.put(
    `users/signout/${userno}`,
    {},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    }
  );

// 방 생성 요청
export const createGameRoomApi = async (user) =>
  await customAxios.post("rooms", user, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

// 방 입장 요청
export const joinGameRoomApi = async (roomCode, user) =>
  await customAxios.post(`rooms/${roomCode}`, user, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });

// headers
// headers: {
//   "Content-Type": "application/json;charset=UTF-8",
//   Authorization: `Bearer ${token}`,
// },

// 회원정보 put
// export const updateUserApi = async (user) =>
//   await customAxios.put(`api/user/${userid}`, user, {
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });
