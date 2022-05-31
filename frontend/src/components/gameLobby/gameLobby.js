import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";

function GameLobby () {
    const {gamecode, username} = useParams();
    const navigate = useNavigate();

    function loadPlayers() {
        
    }

    function cancelGame() {
        // TODO cancel game

        navigate("/")
    }

    return (
        <div className="main">
            <div className="main-container">
                <div className='main-container__players'>
                    <h1>Your code: {gamecode}</h1>
                    <h3>username: {username}</h3>
                    <ul id='nav'>
                        <li>Gogilol</li>
                        <li>Milchmaa</li>
                        <li>YoungLoco</li>
                        <li>OldRapfi</li>
                        <li>MissingDave</li>
                        <li>GamerTimo</li>
                    </ul>
                </div>
                <div className='main-container__gameoperations'>
                    <button 
                        className="button-9" 
                        style={{backgroundColor: "#eb4034", marginRight:"10px"}} 
                        onClick={e => cancelGame()}
                        value="cancel">
                    cancel</button>
                    <button 
                        className="button-9" 
                        style={{backgroundColor: '#405cf5', marginLeft: "10px"}} 
                        value="start">
                    start</button>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;
