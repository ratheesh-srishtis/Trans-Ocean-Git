import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/editOperation.css";
import {
  getPdaDetails,
  uploadDocuments,
  editPDA,
  changeQuotationStatus,
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
import PdaDialog from "../PdaDialog";
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
  const navigate = useNavigate();

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
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [pdaResponse, setPdaResponse] = useState(null);

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

  // Fetch data only once when `editData` changes "6756c8e1b42b5b76e6934d29"
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

  useEffect(() => {
    console.log(customers, "customers");
    console.log(selectedVessel, "selectedVessel");
  }, [customers, selectedVessel]);

  const updateValues = (response) => {
    console.log(response, "updateValues");
    setPdaResponse(response?.pda);
    setFinalChargesArray(response?.pdaServices);
    setSelectedPdaId(response?.pda?._id);
    setSelectedPdaStatus(response?.pda?.pdaStatus);
    setRemarks(response?.pda?.remark);
    // setUploadedFiles((prevFiles) => [
    //   ...prevFiles,
    //   ...response?.pda?.documents,
    // ]); // Append new files to existing ones
    setUploadedFiles(response?.pda?.documents); // Append new files to existing ones

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
        console.log(file, "file");
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

  const handleFileDelete = (fileUrl) => {
    // Update the state by filtering out the file with the specified URL
    const updatedFiles = uploadedFiles.filter((file) => file.url !== fileUrl);
    setUploadedFiles(updatedFiles);
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
          setMessage("PDA updated successfully");
          setOpenPopUp(true);
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
    fetchPdaDetails(editData?._id);
  };

  const handleEdit = (charges, index) => {};

  useEffect(() => {
    console.log(selectedCargo, "selectedCargo");
    console.log(selectedStatus, "selectedStatus");
    console.log(uploadedFiles, "uploadedFiles");
    console.log(selectedEmployee, "selectedEmployee");
    console.log(selectedPdaId, "selectedPdaId");
    console.log(selectedPdaStatus, "selectedPdaStatus");
    console.log(pdaResponse, "pdaResponse");
    if (selectedPdaStatus == 6) {
      setSelectedStatus(selectedPdaStatus);
    }
  }, [
    selectedCargo,
    selectedStatus,
    uploadedFiles,
    selectedEmployee,
    selectedPdaId,
    selectedPdaStatus,
    pdaResponse,
  ]);

  const updateQuotation = async () => {
    let pdaPayload = {
      pdaId: editData?._id,
      status: 6,
    };
    try {
      const response = await changeQuotationStatus(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setMessage("PDA completed successfully");
        setOpenPopUp(true);
      } else {
        setMessage("PDA failed. Please try again");
        setOpenPopUp(true);
      }
    } catch (error) {
      setMessage("PDA failed. Please try again");
      setOpenPopUp(true);
    } finally {
    }
  };

  const [generatePDAOpen, setGeneratePDAOpen] = useState(false);

  const handlePdaOpen = () => {
    setGeneratePDAOpen(true);
  };

  const handlePdaClose = () => {
    setGeneratePDAOpen(false);
  };

  return (
    <>
      <div className="job-no">
        {/* firstrow */}
        <div className=" jobrow ">
          <div className="opsnumber ">
            <span> Job ID:</span>
            <span className="fw-bolder opsfontweight">
              {pdaResponse?.jobId}
            </span>
          </div>
          <div className="d-flex justify-content-start back">
            <div className="opsdate">
              <label
                for="inputPassword"
                className="col-sm-4  col-form-label text-nowrap"
              >
                Job Date:
              </label>
              <div className="col-sm-4">
                <div className="fw-bolder opsfontweight ops-date">
                  {new Date(pdaResponse?.createdAt).toLocaleDateString("en-GB")}
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
        <div className="typesofcall-row ">
          <div className="row mb-3 align-items-start">
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Vessel Name<span className="required"> * </span> :
              </label>
              <div className="vessel-select">
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
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Port Name<span className="required"> * </span> :
              </label>
              <div className="vessel-select">
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
        <div className="typesofcall-row ">
          <div className="row  mb-3 align-items-start">
            <div className="col ">
              <label for="exampleFormControlInput1" className="form-label">
                {" "}
                Cargo :
              </label>
              <div className="vessel-select">
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
            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Assigned To{" "}
                {selectedStatus == 6 && (
                  <>
                    <span className="required"> * </span>
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

            <div className="col">
              <label for="exampleFormControlInput1" className="form-label">
                Status <span className="required"> </span> :
              </label>
              <div className="vessel-select">
                <select
                  name="status"
                  className="form-select vesselbox"
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
        <div className="typesofcall-row ">
          <div className="row align-items-start">
            <div className="mb-2">
              <label for="formFile" className="form-label">
                Documents Upload:
              </label>
              <input
                className="form-control documentsfsize"
                type="file"
                id="portofolio"
                accept="image/*"
                multiple
                onChange={documentsUpload}
              ></input>
            </div>
          </div>
        </div>
        {/* <div className="templateouter">
          <div className="d-flex justify-content-between ">
            <div className="tempgenerated ">Upload Image 1</div>
            <div className="d-flex">
              <div className="icondown">
                <i className="bi bi-eye"></i>
              </div>
              <div className="iconpdf">
                <i className="bi bi-trash"></i>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between ">
            <div className="tempgenerated ">Upload Image 2</div>
            <div className="d-flex">
              <div className="icondown">
                <i className="bi bi-eye"></i>
              </div>
              <div className="iconpdf">
                <i className="bi bi-trash"></i>
              </div>
            </div>
          </div>
        </div> */}
        {uploadedFiles && uploadedFiles?.length > 0 && (
          <>
            <div className="templatelink">Uploaded Files:</div>
            <div className="templateouter">
              {uploadedFiles?.length > 0 &&
                uploadedFiles?.map((file, index) => {
                  return (
                    <>
                      <div className="d-flex justify-content-between ">
                        <div className="tempgenerated ">
                          {file?.originalName}
                        </div>
                        <div className="d-flex">
                          <div
                            className="icondown"
                            onClick={() =>
                              window.open(
                                `https://hybrid.sicsglobal.com/transocean_api/assets/${file?.url}`,
                                "_blank"
                              )
                            }
                          >
                            <i className="bi bi-eye"></i>
                          </div>
                          <div
                            className="iconpdf"
                            onClick={() => handleFileDelete(file?.url)}
                          >
                            <i className="bi bi-trash"></i>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </>
        )}
        {/* sixthrowremarks */}
        <div className="row align-items-start">
          <div className="col">
            <div className="mb-3">
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Remarks:
                </label>
                <textarea
                  rows="1"
                  className="form-control"
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
                isAction={true}
              />
            </div>
          </div>
        </div>

        {/* seventhrowbuttons */}

        <div className="buttons-wrapper">
          <div className="left">
            <button
              className="btn btna submit-button btnfsize"
              onClick={() => {
                handlePdaOpen();
              }}
            >
              Generate PDF
            </button>
          </div>
          <div className="right d-flex">
            <button
              className="btn btna submit-button btnfsize"
              onClick={() => {
                navigate("/final-report", { state: { editData } });
              }}
            >
              Final Report
            </button>
            <button
              className="btn btna submit-button btnfsize"
              onClick={() => {
                updateQuotation();
              }}
            >
              Completed
            </button>
            <button
              className="btn btna submit-button btnfsize"
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
      <PdaDialog
        open={generatePDAOpen}
        onClose={handlePdaClose}
        services={services}
        customers={customers}
        ports={ports}
        pdaResponse={pdaResponse}
        vendors={vendors}
        vessels={vessels}
        cargos={cargos}
      />
    </>
  );
};

export default EditOperation;
