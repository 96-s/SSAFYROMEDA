import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// saga import

// 관리할 슬라이스 import
import authReducer from "./AuthSlice";

// Reducers 통합
const rootReducers = combineReducers({
  auth: authReducer,
});

// rootSaga (사가들을 통합)
function* rootSaga() {
  yield all([]);
}

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Store는 하나의 리듀서만 가질 수 있다.
// 그래서 여러 슬라이서의 리듀서를 합친다.
const store = configureStore({
  reducer: rootReducers,
  middleware: middlewares,
});

// 사가 실행
sagaMiddleware.run(rootSaga);

// 외부에서 쓸 수 있도록 store를 export한다.
export default store;
