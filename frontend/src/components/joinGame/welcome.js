import './style.css';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function StartIndex() {
  const [gamecode, setGamecode] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    //TODO send request

    navigate("/game=" + gamecode)
  }

  return (
    <div className="main">
      <div className="main-container">
          <h1>welcome</h1>
          <div className="main-container-form">
              <input type="text" placeholder="Enter gamecode..." onChange={e => setGamecode(e.target.value)}></input>
              <input type="submit" onClick={handleSubmit} value="Go"></input>
          </div>
      </div>
    </div>
  );
}

export default StartIndex;
