import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../css/editOperation.css";
import { getPdaDetails } from "../../services/apiService";
import ChargesTable from "../ChargesTable";
import AddJobs from "./AddJobs";
const EditOperation = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
}) => {
  const Group = require("../../assets/images/upjobs.png");

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

  const [open, setOpen] = useState(false);

  const openDialog = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="job-no">
        {/* firstrow */}
        <div class=" jobrow ">
          <div class="opsnumber ">
            <span> Job ID:</span>
            <span class="fw-bolder opsfontweight">TOMS/OM/24/253</span>
          </div>
          <div class="d-flex justify-content-start back">
            <div class="opsdate">
              <label
                for="inputPassword"
                class="col-sm-4  col-form-label text-nowrap"
              >
                Job Date:
              </label>
              <div class="col-sm-4">
                <div class="fw-bolder opsfontweight ops-date">27/11/2024</div>
              </div>
            </div>
          </div>
        </div>
        {/* secondrow */}
        <div className="charge">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        {/* thirdrow */}
        <div class="typesofcall-row ">
          <div class="row mb-3 align-items-start">
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Vessel Name<span class="required"> * </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="vessel"
                  class="form-select vesselbox"
                  aria-label="Default select example"
                >
                  <option value="">Choose Vessel name</option>
                  <option value="671a62f13b3ccd845029310b">
                    Jimei Shunhao
                  </option>
                  <option value="671a63363b3ccd8450293160">
                    MV Toro Bianco
                  </option>
                  <option value="671a63823b3ccd84502931bf">
                    MV Viva Globus
                  </option>
                  <option value="672b44d13b3ccd84503dde97">
                    Chicago Express
                  </option>
                </select>
              </div>
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Port Name<span class="required"> * </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="port"
                  class="form-select vesselbox"
                  aria-label="Default select example"
                >
                  <option value="">Choose Port name</option>
                  <option value="673dda5e3b3ccd84505ab453">
                    Port Fujairah
                  </option>
                  <option value="673dda283b3ccd84505ab415">
                    Port Mina Al Fahl
                  </option>
                  <option value="673dda413b3ccd84505ab42e">Port Sur</option>
                  <option value="673dda773b3ccd84505ab46d">Port Suwaiq</option>
                  <option value="671a5fa23b3ccd8450292ca2">Port of Duqm</option>
                  <option value="671a5f883b3ccd8450292c7c">
                    Port of Khasab
                  </option>
                  <option value="671a5f6c3b3ccd8450292c58">
                    Port of Muscat
                  </option>
                  <option value="671a5f793b3ccd8450292c66">
                    Port of Salalah
                  </option>
                  <option value="671a5f943b3ccd8450292c90">
                    Port of Shinas
                  </option>
                  <option value="671a5fb53b3ccd8450292cb8">
                    Port of Sohar
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* fourthrow */}
        <div class="typesofcall-row ">
          <div class="row  mb-3 align-items-start">
            <div class="col ">
              <label for="exampleFormControlInput1" class="form-label">
                {" "}
                Cargo <span class="required"> * </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="vessel"
                  class="form-select vesselbox"
                  aria-label="Default select example"
                >
                  <option value="">Choose Cargo</option>
                  <option value="671a62f13b3ccd845029310b">
                    {" "}
                    Anthracite Coal
                  </option>
                  <option value="671a63363b3ccd8450293160">
                    Bundled Steel
                  </option>
                  <option value="671a63823b3ccd84502931bf">Oil Drums </option>
                  <option value="672b44d13b3ccd84503dde97">Chemicals </option>
                </select>
              </div>
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Assigned To:
              </label>
              <input
                name="vesselVoyageNumber"
                type=""
                class="form-control vessel-voyage"
                id="exampleFormControlInput1"
                placeholder=""
                value=""
              ></input>
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Status <span class="required"> </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="port"
                  class="form-select vesselbox"
                  aria-label="Default select example"
                >
                  <option value="">Choose Status</option>
                  <option value="673dda5e3b3ccd84505ab453">Open </option>
                  <option value="673dda283b3ccd84505ab415">In Progress </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* fifthrowdocumentsupload */}
        <div class="typesofcall-row ">
          <div class="row align-items-start">
            <div class="mb-2">
              <label for="formFile" class="form-label">
                Documents Upload:
              </label>
              <input
                class="form-control documentsfsize"
                type="file"
                id="formFile"
              ></input>
            </div>
          </div>
        </div>
        {/* sixthrowremarks */}
        <div class="row align-items-start">
          <div class="col">
            <div class="mb-3">
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">
                  Remarks:
                </label>
                <textarea
                  rows="1"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                  name="remarks"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        {/* seventhrowbuttons */}
        <div class="buttons-wrapper">
          <div class="left">
            <button class="btn btna submit-button btnfsize">
              Generate PDF
            </button>
          </div>
          <div class="right d-flex">
            <button class="btn btna submit-button btnfsize">
              Final Report
            </button>
            <button class="btn btna submit-button btnfsize">Completed</button>
            <button class="btn btna submit-button btnfsize">Save</button>
            <button
              class="btn btna submit-button btnfsize"
              onClick={() => {
                openDialog();
              }}
            >
              Open Dialog Test
            </button>
          </div>
        </div>
      </div>

      <AddJobs open={open} onClose={handleClose} />
    </>
  );
};

export default EditOperation;
