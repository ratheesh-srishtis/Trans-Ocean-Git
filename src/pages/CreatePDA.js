import React, { useEffect, useState } from "react";
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
} from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopUp from "./PopUp";
import QuotationDialog from "./QuotationDialog";
import PdaDialog from "./PdaDialog";
const CreatePDA = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
}) => {
  const Group = require("../assets/images/Group 1000002975.png");
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedVesselType, setSelectedVesselType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [eta, setEta] = useState("");
  const [etd, setEtd] = useState("");
  const [status, setStatus] = useState(1);
  const [chargesArray, setChargesArray] = useState([]);
  const [isEditcharge, setIsEditcharge] = useState(false);
  const [editCharge, setEditCharge] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [pdaResponse, setPdaResponse] = useState(null);
  const [pdaServicesResponse, setPdaServicesResponse] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    vessel: null,
    port: null,
    cargo: null,
    vesselType: null,
    service: null,
    customer: null,
    vesselVoyageNumber: null,
    IMONumber: null,
    LOA: null,
    GRT: null,
    NRT: null,
  });

  // Boolean states for each option
  const [isVessels, setIsVessels] = useState(false);
  const [isServices, setIsServices] = useState(false);
  const [isCustomerApproved, setIsCustomerApproved] = useState(false);

  // Handler functions to toggle each state
  const handleVesselsChange = () => {
    setIsVessels(!isVessels);
  };

  const handleCustomerApproved = () => {
    setIsCustomerApproved(!isCustomerApproved);
  };

  const handleServicesChange = () => {
    setIsServices(!isServices);
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
        break;
      case "port":
        setSelectedPort(ports.find((port) => port._id === value));
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

  const handleEtaChange = (date) => {
    if (date) {
      const formattedDate = formatDateTime(date);
      setEta(formattedDate);
    }
  };

  const handleEtdChange = (date) => {
    if (date) {
      const formattedDate = formatDateTime(date);
      setEtd(formattedDate);
    }
  };

  const formatDateTime = (date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? String(hours).padStart(2, "0") : "12";
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
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
    } else {
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleQuotationOpen = () => {
    setQuotationOpen(true);
  };

  const handleQuotationCloseClose = () => {
    setQuotationOpen(false);
  };

  const handlePdaOpen = () => {
    setGeneratePDAOpen(true);
  };

  const handlePdaClose = () => {
    setGeneratePDAOpen(false);
  };

  const handleSubmit = (chargesArray) => {
    console.log("chargesArray Submitted: ", chargesArray);
    // Here you can add logic to handle form submission
    setChargesArray(chargesArray);
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
    if ((isVessels || isServices) && selectedVessel && selectedPort) {
      setStatus(Number(status));
      let pdaPayload = {
        pdaId: pdaResponse?._id ? pdaResponse?._id : null,
        isVessels: isVessels,
        isServices: isServices,
        vesselId: selectedVessel?._id,
        portId: selectedPort?._id,
        cargoId: selectedCargo?._id,
        vesselTypeId: selectedVesselType?._id,
        customerId: selectedCustomer?._id,
        userid: loginResponse?.data?._id,
        vesselVoyageNumber: Number(formData?.vesselVoyageNo),
        IMONumber: Number(formData?.IMONumber),
        LOA: Number(formData?.LOA),
        GRT: Number(formData?.GRT),
        NRT: Number(formData?.NRT),
        ETA: eta,
        ETD: etd,
        pdaStatus: isCustomerApproved ? 5 : status,
        charges: chargesArray,
        pdaid: pdaResponse?._id ? pdaResponse?._id : null,
      };
      console.log(pdaPayload, "pdaPayload");
      if (!pdaResponse?._id) {
        try {
          const response = await savePda(pdaPayload);
          console.log(response, "login_response");
          if (response?.status == true) {
            setPdaResponse(response?.pda);
            setPdaServicesResponse(response?.pdaServices);
            updateValues(response);
            if (response?.pda?.pdaStatus == 2) {
              setMessage("PDA Forwarded To The Finance Manager For Approval");
            } else {
              setMessage("PDA has been submitted successfully");
            }
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
      } else if (pdaResponse?._id) {
        try {
          const response = await editPDA(pdaPayload);
          console.log(response, "editPDA_response");
          if (response?.status == true) {
            setPdaResponse(response?.pda);
            setPdaServicesResponse(response?.pdaServices);
            updateValues(response);
            setMessage("PDA Updated Successfully");
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
      }
    } else {
      alert("fill all fields");
    }
  };

  const updateValues = (response) => {
    console.log(response, "updateValues");
    setIsVessels(response?.pda?.isVessels);
    setIsServices(response?.pda?.isServices);
    // setSelectedVessel(response?.pda?.vesselId);
    // setSelectedPort(response?.pda?.portId);
    setSelectedCargo(response?.pda?.cargoId);
    setSelectedCustomer(response?.pda?.customerId);
    setSelectedVesselType(response?.pda?.vesselTypeId);
    setEta(response?.pda?.ETA);
    setEtd(response?.pda?.ETD);
    setStatus(response?.pda?.pdaStatus);
    setChargesArray(response?.pdaServices);

    setFormData((prevFormData) => ({
      ...prevFormData,
      vesselVoyageNumber: response?.pda?.vesselVoyageNumber,
      IMONumber: response?.pda?.IMONumber,
      LOA: response?.pda?.LOA,
      GRT: response?.pda?.GRT,
      NRT: response?.pda?.NRT,
    }));
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
          setMessage("PDA has been internally approved");
        } else if (response?.pda?.pdaStatus == 4) {
          setMessage("PDA has been rejected by finance manager");
        }
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
    console.log(status, "status_CERATE");
  }, [status]);

  useEffect(() => {
    console.log(editCharge, "editCharge");
  }, [editCharge]);

  useEffect(() => {
    console.log(chargesArray, "chargesArray_CREATEPDA");
  }, [chargesArray]);

  // Function to format the date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                      className="col-sm-5  col-form-label text-nowrap"
                    >
                      PDA Date:
                    </label>
                    <div className="col-sm-7">
                      {/* <Flatpickr
                    data-enable-time
                    value={date}
                    onChange={(selectedDates) => setDate(selectedDates[0])}
                    options={{ dateFormat: "Y-m-d H:i" }}
                  /> */}
                      <input
                        type="text"
                        className="form-control pdad"
                        placeholder="PDA Date"
                        value={
                          pdaResponse?.createdAt
                            ? formatDate(pdaResponse.createdAt)
                            : ""
                        } // Format date if available
                        disabled
                      />
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
                          <i class="bi bi-check2-circle circle"></i>{" "}
                        </span>{" "}
                      </>
                    )}

                    <div class="pdabadge">
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
            <div > <img src={Group}></img></div>
          </div>
          <div className="typesofcall-row ">
            <div className="row align-items-start">
              <div className="col">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Types of Call
                  </label>
                  <div className="radio gap-3">
                    <div>
                      <input
                        type="checkbox"
                        name="payment"
                        id="vessels"
                        checked={isVessels}
                        onChange={handleVesselsChange}
                        className="vesselradio"
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
                        className="vesselradio"
                      />
                      <label htmlFor="services" className="service">Services</label>
                    </div>
                  </div>
                </div>
              </div>
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
              </div>
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Type of Vessel:
                </label>
                <div className="vessel-select">
                  <select
                    name="vesselType"
                    className="form-select vesselbox"
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
                  name="vesselVoyageNo"
                  type="number"
                  className="form-control vessel-voyage"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={formData.vesselVoyageNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="thirdrow mb-3">
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
                    placeholder=""
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
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
                    placeholder=""
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
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
                    placeholder=""
                    readOnly={selectedVessel?.vesselName !== "TBA"} // Use readOnly instead of disabled
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
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-6 eta">
                  <label for="exampleFormControlInput1" className="form-label">
                    ETA:
                  </label>
                  <DatePicker
                    selected={eta ? new Date(eta) : null}
                    onChange={handleEtaChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="Pp"
                    className="form-control date-input" // Bootstrap class for styling
                    id="eta-picker"
                    placeholderText="Select ETA"
                    value={eta ? new Date(eta) : null}
                  />
                </div>
                <div className="col-6 etd ">
                  <label for="exampleFormControlInput1" className="form-label">
                    ETD:
                  </label>
                  <DatePicker
                    selected={etd ? new Date(etd) : null}
                    onChange={handleEtdChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="Pp"
                    className="form-control date-input" // Bootstrap class for styling
                    id="etd-picker"
                    placeholderText="Select ETD"
                    value={etd ? new Date(etd) : null}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="imo">
            <div className="row align-items-start">
              {/* <div className="col-5">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    Services
                  </label>
                  <div className="vessel-select">
                    <select
                      name="service"
                      className="form-select vesselbox"
                      onChange={handleSelectChange}
                      aria-label="Default select example"
                    >
                      <option value="">Choose Services</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div> */}
              <div className="col-4">
                <label for="exampleFormControlInput1" className="form-label">
                  Customer Name:
                </label>
                <div className="vessel-select">
                  <select
                    name="customer"
                    className="form-select vesselbox"
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
              <div className="col-4">
                <button
                  type="button"
                  className="btn addcharge-button"
                  onClick={() => {
                    openDialog();
                  }}
                >
                  Add charge
                </button>
              </div>
            </div>
          </div>

          <div className="charges-table">
            <div className="row mt-5">
              <div className="col-lg-12">
                <ChargesTable
                  chargesArray={chargesArray}
                  services={services}
                  customers={customers}
                  ports={ports}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </div>

          {chargesArray?.length > 0 && (
            <>
              <React.Fragment>
                <div className="buttons-wrapper">
                  <div className="left">
                    <button
                      className="btn btna generate-button"
                      onClick={() => {
                        handlePdaOpen();
                      }}
                    >
                      Generate PDA
                    </button>

                    {pdaResponse?.pdaStatus && pdaResponse?.pdaStatus == 3 && (
                      <>
                        <button className="btn btna generate-button">
                          Generate Invoice
                        </button>
                        <button className="btn btna generate-button">
                          Send Invoice
                        </button>
                        {status == 1 && (
                          <>
                            <button
                              className="btn btna generate-button "
                              onClick={() => {
                                submitPda("2");
                              }}
                            >
                              Save As Draft
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  <div className="right">
                    {status != 5 && (
                      <>
                        <button
                          className="btn btna submit-button"
                          onClick={() => {
                            submitPda("2");
                          }}
                        >
                          Submit
                        </button>
                      </>
                    )}

                    {pdaResponse?.pdaStatus && pdaResponse?.pdaStatus == 3 && (
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
      />

      <QuotationDialog
        open={quotationOpen}
        onClose={handleQuotationCloseClose}
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
        ports={ports}
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
