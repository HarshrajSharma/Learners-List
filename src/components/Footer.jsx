import React from "react";
import ReactGA from 'react-ga';

const trackingId = "G-7H2VFBV0XS";
ReactGA.initialize(trackingId);

function Footer(){
    return(
        <div className="footer" >
            <div className="about" >
                <h2>About</h2>
            </div>
            <div className="socialLinks" ></div>
        </div>
    );

}

export default Footer;