import React, { useEffect, useState } from "react";
import LinkSearch from "./LinkSearch";
import { ytArray } from "./VideoDashboard";
const axios = require("axios");

/*TODO: COrrect way of using array as useState:
const [ytArray, setYtArray]=useState([]);

<button onClick= {()=>{
    setYtArray([...ytArray], {
        id: ytArray.length,
        value: Math.floor(Math.random()*10)+1
    });
}} >Setter</button>

*/

// let arr=["A", "B", "C", "D", "E"];
// let arr2=["A", "B", "C", "D", "E", "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", "A", "B", "C", "D", "E", "A", "B", "C", "D", "E"];

// let ytArray=[
//     '738Dy3D-q-E',
//     'fBT0VKkqvtY',
//     '3tbjwaGC-ng',
//     'qUDp8IUbZto',
//     '1QybAZMCYhA',
//     '738Dy3D-q-E',
//     'fBT0VKkqvtY',
//     '3tbjwaGC-ng',
//     'qUDp8IUbZto',
//     '1QybAZMCYhA'
//   ];
let testArray=[];


function VideoDashboard() {

  let [ytArray, setYtarray] = useState([
        '738Dy3D-q-E',
        'fBT0VKkqvtY',
        '3tbjwaGC-ng',
        'qUDp8IUbZto',
        '1QybAZMCYhA',
        '738Dy3D-q-E',
        'fBT0VKkqvtY',
        '3tbjwaGC-ng',
        'qUDp8IUbZto',
        '1QybAZMCYhA'
      ]);


  

  let videoIdArray=[];
  let [embedLink, setEmbedLink] = "";

  



 //This will run the function only when the component loads not re-render
//  useEffect( ()=>{
//   fetchVideoIdArray();
  
// } ,[]);



  //VideoIdArray is stored in local storage and will be fetched from local storage with below code
  videoIdArray=[JSON.parse(localStorage.getItem("videoIdArray"))]
  // console.log(videoIdArray);




 
  
 

  function Video() {
    [embedLink, setEmbedLink] = useState(videoIdArray[0][0]);
    let srcLink = "https://www.youtube.com/embed/" + embedLink + "";
    return (
      <iframe
        width="712px"
        height="400px"
        src={srcLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    );
  }

  function VidButton(bu) {
    const url =
      "https://youtube.googleapis.com/youtube/v3/videos?key=" +
      process.env.REACT_APP_YTAPI +
      "&part=snippet&id=" +
      bu;
    const [videoTitle, setVideoTitle] = useState("");

    axios.get(url).then(function (response) {
      // console.log(response.data.items[0].snippet.title)

      setVideoTitle(response.data.items[0].snippet.title);
      // console.log(response);
      // console.log(fetchedDetails);

      // console.log(videoTitle);
    });

    return (
      <li>
        <input type="checkbox" />
        <button
          onClick={() => {
            setEmbedLink(bu);
          }}
        >
          {videoTitle}
        </button>
      </li>
    );
  }

  
  if (videoIdArray.length === 0) {
    return (
      <div>
        <p>Invalid or wrong link</p>
        <LinkSearch />
      </div>
    );
  } else {
    return (
      <div className="middle">
        <div className="video">{Video()}</div>
        <div className="sidebar">
          <p>Course Content</p>
          <div className="scroll">
            <ul>{videoIdArray[0].map(VidButton)}</ul>
          </div>
        </div>
      </div>
    );
  }
}
// console.log(test);
// export {ytArray};
export default VideoDashboard;
