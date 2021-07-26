import React from "react";
import ReactDOM, { render } from "react-dom";
import Header from "./components/Header"
import LinkSearch from "./components/LinkSearch"
import MainContent from "./components/MainContent";
import VideoDashboard from "./components/VideoDashboard"
import TestVideoDashboard from "./components/TestVideoDashboard"
import Middle from "./components/Middle"


// localStorage.setItem("playlistID", "ABCD ID");

//Clears storage
// localStorage.clear();    
//_______________________________________________________________
const playlistID=localStorage.getItem("playlistID");
console.log(playlistID);
if (playlistID===null) {
    console.log("Storage empty")
}else {
    console.log("Storage full")
}
//_______________________________________________________________

ReactDOM.render(

    <div>
        <Header/>
        {/* <MainContent/> */}
        {/* <Middle/> */}
        
        {/* <VideoDashboard/> */}
        {localCheck()}
       
        
    </div>
    ,document.getElementById("root")
);


function localCheck() {
    if(playlistID===null){
        return(
            <LinkSearch/>
        );
    }else{
        return(
            <TestVideoDashboard/>
        );
    }
}