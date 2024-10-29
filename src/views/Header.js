import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const Rectangle = require("../assets/images/Rectangle 1393.png");
  const Notifications = require("../assets/images/Notifications.png");

  return (
    // <header style={{ backgroundColor: "#f8f9fa", padding: "10px 20px" }}>
    //   <h1>My App</h1>
    //   <button onClick={logout}>Logout</button>
    // </header>3
    <>
      <div className="main--content">
        <div className="header--wrapper">
          <div className="header--title">
            <h2>Dashboard</h2>
          </div>

          <div className="d-flex flex-row-reverse gap-5">
            <div className="btn-group">
              <img src={Rectangle} className="userimg"></img>
              <button type="button" className="admin-button text-start">
                Admin
                <div className="fs-6">Username</div>
              </button>
              <button
                type="button"
                className=" downarrow dropdown-toggle dropdown-toggle-split split"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Admin
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Finance
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Operations
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-2">
              <button
                type="button"
                className="btn btn-success px-5 py-3 chatbut"
              >
                {" "}
                <i className="bi bi-chat-text"></i> <span>Chat</span>{" "}
              </button>
            </div>
            <div className="p-2">
              <img src={Notifications} className="bellicon"></img>
            </div>
            <div className="p-2">
              <div className="notification">
                <div>
                  <i className="bi bi-exclamation-triangle-fill alert"></i>
                  <span> New Message</span>
                  <h6> PDA’s are ready for Verification and Approval</h6>
                </div>
                <div>
                  <i className="bi bi-x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
