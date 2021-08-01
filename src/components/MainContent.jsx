import React, { useState } from "react";
import LinkSearch from "./LinkSearch";

import axios from "axios";

import ReactGA from 'react-ga';

const trackingId = "G-7H2VFBV0XS";
ReactGA.initialize(trackingId);

function MainContent() {
    
const [ytArray, setYtArray] = useState([]);

 setYtArray([
    '738Dy3D-q-E',
    'fBT0VKkqvtY',
    '3tbjwaGC-ng',
    'qUDp8IUbZto',
    '1QybAZMCYhA' 
  ]);


    if (ytArray.length === 0) {
        return (
            <div>
                <button onClick={() => {
                    axios.get("http://localhost:5000/videoIdArray").then(function (response) {
                        // console.log(response.data.videoID);
                        let tempArray = [];
                        response.data.videoID.map((ID) => {

                            return tempArray.push(ID);

                        });
                        setYtArray(tempArray);
                    });
                    console.log(ytArray);
                }} >Setter</button>
            </div>
        );
    } else {
        return (
            // <div>

            //     <ul>
            //         {ytArray.map((yt) => {
            //             return <li>{yt}</li>
            //         })}
            //     </ul>
            // </div>
            <div className="videoDashboard" >
                <div className="activeVideo" >{() => {
                    let embedLink = ytArray[0];
                    let srcLink = "https://www.youtube.com/embed/" + embedLink + "";
                    return (

                        <iframe width="980px" height="551px" src={srcLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

                    );
                }}</div>
                {/* <div className="buttonList" ><ul>{ytArray.map(VidButton)}</ul></div> */}

            </div>
        );

    }

}
export default MainContent;