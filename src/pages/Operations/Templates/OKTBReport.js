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

const OKTBReport = ({ open, onClose, templates }) => {
  console.log(templates, "templates");

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
            <DialogTitle>OKTBReport </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>

            <div className="mainoktb ">
              <div className=" d-flex justify-content-center">
                <h5>
                  OKTB MESSAGE/LETTER OF GUARANTEE
                </h5>
              </div>
              <div className="cont d-flex justify-content-between ">
                <div className="col-4 queheading" >
                  <div> To:</div>
                  {/* <div className="anshead"> Muscat Airport</div> */}
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="Muscastairport"></input>
                </div>
                <div class="col-4 queheading" >
                  <div> Fax No:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="(123)456-789"></input>
                </div>
                <div class="col-4 queheada" >
                  <div> Attn:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="Manager-visa desk"></input>
                </div>
              </div>
              <div className="cont d-flex justify-content-between ">
                <div className="col-4 queheading" >
                  <div> Pages:</div>
                  {/* <div className="anshead"> Muscat Airport</div> */}
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="01"></input>
                </div>
                <div class="col-4 queheading" >
                  <div> From:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="Operation Department"></input>
                </div>
                <div class="col-4 queheada" >
                  <div> Tel No:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="+968 243151684"></input>
                </div>
              </div>

              <div className="date">
                <div className="col-4 queheada" >
                  <div> Date:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="04/12/2024"></input>
                </div>
                <div className="col-4 queheada">
                  <div> Ref#:</div>
                  <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="459687"></input>
                </div>

              </div>
              <div className="urgent">
                For urgent attention
              </div>

              <div className="dear">
                <div>
                  Dear Sir,
                  This is to advise that the following persons are arriving at Muscat Airport as follows:<br />

                </div>
                <div className="date ">
                  <div className="col-4 queheading">
                    <div> Booking Ref:</div>
                    <input type="email" class="form-control answidth" id="exampleFormControlInput1" placeholder="26589"></input>
                  </div>
                  <div className="col-8 queheading" >
                    <div> Passangers Name:</div>
                    <textarea type="email" class="form-control passwidth" id="exampleFormControlInput1" placeholder="MohammedAshik, Seyd Ali, Khabeer,sajdahjdkajshdkasjdkhasjdhj"></textarea >
                  </div>

                </div>
                <div className="date ">
                  <div className="col-12 queheading" >
                    <div > Airport Arrival Details:</div>
                    <textarea type="email" class="form-control passwidth" id="exampleFormControlInput1" placeholder="MohammedAshik, Seyd Ali, Khabeer,sajdahjdkajshdkasjdkhasjdhj"></textarea >
                  </div>


                </div>
                <div className="wetrans">
                  We TRANS OCEAN MARITIME SERVICE LLC are sponsoring the above persons at Muscat Airport on under our company
                  visa and would be grateful if you would please arrange to send To Board message to your respective above
                  country offices and include this message in your reservation, such that they are allowed to board the
                  flight.
                </div>
                <div className="clarification">
                  If you need any clarifications, please contact us on: +968 92378277 <br />
                  Thanking you.

                </div>
                <div className="agents">
                  For TRANS OCEAN MARITIME SERVICES LLC
                  As agents only<br />


                </div>

              </div>
              <div className="footer-button d-flex justify-content-center mt-3">
                <button
                  type="button"
                  className="btn btncancel">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn generate-buttona">
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
