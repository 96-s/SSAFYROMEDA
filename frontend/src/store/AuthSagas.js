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
import {
  createNicknameApi,
  getUserInfoApi,
  logoutRequestApi,
  createGameRoomApi,
  joinGameRoomApi,
} from "./api";

// 닉네임 설정 saga
function* onCreateNicknameStartAsync({ payload }) {
  const { createNicknameError, createNicknameSuccess } = authActions;
  console.log("닉네임, 유저번호 확인", payload);
  try {
    const response = yield call(createNicknameApi, payload);
    // 이 코드는 현재 동작하지 않음. 추후 에러쪽에서 수정필요
    if (response.status === 400) {
      console.log("닉네임 중복..");
      yield put(createNicknameError(response.data));
      return;
    }
    if (response.status === 200) {
      yield put(createNicknameSuccess(response.data));
    }
  } catch (error) {
    yield put(createNicknameError(error.response.data));
    return;
  }
}

// 로그인시 회원정보 get
function* onGetUserInfoStartAsync({ payload }) {
  const { getUserInfoSuccess, getUserInfoError } = authActions;
  const userNo = payload;
  console.log("유저 번호는?", userNo); // userNo가 넘어오는지 확인
  try {
    const response = yield call(getUserInfoApi, userNo);
    console.log("유저 정보 응답", response);
    if (response.status === 200) {
      // 유저정보 저장
      yield put(getUserInfoSuccess(response.data));
    }
  } catch (error) {
    yield put(getUserInfoError(error.response.data));
  }
}

// 로그아웃
function* onLogoutRequestStartAsync({ payload }) {
  const { logoutRequestSuccess, logoutRequestError } = authActions;
  const userNo = payload;
  try {
    const response = yield call(logoutRequestApi, userNo);
    console.log("로그아웃 요청 응답", response);
    if (response.status === 200) {
      yield put(logoutRequestSuccess(response.data));
    }
  } catch (error) {
    yield put(logoutRequestError(error.response.data));
  }
}

// 게임 방 생성
function* onCreateGameRoomStartAsync({ payload }) {
  const { createGameRoomSuccess, createGameRoomError } = authActions;
  console.log("게임 방 생성 유저 확인: ", payload);
  try {
    const response = yield call(createGameRoomApi, payload);
    console.log("게임 방 생성 응답: ", response);
    if (response.status === 200) {
      yield put(createGameRoomSuccess(response.data));
    }
  } catch (error) {
    yield put(createGameRoomError(error.response.data));
  }
}

// 사가들을 작동시킬 saga 작성
// loginUserStart 라는 액션 함수가 실행되면 onLoginUserStartAsync 사가가 작동한다.

function* onCreateNickname() {
  const { createNicknameStart } = authActions;
  yield takeLatest(createNicknameStart, onCreateNicknameStartAsync);
}

function* onGetUserInfo() {
  const { getUserInfoStart } = authActions;
  yield takeLatest(getUserInfoStart, onGetUserInfoStartAsync);
}

function* onLogoutRequest() {
  const { logoutRequestStart } = authActions;
  yield takeLatest(logoutRequestStart, onLogoutRequestStartAsync);
}

function* onCreateGameRoom() {
  const { createGameRoomStart } = authActions;
  yield takeLatest(createGameRoomStart, onCreateGameRoomStartAsync);
}

// 사가 export
export const authSagas = [
  fork(onCreateNickname),
  fork(onGetUserInfo),
  fork(onLogoutRequest),
  fork(onCreateGameRoom),
];
