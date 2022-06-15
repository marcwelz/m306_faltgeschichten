import './style.css';
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {standard_url} from "../../config/global_configurations";

function StartIndex() {
  const [gamecode, setGamecode] = useState("");
  const navigate = useNavigate();
  
  function handleSubmit() {
      fetch(standard_url + "/lobby.php?lobbyid=" + gamecode)
          .then(result => {
              if (result.status === 404) return;

              if(!containsAnyLetter(gamecode) && gamecode.length === 8){
                  navigate("/game=" + gamecode + "/0")
              }
          })
          .catch(() => {
              console.log("game not found")
          })
  }

  function handleCreateGame() {

    navigate("/game=" + makeGameId(8) + "/1")
  }

  return (
    <div className="main">
      <div className="main-container">
          <h1>Welcome</h1>
          <div className="main-container-form">
            <div className='main-container-form__input'>
              <input type="text" placeholder="Enter gamecode..." onChange={e => setGamecode(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}/>
            </div>
            <input type="button" onClick={handleCreateGame} className="create-game-button" value="Host Game"/>
          </div>
      </div>
    </div>
  );

  function makeGameId(length) {
    var result           = '';
    var characters       = '0123456789';
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
