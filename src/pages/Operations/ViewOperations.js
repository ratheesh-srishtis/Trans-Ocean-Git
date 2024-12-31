import React, { useEffect, useState, useRef } from "react";
import "flatpickr/dist/themes/material_green.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import "../../css/viewquotation.css";
import ChargesTable from "../ChargesTable";
import { getPdaDetails } from "../../services/apiService";
import Loader from "../Loader";
import moment from "moment";

const ViewOperations = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
}) => {
  const Group = require("../../assets/images/jobview.png");

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const row = location.state?.row; // Access the passed row object
  const [editData, setEditData] = useState(null);
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track fetch initiation
  const [finalChargesArray, setFinalChargesArray] = useState([]);
  const [pdaValues, setPdaValues] = useState("");

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
    } else if (name == "cargo") {
      const cargo = cargos?.find((s) => s._id === id);
      return cargo ? cargo.cargoName : "Unknown cargo";
    } else if (name == "vessel") {
      const vessel = vessels?.find((s) => s._id === id);
      return vessel ? vessel.vesselName : "Unknown Vessel";
    } else if (name == "port") {
      const port = ports?.find((s) => s._id === id);
      return port ? port.portName : "Unknown Port";
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
    console.log(response, "updateValues");
    setFinalChargesArray(response?.pdaServices);
    setPdaValues(response?.pda);
  };

  useEffect(() => {
    console.log(pdaValues, "pdaValues");
    console.log(services, "services");
    console.log(cargos, "cargos");
  }, [pdaValues, services, cargos]);
  return (
    <>
      <div className="pda-no">
        <div className=" pdarow ">
          <div className="pdanumber ">
            <span> PDA No:</span>
            <span className="fw-bolder pdafontweight">{pdaValues?.jobId}</span>
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
                  {new Date(pdaValues?.createdAt).toLocaleDateString("en-GB")}
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
            <span className="viewans">
              {getItemName(pdaValues?.vesselId, "vessel")}
            </span>
          </div>
          <div className=" col-4 viewhead">
            <span> PortName:</span>{" "}
            <span className="viewans">
              {getItemName(pdaValues?.portId, "port")}
            </span>
          </div>
          <div className=" col-4 viewhead">
            <span> Cargo:</span>{" "}
            <span className="viewans">
              {getItemName(pdaValues?.cargoId, "cargo")}
              {/* {getItemName(pdaValues?.cargoId, "cargo")} */}
            </span>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> IMO No:</span>{" "}
            <span className="viewans"> {pdaValues?.IMONumber}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> LOA:</span>{" "}
            <span className="viewans"> {pdaValues?.LOA}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> GRT:</span>{" "}
            <span className="viewans"> {pdaValues?.GRT}</span>
          </div>
        </div>
        <div className="row viewquocontent">
          <div className=" col-4 viewhead">
            <span> NRT:</span>{" "}
            <span className="viewans"> {pdaValues?.NRT}</span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETA:</span>{" "}
            <span className="viewans">
              {moment.utc(pdaValues?.ETA).format("DD-MM-YYYY HH:mm A")}
            </span>
          </div>
          <div className=" col-4 viewhead">
            <span> ETD:</span>{" "}
            <span className="viewans">
              {moment.utc(pdaValues?.ETD).format("DD-MM-YYYY HH:mm A")}
            </span>
          </div>
        </div>
        {pdaValues?.customerId && (
          <>
            <div className="row viewquocontent">
              <div className=" col-4 viewhead">
                <span> Customer Name:</span>{" "}
                <span className="viewans">
                  {getItemName(pdaValues?.customerId, "customer")}
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
              isAction={false}
            />
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default ViewOperations;
