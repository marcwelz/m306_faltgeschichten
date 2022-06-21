import './style.css';
import React from "react";
import { useParams } from 'react-router-dom';
import applicationProperties from "../../../config/application-properties.json"

function Footer() {
    const {gamecode, username} = useParams()
    return (
        <footer className='footer-container'>
            {applicationProperties.development ? "developer mode": "" }
            {gamecode ? <div className='footer-container__gamecode'>
                {gamecode}
            </div> : ""}
            {applicationProperties.development ? "" : 
                <div style={gamecode ? {display: "flex", "justify-content": "space-between"}: {}} className='footer-container__credits'>
                    Version {applicationProperties.version} ©2022
                </div>
            }
            {username ? <div className='footer-container__username'>
                {username}
            </div> : "" }
        </footer>
    );
}

export default Footer;


