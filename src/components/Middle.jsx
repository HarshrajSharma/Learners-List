import React from "react";
import VideoDashboard from "./VideoDashboard";

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