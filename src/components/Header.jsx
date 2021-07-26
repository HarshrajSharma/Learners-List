import React from "react";


function Navigation(){
    return(
        <div className="top" >
            <h1>Hello</h1>
            <button onClick={()=>{
                localStorage.clear();
                window.location.reload();
            }} >Reset</button>
            <button onClick={()=>{
                // localStorage.setItem("playlistID", "ABCD ID");
                localStorage.setItem("playlistID", "PL-Jc9J83PIiE-TR27GB7V5TBLQRT5RnSl");
                window.location.reload();

            }} >Check</button>
        </div>
    );
}

export default Navigation;