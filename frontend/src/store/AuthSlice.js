import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  // 회원가입(닉네임 등록)
  register: {
    nickname: "",
  },
  ProfileInfo: [],
  isAuth: null, // 로그인 유무
  error: null, // 에러 유무
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
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
