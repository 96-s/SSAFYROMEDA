import { Route, Routes } from "react-router-dom";
import "./App.css";
// import styled from "styled-components";

import GamePage from "pages/GamePage";
import MainPage from "pages/MainPage";
import LobbyPage from "pages/LobbyPage";
import LoginPage from "pages/LoginPage";
import OpenviduPage from "pages/OpenviduPage";
import ProfilePage from "pages/ProfilePage";
import ResultPage from "pages/ResultPage";
// import KakaoRedirect from "components/auth/KakaoRedirect";
import SignUpPage from "pages/SignUpPage";

// import { Provider } from "react-redux";

// 스크롤바 없애기 누가 만들어주세요..
// Routes {
//   -ms-overflow-style: none;
// }

// ::-webkit-scrollbar {
//   display: none;
// }

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/openvidu" element={<OpenviduPage />} />

        {/* <Route path="/login/oauth2/code/kakao" element={<KakaoRedirect />} /> */}
      </Routes>
    </div>
  );
}

export default App;
