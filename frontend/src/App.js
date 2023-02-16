import { useLocation, Route, Routes } from "react-router-dom";
import "./App.css";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";

import GamePage from "pages/GamePage";
import ExplanationPage from "pages/ExplanationPage";
import MainPage from "pages/MainPage";
import LoginPage from "pages/LoginPage";
import ProfilePage from "pages/ProfilePage";
import ResultPage from "pages/ResultPage";
// import KakaoRedirect from "components/auth/KakaoRedirect";
import SignUpPage from "pages/SignUpPage";
import RedirectPage from "pages/RedirectPage";
import DialogTest from "components/common/DialogTest";

import DesignTestPage from "pages/DesignTestPage";
import GameManager from "components/Game/GameManager";
import GameStartAnimation from "components/utils/GameStartAnimation";
import MiniGame1 from "../src/components/Game/MiniGame1";

import GameOver from "components/utils/GameOver";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauthRedirect" element={<RedirectPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/game" element={<GamePage />} />

          <Route path="/dialogtest" element={<DialogTest />} />

          <Route path="/designtest" element={<DesignTestPage />} />
          <Route path="/gamestartani" element={<GameStartAnimation />} />
          <Route path="/wintest" element={<GameOver />} />

          <Route path="/minigame1" element={<MiniGame1 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
