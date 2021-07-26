import React, { useState } from "react";
import axios from "axios";

import TestVideoDashboard from "./TestVideoDashboard";
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
function LinkSearch(){


   const [link, setLink]=useState("");

   
   function handleChange(event) {
      setLink(event.target.value)
   }

   function handleSubmit(event) {
      event.preventDefault();

      //Sending the playlist link to backend
      axios.post("http://localhost:5000/linkSearch", {playlistLink: link})
      .then( (response)=>{
         // console.log(response);
         
         localStorage.removeItem("playlistID");
         localStorage.removeItem("videoIdArray");
         localStorage.setItem("playlistID", response.data);
         console.log(localStorage.getItem("playlistID"));
         // window.location.reload();
         axios.post("http://localhost:5000/videoIdArray", {playlistID: localStorage.getItem("playlistID")})
         .then(  function (r) {
         //   console.log(response.data.videoID);
         console.log(r.data);
         localStorage.setItem("videoIdArray", JSON.stringify(r.data));
         
         });
         
      } )
      setTimeout(() => {
         window.location.reload();
      }, 2000);
   }

return(
    <div>
      <form onSubmit={handleSubmit} >
         <input 
            type="text"
            onChange={handleChange}
            placeholder="Enter Link"
            value={link}     
         />
         <button type="submit" >Go</button>
      </form>
    </div>
   );
}
export default LinkSearch;