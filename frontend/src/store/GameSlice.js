import { createSlice } from "@reduxjs/toolkit";

const initialGameState = {
  t1Pos: 0,
  t2Pos: 0,
  myGameNo: 0,
  throwUser: 0,
  isDice: true,
  myTeam: 1,
  gameTurn: true,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    // 필요한 reducer를 만들어서 쓰면 됨
    // initialState의 값들만 바꾸는 순수함수여야함
    // ex) state.t1Pose = 1
    temp(state, action) {
      state.t1Pos = 11111;
      state.myTeam = 3333;
    },
  },
});

export const gameActions = gameSlice.actions;

export default gameSlice.reducer;
