const API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
const REDIRECT_URI = "https://i8d205.p.ssafy.io/login/oauth2/code/kakao";

//export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
// export const KAKAO_AUTH_URL = `http://localhost:8080/api/oauth2/authorization/kakao`;
export const KAKAO_AUTH_URL = `https://i8d205.p.ssafy.io/api/oauth2/authorization/kakao`;
