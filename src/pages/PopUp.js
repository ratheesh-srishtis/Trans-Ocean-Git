import React from "react";
import "../css/popup.css";

const PopUp = (props) => {
  const btLogo = require("../assets/images/check.png");
  return (
    <div className="popupbackground">
      <div className="popupcontainermain">
        <div className="logo-header">
          <img
            src={btLogo}
            alt="logo"
          />
        </div>
        <div className="message">
          <p>{props.message}</p>
        </div>
        <div class="firstfooter d-flex justify-content-Center">
              <button type="button" class="btn add-button">
                OK
              </button>
            </div>
      </div>
    </div>
  );
};

export default PopUp;
