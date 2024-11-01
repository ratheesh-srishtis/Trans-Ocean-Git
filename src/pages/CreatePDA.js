import React, { useEffect, useState } from "react";
import "../css/createpda.css";
import { getCharges } from "../services/apiService";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ResponsiveDialog from "./ResponsiveDialog";
const CreatePDA = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
}) => {
  const Group = require("../assets/images/Group 1000002975.png");
  const [selectedVessel, setSelectedVessel] = useState(null);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [selectedVesselType, setSelectedVesselType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [eta, setEta] = useState("");
  const [etd, setEtd] = useState("");
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
  console.log(services, "services");
  console.log(customers, "customers");
  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges({
          serviceid: "671a61633b3ccd8450292ef7",
        });
        console.log("Fetched Charges:", response);
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };

    fetchCharges();
  }, []);

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
      case "service":
        setSelectedService(services.find((service) => service._id === value));
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
  const submitPda = (date) => {
    let pdaPayload = {
      isvessels: isVessels,
      isservices: isServices,
      vesselid: "671a62f13b3ccd845029310b",
      portid: "671a5f6c3b3ccd8450292c58",
      cargoid: "671a5c283b3ccd845029259e",
      vesseltypeid: "671a60013b3ccd8450292d23",
      customerid: "671a5d713b3ccd8450292985",
      userid: "671a40963b3ccd845028dc0c",
      vesselvoyagenumber: "fed454",
      imonumber: 5507891,
      loa: 300.54,
      grt: 30363,
      nrt: 17963,
      eta: "2024-10-25",
      etd: "2024-10-31",
      status: 1,
      charges: [
        {
          serviceid: "671a61633b3ccd8450292ef7",
          chargeid: "6720d9923b3ccd8450308bce",
          subchargeid: "6720db4c3b3ccd8450308e9c",
          quantity: "per day",
          customerid: "671a5d713b3ccd8450292985",
          customeramount: 200,
          customervat: 50,
          customerusd: 25,
          vendorid: "671a5f6c3b3ccd8450292c58",
          vendoramount: 200,
          vendorvat: 50,
          vendorusd: 25,
          isPrivateVendor: false,
          remark: "ndshhsdk djkshusdg",
        },
        {
          serviceid: "671a61633b3ccd8450292ef7",
          chargeid: "6720d9923b3ccd8450308bce",
          subchargeid: "6720db7c3b3ccd8450308edc",
          quantity: "per day",
          customerid: "671a5d713b3ccd8450292985",
          customeramount: 200,
          customervat: 50,
          customerusd: 25,
          vendorid: "671a5f6c3b3ccd8450292c58",
          vendoramount: 200,
          vendorvat: 50,
          vendorusd: 25,
          isPrivateVendor: false,
          remark: "assaas djkoooishusdg",
        },
      ],
    };
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
    console.log(selectedService, "selectedService");
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
    selectedService,
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

  const handleSubmit = (formData) => {
    console.log("Form Data Submitted: ", formData);
    // Here you can add logic to handle form submission
  };

  return (
    <>
      <div class="pdacontent">
        <div class=" pda-no ">
          <div class="row justify-content-start ">
            <div class="col-2 pdanumber ">
              <span> PDA No:</span>
              <span class="fw-bolder pdafontweight">2024001</span>
            </div>
            <div class="col-2 d-flex justify-content-start back">
              <div class="pdadate">
                <label for="inputPassword" class="col-sm-4 col-form-label">
                  PDA Date:
                </label>
                <div class="col-sm-8">
                  {/* <Flatpickr
                    data-enable-time
                    value={date}
                    onChange={(selectedDates) => setDate(selectedDates[0])}
                    options={{ dateFormat: "Y-m-d H:i" }}
                  /> */}
                  <input
                    type="password"
                    class="form-control"
                    placeholder="25/09/2024"
                    id="inputPassword"
                  />
                </div>
              </div>
            </div>
            <div class="col-2 draft-pda ">
              <button type="button" class="btn draft">
                <span class="badge ">
                  <i class="bi bi-book-fill book"></i>{" "}
                </span>{" "}
                Draft PDA
              </button>
            </div>
          </div>
          <div class="charge">
            <div class="rectangle"></div>
            <img src={Group}></img>
          </div>
          <div class="typesofcall-row ">
            <div class="row align-items-start">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Types of Call
                  </label>
                  <div class="radio gap-3">
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
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">
                  Vessel Name*:
                </label>
                <div class="vessel-select">
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
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">
                  Port Name*:
                </label>
                <div class="vessel-select">
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
          <div class="choosecargo-row ">
            <div class="row align-items-start">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Cargo
                  </label>
                  <div class="vessel-select">
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
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">
                  Type of Vessel:
                </label>
                <div class="vessel-select">
                  <select
                    name="vesselType"
                    className="form-select vesselbox"
                    onChange={handleSelectChange}
                    aria-label="Default select example"
                  >
                    <option value="">Choose Type of Vessel</option>
                    {vesselTypes.map((vessel) => (
                      <option key={vessel._id} value={vessel._id}>
                        {vessel.vesselName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">
                  Vessel Voyage No:
                </label>
                <input
                  name="vesselVoyageNo"
                  type="number"
                  class="form-control vessel-voyage"
                  id="exampleFormControlInput1"
                  placeholder=""
                  value={formData.vesselVoyageNo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div class="thirdrow mb-3">
            <div class="col-4">
              <div class="row">
                <div class="col-5">
                  <label for="exampleFormControlInput1" class="form-label">
                    IMO No:
                  </label>
                  <input
                    type="number"
                    name="imoNo"
                    value={formData.imoNo}
                    onChange={handleInputChange}
                    class="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
                <div class="col-5 voyage ">
                  <label for="exampleFormControlInput1" class="form-label">
                    LOA:
                  </label>
                  <input
                    type="number"
                    name="loa"
                    value={formData.loa}
                    onChange={handleInputChange}
                    class="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-5 grt">
                  <label for="exampleFormControlInput1" class="form-label">
                    GRT:
                  </label>
                  <input
                    type="number"
                    name="grt"
                    value={formData.grt}
                    onChange={handleInputChange}
                    class="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
                <div class="col-5 nrt ">
                  <label for="exampleFormControlInput1" class="form-label">
                    NRT:
                  </label>
                  <input
                    type="number"
                    name="nrt"
                    value={formData.nrt}
                    onChange={handleInputChange}
                    class="form-control vessel-voyage voyageblock"
                    id="exampleFormControlInput1"
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-5 eta">
                  <label for="exampleFormControlInput1" class="form-label">
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
                <div class="col-5 etd ">
                  <label for="exampleFormControlInput1" class="form-label">
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

          <div class="imo">
            <div class="row align-items-start">
              <div class="col-5">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Services
                  </label>
                  <div class="vessel-select">
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
              </div>
              <div class="col-5">
                <label for="exampleFormControlInput1" class="form-label">
                  Customer Name:
                </label>
                <div class="vessel-select">
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
              <div class="col-2">
                <button
                  type="button"
                  class="btn addcharge-button"
                  onClick={handleClickOpen}
                >
                  Add charge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ResponsiveDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
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
