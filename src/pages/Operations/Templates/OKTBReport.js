// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/oktb.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { generateTemplatePDF } from "../../../services/apiService";
import PopUp from "../../PopUp";
import { format } from "date-fns";

const OKTBReport = ({
  open,
  onClose,
  templates,
  charge,
  selectedTemplateName,
  onSubmit,
  selectedTemplate,
}) => {
  console.log(templates, "templates");
  console.log(charge, "charge_OKTBReport");
  console.log(selectedTemplateName, "selectedTemplateName");

  const [to, setTo] = useState(null);
  const [faxNumber, setFaxNumber] = useState(null);
  const [attn, setAttn] = useState(null);
  const [pages, setPages] = useState(null);
  const [from, setfrom] = useState(null);
  const [telephoneNumber, setTelephoneNumber] = useState(null);
  const [date, setDate] = useState(null);
  const [refNumber, setRefNumber] = useState(null);
  const [bookingRef, setBookingRef] = useState(null);
  const [passengersName, setPassengersName] = useState(null);
  const [airportArrivalDetails, setSirportArrivalDetails] = useState(null);

  // Error states
  const [toError, setToError] = useState(null);
  const [faxNumberError, setFaxNumberError] = useState(null);
  const [pagesError, setPagesError] = useState(null);
  const [fromError, setFromError] = useState(null);
  const [telephoneNumberError, setTelephoneNumberError] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [refNumberError, setRefNumberError] = useState(null);
  const [bookingRefError, setBookingRefError] = useState(null);
  const [passengersNameError, setPassengersNameError] = useState(null);

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "to") {
      setTo(value);
      setToError(false);
    } else if (name === "fax_number") {
      setFaxNumber(value);
      setFaxNumberError(false);
    } else if (name === "attn") {
      setAttn(value);
    } else if (name === "pages") {
      setPages(value);
      setPagesError(false);
    } else if (name === "from") {
      setfrom(value);
      setFromError(false);
    } else if (name === "telephone_number") {
      setTelephoneNumber(value);
      setTelephoneNumberError(false);
    } else if (name === "ref_number") {
      setRefNumber(value);
      setRefNumberError(false);
    } else if (name === "booking_ref") {
      setBookingRef(value);
      setBookingRefError(false);
    } else if (name === "passengers_name") {
      setPassengersName(value);
      setPassengersNameError(false);
    } else if (name === "airport_arrival_details") {
      setSirportArrivalDetails(value);
    }
  };

  const handleEtaChange = (date) => {
    if (date) {
    }
  };

  const saveTemplate = async (status) => {
    // Reset all error states
    setToError(null);
    setFaxNumberError(null);
    setPagesError(null);
    setFromError(null);
    setTelephoneNumberError(null);
    setDateError(null);
    setRefNumberError(null);
    setBookingRefError(null);
    setPassengersNameError(null);

    // Validation logic
    let isValid = true;

    if (!to) {
      setToError("Please enter the 'To' field.");
      isValid = false;
    }
    if (!faxNumber) {
      setFaxNumberError("Please enter the fax number.");
      isValid = false;
    }

    if (!pages) {
      setPagesError("Please enter the number of pages.");
      isValid = false;
    }
    if (!from) {
      setFromError("Please enter the 'From' field.");
      isValid = false;
    }
    if (!telephoneNumber) {
      setTelephoneNumberError("Please enter the telephone number.");
      isValid = false;
    }
    if (!date) {
      setDateError("Please select a date.");
      isValid = false;
    }
    if (!refNumber) {
      setRefNumberError("Please enter the reference number.");
      isValid = false;
    }
    if (!bookingRef) {
      setBookingRefError("Please enter the booking reference number.");
      isValid = false;
    }
    if (!passengersName) {
      setPassengersNameError("Please enter the passenger's name.");
      isValid = false;
    }

    // If any field is invalid, do not proceed with the API call
    if (!isValid) {
      setMessage("Please fill all the required fields correctly.");
      setOpenPopUp(true);
      return;
    }

    // Construct the template body

    let templateBody = {
      pdaChargeId: charge?._id,
      templateId: selectedTemplate,

      templateName: selectedTemplateName,
      to: to,
      faxNo: faxNumber,
      attn: attn,
      pages: pages,
      from: from,
      telNo: telephoneNumber,
      date: date,
      refNo: refNumber,
      bookingRefNo: bookingRef,
      passengersNames: passengersName,
      arrivalFlightDetails: airportArrivalDetails,
    };

    // Proceed with the API call
    try {
      const response = await generateTemplatePDF(templateBody);
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

  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 800,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle></DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className="mainoktb ">
              <div className=" d-flex justify-content-center">
                <h5>OKTB MESSAGE/LETTER OF GUARANTEE</h5>
              </div>
              <div className="cont d-flex justify-content-between ">
                <div className="col-4 queheading">
                  <div> To:</div>
                  {/* <div className="anshead"> Muscat Airport</div> */}
                  <input
                    type="email"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="to"
                    value={to}
                    onChange={handleInputChange}
                  ></input>
                  {toError && <div className="invalid">{toError}</div>}
                </div>

                <div className="col-4 queheading">
                  <div> Fax No:</div>
                  <input
                    type="number"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="fax_number"
                    value={faxNumber}
                    onChange={handleInputChange}
                  ></input>
                  {faxNumberError && (
                    <div className="invalid">{faxNumberError}</div>
                  )}
                </div>
                <div className="col-4 queheada">
                  <div>Attn:</div>
                  <input
                    type="text"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="attn"
                    value={attn}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div className="cont d-flex justify-content-between ">
                <div className="col-4 queheading">
                  <div> Pages:</div>
                  {/* <div className="anshead"> Muscat Airport</div> */}
                  <input
                    type="number"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="pages"
                    value={pages}
                    onChange={handleInputChange}
                  ></input>
                  {pagesError && <div className="invalid">{pagesError}</div>}
                </div>
                <div className="col-4 queheading">
                  <div> From:</div>
                  <input
                    type="text"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="from"
                    value={from}
                    onChange={handleInputChange}
                  ></input>
                  {fromError && <div className="invalid">{fromError}</div>}
                </div>
                <div className="col-4 queheada">
                  <div> Tel No:</div>
                  <input
                    type="number"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="telephone_number"
                    value={telephoneNumber}
                    onChange={handleInputChange}
                  ></input>
                  {telephoneNumberError && (
                    <div className="invalid">{telephoneNumberError}</div>
                  )}
                </div>
              </div>

              <div className="date  ">
                <div className="col-4 queheading">
                  <div> Date:</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy" // Date format without time
                    selected={date ? new Date(date) : null}
                    onChange={(selectedDate) => {
                      const formattedDate = format(selectedDate, "dd/MM/yyyy"); // Format the selected date
                      setDate(formattedDate); // Set the formatted date
                      setDateError(false); // Clear error if a date is selected
                    }}
                    className="form-control date-input"
                    id="date-picker"
                    placeholderText="Select Date"
                    autoComplete="off"
                  />
                  {dateError && <div className="invalid">{dateError}</div>}
                </div>
                <div className="col-4 queheada">
                  <div> Ref#:</div>
                  <input
                    type="text"
                    className="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="ref_number"
                    value={refNumber}
                    onChange={handleInputChange}
                  ></input>
                  {refNumberError && (
                    <div className="invalid">{refNumberError}</div>
                  )}
                </div>
              </div>
              <div className="urgent">For urgent attention</div>
              <div className="dear">
                <div>
                  Dear Sir, This is to advise that the following persons are
                  arriving at Muscat Airport as follows:
                  <br />
                </div>
                <div className="date ">
                  <div className="col-4 queheading">
                    <div> Booking Ref:</div>
                    <input
                      type="text"
                      className="form-control answidth"
                      id="exampleFormControlInput1"
                      placeholder=""
                      name="booking_ref"
                      value={bookingRef}
                      onChange={handleInputChange}
                    ></input>
                    {bookingRefError && (
                      <div className="invalid">{bookingRefError}</div>
                    )}
                  </div>
                  <div className="col-8 queheading">
                    <div> Passangers Name:</div>
                    <textarea
                      type="text"
                      className="form-control passwidth"
                      id="exampleFormControlInput1"
                      rows="1"
                      placeholder=""
                      name="passengers_name"
                      value={passengersName}
                      onChange={handleInputChange}
                    ></textarea>
                    {passengersNameError && (
                      <div className="invalid">{passengersNameError}</div>
                    )}
                  </div>
                </div>
                <div className="date ">
                  <div className="col-12 queheading">
                    <div> Airport Arrival Details:</div>
                    <textarea
                      type="text"
                      className="form-control passwidth"
                      id="exampleFormControlInput1"
                      placeholder=""
                      name="airport_arrival_details"
                      value={airportArrivalDetails}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="wetrans">
                  We TRANS OCEAN MARITIME SERVICE LLC are sponsoring the above
                  persons at Muscat Airport on under our company visa and would
                  be grateful if you would please arrange to send To Board
                  message to your respective above country offices and include
                  this message in your reservation, such that they are allowed
                  to board the flight.
                </div>
                <div className="clarification">
                  If you need any clarifications, please contact us on: +968
                  92378277 <br />
                  Thanking you.
                </div>
                <div className="agents">
                  For TRANS OCEAN MARITIME SERVICES LLC As agents only
                  <br />
                </div>
              </div>
              <div className="footer-button d-flex justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btncancel"
                  onClick={onClose}
                >
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
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default OKTBReport;
