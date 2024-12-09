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

const BerthReport = ({ open, onClose, templates, onSubmit }) => {
  console.log(templates, "templates");
  const [esopdate, setEsopdate] = useState(null);
  const handleEsopChange = (date) => {};
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
      [key]: date ? date.toISOString() : null, // Convert to ISO format for the payload
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

  const [generalRemarks, setGeneralRemarks] = useState(null);
  const [shipperRemarks, setShipperRemarks] = useState(null);
  const [masterRemarks, setMasterRemarks] = useState(null);
  const [generalRemarksError, setGeneralRemarksError] = useState(null);
  const [shipperRemarksError, setShipperRemarksError] = useState(null);
  const [masterRemarksError, setMasterRemarksError] = useState(null);

  const [formState, setFormState] = useState({
    draftOnArrivalFWD: null,
    draftOnArrivalAFT: null,
    bunkersOnArrivalFO: null,
    bunkersOnArrivalDO: null,
    bunkersOnArrivalAFT: null,
    draftOnDepartureFWD: null,
    draftOnDepartureAFT: null,
    bunkersOnDepartureFO: null,
    bunkersOnDepartureDO: null,
    bunkersOnDepartureAFT: null,
    bunkersOnDepartureNextPort: null,
    bunkersOnDepartureETA: null,
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

  const handleEtaChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      bunkersOnDepartureETA: date ? date.toISOString() : null, // Update state with ISO string
    }));
  };

  const saveTemplate = async (status) => {
    let templateBpdy = {
      pdaChargeId: "6744d0c2e233afae83144464",
      templateName: "Berthing Report",
      ...formData, // Spread dynamic form data from state
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
        setMessage("Template saved successfully!");
        setOpenPopUp(true);
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
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>BerthReport </DialogTitle>
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
                        dateFormat="dd/MM/yyyy HH:mm aa"
                        selected={
                          formData[row.id] ? new Date(formData[row.id]) : null
                        }
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
                  <label for="exampleFormControlInput1" class="form-label">
                    FWD:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnArrivalFWD"
                    value={formState.draftOnArrivalFWD}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    class="form-control"
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
                  <label for="exampleFormControlInput1" class="form-label">
                    FO:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnArrivalFO"
                    value={formState.bunkersOnArrivalFO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">
                    DO:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnArrivalDO"
                    value={formState.bunkersOnArrivalDO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    class="form-control"
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
                  <label for="exampleFormControlInput1" class="form-label">
                    FWD:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="draftOnDepartureFWD"
                    value={formState.draftOnDepartureFWD}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    class="form-control"
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
                  <label for="exampleFormControlInput1" class="form-label">
                    FO:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureFO"
                    value={formState.bunkersOnDepartureFO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">
                    DO:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureDO"
                    value={formState.bunkersOnDepartureDO}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    AFT:
                  </label>
                  <input
                    type="text"
                    class="form-control"
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
                  <label for="exampleFormControlInput1" class="form-label">
                    Next Port:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="bunkersOnDepartureNextPort"
                    value={formState.bunkersOnDepartureNextPort}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">
                    ETA:
                  </label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy HH:mm aa"
                    selected={
                      formState?.bunkersOnDepartureETA
                        ? new Date(formState.bunkersOnDepartureETA)
                        : null
                    } // Parse the date for prefilled value
                    onChange={handleEtaChange}
                    showTimeSelect
                    timeFormat="HH:mm aa"
                    timeIntervals={15}
                    className="form-control date-input"
                    id="eta-picker"
                    placeholderText="Select ETA"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                General Remarks
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                name="generalRemarks"
                value={generalRemarks}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Shipper Remarks
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
                name="shipperRemarks"
                value={shipperRemarks}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">
                Master Remarks
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
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
              <button type="button" className="btn btncancel">
                Cancel
              </button>
              <button type="button" className="btn generate-buttona">
                Save
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BerthReport;
