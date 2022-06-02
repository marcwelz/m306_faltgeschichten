import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import data from "../../config/data/gameFormText.json";

function GamePage() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isDataReady, setDataReady] = useState(false)
    const navigate = useNavigate();
    const [value, setValue] = useState([]);
    const [question] = useState([]);
    const [tipp] = useState([])
    const [isFinish, setFinish] = useState(false)
    const [answers, setAnswers] = useState([])

    const randomTippIndex = Math.floor(Math.random() * (3));

    function handleFinish() {
        setFinish(!isFinish)
        if(isFinish) nextQuestion()
    }

    useEffect(() => {
        if(!isDataReady) {
            data.map((data) => {
                question.push(data.title)
                tipp.push(data.tipps)
            })
        }

        setDataReady(true)
    }, [])

    function nextQuestion() {
        answers[currentQuestion] = value
        setCurrentQuestion(currentQuestion +1)

        setValue("")
        if(currentQuestion == 5) {
            navigate("/")
        }
    }

    return (
        <div className="main-game">
            <div className='main-container-game'>
                <div>
                    <h1>{isDataReady ? question[currentQuestion] : "not loaded yet"}</h1>
                    <h3>Tipp: {isDataReady ? tipp[currentQuestion][randomTippIndex] : "not loaded yet"}</h3>
                </div>
                <div className="main-container-game-form">
                    <div className='main-container-game-form__input'>
                        <input type="text" value={value} placeholder='Gib deine Antwort ein...' onChange={e => setValue(e.target.value)}></input>
                    </div>
                </div>
                <div className='main-container__gameoperations'>
                    <button 
                        className='button-9'
                        style={{ backgroundColor: isFinish ? '#3fcc65' : '#405cf5'}}
                        onClick={() => handleFinish()}
                        >
                            {isFinish ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div>: ""}
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
