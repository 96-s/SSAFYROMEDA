import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    userNickname: "",
    userEmail: "",
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

    // 토큰 및 이메일 저장
    addTokenEmail(state, action) {
      const { token, userEmail } = action.payload;
      state.register.userEmail = userEmail;
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
      console.log("토큰?: ", action.payload); // 응답(토큰, 유저 정보)가 잘 넘어왔는지 확인
      const { userEmail, userNickname, accessToken } = action.payload;
      console.log(userNickname); // 유저정보 확인
      //const { nickname, email } = user;
      // 토큰 및 유저정보 저장
      state.user = { userEmail, userNickname };
      state.token = accessToken;
      state.isNickname = true;
    },
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
    getUserSuccess(state, action) {
      console.log(action.payload);
      const user = action.payload;
      // console.log(user);
      const { userId, email, name, nickname, profileImgNum } = user;
      state.user = { userId, email, name, nickname, profileImgNum };
      localStorage.setItem("user", JSON.stringify(state.user));
      state.loading = false;
    },
    getUserError(state, action) {
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
