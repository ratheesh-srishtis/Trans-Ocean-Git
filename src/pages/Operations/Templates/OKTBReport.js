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

const OKTBReport = ({ open, onClose, templates }) => {
  console.log(templates, "templates");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "to") {
      setTo(value);
    } else if (name === "fax_number") {
    }
  };

  const handleEtaChange = (date) => {
    if (date) {
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
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="to"
                    value={to}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div class="col-4 queheading">
                  <div> Fax No:</div>
                  <input
                    type="number"
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="fax_number"
                    value={faxNumber}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div class="col-4 queheada">
                  <div>Attn:</div>
                  <input
                    type="text"
                    class="form-control answidth"
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
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="pages"
                    value={pages}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div class="col-4 queheading">
                  <div> From:</div>
                  <input
                    type="text"
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="from"
                    value={from}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div class="col-4 queheada">
                  <div> Tel No:</div>
                  <input
                    type="number"
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="telephone_number"
                    value={telephoneNumber}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>

              <div className="date">
                <div className="col-4 queheada">
                  <div> Date:</div>
                  <DatePicker
                    dateFormat="dd/MM/yyyy HH:mm aa"
                    selected={date ? new Date(date) : null} // Inline date conversion for prefilled value
                    onChange={handleEtaChange}
                    showTimeSelect
                    timeFormat="HH:mm aa"
                    timeIntervals={15}
                    className="form-control date-input"
                    id="date-picker"
                    placeholderText="Select ETA"
                    autoComplete="off"
                  />
                </div>
                <div className="col-4 queheada">
                  <div> Ref#:</div>
                  <input
                    type="text"
                    class="form-control answidth"
                    id="exampleFormControlInput1"
                    placeholder=""
                    name="ref_number"
                    value={refNumber}
                    onChange={handleInputChange}
                  ></input>
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
                      class="form-control answidth"
                      id="exampleFormControlInput1"
                      placeholder=""
                      name="booking_ref"
                      value={bookingRef}
                      onChange={handleInputChange}
                    ></input>
                  </div>
                  <div className="col-8 queheading">
                    <div> Passangers Name:</div>
                    <textarea
                      type="text"
                      class="form-control passwidth"
                      id="exampleFormControlInput1"
                      placeholder=""
                      name="passengers_name"
                      value={passengersName}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
                <div className="date ">
                  <div className="col-12 queheading">
                    <div> Airport Arrival Details:</div>
                    <textarea
                      type="text"
                      class="form-control passwidth"
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
                <button type="button" className="btn btncancel">
                  Cancel
                </button>
                <button type="button" className="btn generate-buttona">
                  Save
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default OKTBReport;
