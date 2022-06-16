import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {standard_url} from "../../config/global_configurations";
import Spinner from "../static/spinner/Spinner";
import applicationProperties from "../../config/application-properties.json"

function GameLobby () {
    const {gamecode, username} = useParams();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const [isPlayerReady, setPlayerReady] = useState(false)

    useEffect(() => {
        if(!applicationProperties.development) {
            const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
                loadPlayers();
            }, 1000)
    
            return () => clearInterval(intervalId);
        } else {
            const devData = [{
                "username": "player1",
                "status": "ready"
            },
            {
                "username": "player2",
                "status": "ready"
            },
            {
                "username": "player3",
                "status": "lobby"
            },
            {
                "username": "player4",
                "status": "lobby"
            },
            {
                "username": "player5",
                "status": "ready"
            },
            {
                "username": "player6",
                "status": "lobby"
            },
            {
                "username": "player7",
                "status": "ready"
            },
            {
                "username": "player8",
                "status": "ready"
            }]

            setPlayers(devData)
        }
    }, [])

    function loadPlayers() {
        fetch(standard_url + "/users.php?lobbyid=" + gamecode)
            .then(res => res.json())
            .then(result => {
                if (result?.start){
                    navigate("/lobby/game=" + gamecode + "&username=" + username + "/game")
                }
                setPlayers(result);
            })
            .catch(error => {
                console.log(error, "error")
            })
    }

    function ready() {
        setPlayerReady(!isPlayerReady)
        if(!applicationProperties.development) {
            fetch(standard_url + "/users.php?lobbyid=" + gamecode + "&username=" + username,  { method: "PATCH" })
        } else {
            //navigate("/lobby/game=" + gamecode + "&username=" + username + "/game")
        }
    }

    function cancelGame() {
        if(!applicationProperties.development) {
            fetch(standard_url + "/users.php?lobbyid=" + gamecode + "&username=" + username, { method: "DELETE" })
            .then(() => navigate("/"))
        } else {
            navigate("/")
        }
    }

    return (
        <div className="main">
            <div className="main-container">
                <div className='main-container__players'>
                    <h1>Your code: {gamecode}</h1>
                    <h3>username: {username}</h3>
                    <ul id='nav'>
                        {players.length > 0 ? players.map(player => 
                            <li key={player.username} style={{padding: "2px"}}>
                                {player.username + " " + (player.status.includes("ready") ? "✅" : "❌")}
                            </li>) :
                            <li><span><Spinner/></span></li>}
                    </ul>
                </div>
                <div className='main-container__gameoperations'>
                    <button
                        className="button-9"
                        style={{backgroundColor: "#eb4034", marginRight:"10px", display: "block"}}
                        onClick={() => cancelGame()}
                        value="leave"
                        disabled={isPlayerReady ? true: false}
                        >
                    leave</button>
                    <button
                        className="button-9"
                        style={{backgroundColor: (isPlayerReady ? "#3fcc65" : '#405cf5'), marginLeft: "10px"}}
                        value="start"
                        onClick={() => ready()}>
                    {isPlayerReady ? <Spinner></Spinner>: ""}ready
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;
