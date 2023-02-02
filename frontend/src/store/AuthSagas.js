import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from "redux-saga/effects";

// actions import
import { authActions } from "./AuthSlice";

// api import
import { checkNicknameApi, createNicknameApi, getUserApi } from "./api";

// 닉네임 설정 saga
function* onCreateNicknameStartAsync({ payload }) {
  const { createNicknameError, createNicknameSuccess } = authActions;
  console.log("payload 확인", payload);
  const { userNo, userNickname } = payload;
  try {
    const responseNickname = yield call(checkNicknameApi, userNickname);
    console.log("닉네임중복응답:", responseNickname);
    // 중복된 닉네임이라면? 조건 확인하기
    if (!responseNickname.data) {
      console.log("닉네임 중복");
      yield put(createNicknameError({ error: "중복된 닉네임입니다." }));
      return;
    }
    // 닉네임 등록 요청
    const response = yield call(createNicknameApi, payload);
    if (response.status === 200) {
      // 닉네임 설정 성공 -> 토큰저장로직 실행
      yield put(createNicknameSuccess(response.data));
    }
  } catch (error) {
    yield put(createNicknameError(error.response.data));
  }
}

// 회원정보 get
function* onGetUserInfoStartAsync({ payload }) {
  const { getUserSuccess, getUserError } = authActions;
  console.log(payload); // token과 userNo가 넘어오는지 확인
  const { token, userNo } = payload;
  try {
    const response = yield call(getUserApi, token, userNo);
    console.log("유저 프로필 정보 응답", response);
    if (response.status === 200) {
      // 유저정보 저장
      yield put(getUserSuccess(response.data));
    }
  } catch (error) {
    yield put(getUserError(error.response.data));
  }
}

// 사가들을 작동시킬 saga 작성
// loginUserStart 라는 액션 함수가 실행되면 onLoginUserStartAsync 사가가 작동한다.
// function* onKakaoLogin() {
//   const { kakaoLoginStart } = authActions;
//   yield takeLatest(kakaoLoginStart, onKakaoLoginStartAsync);
// }

function* onCreateNickname() {
  const { createNicknameStart } = authActions;
  yield takeLatest(createNicknameStart, onCreateNicknameStartAsync);
}

function* onGetUserInfo() {
  const { getUserStart } = authActions;
  yield takeLatest(getUserStart, onGetUserInfoStartAsync);
}

// 사가 export
export const authSagas = [
  // fork(onKakaoLogin),
  fork(onCreateNickname),
  fork(onGetUserInfo),
];
