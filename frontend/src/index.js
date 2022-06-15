import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from "./components/joinGame/welcome";
import EnterNickname from "./components/joinGame/enterNickname";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GameLobby from './components/gameLobby/gameLobby';
import GamePage from './components/gamePage/gameForm';
import GameSummary from "./components/gameSummary/gameSummary";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/game=:gamecode/:create" element={<EnterNickname />} />
      <Route path="/lobby/game=:gamecode&username=:username" element={<GameLobby />} />
      <Route path="/lobby/game=:gamecode&username=:username/game" element={<GamePage />} />
      <Route path="/summary" element={<GameSummary />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
