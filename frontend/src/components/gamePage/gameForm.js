import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import data from "../../config/data/gameFormText.json";
import {standard_url} from "../../config/global_configurations";

function GamePage() {
    const {gamecode, username} = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [isDataReady, setDataReady] = useState(false)
    const navigate = useNavigate();
    const [value, setValue] = useState([]);
    const [question] = useState([]);
    const [tipp] = useState([])
    const [isFinish, setFinish] = useState(false)
    const [answers, setAnswers] = useState([])

    const randomTippIndex = Math.floor(Math.random() * (3));

    function handleButton() {
        if(!isFinish) nextQuestion()
    }

    useEffect(() => {
        setDataReady(true)
    }, [question])

    useEffect(() => {
        if(!isDataReady) {
            data.map((data) => {
                question.push(data.title)
                tipp.push(data.tipps)
            })
        }
    }, [])

    function nextQuestion() {
        answers[currentQuestion] = value
        setValue("")

        if(currentQuestion === 5) {
            setFinish(true)
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: {username},
                    lobby: {gamecode},
                    wer: answers[1],
                    beruf: answers[2],
                    was: answers[3],
                    wo: answers[4],
                    wann: answers[5],
                    wieso: answers[6],
                })
            };
            fetch(standard_url + "/postAnswers.php", requestOptions)
                .then(r => {
                    const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
                        checkAnswers();
                    }, 1000)

                    return () => clearInterval(intervalId);
                })
            return
        }
        setCurrentQuestion(currentQuestion +1)
    }

    function checkAnswers() {
        fetch(standard_url + "/getStories.php?lobbyid=" + gamecode)
            .then(res => res.json())
            .then(result => {
                if (result.ok !== 400){
                }
            })
            .catch(error => {
                console.log(error, "error")
            })
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
                        <input type="text" value={value} disabled={isFinish} placeholder='Gib deine Antwort ein...' onChange={e => setValue(e.target.value)}></input>
                    </div>
                </div>
                <div className='main-container__gameoperations'>
                    <button 
                        className='button-9'
                        style={{ backgroundColor: isFinish ? '#3fcc65' : '#405cf5'}}
                        onClick={() => handleButton()}
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
