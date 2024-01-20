import React, { useState } from "react";
import axios from "axios";
import logo from "../images/logo.png"
import swal from "sweetalert";
function LinkSearch() {
  const [link, setLink] = useState("");

  function handleChange(event) {
    setLink(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let reload = true;
    //Sending the playlist link to backend
    axios
      .post(`${process.env.REACT_APP_SERVER}/linkSearch`, { playlistLink: link })
      .then((response) => {
        // console.log(response)

        localStorage.removeItem("playlistID");
        localStorage.removeItem("videoIdArray");
        localStorage.setItem("playlistID", response.data);
        console.log(localStorage.getItem("playlistID"));
        // window.location.reload()
      })

      .finally(() => {
        axios
          .post(`${process.env.REACT_APP_SERVER}/videoIdArray`, {
            playlistID: localStorage.getItem("playlistID"),
          })
          .then(function (r) {
            //   console.log(response.data.videoID)
            console.log(r.data);
            localStorage.removeItem("videoIdArray");

            localStorage.setItem("videoIdArray", JSON.stringify(r.data));
          })
          .catch(
            (error) => {
              console.log(error);
              swal("Invalid or wrong link! \n Retry with correct link.");
              localStorage.clear();
              reload = false;
              setLink("");
            }
          )
          .finally(() => {
            axios
              .post(`${process.env.REACT_APP_SERVER}/videoTitle`, {
                playlistID: localStorage.getItem("playlistID"),
              })
              .then(function (received) {
                //   console.log(response.data.videoID)
                console.log(received.data);
                localStorage.removeItem("videoTitleArray");

                localStorage.setItem("videoTitleArray", JSON.stringify(received.data));
              })
              .finally(() => {
                for (let i = 0; i < JSON.parse(localStorage.getItem("videoTitleArray")).length; i++) {
                  localStorage.setItem("check" + i, false)

                }
                reload && window.location.reload()
              });
          });
      })
      
  }

  return (
    <div>
      <p id="headline" >Track your progress for your YouTube playlist.</p>
      <div id="formDiv" >
        <img id="logo" src={logo} alt="" />
        <form id="linkSearch" onSubmit={handleSubmit}>

          <input

            id="linkInput"
            type="text"
            onChange={handleChange}
            placeholder="Enter Link similar to https://www.youtube.com/playlist?list=something"
            value={link}
            required
          />
          <button id="linkSearchbutton" type="submit">Go</button>
        </form>
      </div>
      <hr  />
      <h1 id="userGuideHeading" >User Guide</h1>
      <div id="userGuideVideo" >
        <iframe width="560" height="315" src="https://www.youtube.com/embed/0QK-BeJrMT8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <hr />
      <h1 id="androidLink" >Copy YouTube playlist link on the Android application.</h1>
      <div id="androidVideo" >
        <iframe width="560" height="315" src="https://www.youtube.com/embed/Gv0Qss2TY8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <footer>
        <div id="about" >
          <h1>About</h1>
          <h3>Learner's List was developed to provide an easy platform for the YouTube learners. It allows us to keep track of the videos we have watched and saves us from other distractive YouTube features.</h3>
        </div>
        <div id="socialLinks" >
          <h2><i id="githubIcon" class="fa fa-github" s><a  target="_blank" rel="noreferrer" href="https://github.com/HarshrajSharma"> GitHub</a></i></h2>
          <h2><i id="githubIcon" class="fa fa-linkedin" s><a  target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/harsh-sharma-88a210150/"> LinkedIn</a></i></h2>
          <h2>&copy; 2021</h2>
          <h2>Made with ❤️ by Harsh</h2>
        </div>
      </footer>

      
    </div>
  );
}
export default LinkSearch;
