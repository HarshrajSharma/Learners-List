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
    '1QybAZMCYhA' 
  ];


function DataFetch(){
   

    axios.get("http://localhost:5000/videoIdArray").then(function(response){
    console.log(response);

    });
}
  
let [embedLink, setEmbedLink]= "";
  

  
function VidButton(bu){

    
    let url="https://youtube.googleapis.com/youtube/v3/videos?key=AIzaSyAKK2tgkGHcae1DaJ6ikJYy4aW2kfB910U&part=snippet&id="+bu;
    const [videoTitle, setVideoTitle]=useState("");
    axios.get(url).then(function(response){
        // console.log(response.data);
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
        
            <iframe width="980px" height="551px" src={srcLink} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        
    );
}

function VideoDashboard(){
    DataFetch();
    
    if (ytArray.length===0) {
        return(<LinkSearch/>);
    }else{
      return(
          <div className="videoDashboard" >
              <div className="activeVideo" >{Video()}</div>
              <div className="buttonList" ><ul>{ytArray.map(VidButton)}</ul></div>

          </div>
      );
    }
}
export {ytArray};
export default VideoDashboard;