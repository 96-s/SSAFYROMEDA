import { createSlice } from "@/reduxjs/toolkit";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    nickname: "",
  },
  ProfileInfo: [],
  isAuth: null, // 로그인 유무
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
