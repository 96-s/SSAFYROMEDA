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
import { kakaoLoginApi, checkNicknameApi, createNicknameApi } from "./api";

// 카카오 로그인 saga
function* onLoginUserStartAsync({ payload }) {
  const { loginUserSuccess, loginUserError } = authActions;
  try {
    console.log("payload 확인용", payload);
    // api 호출
    const response = yield call(kakaoLoginApi, payload);
    console.log("로그인 응답", response.status);
    // 로그인 성공시
    if (response.status === 200) {
      yield put(loginUserSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    // 로그인 실패시 나올 로직 작성
  }
}

// 닉네임 설정 saga
function* onCreateNicknameStartAsync({ payload }) {
  const { createNicknameError } = authActions;

  try {
    console.log("닉네임 입력 form", payload);
    const { nickname } = payload;
    const responseNickname = yield call(checkNicknameApi, nickname);
    if (!responseNickname.data) {
      console.log("닉네임 중복");
      yield put(createNicknameError({ error: "중복된 닉네임입니다." }));
      return;
    }
    // 닉네임 설정 요청
    const response = yield call(createNicknameApi, payload);
    if (response.status === 200) {
      // 닉네임 설정 성공
    }
  } catch (error) {
    yield put(createNicknameError(error.response.data));
  }
}

// 사가들을 작동시킬 saga 작성
// loginUserStart 라는 액션 함수가 실행되면 onLoginUserStartAsync 사가가 작동한다.
function* onLoginUser() {
  const { loginUserStart } = authActions;
  yield takeLatest(loginUserStart, onLoginUserStartAsync);
}

function* onCreateNickname() {
  const { createNicknameStart } = authActions;
  yield takeLatest(createNicknameStart, onCreateNicknameStartAsync);
}

// 사가 export
export const authSagas = [fork(onLoginUser), fork(onCreateNickname)];
