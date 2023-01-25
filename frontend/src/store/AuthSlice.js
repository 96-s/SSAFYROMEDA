import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    nickname: "",
  },
  ProfileInfo: [],
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
    loginUserStart(state) {
      state.error = false;
      state.isAuth = false;
      state.loading = true;
    },
    loginUserSuccess(state, action) {
      state.loading = false;
      console.log("페이로드", action.payload);
      const { user, accessToken } = action.payload;
      console.log(user);
      // 토큰 로컬스토리지 저장 및 유저 상태 변경, 로그인 유무 변경
    },
    loginUserError(state, action) {
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;