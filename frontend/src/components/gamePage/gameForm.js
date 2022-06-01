import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState } from "react";

function GamePage() {
    const { gamecode, username } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const question = "Wer?";

    function nextQuestion() {
        navigate("")
    }

    return (
        <div className="main-game">
            <div className='main-container-game'>
                <div>
                    <h1>{question}</h1>
                </div>

                <div className="main-container-form">
                    <div className='main-container-form__input'>
                        <input type="text" placeholder='antwort zur frage' onChange={e => setValue(e.target.value)}></input>
                    </div>
                </div>

                <div className='main-container__gameoperations'>
                    <button className='button-9'
                        style={{ backgroundColor: '#405cf5' }}>
                            next
                    </button>    
                </div>
            </div>
        </div>
    );
}

export default GamePage;
