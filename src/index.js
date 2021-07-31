import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/Header"
import LinkSearch from "./components/LinkSearch"
import VideoDashboard from "./components/VideoDashboard"


//_______________________________________________________________
const playlistID = localStorage.getItem("playlistID");
console.log(playlistID);
if (playlistID === null) {
    console.log("Storage empty")
} else {
    console.log("Storage full")
}
//_______________________________________________________________

ReactDOM.render(

    <div>
        <Header />
        {localCheck()}
       

    </div>
    , document.getElementById("root")
);


function localCheck() {
    if (playlistID === null) {
        return (
            <LinkSearch />
        );
    } else {
        return (
            <VideoDashboard />
        );
    }
}