import React, { useEffect, useState, useRef } from "react";
import "flatpickr/dist/themes/material_green.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "../css/viewquotation.css";
import ChargesTable from "./ChargesTable";
import { getPdaDetails } from "../services/apiService";
const ViewQuotation = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
}) => {
  const Group = require("../assets/images/viewquo.png");

  const location = useLocation();

  const row = location.state?.row; // Access the passed row object
  const [editData, setEditData] = useState(null);
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track fetch initiation
  const [finalChargesArray, setFinalChargesArray] = useState([]);

  console.log("Row data:", row);

  // Initialize `editData` when `row` is available
  useEffect(() => {
    if (row) {
      setEditData(row);
    }
  }, [row]);

  // Fetch data only once when `editData` changes
  useEffect(() => {
    console.log(editData, "editData");
    if (editData && !fetchInitiated) {
      setFetchInitiated(true); // Mark fetch as initiated
      fetchPdaDetails(editData?._id);
    }
  }, [editData, fetchInitiated]);

  const getItemName = (id, name) => {
    if (name === "customer") {
      const customer = customers?.find((s) => s._id === id);
      console.log(customer, "customer");
      return customer ? customer.customerName : "Unknown Customer";
    }
  };

  const fetchPdaDetails = async (id) => {
    // alert("fetchPdaDetails");
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      updateValues(pdaDetails);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    console.log(customers, "customers");
  }, [customers]);

  const updateValues = (response) => {
    console.log(response, "updateValues");
    setFinalChargesArray(response?.pdaServices);
  };

  return (
    <>
      <div className="pda-no">
        <div className=" pdarow ">
          <div class="pdanumber ">
            <span> PDA No:</span>
            <span class="fw-bolder pdafontweight">20240483</span>
          </div>
          <div class="d-flex justify-content-start back">
            <div class="pdadate">
              <label
                for="inputPassword"
                class="col-sm-4  col-form-label text-nowrap"
              >
                PDA Date:
              </label>
              <div class="col-sm-4">
                <div class="fw-bolder pdafontweight pda-date">25/11/2024</div>
              </div>
            </div>
          </div>
          {/* <div class="draft-pda ">
          <span class="badge statusbadge ">
            <i class="bi bi-book-fill book"></i></span>
          <div class="pdabadge">Draft PDA</div>
        </div> */}
        </div>
        <div className="charge">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> VesselName:</span>{" "}
            <span className="viewans">{editData?.vesselId?.vesselName}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> PortName:</span>{" "}
            <span className="viewans">{editData?.portId?.portName}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> Cargo:</span>{" "}
            <span className="viewans">{editData?.cargoId?.cargoName}</span>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> IMO No:</span>{" "}
            <span className="viewans"> {editData?.IMONumber}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> GRT:</span> <span className="viewans"> {editData?.GRT}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETD:</span> <span className="viewans"> {editData?.ETD}</span>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> LOA:</span> <span className="viewans"> {editData?.LOA}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> NRT:</span> <span className="viewans"> {editData?.NRT}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETA:</span> <span className="viewans"> {editData?.ETA}</span>
          </div>
        </div>
        {editData?.customerId && (
          <>
            <div className="row viewquocontent">
              <div className=" col-4 viewhead">
                <span> Customer Name:</span>{" "}
                <span className="viewans">
                  {getItemName(editData?.customerId, "customer")}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="charges-table">
        <div className="row mt-4">
          <div className="col-lg-12">
            <ChargesTable
              chargesArray={finalChargesArray}
              services={services}
              customers={customers}
              ports={ports}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewQuotation;
