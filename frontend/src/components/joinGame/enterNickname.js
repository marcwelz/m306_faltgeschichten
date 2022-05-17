import './style.css';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function EnterNickname () {
  const {gamecode} = useParams();
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(checkGameAvailability()) {
      setErrorMessage("Game not found")
    } else if (containsAnyLetter(gamecode)) {
      setErrorMessage("Gamecode invalid")
    }
  }, [])

  function checkGameAvailability() {
    //TODO check for game 

    return false;
  }

  function handleSubmit(event) {
    console.log(gamecode)
  }

  return (
    <div className="main">
      <div className="main-container">
          <h3>Your code: {gamecode}</h3>
          <h6>{errorMessage}</h6>
          <div className="main-container-form">
            <div className='main-container-form__input'>
              <input type="text" placeholder="Enter nickname..." ></input>
              <input type="button" onClick={e => handleSubmit(e)} value="Go"></input>
            </div>
          </div>
      </div>
    </div>
  );

  function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
  }
}

export default EnterNickname;
