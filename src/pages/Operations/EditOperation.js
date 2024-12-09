import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../css/editOperation.css";
import {
  getPdaDetails,
  uploadDocuments,
  editPDA,
} from "../../services/apiService";
import Loader from "../Loader";
import PopUp from "../PopUp";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import OpsChargesTable from "./OpsChargesTable";

const EditOperation = ({
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
  const Group = require("../../assets/images/upjobs.png");
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

  const row = location.state?.row; // Access the passed row object
  const [editData, setEditData] = useState(null);
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track fetch initiation
  const [finalChargesArray, setFinalChargesArray] = useState([]);

  const [selectedPdaId, setSelectedPdaId] = useState(null);
  const [selectedPdaStatus, setSelectedPdaStatus] = useState(null);
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(selectedPdaStatus);
  const [assignedTo, setAssignedTo] = useState(null);
  const [remarks, setRemarks] = useState(null);

  const [selectedVesselError, setSelectedVesselError] = useState(false);
  const [selectedPortError, setSelectedPortError] = useState(false);
  const [assignedToError, setAssignedToError] = useState(false);
  const [selectedCargoError, setSelectedCargoError] = useState(false);

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
    console.log(selectedVessel, "selectedVessel");
  }, [customers, selectedVessel]);

  const updateValues = (response) => {
    console.log(response, "updateValues");
    setFinalChargesArray(response?.pdaServices);
    setSelectedPdaId(response?.pda?._id);
    setSelectedPdaStatus(response?.pda?.pdaStatus);
    setRemarks(response?.pda?.remark);
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...response?.pda?.documents,
    ]); // Append new files to existing ones

    let selectedVessel;
    if (response?.pda?.vesselId) {
      let vessels_list = localStorage.getItem("vessels_list");
      selectedVessel = JSON.parse(vessels_list).find((vessel) => {
        return vessel._id == response?.pda?.vesselId;
      });
      console.log(selectedVessel, "selectedVessel");
    }
    if (selectedVessel) {
      setSelectedVessel(selectedVessel);
    }

    let selectedPort;
    if (response?.pda?.portId) {
      let ports_list = localStorage.getItem("ports_list");
      selectedPort = JSON.parse(ports_list).find(
        (port) => port._id == response?.pda?.portId
      );
      console.log(selectedPort, "selectedPort");
    }
    if (selectedPort) {
      setSelectedPort(selectedPort);
    }

    let selectedCargo;
    if (response?.pda?.cargoId) {
      let cargos_list = localStorage.getItem("cargos_list");
      selectedCargo = JSON.parse(cargos_list).find(
        (cargo) => cargo._id === response?.pda?.cargoId
      );
      console.log(selectedCargo, "selectedCargo");
    }

    if (selectedCargo) {
      setSelectedCargo(selectedCargo);
    }

    let selectedEmployee;
    if (response?.pda?.assignedEmployee) {
      let employees_list = localStorage.getItem("employees_list");
      selectedEmployee = JSON.parse(employees_list).find(
        (employee) => employee._id === response?.pda?.assignedEmployee
      );
      console.log(selectedEmployee, "selectedEmployee");
    }

    if (selectedEmployee) {
      setSelectedEmployee(selectedEmployee);
    }
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    console.log(value, "value");
    switch (name) {
      case "vessel":
        setSelectedVessel(vessels.find((vessel) => vessel._id === value));
        setSelectedVesselError(false);
        break;
      case "port":
        setSelectedPort(ports.find((port) => port._id === value));
        setSelectedPortError(false);
        break;
      case "cargo":
        setSelectedCargo(cargos.find((cargo) => cargo._id === value));
        break;
      case "employee":
        setSelectedEmployee(
          employees.find((employee) => employee._id === value)
        );
        setAssignedToError(false);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "remarks") {
      setRemarks(value);
    }
  };

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const documentsUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();

      // Append all selected files to FormData
      Array.from(event.target.files).forEach((file) => {
        formData.append("files", file); // "files" is the expected key for your API
      });

      try {
        setUploadStatus("Uploading...");
        const response = await uploadDocuments(formData);

        if (response.status) {
          setUploadStatus("Upload successful!");
          setUploadedFiles((prevFiles) => [...prevFiles, ...response.data]); // Append new files to existing ones
        } else {
          setUploadStatus("Upload failed. Please try again.");
        }
      } catch (error) {
        console.error("File upload error:", error);
        setUploadStatus("An error occurred during upload.");
      }
    }
  };

  const handleFileDelete = (fileToDelete) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToDelete)
    );
  };

  const submitJobs = async (status) => {
    if (!selectedVessel) {
      setSelectedVesselError(true);
    }
    if (!selectedPort) {
      setSelectedPortError(true);
    }
    if (!selectedEmployee && selectedStatus == 6) {
      setAssignedToError(true);
    }
    if (
      selectedVessel &&
      selectedPort &&
      (selectedStatus !== "6" || selectedEmployee)
    ) {
      let pdaPayload = {
        pdaId: editData?._id,
        vesselId: selectedVessel?._id ? selectedVessel?._id : selectedVessel,
        portId: selectedPort?._id ? selectedPort?._id : selectedPort,
        cargoId: selectedCargo?._id ? selectedCargo?._id : selectedCargo,
        assignedEmployee: selectedEmployee?._id,
        documents: uploadedFiles,
        charges: finalChargesArray,
        pdaStatus: Number(selectedStatus),
        remark: remarks,
      };
      console.log(pdaPayload, "pdaPayload");
      try {
        const response = await editPDA(pdaPayload);
        if (response?.status == true) {
          fetchPdaDetails(response?.pda?._id);
        } else {
          setMessage("PDA failed. Please try again");
          setOpenPopUp(true);
        }
      } catch (error) {
        setMessage("PDA failed. Please try again");
        setOpenPopUp(true);
      } finally {
      }
    } else {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
    }
  };

  const handleSubmit = (chargesArray) => {
    console.log("chargesArray Submitted: ", chargesArray);
    setFinalChargesArray(chargesArray);
  };

  const handleEdit = (charges, index) => {};

  useEffect(() => {
    console.log(selectedCargo, "selectedCargo");
    console.log(selectedStatus, "selectedStatus");
    console.log(uploadedFiles, "uploadedFiles");
    console.log(selectedEmployee, "selectedEmployee");
    console.log(selectedPdaId, "selectedPdaId");
    console.log(selectedPdaStatus, "selectedPdaStatus");
    setSelectedStatus(selectedPdaStatus);
  }, [
    selectedCargo,
    selectedStatus,
    uploadedFiles,
    selectedEmployee,
    selectedPdaId,
    selectedPdaStatus,
  ]);

  return (
    <>
      <div className="job-no">
        {/* firstrow */}
        <div class=" jobrow ">
          <div class="opsnumber ">
            <span> Job ID:</span>
            <span class="fw-bolder opsfontweight">{editData?.JobId}</span>
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
                <div class="fw-bolder opsfontweight ops-date">
                  {editData?.date}
                </div>
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
                  className="form-select vesselbox"
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                  value={selectedVessel?._id}
                >
                  <option value="">Choose Vessel name</option>
                  {vessels.map((vessel) => (
                    <option key={vessel._id} value={vessel._id}>
                      {vessel.vesselName}
                    </option>
                  ))}
                </select>
              </div>
              {selectedVesselError && (
                <>
                  <div className="invalid">Please select vessel</div>
                </>
              )}
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Port Name<span class="required"> * </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="port"
                  className="form-select vesselbox"
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                  value={selectedPort?._id}
                >
                  <option value="">Choose Port name</option>
                  {ports.map((port) => (
                    <option key={port._id} value={port._id}>
                      {port.portName}
                    </option>
                  ))}
                </select>
              </div>
              {selectedPortError && (
                <>
                  <div className="invalid">Please select port</div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* fourthrow */}
        <div class="typesofcall-row ">
          <div class="row  mb-3 align-items-start">
            <div class="col ">
              <label for="exampleFormControlInput1" class="form-label">
                {" "}
                Cargo :
              </label>
              <div class="vessel-select">
                <select
                  name="cargo"
                  className="form-select vesselbox"
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                  value={selectedCargo?._id}
                >
                  <option value="">Choose Cargo name</option>
                  {cargos.map((cargo) => (
                    <option key={cargo._id} value={cargo._id}>
                      {cargo.cargoName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Assigned To{" "}
                {selectedStatus == 6 && (
                  <>
                    <span class="required"> * </span>
                  </>
                )}{" "}
                :
              </label>
              <select
                name="employee"
                className="form-select vesselbox"
                onChange={handleSelectChange}
                aria-label="Default select example"
                value={selectedEmployee?._id}
              >
                <option value="">Choose Employee name</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                  </option>
                ))}
              </select>
              {assignedToError && (
                <>
                  <div className="invalid">Please select assigned to</div>
                </>
              )}
            </div>

            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">
                Status <span class="required"> </span> :
              </label>
              <div class="vessel-select">
                <select
                  name="status"
                  class="form-select vesselbox"
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                  value={selectedStatus}
                >
                  <option value={5} disabled={selectedPdaStatus == 6}>
                    Open{" "}
                  </option>
                  <option value={6}>In Progress </option>
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
                id="portofolio"
                accept="image/*"
                multiple
                onChange={documentsUpload}
              ></input>
            </div>

            {uploadedFiles?.length > 0 && (
              <>
                <Paper elevation={1} style={{ marginTop: 1, padding: 1 }}>
                  <List>
                    {uploadedFiles.map((file, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={file} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() =>
                              window.open(
                                `https://hybrid.sicsglobal.com/${file}`,
                                "_blank"
                              )
                            }
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleFileDelete(file)} // Pass the file to the delete function
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </>
            )}
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
                  onChange={handleInputChange}
                  value={remarks}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="charges-table">
          <div className="row mt-4">
            <div className="col-lg-12">
              <OpsChargesTable
                chargesArray={finalChargesArray}
                services={services}
                customers={customers}
                onSubmit={handleSubmit}
                ports={ports}
                onEdit={handleEdit}
                templates={templates}
                vendors={vendors}
              />
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
            <button
              class="btn btna submit-button btnfsize"
              onClick={() => {
                submitJobs();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default EditOperation;
