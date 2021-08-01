import React from "react";
import VideoDashboard from "./VideoDashboard";

import ReactGA from 'react-ga';

const trackingId = "G-7H2VFBV0XS";
ReactGA.initialize(trackingId);

function Middle(){
    if (localStorage.getItem("playlistID")===null) {
        console.log("No ID");
        return(
            <h2>No ID</h2>
        );
    
    }else{
        console.log("ID found");
        return(
            <VideoDashboard/>
        );
    }
}

export default Middle;