import React, { useEffect, useState } from "react";
import LinkSearch from "./LinkSearch";



function VideoDashboard() {






  let videoIdArray = [];
  let videoTitleArray = [];
  let [embedLink, setEmbedLink] = "";
  let [currentVideoTitle, setCurrentVideoTitle] = "";




  //VideoIdArray is stored in local storage and will be fetched from local storage with below code
  videoIdArray = [JSON.parse(localStorage.getItem("videoIdArray"))]
  // console.log(videoIdArray);
  videoTitleArray = [JSON.parse(localStorage.getItem("videoTitleArray"))];

  // console.log(videoIdArray[0].length);









  function Video() {
    [embedLink, setEmbedLink] = useState(videoIdArray[0][0]);
    [currentVideoTitle, setCurrentVideoTitle] = useState(videoTitleArray[0][0]);
    useEffect(()=>{
      if (localStorage.getItem("resumeEmbedLink")!==null) {
        setEmbedLink(localStorage.getItem("resumeEmbedLink"));
      }
      if (localStorage.getItem("resumeCurrentTitle")!==null) {
        setCurrentVideoTitle(localStorage.getItem("resumeCurrentTitle"));
      }

    },[]);
    
    let srcLink = "https://www.youtube.com/embed/" + embedLink + "";
    return (
      <iframe

        id="mainVideo"
        src={srcLink}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="allowFullScreen"
      ></iframe>
    );
  }

















  function VidButton(bu) {

    let videoTitle = "";
    // console.log(videoIdArray[0].indexOf(bu));
    let i = videoIdArray[0].indexOf(bu);
    videoTitle = videoTitleArray[0][i];



    useEffect(() => {
      console.log("Hello");
      if (JSON.parse(localStorage.getItem("check" + i)) === true) {
        document.getElementById("bu" + i).style.backgroundColor = "#8BE78B"
        document.getElementById("done" + i).style.backgroundColor = "#8BE78B"
      } else {
        document.getElementById("bu" + i).style.backgroundColor = "#EFEFEF"
        document.getElementById("done" + i).style.backgroundColor = "#EFEFEF"

      }
    }, [i]);
    return (
      <li className="titleBlock">

        <input

          type="button"
          id={"done" + i}
          value={JSON.parse(localStorage.getItem("check" + i)) ? "✔️" : "🔘"}
          onClick={() => {
            console.log("Hello");
            if (JSON.parse(localStorage.getItem("check" + i)) === true) {
              localStorage.setItem("check" + i, false);
              document.getElementById("bu" + i).style.backgroundColor = "#EFEFEF";
              document.getElementById("done" + i).style.backgroundColor = "#EFEFEF";
              document.getElementById("done" + i).value = "🔘";

            } else if (JSON.parse(localStorage.getItem("check" + i)) === false) {
              localStorage.setItem("check" + i, true);
              document.getElementById("bu" + i).style.backgroundColor = "#8BE78B";
              document.getElementById("done" + i).style.backgroundColor = "#8BE78B";
              document.getElementById("done" + i).value = "✔️";

            }
          }} />

        <button
          id={"bu" + i}
          onClick={() => {
            setEmbedLink(bu);
            setCurrentVideoTitle(videoTitleArray[0][i]);
            localStorage.setItem("resumeEmbedLink", bu);
            localStorage.setItem("resumeCurrentTitle", videoTitleArray[0][i]);
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
        <div id="videoAndTitle" >
          <div className="video">{Video()}</div>
          <p id="currentVideoTitle" >{currentVideoTitle}</p>
        </div>
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
