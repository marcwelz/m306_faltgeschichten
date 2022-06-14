import './style.css';
import {useParams, useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {standard_url} from "../../config/global_configurations";

function EnterNickname() {
    const {gamecode, create} = useParams();
    const [errorMessage, setErrorMessage] = useState("");
    const [username, setUsername] = useState("")
    const navigate = useNavigate();

    useEffect(() => {

        if (!create) {
            if (checkGameAvailability()) {
                setErrorMessage("Game not found")
            } else if (containsAnyLetter(gamecode)) {
                setErrorMessage("Gamecode invalid")
            }
        }


    }, [])

    function checkGameAvailability() {
        fetch(standard_url + "/getLobby.php?lobbyid=" + gamecode)
            .then(result => {
                if (result.status === 404) {
                    navigate("/");
                    return false;
                }
                return true;
            })
            .catch(error => {
                console.log(error, "error")
            })

        return false;
    }

    function handleSubmit(event) {

        if (create){

            const requestOptions = {
                method: 'POST'
            };
            fetch(standard_url + "/newLobby.php?lobbyid=" + gamecode + "&username=" + username, requestOptions)
                .then(r => navigate("/lobby/game=" + gamecode + "&username=" + username))
        } else {

            const requestOptions = {
                method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({ title: 'React POST Request Example' })
            };
            fetch(standard_url + "/postUser.php?lobbyid=" + gamecode + "&username=" + username, requestOptions)
                .then(r => navigate("/lobby/game=" + gamecode + "&username=" + username))
        }
    }

    return (
        <div className="main">
            <div className="main-container">
                <h3>Your code: {gamecode}</h3>
                <h6>{errorMessage}</h6>
                <div className="main-container-form">
                    <div className='main-container-form__input'>
                        <input type="text" onChange={e => setUsername(e.target.value)} placeholder="Enter nickname..."
                               onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}></input>
                        <input type="button" onClick={e => handleSubmit(e)} value="Go"></input>
                    </div>
                </div>
            </div>
        </div>
    );

    function containsAnyLetter(str) {
        return /[a-zA-Z]/.test(str);
    }
}

export default EnterNickname;
