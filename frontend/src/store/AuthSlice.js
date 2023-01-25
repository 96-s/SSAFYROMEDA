import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    nickname: "",
  },
  profileInfo: [],
  loading: false, // 로딩중
  isAuth: null, // 로그인 유무
  error: null, // 에러 유무
  user: null, // 유저 정보 저장
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // 닉네임 form 업데이트
    changeField(state, action) {
      state.register.nickname = action.payload;
      console.log(state.register.nickname);
    },
    // 로그인
    kakaoLoginStart(state) {
      state.error = false;
      state.isAuth = false;
      state.loading = true;
    },
    kakaoLoginSuccess(state, action) {
      state.loading = false;
      // 백서버에 code를 전송 (code가 어디 담겼는지 확인필요)
      console.log("페이로드", action.payload);
      const { user, accessToken } = action.payload;
      console.log(user);
      // 토큰 로컬스토리지 저장 및 유저 상태 변경, 로그인 유무 변경
    },
    kakaoLoginError(state, action) {
      state.loading = false;
      state.isAuth = false;
      state.error = action.payload;
    },
    // 닉네임 설정
    createNicknameStart(state) {
      state.loading = true;
      state.error = null;
    },
    // reset?
    createNicknameError(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
    // setUser
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    // logout
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Object.assign(state, initialAuthState); // 초기화
    },
    getUser(state) {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess(state, action){
      console.log(action.payload);
      const user = action.payload;
      // console.log(user);
      const { userId, email, name, nickname, profileImgNum } = user;
      state.user = { userId, email, name, nickname, profileImgNum };
      localStorage.setItem('user', JSON.stringify(state.user));
      state.loading = false;
    },
    getUserError(state, action){
      state.loading = false;
      state.error = action.payload.error;
    },
    // GET user game info(프로필용)
    getUserProfileInfoStart(state) {
      state.loading = true;
      state.error = null;
    },
    // getUserProfile Success
    getUserProfileInfoSuccess(state, action) {
      state.loading = false;
      state.profileInfo = action.payload.userGameInfo;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
