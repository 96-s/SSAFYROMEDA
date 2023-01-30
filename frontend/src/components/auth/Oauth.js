const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "http://localhost:3000/login/oauth2/code/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// export const KAKAO_AUTH_URL =
//   "http://localhost:3000/oauth2/authorization/kakao";
