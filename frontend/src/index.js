import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Welcome from "./components/joinGame/welcome";
import EnterNickname from "./components/joinGame/enterNickname";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/game=:gamecode" element={<EnterNickname />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
