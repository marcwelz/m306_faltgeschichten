import './style.css';
import React from "react";

function GameSummary() {

    /**
     * TODO
     */
    
    const loremipsum = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.";
    const phrases = [
        {
            title: "Text 1",
            phrase: loremipsum
        },
        {
            title: "Text 2",
            phrase: loremipsum
        },
        {
            title: "Text 3",
            phrase: loremipsum
        }
    ];

    return (
        <div className="main-summary">
            <div className="main-container-summary">
                <h1 className="main-container-summary">Summary</h1>
                    {phrases.map((s) => (
                        <div className="main-container-summary-text">
                            <h2 className="title">{s.title}</h2>
                            <h3 className="phrase">{s.phrase}</h3>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default GameSummary;