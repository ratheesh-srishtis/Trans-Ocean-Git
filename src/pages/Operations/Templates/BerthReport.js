// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/bertreport.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { generateTemplatePDF } from "../../../services/apiService";
import moment from "moment";
import PopUp from "../../PopUp";
const BerthReport = ({
  open,
  onClose,
  templates,
  onSubmit,
  charge,
  selectedTemplateName,
  selectedTemplate,
}) => {
  console.log(templates, "templates");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    esop: "",
    anchored: "",
    norTender: "",
    anchorAweigh: "",
    pob: "",
    firstline: "",
    allfast: "",
    pilotOff: "",
    gangwayLowered: "",
    customClearence: "",
    freePratique: "",
  });

  // Handler to update date values
  const handleDateChange = (key, date) => {
    setFormData((prev) => ({
      ...prev,
      [key]: date, // Format date before saving
    }));
  };

  const rows = [
    { id: "esop", label: "ESOP" },
    { id: "anchored", label: "ANCHORED" },
    { id: "norTender", label: "NOR TENDER" },
    { id: "anchorAweigh", label: "ANCHOR AWEIGH" },
    { id: "pob", label: "POB" },
    { id: "firstline", label: "FIRST LINE" },
    { id: "allfast", label: "ALL FAST - ALONG SIDE BERTH 31" },
    { id: "pilotOff", label: "PILOT OFF" },
    { id: "gangwayLowered", label: "GANGWAY LOWERED" },
    { id: "customClearence", label: "CUSTOMS CLEARENCE" },
    { id: "freePratique", label: "FREE PRATIQUE" },
  ];

  const [generalRemarks, setGeneralRemarks] = useState("");
  const [shipperRemarks, setShipperRemarks] = useState("");
  const [masterRemarks, setMasterRemarks] = useState("");

  const [formState, setFormState] = useState({
    draftOnArrivalFWD: "",
    draftOnArrivalAFT: "",
    bunkersOnArrivalFO: "",
    bunkersOnArrivalDO: "",
    bunkersOnArrivalAFT: "",
    draftOnDepartureFWD: "",
    draftOnDepartureAFT: "",
    bunkersOnDepartureFO: "",
    bunkersOnDepartureDO: "",
    bunkersOnDepartureAFT: "",
    bunkersOnDepartureNextPort: "",
    bunkersOnDepartureETA: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "generalRemarks") {
      setGeneralRemarks(value);
    } else if (name === "shipperRemarks") {
      setShipperRemarks(value);
    } else if (name === "masterRemarks") {
      setMasterRemarks(value);
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [eta, setEta] = useState("");

  const handleEtaChange = (date) => {
    console.log(date, "datehandleEtaChange");

    if (date) {
      setEta(date);
      console.log(date, "datehandleEtaChange");
      let formatDate = date ? moment(date).format("YYYY-MM-DD HH:mm ") : null;
      console.log(formatDate, "formatDate");

      setFormState((prevState) => ({
        ...prevState,
        bunkersOnDepartureETA: formatDate, // Store formatted date
      }));
    }
  };

  const isFormValid = () => {
    // Check if any field in formState has a value
    const isFormStateValid = Object.values(formState).some(
      (value) => String(value).trim() !== ""
    );

    // Check if any field in formData has a value
    const isFormDataValid = Object.values(formData).some(
      (value) => String(value).trim() !== ""
    );

    // Check if any remarks are non-empty
    const areRemarksValid =
      String(generalRemarks).trim() !== "" ||
      String(shipperRemarks).trim() !== "" ||
      String(masterRemarks).trim() !== "";

    // Return true if at least one of these is valid
    return isFormStateValid || isFormDataValid || areRemarksValid;
  };

  const saveTemplate = async (status) => {
    // Convert all date fields in formData to the desired format

    if (!isFormValid()) {
      setMessage("At least one field must be filled.");
      setOpenPopUp(true);
      return;
    }

    const formattedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key]
        ? moment(formData[key]).format("YYYY-MM-DD HH:mm")
        : ""; // Format the date or assign an empty string if null/undefined
      return acc;
    }, {});

    let templateBpdy = {
      pdaChargeId: charge?._id,
      templateName: selectedTemplateName,
      templateId: selectedTemplate,
      ...formattedFormData, // Use the formatted date values
      draftOnArrivalFWD: formState.draftOnArrivalFWD,
      draftOnArrivalAFT: formState.draftOnArrivalAFT,
      bunkersOnArrivalFO: formState.bunkersOnArrivalFO,
      bunkersOnArrivalDO: formState.bunkersOnArrivalDO,
      bunkersOnArrivalAFT: formState.bunkersOnArrivalAFT,
      draftOnDepartureFWD: formState.draftOnDepartureFWD,
      draftOnDepartureAFT: formState.draftOnDepartureAFT,
      bunkersOnDepartureFO: formState.bunkersOnDepartureFO,
      bunkersOnDepartureDO: formState.bunkersOnDepartureDO,
      bunkersOnDepartureAFT: formState.bunkersOnDepartureAFT,
      bunkersOnDepartureNextPort: formState.bunkersOnDepartureNextPort,
      bunkersOnDepartureETA: formState.bunkersOnDepartureETA,
      generalRemarks: formState.generalRemarks,
      shipperRemarks: formState.shipperRemarks,
      masterRemarks: formState.masterRemarks,
    };
    // Proceed with the API call
    try {
      const response = await generateTemplatePDF(templateBpdy);
      console.log(response, "login_response");
      if (response?.status === true) {
        onSubmit(response);
      } else {
        setMessage("PDA failed. Please try again.");
        setOpenPopUp(true);
        onSubmit(response);
      }
    } catch (error) {
      setMessage("PDA failed. Please try again.");
      setOpenPopUp(true);
      onSubmit(error);
    }
  };

  useEffect(() => {
    console.log(formState, "formState");
  }, [formState]);

  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 1000,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={(event, reason) => {
            if (reason === "backdropClick") {
              // Prevent dialog from closing when clicking outside
              return;
            }
            onClose(); // Allow dialog to close for other reasons
          }}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle> </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className=" statement">
              <h3>BERTHING REPORT</h3>
            </div>

            <table className="tabmain">
              <thead>
                <tr>
                  <th className="tabhead">Sl No:</th>
                  <th className="tabhead">Description</th>
                  <th className="tabhead">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id}>
                    <td className="tdstylwidt">{index + 1}</td>
                    <td className="tdstyl">{row.label}</td>
                    <td className="tdstyl">
                      <DatePicker
                        dateFormat="dd/MM/yyyy HH:mm aa" // Use 24-hour format for consistency with your other working component
                        selected={
                          formData[row.id] ? new Date(formData[row.id]) : ""
                        } // Inline date conversion for prefilled value
                        onChange={(date) => handleDateChange(row.id, date)}
                        showTimeSelect
                        timeFormat="HH:mm aa"
                        timeIntervals={15}
                        className="form-control date-input"
                        placeholderText="Select Date & Time"
                        autoComplete="off"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="partition">
              <div className="drafthead">Draft on Arrival</div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    FWD:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnArrivalFWD"
                    value={formState.draftOnArrivalFWD}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnArrivalAFT"
                    value={formState.draftOnArrivalAFT}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="bunker">Bunkers on Arrival</div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    FO:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnArrivalFO"
                    value={formState.bunkersOnArrivalFO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    DO:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnArrivalDO"
                    value={formState.bunkersOnArrivalDO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnArrivalAFT"
                    value={formState.bunkersOnArrivalAFT}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="drafthead">Draft on Departure</div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    FWD:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnDepartureFWD"
                    value={formState.draftOnDepartureFWD}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnDepartureAFT"
                    value={formState.draftOnDepartureAFT}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="bunker">Bunkers on Departure</div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    FO:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureFO"
                    value={formState.bunkersOnDepartureFO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    DO:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureDO"
                    value={formState.bunkersOnDepartureDO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" className="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureAFT"
                    value={formState.bunkersOnDepartureAFT}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    Next Port:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureNextPort"
                    value={formState.bunkersOnDepartureNextPort}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" className="form-label">
                    ETA:
                  </label>

                  <DatePicker
                    dateFormat="dd/MM/yyyy HH:mm aa"
                    selected={eta ? new Date(eta) : null} // Inline date conversion for prefilled value
                    onChange={handleEtaChange}
                    showTimeSelect
                    timeFormat="HH:mm aa"
                    timeIntervals={15}
                    className="form-control date-input"
                    id="eta-picker"
                    placeholderText=""
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                General Remarks
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                name="generalRemarks"
                value={generalRemarks}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mt-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Shipper Remarks
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea2"
                rows="2"
                name="shipperRemarks"
                value={shipperRemarks}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="mt-3">
              <label for="exampleFormControlTextarea1" className="form-label">
                Master Remarks
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea3"
                rows="2"
                name="masterRemarks"
                value={masterRemarks}
                onChange={handleInputChange}
              ></textarea>
            </div>
            {/* <div className="d-flex justify-content-between mt-3">
<div className="master">
              Master Sign/ Ship Stamp
            </div>
            <div className=" mt-2 master">Agent</div>
            <div className="footer-button d-flex justify-content-center mt-3">
              <button type="button" className="btn btncancel">
                Cancel
              </button>
              <button
                type="button"
                className="btn generate-buttona"
                onClick={saveTemplate}
              >
                Save
              </button>
            </div>

</div>
<div  className=" mt-2 master">
  Agent
</div> */}
            <div className="footer-button d-flex justify-content-center mt-3">
              <button type="button" className="btn btncancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn generate-buttona"
                onClick={() => {
                  saveTemplate();
                }}
              >
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default BerthReport;
