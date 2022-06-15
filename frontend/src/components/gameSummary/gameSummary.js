import './style.css';
import React, {useEffect, useState} from "react";
import {standard_url} from "../../config/global_configurations";
import {useNavigate, useParams} from "react-router-dom";

function GameSummary() {
    const {gamecode, username} = useParams();
    const [phrases, setPhrases] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAnswers()
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
        fetch(standard_url + "/postUser.php?lobbyid=" + gamecode + "&username=" + username,  {method: "PUT" })
            .then(() => navigate("/lobby/game=" + gamecode + "&username=" + username))
    }

    return (
        <div className="main-summary">
            <div className="main-container-summary">
                <h1 className="main-container-summary">Phrases</h1>
                {phrases.length > 0 && phrases.map((s) => (
                    <div className="main-container-summary-text">
                        <h2 className="title">Text: {s.username}</h2>
                        <h3 className="phrase">{s.story}</h3>
                    </div>
                ))}
                <input type="button" onClick={handlePlayAgain} className="create-game-button" value="Play again"/>
            </div>
        </div>
    )
}

export default GameSummary;