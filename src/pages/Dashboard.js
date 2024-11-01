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
      <div class="card-main">
        <div class="d-flex justify-content-between mb-3">
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">
                Last 24 hour
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Last Weeks
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Last Month
              </a>
            </li>
            <li class="nav-item">
              <h6 class="nav-link" href="#">
                Last Year
              </h6>
            </li>
          </ul>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => handleNavigation()}
          >
            Create New PDA
          </button>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="dashboard_cards received-quot">
              <img class="img-size" src={img_2} />
              <h3 class="card_count"> 32</h3>
              <h5 class="card_title">Received Quotation</h5>
              <span class="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div class="col-3">
            <div class="dashboard_cards pending-quot">
              <img class="img-size" src={img_3} />
              <h3 class="card_count"> 32</h3>
              <h5 class="card_title">Received Quotation</h5>
              <span class="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div class="col-3">
            <div class="dashboard_cards approved-quot">
              <img class="img-size" src={img_4} />
              <h3 class="card_count"> 32</h3>
              <h5 class="card_title">Received Quotation</h5>
              <span class="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
          <div class="col-3">
            <div class="dashboard_cards ops">
              <img class="img-size" src={img_1} />
              <h3 class="card_count"> 32</h3>
              <h5 class="card_title">Received Quotation</h5>
              <span class="card_subtitle">-5% From Last Week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
