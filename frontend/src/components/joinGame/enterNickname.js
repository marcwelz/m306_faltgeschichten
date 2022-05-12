import './style.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function EnterNickname () {
  const {gamecode} = useParams();
  const [isGameActive, setGameActive] = useState(false);

  useEffect(() => {
    setGameActive(checkGameAvailability());
  }, [])

  function checkGameAvailability() {
    //TODO check for game 

    return true;
  }

  function handleSubmit(event) {
    console.log(gamecode)
  }

  return (
    <div className="main">
      <div className="main-container">
          <h3>Your code: {gamecode}</h3>
          {isGameActive && (<h6>Game not found</h6>)}
          <div className="main-container-form">
              <input type="text" placeholder="Enter nickname..." ></input>
              <input type="submit" onClick={e => handleSubmit(e)} value="Go"></input>
          </div>
      </div>
    </div>
  );
}

export default EnterNickname;
