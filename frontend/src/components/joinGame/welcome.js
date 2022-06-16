import './style.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {standard_url} from "../../config/global_configurations";
import applicationProperties from "../../config/application-properties.json"

function StartIndex() {
  const [gamecode, setGamecode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    if(!containsAnyLetter(gamecode) && gamecode.length === 8) {
      if(!applicationProperties.development) {
        fetch(standard_url + "/lobby.php?lobbyid=" + gamecode)
            .then(result => {
                if (result.status === 404) return;
                navigate("/game=" + gamecode + "/0")
            })
            .catch(() => {
                console.log("game not found")
                setErrorMessage("game not found")
            })
      } else {
        navigate("/game=" + gamecode + "/0")
      }
    } else setErrorMessage("Gamecode invalid. Length must be 8 characters");
  }

  function handleCreateGame() {

    navigate("/game=" + makeGameId(8) + "/1")
  }

  return (
    <div className="main">
      <div className="main-container">
          <h1>Welcome</h1>
          <h6 style={errorMessage ? {}: {display: "none"}}>{errorMessage}</h6>
          <div className="main-container-form">
            <div className='main-container-form__input'>
              <input type="text" placeholder="Enter gamecode..." onChange={e => setGamecode(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}/>
              <input type="button" onClick={handleSubmit} style={{backgroundColor:"#35a8de"}} className="create-game-button" value="Join"/>
            </div>
            <p style={{textAlign: "center"}}>or</p>
            <input type="button" onClick={handleCreateGame} className="create-game-button" value="Host Game"/>
          </div>
      </div>
    </div>
  );

  function makeGameId(length) {
    var result           = '';
    var characters       = '123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }
   return result;
  }

   function containsAnyLetter(str) {
    return /[a-zA-Z]/.test(str);
  }
}

export default StartIndex;
