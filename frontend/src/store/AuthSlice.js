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
    // form 업데이트
    changeField(state, action) {
      const { form, key, value } = action.payload;
      state[form][key] = value;
    },
    // 로그인
    kakaoLoginStart(state) {
      state.error = false;
      state.isAuth = false;
      state.loading = true;
    },
    kakaoLoginSuccess(state, action) {
      state.loading = false;
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
