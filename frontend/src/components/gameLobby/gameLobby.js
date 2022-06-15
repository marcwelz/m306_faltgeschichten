import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {standard_url} from "../../config/global_configurations";
import Spinner from "../static/spinner/Spinner";

function GameLobby () {
    const {gamecode, username} = useParams();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            loadPlayers();
        }, 1000)

        return () => clearInterval(intervalId);

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
        fetch(standard_url + "/users.php?lobbyid=" + gamecode + "&username=" + username,  { method: "PATCH" })
        // navigate("/lobby/game=" + gamecode + "&username=" + username + "/game")
    }

    function cancelGame() {
        fetch(standard_url + "/users.php?lobbyid=" + gamecode + "&username=" + username, { method: "DELETE" })
            .then(() => navigate("/"))
    }

    return (
        <div className="main">
            <div className="main-container">
                <div className='main-container__players'>
                    <h1>Your code: {gamecode}</h1>
                    <h3>username: {username}</h3>
                    <ul id='nav'>
                        {players.length > 0 ? players.map(player => <li key={player.username}>{player.username + " " + player.status}</li>) :
                            <li><span><Spinner/></span></li>}
                    </ul>
                </div>
                <div className='main-container__gameoperations'>
                    <button
                        className="button-9"
                        style={{backgroundColor: "#eb4034", marginRight:"10px"}}
                        onClick={() => cancelGame()}
                        value="cancel">
                    cancel</button>
                    <button
                        className="button-9"
                        style={{backgroundColor: '#405cf5', marginLeft: "10px"}}
                        value="start"
                        onClick={() => ready()}>
                    ready</button>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;
