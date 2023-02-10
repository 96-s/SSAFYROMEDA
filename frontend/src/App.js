import { useLocation, Route, Routes } from "react-router-dom";
import "./App.css";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";

import GamePage from "pages/GamePage";
import ExplanationPage from "pages/ExplanationPage";
import MainPage from "pages/MainPage";
import LobbyPage from "pages/LobbyPage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import ResultPage from "pages/ResultPage";
// import KakaoRedirect from "components/auth/KakaoRedirect";
import SignUpPage from "pages/SignUpPage";
import RedirectPage from "pages/RedirectPage";
import DialogTest from "components/common/DialogTest";
import GameRoomPage from "pages/GameRoomPage";

import UiTest from "pages/UiTest";

// import { Provider } from "react-redux";

// 스크롤바 없애기 누가 만들어주세요..
// Routes {
//   -ms-overflow-style: none;
// }

// ::-webkit-scrollbar {
//   display: none;
// }

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  const handleAnimationEnd = (event) => {
    if (transitionStage === "fadeOut") {
      setTransitionStage("fadeIn");
      setDisplayLocation(location);
    }
  };

  return (
    <div className="App">
      <div className={`${transitionStage}`} onAnimationEnd={handleAnimationEnd}>
        <Routes location={displayLocation}>
          <Route path="/" element={<MainPage />} />
          <Route path="/explanation" element={<ExplanationPage />} />
          <Route path="/lobby" element={<LobbyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauthRedirect" element={<RedirectPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/gameroom" element={<GameRoomPage />} />

          <Route path="/dialogtest" element={<DialogTest />} />
          <Route path="/test3" element={<UiTest />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
