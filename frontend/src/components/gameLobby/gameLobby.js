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
    const [isHovering, setHover] = useState(false);

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
            navigate("/lobby/game=" + gamecode + "&username=" + username + "/game")
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

    //CHAT

    function createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes.
        return div.firstChild;
    }

    var color = "#"+Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    var name = username;
    var lobby = gamecode;

    //create a new WebSocket object.
    var wsUri = "ws://localhost:9000/chatserver.php";
    const [websocket, setWebsocket] = useState([]);
    useEffect(() => {
        setWebsocket(new WebSocket(wsUri))

    }, []);
    websocket.onmessage = function(ev) {
        var msgBox = document.getElementById('message-box');

        var response 		= JSON.parse(ev.data); //PHP sends Json data

        var res_type 		= response.type; //message type
        var user_message 	= response.message; //message text
        var user_name 		= response.name; //user name
        var user_color 		= response.color; //color

        switch(res_type){
            case 'usermsg':
                msgBox.appendChild(createElementFromHTML('<div><span class="user_name" style="color:' + user_color + '">' + user_name + '</span> : <span class="user_message">' + user_message + '</span></div>'));
                break;
            case 'system':
                msgBox.appendChild(createElementFromHTML('<div style="color:#bbbbbb">' + user_message + '</div>'));
                break;
        }
        msgBox[0].scrollTop = msgBox[0].scrollHeight; //scroll message

    };
    websocket.onopen = function(ev) { // connection is open
        var msgBox = document.getElementById('message-box');
        msgBox.appendChild(createElementFromHTML('<div class="system_msg" style="color:#bbbbbb">Welcome to the Chat!</div>')); //notify user
        var msg = {
            lobby: gamecode,
            name: username,
            color : color
        };

        //convert and send data to server
        websocket.send(JSON.stringify(msg));
    }
    // Message received from server

    websocket.onerror	= function(ev){var msgBox = document.getElementById('message-box'); msgBox.appendChild(createElementFromHTML('<div class="system_error">Error Occurred - ' + ev.data + '</div>')); };
    websocket.onclose 	= function(ev){var msgBox = document.getElementById('message-box'); msgBox.appendChild(createElementFromHTML('<div class="system_msg">Connection Closed</div>')); };

    function send_message(){
        var message_input = document.getElementById("message"); //user message text

        if(message_input.value == ""){ //emtpy message?
            alert("Enter Some message Please!");
            return;
        }

        //prepare json data
        var msg = {
            message: message_input.value.toString(),
            name: name,
            color : color,
            lob: lobby
        };

        //convert and send data to server
        websocket.send(JSON.stringify(msg));
        message_input.value = ""; //reset message input
    }

    //Send message

    //CHAT

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
                        disabled={isPlayerReady}
                        >
                    leave</button>
                    <button
                        className="button-9"
                        style={{
                            backgroundColor: isPlayerReady ? "#3fcc65" : '#405cf5',
                            marginLeft: "10px",
                            display: (isPlayerReady ? "flex": "block")
                        }}
                        value="start"
                        onClick={() => ready()}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        >
                    {isPlayerReady ? <Spinner></Spinner>: ""}{isHovering && isPlayerReady ? "unready": "ready"}
                    </button>
                </div>
                <div className='main-container__chat'>
                    <div id="message-box"></div>
                    <input type="text" name="message" id="message" placeholder="Type your message here..."
                           maxLength="100"/>
                    <button id="send-message" onClick={() => send_message()}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default GameLobby;
