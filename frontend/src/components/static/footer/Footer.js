import './style.css';
import React, { useEffect } from "react";
import {useParams} from 'react-router-dom';

function Footer() {
    const {gamecode, username} = useParams()

    return (
        <footer className='footer-container'>
            {gamecode ? <div className='footer-container__gamecode'>
                12345678
            </div> : ""}
            <div style={gamecode ? {display: "flex", "justify-content": "space-between"}: {}} className='footer-container__credits'>
                ©2022
            </div>
            {username ? <div className='footer-container__username'>
                marc.welz
            </div> : "" }
        </footer>
    );
}

export default Footer;


