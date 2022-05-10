import "./Main.css"
import react from 'react';

export default class Main extends react.Component {
    render() {
        return (
            <div>
                <h1>Faltgeschichten</h1>
                <input type="text" placeholder="Enter gamecode..."></input>
                <input type="submit"></input>
            </div>
        )
    }
}