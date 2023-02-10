import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// saga import
import { authSagas } from "./AuthSagas";

// 관리할 슬라이스 import
import authReducer from "./AuthSlice";
import gameReducer from "./GameSlice";

//  Redux-Persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

// Reducers 통합
const rootReducers = combineReducers({
  auth: authReducer,
  game: gameReducer,
});

// 새로운 persist 선언
const persistConfig = {
  key: "root", // reducer의 어느 시점부터 데이터를 저장할 것인지
  storage: storage, // 웹의 localStorage
};

// persist + rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducers);

// rootSaga (사가들을 통합)
function* rootSaga() {
  yield all([...authSagas]);
}

// 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Store는 하나의 리듀서만 가질 수 있다.
// 그래서 여러 슬라이서의 리듀서를 합친다.
// 아래의 코드는 수정하지 않는다.
// persistConfig가 추가된 rootReducer로 store를 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

// 사가 실행
sagaMiddleware.run(rootSaga);

// 새로고침, 종료해도 지속될 store 생성
export const persistor = persistStore(store);

// 외부에서 쓸 수 있도록 store를 export한다.
// const stores = {
//   store,
//   persistor,
// };

// export default stores;
