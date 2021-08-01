import React from "react";
import icon from "../images/icon.png"

import ReactGA from 'react-ga';

const trackingId = "G-7H2VFBV0XS";
ReactGA.initialize(trackingId);

function Navigation(){
    return(
        <div className="top" >
            <div id="iconDiv" >
                <img id="icon" src={icon} alt=""/>
                {/* <h1>Learner's List</h1> */}
                <h2>Made with ❤️ by <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/harsh-sharma-88a210150/" >Harsh</a></h2>
            </div>
            
            <button id="resetButton" onClick={()=>{
                localStorage.clear();
                window.location.reload();
            }} >Reset</button>
        </div>
    );
}

export default Navigation;