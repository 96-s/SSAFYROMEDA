import { Route, Routes } from "react-router-dom";
import "./App.css";

import GamePage from "pages/GamePage";
import MainPage from "pages/MainPage";
import LobbyPage from "pages/LobbyPage";
import LoginPage from "pages/LoginPage";
import OpenviduPage from "pages/OpenviduPage";
import ProfilePage from "pages/ProfilePage";
import ResultPage from "pages/ResultPage";
import KakaoRedirect from "components/auth/KakaoRedirect";

// import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/openvidu" element={<OpenviduPage />} />

        <Route path="/login/oauth2/code/kakao" element={<KakaoRedirect />} />
      </Routes>
    </div>
  );
}

export default App;
