// Axios
import axios from "axios";
import { customAxios } from "./customAxios";
import { BASE_URL } from 'store';
import { setToken } from 'store';

// 카카오 로그인
// 인가 코드 백엔드에 넘기기
export const kakaoLoginApi = async (code) =>
  await customAxios.get(`/login/oauth2/code/kakao?code=${code}`);

// 회원정보 get
// export const getUserApi = async () =>
//     const userid = localStorage.userid
//     await customAxios.get(`api/users/${userid}`, {
//         headers: {
//             'Content-Type': 'application/json;charset=UTF-8',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//         }
// })

export const getUserApi = ({ userid }) =>
  axios({
    method: "get",
    url: `${BASE_URL}/user/${userid}`,
    headers: {
      ...setToken(),
    },
  });

// 회원정보 put
// export const updateUserApi = async (user) =>
//   await customAxios.put(`api/user/${userid}`, user, {
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8',
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   });

export const updateUserApi = ({ userid, nickname }) =>
  axios({
    method: "put",
    url: `${BASE_URL}/user/${userid}`,
    data: {
      nickname,
    },
    headers: {
      ...setToken(),
    },
  });

// 탈출일지 불러오기
export const getHistoryApi = ({ userid, boarding, win, lose }) =>
  axios({
    method: "get",
    url: `${BASE_URL}/user/history/${userid}`,
    data: {
      boarding,
      win,
      lose,
    },
  });

// 사진 불러오기
export const getPhotoApi = ({
  userid,
  photo1,
  photo2,
  photo3,
  photo4,
  photo5,
}) =>
  axios({
    method: "get",
    url: `${BASE_URL}/user/photo/${userid}`,
    data: {
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
    },
  });
