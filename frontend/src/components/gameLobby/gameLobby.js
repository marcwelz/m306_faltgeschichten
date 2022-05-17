import './style.css';
import { useParams } from 'react-router-dom';
import React from "react";

function GameLobby () {
    const {gamecode, username} = useParams();

    return (
        <div className="main">
            <div className="main-container">
                <h3>Your code: {gamecode}</h3>
                <h6>username: {username}</h6>
            </div>
        </div>
    );
}

export default GameLobby;
