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
              <a className="nav-link carduppercontent" aria-current="page" href="#">
                All
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link carduppercontent" href="#">
                Last Hour
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link carduppercontent" href="#">
                Last Week
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link carduppercontentlast" href="#">
                Last Month
              </a>
            </li>
          </ul>         
            <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleNavigation()}
          >
            <div className="createb"> Create New PDA </div>
          </button>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="dashboard_cards received-quot">
              <img className="img-size" src={img_2} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>

            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards pending-quot">
              <img className="img-size" src={img_3} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>

            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards approved-quot">
              <img className="img-size" src={img_4} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>

            </div>
          </div>
          <div className="col-3">
            <div className="dashboard_cards ops">
              <img className="img-size" src={img_1} />
              <h3 className="card_count"> 32</h3>
              <h5 className="card_title">Received Quotation</h5>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
