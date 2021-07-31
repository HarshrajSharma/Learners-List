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
      .post("http://localhost:5000/linkSearch", { playlistLink: link })
      .then((response) => {
        // console.log(response);

        localStorage.removeItem("playlistID");
        localStorage.removeItem("videoIdArray");
        localStorage.setItem("playlistID", response.data);
        console.log(localStorage.getItem("playlistID"));
        // window.location.reload();
      })

      .finally(() => {
        axios
          .post("http://localhost:5000/videoIdArray", {
            playlistID: localStorage.getItem("playlistID"),
          })
          .then(function (r) {
            //   console.log(response.data.videoID);
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
              .post("http://localhost:5000/videoTitle", {
                playlistID: localStorage.getItem("playlistID"),
              })
              .then(function (received) {
                //   console.log(response.data.videoID);
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

    // setTimeout(() => {
    //    window.location.reload();
    // }, 2000);
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
    </div>
  );
}
export default LinkSearch;
