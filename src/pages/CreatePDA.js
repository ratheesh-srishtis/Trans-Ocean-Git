import React, { useEffect, useState } from "react";
import "../css/createpda.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResponsiveDialog from "./ResponsiveDialog";
import ChargesTable from "./ChargesTable";
import { savePda, changeQuotationStatus } from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const [formData, setFormData] = useState({
    vessel: null,
    port: null,
    cargo: null,
    vesselType: null,
    service: null,
    customer: null,
    vesselVoyageNo: "",
    imoNo: "",
    loa: "",
    grt: "",
    nrt: "",
  });

  // Boolean states for each option
  const [isVessels, setIsVessels] = useState(false);
  const [isServices, setIsServices] = useState(false);

  // Handler functions to toggle each state
  const handleVesselsChange = () => {
    setIsVessels(!isVessels);
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
    console.log(selectedVessel, "selectedVessel");
    console.log(selectedCargo, "selectedCargo");
    console.log(selectedVesselType, "selectedVesselType");
    console.log(selectedCustomer, "selectedCustomer");
    console.log(isVessels, "isVessels");
    console.log(isServices, "isServices");
    console.log(formData, "formData");
    console.log(eta, "eta");
    console.log(etd, "etd");
  }, [
    selectedPort,
    selectedVessel,
    selectedCargo,
    selectedVesselType,
    selectedCustomer,
    isVessels,
    isServices,
    formData,
    eta,
    etd,
  ]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (chargesArray) => {
    console.log("chargesArray Submitted: ", chargesArray);
    // Here you can add logic to handle form submission
    setChargesArray(chargesArray);
    handleClose();
  };

  const handleEdit = (charges, index) => {
    console.log("edit_charges: ", charges);
    setIsEditcharge(true);
    setEditCharge(charges);
    setEditIndex(index);
    handleClickOpen();
  };

  const openDialog = () => {
    setIsEditcharge(false);
    handleClickOpen();
  };

  const submitPda = async (status) => {
    setStatus(Number(status));
    let pdaPayload = {
      isvessels: isVessels,
      isservices: isServices,
      vesselid: selectedVessel?._id,
      portid: selectedPort?._id,
      cargoid: selectedCargo?._id,
      vesseltypeid: "671a60013b3ccd8450292d23",
      customerid: selectedVesselType?._id,
      userid: loginResponse?.data?._id,
      vesselvoyagenumber: Number(formData?.vesselVoyageNo),
      imonumber: Number(formData?.imoNo),
      loa: Number(formData?.loa),
      grt: Number(formData?.grt),
      nrt: Number(formData?.nrt),
      eta: eta,
      etd: etd,
      status: status,
      charges: chargesArray,
    };
    try {
      const response = await savePda(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setPdaResponse(response?.pda);
        toast.success("PDA saved successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("PDA failed. Please try again", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("PDA failed. Please try again", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
    }
  };

  const updateQuotation = async (status) => {
    let pdaPayload = {
      pdaid: pdaResponse?._id,
      status: status,
    };
    try {
      const response = await changeQuotationStatus(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setPdaResponse(response?.pda);
        toast.success("PDA Updated successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("PDA failed. Please try again", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("PDA failed. Please try again", {
        position: "top-center",
        autoClose: 2000,
      });
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
              <div className="row justify-content-start ">
                <div className="col-2 pdanumber ">
                  <span> PDA No:</span>
                  <span className="fw-bolder pdafontweight">
                    {pdaResponse?.pdaNumber}
                  </span>
                </div>
                <div className="col-2 d-flex justify-content-start back">
                  <div className="pdadate">
                    <label
                      for="inputPassword"
                      className="col-sm-4 col-form-label"
                    >
                      PDA Date:
                    </label>
                    <div className="col-sm-8">
                      {/* <Flatpickr
                    data-enable-time
                    value={date}
                    onChange={(selectedDates) => setDate(selectedDates[0])}
                    options={{ dateFormat: "Y-m-d H:i" }}
                  /> */}
                      <input
                        type="text"
                        className="form-control"
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
                <div className="col-2 draft-pda ">
                  <button type="button" className="btn draft">
                    <span className="badge ">
                      <i className="bi bi-book-fill book"></i>{" "}
                    </span>{" "}
                    {pdaResponse?.pdaStatus == 1
                      ? "Draft PDA"
                      : pdaResponse?.pdaStatus == 2
                      ? "Waiting For Approval From Finance Manager"
                      : ""}
                    {/* Internally Approved
                    Customer Approved
                    Rejected By Finance Manager */}
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="charge">
            <div className="rectangle"></div>
            <img src={Group}></img>
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
                      <label htmlFor="services">Services</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col">
                <label for="exampleFormControlInput1" className="form-label">
                  Vessel Name*:
                </label>
                <div className="vessel-select">
                  <select
                    name="vessel"
                    className="form-select vesselbox"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
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
                  Port Name*:
                </label>
                <div className="vessel-select">
                  <select
                    name="port"
                    className="form-select vesselbox"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
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
                <div className="col-5">
                  <label for="exampleFormControlInput1" className="form-label">
                    IMO No:
                  </label>
                  <input
                    type="number"
                    name="imoNo"
                    value={formData.imoNo}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
                <div className="col-5 voyage ">
                  <label for="exampleFormControlInput1" className="form-label">
                    LOA:
                  </label>
                  <input
                    type="number"
                    name="loa"
                    value={formData.loa}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-5 grt">
                  <label for="exampleFormControlInput1" className="form-label">
                    GRT:
                  </label>
                  <input
                    type="number"
                    name="grt"
                    value={formData.grt}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
                <div className="col-5 nrt ">
                  <label for="exampleFormControlInput1" className="form-label">
                    NRT:
                  </label>
                  <input
                    type="number"
                    name="nrt"
                    value={formData.nrt}
                    onChange={handleInputChange}
                    className="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-5 eta">
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
                  />
                </div>
                <div className="col-5 etd ">
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
              <div className="col-5">
                <label for="exampleFormControlInput1" className="form-label">
                  Customer Name:
                </label>
                <div className="vessel-select">
                  <select
                    name="customer"
                    className="form-select vesselbox"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
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
              <div className="col-2">
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
      />

      <button className="btn btn-primary">Generate PDA</button>

      {status == 1 && (
        <>
          <button
            className="btn btn-primary"
            onClick={() => {
              submitPda("2");
            }}
          >
            Save As Draft
          </button>
        </>
      )}

      <button
        className="btn btn-primary"
        onClick={() => {
          submitPda("2");
        }}
      >
        Submit
      </button>

      {status == 2 && (
        <>
          <button
            className="btn btn-primary"
            onClick={() => {
              updateQuotation("3");
            }}
          >
            Approve
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              updateQuotation("4");
            }}
          >
            Reject
          </button>
        </>
      )}
    </>
  );
};

export default CreatePDA;

// <div>
// <h2>Select Options</h2>
// {/* Vessels Select */}
// <label htmlFor="vessels">Vessel:</label>
// <select id="vessels">
//   {vessels.map((vessel) => (
//     <option key={vessel._id} value={vessel._id}>
//       {vessel.vesselName}
//     </option>
//   ))}
// </select>

// {/* Ports Select */}
// <label htmlFor="ports">Port:</label>
// <select id="ports">
//   {ports.map((port) => (
//     <option key={port._id} value={port._id}>
//       {port.portName}
//     </option>
//   ))}
// </select>

// {/* Cargos Select */}
// <label htmlFor="cargos">Cargo:</label>
// <select id="cargos">
//   {cargos.map((cargo) => (
//     <option key={cargo._id} value={cargo._id}>
//       {cargo.cargoName}
//     </option>
//   ))}
// </select>

// {/* Vessel Types Select */}
// <label htmlFor="vesselTypes">Vessel Type:</label>
// <select id="vesselTypes">
//   {vesselTypes.map((type) => (
//     <option key={type._id} value={type._id}>
//       {type.vesselType}
//     </option>
//   ))}
// </select>

// {/* Services Select */}
// <label htmlFor="services">Service:</label>
// <select id="services">
//   {services.map((service) => (
//     <option key={service._id} value={service._id}>
//       {service.serviceName}
//     </option>
//   ))}
// </select>

// {/* Customers Select */}
// <label htmlFor="customers">Customer:</label>
// <select id="customers">
//   {customers.map((customer) => (
//     <option key={customer._id} value={customer._id}>
//       {customer.customerName}
//     </option>
//   ))}
// </select>
// </div>
