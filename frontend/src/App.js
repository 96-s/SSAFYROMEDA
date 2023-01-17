import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/lobby' element={<LobbyPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
        <Route path='/game' element={<GamePage/>}/>
        <Route path='/result' element={<ResultPage/>}/>
        <Route path='/openvidu' element={<OpenviduPage/>}/>
      </Routes>
    </div>

  );
}

export default App;
