import React, { useEffect, useState, useRef } from "react";
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
} from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopUp from "./PopUp";
import QuotationDialog from "./QuotationDialog";
import PdaDialog from "./PdaDialog";
import Remarks from "./Remarks";
import moment from "moment";
import { useLocation } from "react-router-dom";
import "../css/viewquotation.css";

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
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedVesselError, setSelectedVesselError] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [selectedPortError, setSelectedPortError] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(null);
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

  const [formData, setFormData] = useState({
    vesselVoyageNumber: null,
    IMONumber: null,
    LOA: null,
    GRT: null,
    NRT: null,
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
        break;
      case "port":
        setSelectedPort(ports.find((port) => port._id === value));
        setSelectedPortError(false);
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
      default:
        break;
    }
  };

  // Single handler function to update state based on input name
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value, "value_handleInputChange");

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handlers to update dates

  const handleEtaChange = (date) => {
    // Convert selected date to ISO 8601 format

    // console.log(moment(date).format("DD/MM/YYYY hh:mm"), "handleEtaChange");
    // let formatedDate = moment(date).format("DD/MM/YYYY hh:mm");
    // setEta(date);

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
  ]);

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
    } else if (selectedVessel?.vesselName == "TBA" && editData == null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        IMONumber: "",
        LOA: "",
        GRT: "",
        NRT: "",
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
        ETA: moment(eta).format("YYYY-MM-DD HH:mm "),
        ETD: moment(etd).format("YYYY-MM-DD HH:mm "),
        pdaStatus: isCustomerApproved ? 5 : status,
        charges: finalChargesArray,
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
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      alert("If you reload, your changes may not be saved.");

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    console.log(pdaResponse, "pdaResponse");
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
    // alert("fetchPdaDetails");
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
    console.log(response?.pda?.vesselId?._id, "  response?.pda?.vesselId?._id");
    setIsVessels(response?.pda?.isVessels);
    setIsServices(response?.pda?.isServices);

    if (response?.pda?.pdaStatus == 3 || response?.pda?.pdaStatus == 5) {
      setIsApproved(true);
    }

    const selectedVessel = vessels.find(
      (vessel) => vessel._id === response?.pda?.vesselId
    );

    if (selectedVessel) {
      setSelectedVessel(selectedVessel);
    }

    const selectedPort = ports.find(
      (port) => port._id === response?.pda?.portId
    );

    if (selectedPort) {
      setSelectedPort(selectedPort);
    }

    const selectedCargo = cargos.find(
      (cargo) => cargo._id === response?.pda?.cargoId
    );

    if (selectedCargo) {
      setSelectedCargo(selectedCargo);
    }

    const selectedCustomer = customers.find(
      (customer) => customer._id === response?.pda?.customerId
    );
    if (selectedCustomer) {
      setSelectedCustomer(selectedCustomer);
    }
    const selectedVeselTypeID = vesselTypes.find(
      (vesselType) => vesselType._id === response?.pda?.vesselTypeId
    );
    if (selectedVeselTypeID) {
      setSelectedVesselType(selectedVeselTypeID);
    }

    const moment = require("moment");
    const date = moment.utc(response?.pda?.ETA);
    console.log(date.format("YYYY-MM-DD HH:mm:ss"), "Checkdate");
    setEta(date.format("YYYY-MM-DD HH:mm:ss"));

    const etd_date = moment.utc(response?.pda?.ETD);
    console.log(etd_date.format("YYYY-MM-DD HH:mm:ss"), "Checkdate");
    setEtd(etd_date.format("YYYY-MM-DD HH:mm:ss"));

    setStatus(response?.pda?.pdaStatus);
    setFinalChargesArray(response?.pdaServices);
    setFormData({
      vesselVoyageNumber: response?.pda?.vesselVoyageNumber || null,
      IMONumber: response?.pda?.IMONumber || null,
      LOA: response?.pda?.LOA || null,
      GRT: response?.pda?.GRT || null,
      NRT: response?.pda?.NRT || null,
    });
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
              <label for="inputPassword" class="col-sm-4  col-form-label text-nowrap">PDA Date:</label>
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
 <span > VesselName:</span> <span className="viewans"> JimeiShunhao</span>
</div>
<div className=" col-4 viewhead">
 <span > PortName:</span> <span className="viewans"> Port Khalid</span>
</div>
<div className=" col-4 viewhead">
 <span > Cargo:</span> <span className="viewans"> Anthracite Coal</span>
</div>
</div>
<div className="row viewquocontent">
<div className=" col-4 viewhead">
 <span > IMO No:</span> <span className="viewans"> 9105578</span>
</div>
<div className=" col-4 viewhead">
 <span > GRT:</span> <span className="viewans"> 30,363</span>
</div>
<div className=" col-4 viewhead">
 <span > ETD:</span> <span className="viewans"> TBA</span>
</div>
</div>
<div className="row viewquocontent">
<div className=" col-4 viewhead">
 <span > LOA:</span> <span className="viewans"> 180.99</span>
</div>
<div className=" col-4 viewhead">
 <span > NRT:</span> <span className="viewans"> 17,363</span>
</div>
<div className=" col-4 viewhead">
 <span > ETA:</span> <span className="viewans"> TBA</span>
</div>
</div>
<div className="row viewquocontent">
<div className=" col-4 viewhead">
 <span > Service:</span> <span className="viewans"> Crew Change</span>
</div>
<div className=" col-4 viewhead">
 <span > Customer Name:</span> <span className="viewans"> Norok Shipping</span>
</div>

</div>

      </div>
    </>
  );
};

export default ViewQuotation;
