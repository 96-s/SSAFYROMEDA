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
import { checkNicknameApi, createNicknameApi, getUserInfoApi } from "./api";

// 닉네임 설정 saga
function* onCreateNicknameStartAsync({ payload }) {
  const { createNicknameError, createNicknameSuccess } = authActions;
  console.log("닉네임, 유저번호 확인", payload);
  try {
    const response = yield call(createNicknameApi, payload);
    if (response.status !== 200) {
      console.log("닉네임 중복");
      yield put(createNicknameError({ error: "중복된 닉네임입니다." }));
      return;
    }
    if (response.status === 200) {
      yield put(createNicknameSuccess(response.data));
    }
  } catch (error) {
    yield put(createNicknameError(error.response.data));
  }

  // 닉네임 등록 요청
  //   const response = yield call(createNicknameApi, payload);
  //   if (response.status === 200) {
  //     // 닉네임 설정 성공 -> 토큰저장로직 실행
  //     yield put(createNicknameSuccess(response.data));
  //   }
  // } catch (error) {
  //   yield put(createNicknameError(error.response.data));
  // }
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

// 사가 export
export const authSagas = [
  // fork(onKakaoLogin),
  fork(onCreateNickname),
  fork(onGetUserInfo),
];
