import React from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/create-pda");
  };
  const img_1 = require("../assets/images/1.png");
  const img_2 = require("../assets/images/2.png");
  const img_3 = require("../assets/images/3.png");
  const img_4 = require("../assets/images/4.png");

  return (
    <div>
      <div className="card-main">
        <div className="d-flex justify-content-between mb-3">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                Last 24 hour
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Last Weeks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Last Month
              </a>
            </li>
            <li className="nav-item">
              <h6 className="nav-link" href="#">
                Last Year
              </h6>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation()}
          >
            Create New PDA
          </button>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="dashboard_cards received-quot">
              <img className="img-size" src={img_2} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>
              <span className="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards pending-quot">
              <img className="img-size" src={img_3} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>
              <span className="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards approved-quot">
              <img className="img-size" src={img_4} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>
              <span className="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards ops">
              <img className="img-size" src={img_1} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>
              <span className="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
