import './style.css';
import React, {useEffect, useState} from "react";
import {standard_url} from "../../config/global_configurations";
import {useNavigate, useParams} from "react-router-dom";

import applicationProperties from "../../config/application-properties.json"

function GameSummary() {
    const {gamecode, username} = useParams();
    const [phrases, setPhrases] = useState([]);
    const msg = new SpeechSynthesisUtterance()
    const navigate = useNavigate();

    useEffect(() => {
        if(!applicationProperties.development) {
            getAnswers()
        } else {
            const devData = [
                {
                    "username" : "player1",
                    "story": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                },
                {
                    "username" : "player2",
                    "story": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }
            ]

            setPhrases(devData)
        }
    }, [])

    function getAnswers() {
        fetch(standard_url + "/getStories.php?lobbyid=" + gamecode)
            .then(res => res.json())
            .then(result => {
                setPhrases(result)
            })
            .catch(() => {
                //do nothing
            })
    }

    function handlePlayAgain() {
        fetch(standard_url + "/users.php?lobbyid=" + gamecode + "&username=" + username,  { method: "PUT" })
            .then(() => navigate("/lobby/game=" + gamecode + "&username=" + username))
    }

    function readStories() {
        let tmpText = "First Story: "
        phrases.map((p) => {
            return tmpText += p.story + ". Next Story:"
        })

        msg.text = tmpText;
        window.speechSynthesis.speak(msg)
    }

    return (
        <div className="main-summary">
            <div className="main-container-summary">
                <h1 className="main-container-summary">Phrases</h1>
                    <div className="main-container-summary-container">
                    {phrases.length > 0 && phrases.map((s) => (
                        <div className="main-container-summary-text">
                            <div className='main-container-summary-text-title'>
                                <h2 className="title">{s.username}</h2>
                            </div>
                            <div className='main-container-summary-text-story'>
                                <h3 className="phrase">{s.story}</h3>
                            </div>
                        </div>
                    ))}
                    </div>
                <div className='main-container-summary-button'>
                    <input 
                        type="button" 
                        style={{backgroundColor: "#405cf5", width: "200px", display: "block"}} 
                        onClick={handlePlayAgain} 
                        className="button-9" 
                        value="Play again"/>
                    <input 
                        type="button" 
                        style={{backgroundColor: "#e6b800", width: "200px", display: "block", marginRight: "10px"}} 
                        onClick={readStories} 
                        className="button-9" 
                        value="read stories"
                        />
                </div>
            </div>
        </div>
    )
}

export default GameSummary;