import './style.css';
import React from "react";
import {useParams} from 'react-router-dom';
import applicationProperties from "../../../config/application-properties.json"

function Footer() {
    const {gamecode, username} = useParams()

    return (
        <footer className='footer-container'>
            {gamecode ? <div className='footer-container__gamecode'>
                12345678
            </div> : ""}
            <div style={gamecode ? {display: "flex", "justify-content": "space-between"}: {}} className='footer-container__credits'>
                Version {applicationProperties.version} ©2022
            </div>
            {username ? <div className='footer-container__username'>
                marc.welz
            </div> : "" }
        </footer>
    );
}

export default Footer;


