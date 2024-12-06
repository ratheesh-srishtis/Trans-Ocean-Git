// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/crewchangelist.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const CrewChangeList = ({ open, onClose, templates }) => {
  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 1100,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>CrewChangeList </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
          <div className=" statement">
              <h3>
                CREW CHANGE LIST
              </h3>
            </div>
            <div className="onsign">
              ON SIGNERS
            </div>
            <div className="d-flex justify-content-between">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Sea Crew Name:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Flight:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew ">
                  <label for="exampleFormControlInput1" class="form-label">ATA Muscat:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Hotel:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Check In:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew ">
                  <label for="exampleFormControlInput1" class="form-label">Check Out:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex ">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Food:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Transportation:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>

              </div>
              <div className="onsign mt-3">
              OFF SIGNERS
            </div>
            <div className="d-flex justify-content-between">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Sea Crew Name:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Flight:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew ">
                  <label for="exampleFormControlInput1" class="form-label">ATD Muscat:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Hotel:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Check In:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew ">
                  <label for="exampleFormControlInput1" class="form-label">Check Out:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex ">
                <div className="col-4  crew ">
                  <label for="exampleFormControlInput1" class="form-label">Food:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4 crew">
                  <label for="exampleFormControlInput1" class="form-label">Transportation:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>

              </div>
              <div className="footer-button d-flex justify-content-center mt-5">
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






          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default CrewChangeList;
