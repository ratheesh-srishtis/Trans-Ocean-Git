import React from "react";
import "../css/popup.css";

const PopUp = (props) => {
  const btLogo = require("../assets/images/LOGO.png");
  return (
    <div className="popupbackground">
      <div className="popupcontainermain">
        {/* <div className="logo-header">
          <img
            src={btLogo}
            style={{ height: "50px", width: "50px" }}
            alt="logo"
          />
        </div> */}
        <div className="message">
          <p>{props.message}</p>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
