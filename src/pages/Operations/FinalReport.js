import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/finalreport.css";

const FinalReport = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  employees,
  templates,
  vendors,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="color">final report</div>
      <div class="buttons-wrapper">
        <div class="left">
          <button class="btn btna submit-button btnfsize">
            General Report
          </button>
        </div>
        <div class="right d-flex">
          <button class="btn btna submit-button btnfsize" onClick={() => {}}>
            Send Report
          </button>
          <button
            class="btn btna submit-button btnfsize"
            onClick={() => {
              navigate("/qq-form");
            }}
          >
            QQ Form
          </button>
        </div>
      </div>
    </>
  );
};

export default FinalReport;
