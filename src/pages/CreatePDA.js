import React, { useEffect, useState, useRef } from "react";
import "../css/createpda.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResponsiveDialog from "./ResponsiveDialog";
import ChargesTable from "./ChargesTable";
import {
  savePda,
  changeQuotationStatus,
  editPDA,
  getPdaDetails,
  getPdaFile,
  getAnchorageLocations,
} from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopUp from "./PopUp";
import QuotationDialog from "./QuotationDialog";
import PdaDialog from "./PdaDialog";
import Remarks from "./Remarks";
import moment from "moment";
import { useLocation } from "react-router-dom";

const CreatePDA = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
  vendors,
}) => {
  const Group = require("../assets/images/Group 1000002975.png");
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedVesselError, setSelectedVesselError] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [selectedPortError, setSelectedPortError] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedCargoCapacity, setSelectedCargoCapacity] = useState(null);
  const [selectedBerth, setSelectedBerth] = useState(null);
  const [selectedAnchorageLocation, setSelectedAnchorageLocation] =
    useState(null);
  const [selectedVesselType, setSelectedVesselType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [eta, setEta] = useState("");
  const [etd, setEtd] = useState("");
  const [status, setStatus] = useState(1);
  const [finalChargesArray, setFinalChargesArray] = useState([]);
  const [isEditcharge, setIsEditcharge] = useState(false);
  const [editCharge, setEditCharge] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [fullPdaResponse, setFullPdaResponse] = useState(null);
  const [pdaResponse, setPdaResponse] = useState(null);
  const [pdaServicesResponse, setPdaServicesResponse] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [anchorageLocations, setAnchorageLocations] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [formData, setFormData] = useState({
    vesselVoyageNumber: "",
    IMONumber: "",
    LOA: "",
    GRT: "",
    NRT: "",
  });

  // Boolean states for each option
  const [isVessels, setIsVessels] = useState(false);
  const [isServices, setIsServices] = useState(false);
  const [typeOfVesselError, setTypeOfVesselError] = useState(false);

  const [isCustomerApproved, setIsCustomerApproved] = useState(false);

  // Handler functions to toggle each state
  const handleVesselsChange = () => {
    setIsVessels(!isVessels);
    if (!isVessels) {
      setTypeOfVesselError(false);
    }
  };

  const handleCustomerApproved = () => {
    setIsCustomerApproved(!isCustomerApproved);
  };

  const handleServicesChange = () => {
    setIsServices(!isServices);
    if (!isServices) {
      setTypeOfVesselError(false);
    }
  };

  console.log(vessels, "vessels");
  console.log(ports, "ports");
  console.log(cargos, "cargos");
  console.log(vesselTypes, "vesselTypes");
  console.log(customers, "customers");
  console.log(loginResponse, "loginResponse");

  // Handle select change
  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "vessel":
        setSelectedVessel(vessels.find((vessel) => vessel._id === value));
        setSelectedVesselError(false);
        console.log(value, "value_VESSEL");
        if (value == "672b44d13b3ccd84503dde97") {
          setFormData((prevFormData) => ({
            ...prevFormData,
            IMONumber: "",
            LOA: "",
            GRT: "",
            NRT: "",
          }));
        }
        break;
      case "port":
        setSelectedPort(ports.find((port) => port._id === value));
        setSelectedPortError(false);
        fetchAnchorageValues(ports.find((port) => port._id === value));
        break;
      case "cargo":
        setSelectedCargo(cargos.find((cargo) => cargo._id === value));
        break;
      case "vesselType":
        setSelectedVesselType(vesselTypes.find((type) => type._id === value));
        break;
        break;
      case "customer":
        setSelectedCustomer(
          customers.find((customer) => customer._id === value)
        );
        break;
      case "anchorageLocation":
        setSelectedAnchorageLocation(
          anchorageLocations.find((location) => location._id === value)
        );
        break;
      default:
        break;
    }
  };

  // Single handler function to update state based on input name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "value_handleInputChange");

    if (name === "cargoCapacity") {
      setSelectedCargoCapacity(value);
    } else if (name === "berth") {
      setSelectedBerth(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handlers to update dates

  const handleEtaChange = (date) => {
    if (date) {
      setEta(date);
    }
  };

  const handleEtdChange = (date) => {
    if (date) {
      setEtd(date);
    }
  };

  useEffect(() => {
    console.log(selectedPort, "selectedPort");
    console.log(selectedCargo, "selectedCargo");
    console.log(selectedVessel, "selectedVessel");
    console.log(selectedVesselType, "selectedVesselType");
    console.log(selectedCustomer, "selectedCustomer");
    console.log(isVessels, "isVessels");
    console.log(isServices, "isServices");
    console.log(eta, "eta");
    console.log(etd, "etd");
    console.log(anchorageLocations, "anchorageLocations");
    console.log(selectedAnchorageLocation, "selectedAnchorageLocation");
    console.log(uploadedFiles, "uploadedFiles");
    console.log("Effect triggered");
  }, [
    selectedPort,
    selectedCargo,
    selectedVesselType,
    selectedVessel,
    selectedCustomer,
    isVessels,
    isServices,
    eta,
    etd,
    anchorageLocations,
    selectedAnchorageLocation,
    uploadedFiles,
  ]);

  // useEffect(() => {
  //   console.log(selectedVessel, "selectedVessel");
  //   if (
  //     selectedVessel?.vesselName !== "TBA" &&
  //     pdaResponse == null &&
  //     editData == null
  //   ) {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       IMONumber: selectedVessel?.IMONumber,
  //       LOA: selectedVessel?.LOA,
  //       GRT: selectedVessel?.GRT,
  //       NRT: selectedVessel?.NRT,
  //     }));
  //   } else if (
  //     selectedVessel?.vesselName == "TBA" &&
  //     editData == null &&
  //     pdaResponse == null
  //   ) {
  //     alert("tba block");
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       IMONumber: "",
  //       LOA: "",
  //       GRT: "",
  //       NRT: "",
  //     }));
  //   } else if (selectedVessel?.vesselName == "TBA" && editData) {
  //     alert("tba block");
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       IMONumber: selectedVessel?.IMONumber,
  //       LOA: selectedVessel?.LOA,
  //       GRT: selectedVessel?.GRT,
  //       NRT: selectedVessel?.NRT,
  //     }));
  //   } else if (selectedVessel?.vesselName == "TBA" && pdaResponse) {
  //     alert("tba pdaResponse block");
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       IMONumber: pdaResponse?.IMONumber,
  //       LOA: pdaResponse?.LOA,
  //       GRT: pdaResponse?.GRT,
  //       NRT: pdaResponse?.NRT,
  //     }));
  //   }
  // }, [selectedVessel]); // Only re-run when selectedVessel changes

  useEffect(() => {
    console.log(selectedVessel, "selectedVessel");
    if (selectedVessel?.vesselName !== "TBA") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        IMONumber: selectedVessel?.IMONumber,
        LOA: selectedVessel?.LOA,
        GRT: selectedVessel?.GRT,
        NRT: selectedVessel?.NRT,
      }));
    }
  }, [selectedVessel]); // Only re-run when selectedVessel changes

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);
  const [open, setOpen] = useState(false);
  const [quotationOpen, setQuotationOpen] = useState(false);
  const [generatePDAOpen, setGeneratePDAOpen] = useState(false);
  const [remarksOpen, setRemarksOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuotationOpen = () => {
    setQuotationOpen(true);
  };

  const handleQuotationClose = () => {
    setQuotationOpen(false);
  };

  const handlePdaOpen = () => {
    setGeneratePDAOpen(true);
  };

  const handlePdaClose = () => {
    setGeneratePDAOpen(false);
  };

  const handleRemarksOpen = () => {
    setRemarksOpen(true);
  };

  const handleRemarksClose = () => {
    setRemarksOpen(false);
  };

  const handleRemarksSubmit = async (remark) => {
    console.log(remark, "handleRemarksSubmit");
    let pdaPayload = {
      pdaId: pdaResponse?._id,
      status: "4",
      rejectedRemark: remark,
    };
    try {
      const response = await changeQuotationStatus(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setPdaResponse(response?.pda);
        if (response?.pda?.pdaStatus == 4) {
          setIsApproved(true);
          setMessage("PDA has been Rejected by Finance Manager");
          setOpenPopUp(true);
          setRemarksOpen(false);
        }
      } else {
        setMessage("PDA failed. Please try again");
        setOpenPopUp(true);
        setRemarksOpen(false);
      }
    } catch (error) {
      setMessage("PDA failed. Please try again");
      setOpenPopUp(true);
      setRemarksOpen(false);
    } finally {
    }
  };

  const handleSubmit = (chargesArray) => {
    console.log("chargesArray Submitted: ", chargesArray);
    setFinalChargesArray(chargesArray);
    handleClose();
  };

  const handleEdit = (charges, index) => {
    console.log("edit_charges: ", charges);
    if (charges) {
      setIsEditcharge(true);
      setEditCharge(charges);
      setEditIndex(index);
      handleClickOpen();
    }
  };

  const openDialog = () => {
    setIsEditcharge(false);
    handleClickOpen();
  };

  const sendQuotation = () => {
    handleQuotationOpen();
  };

  const submitPda = async (status) => {
    console.log(isVessels, "isVessels submitPda");
    console.log(isServices, "isServices submitPda");
    console.log(selectedVessel, "selectedVessel submitPda");
    console.log(selectedPort, "selectedPort submitPda");
    if (!selectedVessel) {
      setSelectedVesselError(true);
    }
    if (!selectedPort) {
      setSelectedPortError(true);
    }
    if (!isVessels && !isServices) {
      setTypeOfVesselError(true);
    }
    if ((isVessels || isServices) && selectedVessel && selectedPort) {
      setStatus(Number(status));
      let pdaPayload = {
        pdaId: pdaResponse?._id ? pdaResponse?._id : null,
        isVessels: isVessels,
        isServices: isServices,
        vesselId: selectedVessel?._id ? selectedVessel?._id : selectedVessel,
        portId: selectedPort?._id ? selectedPort?._id : selectedPort,
        cargoId: selectedCargo?._id ? selectedCargo?._id : selectedCargo,
        vesselTypeId: selectedVesselType?._id
          ? selectedVesselType?._id
          : selectedVesselType,
        customerId: selectedCustomer?._id
          ? selectedCustomer?._id
          : selectedCustomer,
        preparedUserId: loginResponse?.data?._id,
        vesselVoyageNumber: formData?.vesselVoyageNumber,
        IMONumber: Number(formData?.IMONumber),
        LOA: Number(formData?.LOA),
        GRT: Number(formData?.GRT),
        NRT: Number(formData?.NRT),
        ETA: eta ? moment(eta).format("YYYY-MM-DD HH:mm") : "",
        ETD: etd ? moment(etd).format("YYYY-MM-DD HH:mm") : "",

        pdaStatus: isCustomerApproved ? 5 : status,
        charges: finalChargesArray,
        anchorageLocation: selectedAnchorageLocation?._id,
        cargoCapacity: selectedCargoCapacity,
        berth: selectedBerth,
      };
      console.log(pdaPayload, "pdaPayload");
      if (!pdaResponse?._id) {
        try {
          const response = await savePda(pdaPayload);
          setFullPdaResponse(response);
          console.log(response, "pda_full_response");
          if (response?.status == true) {
            setPdaResponse(response?.pda);
            setPdaServicesResponse(response?.pdaServices);
            // updateValues(response);
            fetchPdaDetails(response?.pda?._id);
            if (response?.pda?.pdaStatus == 1) {
              setMessage("PDA has been saved successfully");
              setOpenPopUp(true);
            } else if (response?.pda?.pdaStatus == 2) {
              setMessage("PDA forwarded to the Finance Manager for Approval");
              setOpenPopUp(true);
            } else {
              setMessage("PDA has been submitted successfully");
              setOpenPopUp(true);
            }
          } else {
            setMessage("PDA failed. Please try again");
            setOpenPopUp(true);
          }
        } catch (error) {
          setMessage("PDA failed. Please try again");
          setOpenPopUp(true);
        } finally {
        }
      } else if (pdaResponse?._id) {
        try {
          const response = await editPDA(pdaPayload);
          console.log(response, "editPDA_response");
          if (response?.status == true) {
            setPdaResponse(response?.pda);
            setPdaServicesResponse(response?.pdaServices);
            // updateValues(response);
            fetchPdaDetails(response?.pda?._id);
            if (response?.pda?.pdaStatus == 2) {
              setMessage("PDA forwarded to the Finance Manager for Approval");
              setOpenPopUp(true);
            } else if (response?.pda?.pdaStatus == 5) {
              setMessage("Customer approved successfully");
              setOpenPopUp(true);
            } else {
              setMessage("PDA updated successfully");
              setOpenPopUp(true);
            }
          } else {
            setMessage("PDA failed. please try again");
            setOpenPopUp(true);
          }
        } catch (error) {
          setMessage("PDA failed. please try again");
          setOpenPopUp(true);
        } finally {
        }
      }
    } else {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
    }
  };

  const updateQuotation = async (status) => {
    if (status == "3") {
      let pdaPayload = {
        pdaId: pdaResponse?._id,
        status: status,
      };
      try {
        const response = await changeQuotationStatus(pdaPayload);
        console.log(response, "login_response");
        if (response?.status == true) {
          setPdaResponse(response?.pda);
          if (response?.pda?.pdaStatus == 3) {
            setIsApproved(true);
            setMessage("PDA has been internally approved");
            setOpenPopUp(true);
          } else if (response?.pda?.pdaStatus == 4) {
            handleRemarksOpen();
          }
        } else {
          setMessage("PDA failed. Please try again");
          setOpenPopUp(true);
        }
      } catch (error) {
        setMessage("PDA failed. Please try again");
        setOpenPopUp(true);
      } finally {
      }
    } else if (status == "4") {
      handleRemarksOpen();
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      localStorage.setItem("reloadIntent", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const reloadIntent = localStorage.getItem("reloadIntent");
    if (reloadIntent === "true") {
      // alert("fetchPdaDetails");
      fetchPdaDetails(localStorage.getItem("PDA_ID"));
      localStorage.removeItem("reloadIntent");
    }
  }, []);

  useEffect(() => {
    console.log(pdaResponse, "pdaResponse_createPDA");
  }, [pdaResponse]);

  useEffect(() => {
    console.log(pdaServicesResponse, "pdaServicesResponse");
  }, [pdaServicesResponse]);
  useEffect(() => {
    console.log(isCustomerApproved, "isCustomerApproved");
  }, [isCustomerApproved]);

  useEffect(() => {
    console.log(pdaServicesResponse, "pdaServicesResponse");
  }, [pdaServicesResponse]);
  useEffect(() => {
    console.log(status, "status_CERATE");
  }, [status]);

  useEffect(() => {
    console.log(editCharge, "editCharge");
  }, [editCharge]);

  useEffect(() => {
    console.log(finalChargesArray, "finalChargesArray_CREATEPDA");
  }, [finalChargesArray]);

  useEffect(() => {
    console.log(isApproved, "isApproved");
  }, [isApproved]);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchPdaDetails = async (id) => {
    localStorage?.setItem("PDA_ID", id);
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      console.log("PDADETAILS", pdaDetails);
      updateValues(pdaDetails);
      setPdaResponse(pdaDetails?.pda);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  function handleWheel(event) {
    event.target.blur(); // Removes focus from the input to prevent scroll change
  }

  const location = useLocation();

  const row = location.state?.row; // Access the passed row object
  const [editData, setEditData] = useState(null);
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track fetch initiation

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

  const updateValues = (response) => {
    console.log(response, "updateValues");
    console.log(response?.pda?.documents, "response?.pda?.documents");
    setIsVessels(response?.pda?.isVessels);
    setIsServices(response?.pda?.isServices);
    setSelectedBerth(response?.pda?.berth);
    setSelectedCargoCapacity(response?.pda?.cargoCapacity);
    setUploadedFiles(response?.pda?.documents); // Append new files to existing ones

    if (response?.pda?.pdaStatus == 3 || response?.pda?.pdaStatus == 5) {
      setIsApproved(true);
    }
    console.log(vessels, "vessels_out");

    let selectedVessel;
    if (response?.pda?.vesselId) {
      let vessels_list = localStorage.getItem("vessels_list");
      selectedVessel = JSON.parse(vessels_list).find((vessel) => {
        return vessel._id == response?.pda?.vesselId;
      });
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
    }
    if (selectedPort) {
      setSelectedPort(selectedPort);
      fetchAnchorageValues(selectedPort);
    }

    let selectedCargo;
    if (response?.pda?.cargoId) {
      let cargos_list = localStorage.getItem("cargos_list");
      selectedCargo = JSON.parse(cargos_list).find(
        (cargo) => cargo._id === response?.pda?.cargoId
      );
    }

    if (selectedCargo) {
      setSelectedCargo(selectedCargo);
    }

    let selectedCustomer;
    if (response?.pda?.customerId) {
      let customers_list = localStorage.getItem("customers_list");
      selectedCustomer = JSON.parse(customers_list).find(
        (customer) => customer._id === response?.pda?.customerId
      );
    }

    if (selectedCustomer) {
      setSelectedCustomer(selectedCustomer);
    }

    let selectedVeselTypeID;
    if (response?.pda?.vesselTypeId) {
      let vessel_types_list = localStorage.getItem("vessel_types_list");
      selectedVeselTypeID = JSON.parse(vessel_types_list).find(
        (vesselType) => vesselType._id === response?.pda?.vesselTypeId
      );
    }

    if (selectedVeselTypeID) {
      setSelectedVesselType(selectedVeselTypeID);
    }

    let selected_anchorage_location;
    if (response?.pda?.anchorageLocation) {
      let anchorage_locations_list = localStorage.getItem(
        "anchorage_locations_list"
      );
      selected_anchorage_location = JSON.parse(anchorage_locations_list).find(
        (location) => location._id === response?.pda?.anchorageLocation
      );
    }

    if (selected_anchorage_location) {
      setSelectedAnchorageLocation(selected_anchorage_location);
    }

    const moment = require("moment");

    if (response?.pda?.ETA) {
      const date = moment.utc(response.pda.ETA);
      setEta(date.isValid() ? date.format("YYYY-MM-DD HH:mm") : "");
    } else {
      setEta(""); // Set to empty string if ETA is null
    }

    // Parse ETD
    if (response?.pda?.ETD) {
      const etdDate = moment.utc(response.pda.ETD);
      setEtd(etdDate.isValid() ? etdDate.format("YYYY-MM-DD HH:mm") : "");
    } else {
      setEtd(""); // Set to empty string if ETD is null
    }

    // const moment = require("moment");
    // const date = moment.utc(response?.pda?.ETA);
    // console.log(response?.pda?.ETA, "response?.pda?.ETA");
    // console.log(date.format("YYYY-MM-DD HH:mm"), "Checkdate");
    // setEta(date.format("YYYY-MM-DD HH:mm"));

    // const etd_date = moment.utc(response?.pda?.ETD);
    // console.log(etd_date.format("YYYY-MM-DD HH:mm"), "Checkdate");
    // setEtd(etd_date.format("YYYY-MM-DD HH:mm"));

    setStatus(response?.pda?.pdaStatus);
    setFinalChargesArray(response?.pdaServices);
    setFormData({
      vesselVoyageNumber: response?.pda?.vesselVoyageNumber,
      IMONumber: response?.pda?.IMONumber,
      LOA: response?.pda?.LOA,
      GRT: response?.pda?.GRT,
      NRT: response?.pda?.NRT,
    });
  };

  const fetchAnchorageValues = async (data) => {
    console.log(data, "id_fetchAnchorageValues");
    try {
      const formdata = {
        portId: data?._id,
      };
      const response = await getAnchorageLocations(formdata);
      console.log(response, "response_fetchAnchorageValues");
      if (response.status) {
        setAnchorageLocations(response?.area);
        localStorage.setItem(
          "anchorage_locations_list",
          JSON.stringify(response.area)
        );
      }
    } catch (error) {
      console.error("Error fetching anchorage values:", error);
    }
  };

  return (
    <>
      <div className="pdacontent">
        <div className=" pda-no ">
          {pdaResponse && (
            <>
              <div className=" pdarow ">
                <div className="pdanumber ">
                  <span> PDA No:</span>
                  <span className="fw-bolder pdafontweight">
                    {pdaResponse?.pdaNumber}
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
                        {pdaResponse?.createdAt
                          ? formatDate(pdaResponse.createdAt)
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="draft-pda ">
                  {pdaResponse?.pdaStatus == 1 && (
                    <>
                      <span className="badge statusbadge ">
                        <i className="bi bi-book-fill book"></i>
                      </span>{" "}
                    </>
                  )}
                  {pdaResponse?.pdaStatus != 1 && (
                    <>
                      <span className="badge statusbadge ">
                        <i className="bi bi-check2-circle circle"></i>{" "}
                      </span>{" "}
                    </>
                  )}

                  <div className="pdabadge">
                    {pdaResponse?.pdaStatus == 1
                      ? "Draft PDA"
                      : pdaResponse?.pdaStatus == 2
                      ? "Waiting For Approval From Finance Manager"
                      : pdaResponse?.pdaStatus == 3
                      ? "Internally Approved"
                      : pdaResponse?.pdaStatus == 4
                      ? "Rejected By Finance Manager"
                      : pdaResponse?.pdaStatus == 5
                      ? "Customer Approved"
                      : pdaResponse?.pdaStatus == 6
                      ? "Pending From Operations"
                      : pdaResponse?.pdaStatus == 7
                      ? "Operations Completed"
                      : pdaResponse?.pdaStatus == 8
                      ? "Closed"
                      : ""}
                  </div>
                  {/* Internally Approved
                    Customer Approved
                    Rejected By Finance Manager */}
                </div>

                {pdaResponse?.pdaStatus == 3 && (
                  <>
                    <div className="capproved ">
                      <input
                        type="checkbox"
                        name="payment"
                        id="customerapproved"
                        checked={isCustomerApproved}
                        onChange={handleCustomerApproved}
                        className=""
                      />
                      <label htmlFor="customerapproved" className="customerbox">
                        Customer Approved
                      </label>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <div className="charge">
            <div className="rectangle"></div>
            <div>
              <img src={Group}></img>
            </div>
          </div>
          <div className="typesofcall-row ">
            <div className="row align-items-start">
              <div className="col">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Types of Call <span className="required"> * </span>
                  </label>
                  <div className="radio gap-3">
                    <div>
                      <input
                        type="checkbox"
                        name="payment"
                        id="vessels"
                        checked={isVessels}
                        onChange={handleVesselsChange}
                        className="vesselradio form-check-input"
                      />
                      <label htmlFor="vessels" className="vessel">
                        Vessels
                      </label>

                      <input
                        type="checkbox"
                        name="payment"
                        id="services"
                        checked={isServices}
                        onChange={handleServicesChange}
                        className="vesselradio form-check-input"
                      />
                      <label htmlFor="services" className="service">
                        Services
                      </label>
                    </div>
                  </div>
                  {typeOfVesselError && (
                    <>
                      <div className="invalid">Please select type of call</div>
                    </>
                  )}
                </div>
              </div>
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Vessel Name<span className="required"> * </span> :
                </label>
                <div className="vessel-select">
                  <select
                    name="vessel"
                    className="form-select vesselbox vboxholder .custom-select"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
                    value={selectedVessel?._id}
                  >
                    <option disabled selected value="">
                      Choose Vessel name
                    </option>
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
                    className="form-select vesselbox vboxholder"
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
          <div className="choosecargo-row ">
            <div className="row align-items-start">
              <div className="col">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Cargo
                  </label>
                  <div className="vessel-select">
                    <select
                      name="cargo"
                      className="form-select vesselbox vboxholder"
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
              </div>
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Type of Vessel:
                </label>
                <div className="vessel-select">
                  <select
                    name="vesselType"
                    className="form-select vesselbox vboxholder"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
                    value={selectedVesselType?._id}
                  >
                    <option value="">Choose Type of Vessel</option>
                    {vesselTypes.map((vessel) => (
                      <option key={vessel._id} value={vessel._id}>
                        {vessel.vesselType}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Vessel Voyage No:
                </label>
                <input
                  name="vesselVoyageNumber"
                  type="text"
                  className="form-control vessel-voyage"
                  id="exampleFormControlInput1"
                  placeholder=" "
                  value={formData.vesselVoyageNumber}
                  onChange={handleInputChange}
                  onWheel={handleWheel}
                />
              </div>
            </div>
          </div>
          <div className="thirdrow mb-3 row">
            <div className="col-4">
              <div className="row">
                <div className="col-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    IMO No:
                  </label>
                  <input
                    type="number"
                    name="IMONumber"
                    value={formData.IMONumber}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=" "
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
                    onWheel={handleWheel}
                  />
                </div>
                <div className="col-6 voyage ">
                  <label for="exampleFormControlInput1" className="form-label">
                    LOA:
                  </label>
                  <input
                    type="number"
                    name="LOA"
                    value={formData.LOA}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=" "
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
                    onWheel={handleWheel}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-6 grt">
                  <label for="exampleFormControlInput1" className="form-label">
                    GRT:
                  </label>
                  <input
                    type="number"
                    name="GRT"
                    value={formData.GRT}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=" "
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
                    onWheel={handleWheel}
                  />
                </div>
                <div className="col-6 nrt ">
                  <label for="exampleFormControlInput1" className="form-label">
                    NRT:
                  </label>
                  <input
                    type="number"
                    name="NRT"
                    value={formData.NRT}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
                    onWheel={handleWheel}
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <label for="exampleFormControlInput1" className="form-label">
                Customer Name:
              </label>
              <div className="vessel-select">
                <select
                  name="customer"
                  className="form-select vesselbox vboxholder"
                  onChange={handleSelectChange}
                  aria-label="Default select example"
                  value={selectedCustomer?._id}
                >
                  <option value="">Choose Customer</option>
                  {customers.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                      {customer.customerName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="imo">
            <div className="row align-items-start">
              <div className="col-2">
                <label for="exampleFormControlInput1" className="form-label">
                  ETA:
                </label>
                <div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy HH:mm aa"
                    selected={eta ? new Date(eta) : null} // Inline date conversion for prefilled value
                    onChange={handleEtaChange}
                    showTimeSelect
                    timeFormat="HH:mm aa"
                    timeIntervals={1}
                    className="form-control date-input-small"
                    id="eta-picker"
                    placeholderText="Select ETA"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="col-2">
                <label for="exampleFormControlInput1" className="form-label">
                  ETD:
                </label>

                <DatePicker
                  dateFormat="dd/MM/yyyy HH:mm aa"
                  // selected={etd && new Date(etd)} // Inline date conversion for prefilled value
                  selected={etd ? new Date(etd) : null} // Inline date conversion for prefilled value
                  onChange={handleEtdChange}
                  showTimeSelect
                  timeFormat="HH:mm aa"
                  timeIntervals={1}
                  className="form-control  date-input-small"
                  id="etd-picker"
                  placeholderText="Select ETD"
                  autoComplete="off"
                />
              </div>
              <div className="col-2">
                <label for="exampleFormControlInput1" className="form-label">
                  Anchorage Location:
                </label>
                <div className="vessel-select">
                  <select
                    name="anchorageLocation"
                    className="form-select vesselbox vboxholder"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
                    value={selectedAnchorageLocation?._id}
                  >
                    <option value="">Choose Anchorage Location</option>
                    {anchorageLocations.map((location) => (
                      <option key={location._id} value={location._id}>
                        {location.area}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-2 nrt ">
                <label for="exampleFormControlInput1" className="form-label">
                  Berth:
                </label>
                <input
                  type="text"
                  name="berth"
                  className="form-control vessel-voyage voyageblock"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={selectedBerth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-2 nrt ">
                <label for="exampleFormControlInput1" className="form-label">
                  Cargo Capacity:
                </label>
                <input
                  type="text"
                  name="cargoCapacity"
                  className="form-control vessel-voyage voyageblock"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={selectedCargoCapacity}
                  onChange={handleInputChange}
                />
              </div>
              {pdaResponse?.pdaStatus != 7 && (
                <>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn addcharge-button text-center"
                      onClick={() => {
                        openDialog();
                      }}
                    >
                      Add charge
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="row mt-2">
            <div className="col-12">
              {uploadedFiles && uploadedFiles?.length > 0 && (
                <>
                  <div className="templatelink">Documents:</div>
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
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="charges-table">
            <div className="row mt-4">
              <div className="col-lg-12">
                <ChargesTable
                  chargesArray={finalChargesArray}
                  services={services}
                  customers={customers}
                  onSubmit={handleSubmit}
                  ports={ports}
                  onEdit={handleEdit}
                  pdaResponse={pdaResponse}
                  isAction={true}
                  from={"create-pda"}
                />
              </div>
            </div>
          </div>

          {finalChargesArray?.length > 0 && (
            <>
              <React.Fragment>
                <div className="buttons-wrapper">
                  <div className="left">
                    {pdaResponse?.pdaStatus >= 2 && (
                      <>
                        <button
                          className="btn btna generate-button"
                          onClick={() => {
                            handlePdaOpen();
                          }}
                        >
                          Generate PDA
                        </button>
                      </>
                    )}
                    {(pdaResponse === null ||
                      pdaResponse === undefined ||
                      pdaResponse?.pdaStatus <= 1) && (
                      <button
                        className="btn btna generate-button"
                        onClick={() => {
                          submitPda(1);
                        }}
                      >
                        {pdaResponse === null || pdaResponse === undefined
                          ? " Save As Draft"
                          : "Edit Draft"}
                      </button>
                    )}

                    {/* {(pdaResponse?.pdaStatus >= 3 || isApproved == true) && (
                      <>
                        <button className="btn btna generate-button">
                          Generate Invoice
                        </button>
                        <button className="btn btna generate-button">
                          Send Invoice
                        </button>
                      </>
                    )} */}
                  </div>

                  {pdaResponse?.pdaStatus != 7 && (
                    <>
                      <div className="right d-flex">
                        {pdaResponse?.pdaStatus >= 3 && isApproved == true && (
                          <>
                            <button
                              className="btn btna submit-button"
                              onClick={() => {
                                sendQuotation();
                              }}
                            >
                              Send Quotation
                            </button>
                          </>
                        )}

                        <button
                          className="btn btna submit-button"
                          onClick={() => {
                            const newStatus =
                              !pdaResponse || pdaResponse?.pdaStatus === 1
                                ? 2
                                : 0;
                            submitPda(newStatus);
                          }}
                        >
                          Submit
                        </button>
                        {(pdaResponse?.pdaStatus == 2 ||
                          pdaResponse?.pdaStatus == 4) && (
                          <>
                            <button
                              className="btn btna generate-button"
                              onClick={() => {
                                updateQuotation("3");
                              }}
                            >
                              Approve
                            </button>
                          </>
                        )}
                        {pdaResponse?.pdaStatus == 2 && (
                          <>
                            <button
                              className="btn btna generate-button"
                              onClick={() => {
                                updateQuotation("4");
                              }}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </React.Fragment>
            </>
          )}
        </div>
      </div>

      <ResponsiveDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        selectedVessel={selectedVessel}
        selectedPort={selectedPort}
        selectedCargo={selectedCargo}
        selectedVesselType={selectedVesselType}
        selectedCustomer={selectedCustomer}
        eta={eta}
        etd={etd}
        status={status}
        formData={formData}
        services={services}
        customers={customers}
        ports={ports}
        isEditcharge={isEditcharge}
        editCharge={editCharge}
        editIndex={editIndex}
        pdaResponse={pdaResponse}
        finalChargesArray={finalChargesArray}
        fullPdaResponse={fullPdaResponse}
        vendors={vendors}
      />

      <QuotationDialog
        open={quotationOpen}
        onClose={handleQuotationClose}
        onSubmit={handleSubmit}
        selectedVessel={selectedVessel}
        selectedPort={selectedPort}
        selectedCargo={selectedCargo}
        selectedVesselType={selectedVesselType}
        selectedCustomer={selectedCustomer}
        eta={eta}
        etd={etd}
        status={status}
        formData={formData}
        services={services}
        customers={customers}
        ports={ports}
        isEditcharge={isEditcharge}
        editCharge={editCharge}
        editIndex={editIndex}
        pdaResponse={pdaResponse}
      />

      <Remarks
        open={remarksOpen}
        onClose={handleRemarksClose}
        onRemarksSubmit={handleRemarksSubmit}
        isReadOnly={false}
      />
      <PdaDialog
        open={generatePDAOpen}
        onClose={handlePdaClose}
        onSubmit={handleSubmit}
        selectedVessel={selectedVessel}
        selectedPort={selectedPort}
        selectedCargo={selectedCargo}
        selectedVesselType={selectedVesselType}
        selectedCustomer={selectedCustomer}
        eta={eta}
        etd={etd}
        status={status}
        formData={formData}
        services={services}
        customers={customers}
        cargos={cargos}
        ports={ports}
        vendors={vendors}
        vessels={vessels}
        isEditcharge={isEditcharge}
        editCharge={editCharge}
        editIndex={editIndex}
        pdaResponse={pdaResponse}
      />

      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default CreatePDA;
