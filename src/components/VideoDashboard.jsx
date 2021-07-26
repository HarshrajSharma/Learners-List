import React, {useState} from "react";
import LinkSearch from "./LinkSearch"
const axios=require("axios");

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

let ytArray=[
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
  ];

function DataFetch(){
   

    axios.get("http://localhost:5000/videoIdArray").then(function(response){
    // console.log(response.data.videoID);

    });
}
  
let [embedLink, setEmbedLink]= "";
  

  
function VidButton(bu){

    

    
    const url="https://youtube.googleapis.com/youtube/v3/videos?key="+ process.env.REACT_APP_YTAPI + "&part=snippet&id="+bu;
    const [videoTitle, setVideoTitle]=useState("");

    axios.get(url).then(function(response){

        // console.log(response.data.items[0].snippet.title)
        
        setVideoTitle(response.data.items[0].snippet.title);
        
        // console.log(fetchedDetails);
    
        // console.log(videoTitle);
        });

        
    return(
        <li>
            <input type="checkbox" />
            <button onClick={()=>{setEmbedLink(bu)}}>{videoTitle}</button>
        </li>
    );
}

function Video(){
    [embedLink, setEmbedLink]= useState(ytArray[0]);
    let srcLink="https://www.youtube.com/embed/"+ embedLink + ""; 
    return(
        
            <iframe width="712px" height="400px" src={srcLink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
        
    );
}

function VideoDashboard(){
    DataFetch();
    if (ytArray.length===0) {
        return(<LinkSearch/>);
    }else{
      return(
          <div className="middle" >
              <div className="video" >{Video()}</div>
              <div className="sidebar" >
                  <p>Course Content</p>
                  <div className="scroll">
                    <ul>{ytArray.map(VidButton)}</ul>
                  </div>
              </div>
              
          </div>
      );
    }
}
// console.log(test);
export {ytArray};
export default VideoDashboard;