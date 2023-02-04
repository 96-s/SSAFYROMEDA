import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    userNickname: "",
    userNo: "",
  },
  profileInfo: [],
  loading: false, // 로딩중
  isAuth: null, // 로그인 유무
  error: null, // 에러 유무
  user: null, // 유저 정보 저장
  isNickname: null, // 닉네임 설정 유무
  token: null, // 토큰 저장
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    // 닉네임 form 업데이트
    changeField(state, action) {
      const { value } = action.payload;
      state.register.userNickname = value;
    },
    reset(state) {
      Object.assign(state, initialAuthState);
    },

    // 토큰 및 유저번호 저장
    addTokenUserNo(state, action) {
      const { token, userNo } = action.payload;
      state.register.userNo = userNo;
      state.token = token;
      state.isAuth = true;
    },
    // 닉네임 설정
    createNicknameStart(state) {
      state.loading = true;
      state.error = null;
    },
    createNicknameSuccess(state, action) {
      state.loading = false;
      console.log("닉네임 성공?: ", action.payload); // 회원정보 등록 성공
      state.isNickname = true;
    },
    createNicknameError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // setUser
    setUser(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },

    // 로그인하며 회원정보 요청하기
    getUserInfoStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserInfoSuccess(state, action) {
      state.loading = false;
      console.log(action.payload);
      const {
        userEmail,
        userNickname,
        accessToken,
        historyPlayCount,
        historyWinCount,
        historyLoseCount,
      } = action.payload;
      state.user = {
        userEmail,
        userNickname,
        historyPlayCount,
        historyWinCount,
        historyLoseCount,
      };
      state.token = accessToken;
      state.isNickname = true;
    },
    getUserInfoError(state, action) {
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
    },
  },
  // 로그아웃을 위해 localStorage 초기화
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialAuthState);
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
