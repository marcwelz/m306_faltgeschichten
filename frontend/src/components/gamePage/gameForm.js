import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function GamePage() {
    const { gamecode, username } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const [question, setQuestion] = useState("Wer?");
    const [tipp, setTipp] = useState("Denke an eine prominente Person")
    const [isFinish, setFinish] = useState(false)

    function nextQuestion() {
        navigate("")
    }

    return (
        <div className="main-game">
            <div className='main-container-game'>
                <div>
                    <h1>{question}</h1>
                    <h3>Tipp: {tipp}</h3>
                </div>

                <div className="main-container-game-form">
                    <div className='main-container-game-form__input'>
                        <input type="text" placeholder='Gib deine Antwort ein...' onChange={e => setValue(e.target.value)}></input>
                    </div>
                </div>

                <div className='main-container__gameoperations'>
                    <button 
                        className='button-9'
                        style={{ backgroundColor: isFinish ? '#3fcc65' : '#405cf5'}}
                        onClick={() => setFinish(!isFinish)}
                        >
                            {isFinish ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div>: ""}
                            <div style={{width: isFinish ? "auto" : "100%"}}>
                                {isFinish ? "Wartet auf andere Spieler..." : "Fertig"}
                            </div>
                    </button>    
                </div>
            </div>
        </div>
    );
}

export default GamePage;
