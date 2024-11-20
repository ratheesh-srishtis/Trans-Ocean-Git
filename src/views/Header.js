import React from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { logout, loginResponse } = useAuth();
  const Rectangle = require("../assets/images/Rectangle 1393.png");
  const Notifications = require("../assets/images/Notifications.png");
  console.log(loginResponse, "loginResponseHEader");

  const location = useLocation();

  // Determine the heading text based on the current path
  const getHeaderText = () => {
    if (location.pathname.includes("/dashboard")) {
      return "Dashboard";
    } else if (location.pathname.includes("/create-pda")) {
      return "Create New PDA";
    }
    // Add more conditions as needed for other routes
    return "Page";
  };

  return (
    // <header style={{ backgroundColor: "#f8f9fa", padding: "10px 20px" }}>
    //   <h1>My App</h1>
    //   <button onClick={logout}>Logout</button>
    // </header>3
    <>
      <div className="main--content">
        <div className="header--wrapper">
          <div className="header--title">
            <h5>{getHeaderText()}</h5>
            <div className="version"> Version: 0.011</div>
          </div>

          <div className="d-flex flex-row-reverse ">
            <div className="btn-group">
              <img src={Rectangle} className="userimg"></img>
              <button
                type="button"
                className="admin-button text-start namefinance"
              >
                Finance
                <div className="nameuser">{loginResponse?.data?.name}</div>
              </button>
              <button
                type="button"
                className=" downarrow dropdown-toggle dropdown-toggle-split split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu">
                {/* <li>
                  <a className="dropdown-item" href="#">
                    Admin
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Finance
                  </a>
                </li>
                <li className="usersep">
                  <a className="dropdown-item" href="#">
                    Operations
                  </a>
                </li> */}
                <li className="signoutmain" onClick={logout}>
                  <a className="dropdown-item" href="#">
                    <i className="bi bi-box-arrow-left"></i>
                    <span className="px-2">Signout</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-2">
              <button type="button" className="btn btn-success px-4 py-2">
                {" "}
                <i className="bi bi-chat-text"></i> <span>Chats</span>{" "}
              </button>
            </div>
            <div className="p-2">
              <img src={Notifications} className="bellicon"></img>
            </div>
            {/* <div className="p-2">
              <div className="notification">
                <div>
                  <i className="bi bi-exclamation-triangle-fill alert"></i>
                  <span class="new"> New Message</span>
                  <h6> PDA’s are ready for Verification and Approval</h6>
                </div>
                <div>
                  <i className="bi bi-x"></i>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
