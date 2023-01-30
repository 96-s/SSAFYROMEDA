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
  kakaoLoginApi,
  checkNicknameApi,
  createNicknameApi,
  getUserApi,
} from "./api";

// 카카오 로그인 saga
function* onKakaoLoginStartAsync({ payload }) {
  const { kakaoLoginSuccess, kakaoLoginError } = authActions;
  try {
    console.log("인가코드", payload);
    // api 호출
    const response = yield call(kakaoLoginApi, payload);
    console.log("로그인 응답", response.status);
    // 로그인 성공시
    if (response.status === 200) {
      yield put(kakaoLoginSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    console.log("카카오 로그인 에러");
    // 로그인 실패시 나올 로직 작성
  }
}

// 닉네임 설정 saga
function* onCreateNicknameStartAsync({ payload }) {
  const { createNicknameError, createNicknameSuccess } = authActions;

  try {
    console.log("닉네임 입력 form", payload);
    const { nickname } = payload;
    const responseNickname = yield call(checkNicknameApi, nickname);
    // console.log(responseNickname)
    // responseNickname 응답을 확인하고 if문의 조건을 변경하면 된다.
    if (!responseNickname.data) {
      console.log("닉네임 중복");
      yield put(createNicknameError({ error: "중복된 닉네임입니다." }));
      return;
    }
    // 이메일, 닉네임 등록 요청
    const response = yield call(createNicknameApi, payload);
    if (response.status === 200) {
      // 닉네임 설정 성공 -> createNicknameSuccess 실행
    }
  } catch (error) {
    yield put(createNicknameError(error.response.data));
  }
}

// 회원정보 get
function* onGetUserProfileInfoStartAsync() {
  const { getUserProfileInfoSuccess, getUserError } = authActions;
  try {
    const response = yield call(getUserApi);
    console.log("유저 프로필 정보 응답", response);
    // 유저정보 저장
    yield put(getUserProfileInfoSuccess(response.data));
  } catch (error) {
    console.log(error);
    yield put(getUserError(error.response.data));
  }
}

// 사가들을 작동시킬 saga 작성
// loginUserStart 라는 액션 함수가 실행되면 onLoginUserStartAsync 사가가 작동한다.
function* onKakaoLogin() {
  const { kakaoLoginStart } = authActions;
  yield takeLatest(kakaoLoginStart, onKakaoLoginStartAsync);
}

function* onCreateNickname() {
  const { createNicknameStart } = authActions;
  yield takeLatest(createNicknameStart, onCreateNicknameStartAsync);
}

function* onGetUserUserProfileInfo() {
  const { getUserProfileInfoStart } = authActions;
  yield takeLatest(getUserProfileInfoStart, onGetUserProfileInfoStartAsync);
}

// 사가 export
export const authSagas = [
  fork(onKakaoLogin),
  fork(onCreateNickname),
  fork(onGetUserUserProfileInfo),
];
