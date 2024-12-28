import React, { useEffect, useState, useRef } from "react";
import "flatpickr/dist/themes/material_green.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "../css/viewquotation.css";
import ChargesTable from "./ChargesTable";
import { getPdaDetails } from "../services/apiService";
import Loader from "./Loader";
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
  const [pdavalues, setPdavalues] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

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
    setIsLoading(true);

    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      updateValues(pdaDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      setIsLoading(false);
    }
  };

  const updateValues = (response) => {
    console.log(response?.pda?.pda, "updateValues");
    setPdavalues(response?.pda);
    setFinalChargesArray(response?.pdaServices);
  };

  useEffect(() => {
    console.log(pdavalues, "pdavalues");
  }, [pdavalues]);

  return (
    <>
      <div className="pda-no">
        <div className=" pdarow ">
          <div className="pdanumber ">
            <span> PDA No:</span>
            <span className="fw-bolder pdafontweight">
              {pdavalues?.pdaNumber}
            </span>
          </div>
          <div className="d-flex justify-content-start back">
            <div className="pdadate">
              <label
                for="inputPassword"
                className="col-sm-4  col-form-label text-nowrap"
              >
                PDA Date:
              </label>
              <div className="col-sm-4">
                <div className="fw-bolder pdafontweight pda-date">
                  {new Date(pdavalues?.createdAt).toLocaleDateString("en-GB")}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="draft-pda ">
          <span className="badge statusbadge ">
            <i className="bi bi-book-fill book"></i></span>
          <div className="pdabadge">Draft PDA</div>
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
            <span> LOA:</span> <span className="viewans"> {editData?.LOA}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> GRT:</span> <span className="viewans"> {editData?.GRT}</span>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> NRT:</span> <span className="viewans"> {editData?.NRT}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETA:</span>{" "}
            <span className="viewans">
              {new Date(editData?.ETA)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")}
            </span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETD:</span>
            <span className="viewans">
              {new Date(editData?.ETD)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")}
            </span>
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
      <Loader isLoading={isLoading} />
    </>
  );
};

export default ViewQuotation;
