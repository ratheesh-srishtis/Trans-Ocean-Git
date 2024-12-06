// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/transportationreciept.css";
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

const Transportationreciept = ({ open, onClose, templates }) => {


  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 1050,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle> Transport Receipt</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className=" statement">
              <h3>
                TRANSPORT RECEIPT
              </h3>
            </div>
            <div className="d-flex justify-content-between mb-5 mt-3" >
              <div className="col-2  ">
                <label for="exampleFormControlInput1" class="form-label">Reference No:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div className="col-2  ">
                <label for="exampleFormControlInput1" class="form-label">Date:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <div className="col-4 slwidth ">
                <label for="exampleFormControlInput1" class="form-label">Vessel Name:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div className="col-4 slwidth  ">
                <label for="exampleFormControlInput1" class="form-label">Job Title:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div className="col-4  slwidth ">
                <label for="exampleFormControlInput1" class="form-label">Sl No:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>

            </div>
            <div className="d-flex justify-content-between ">

              <div className="col-4 slwidth  ">
                <label for="exampleFormControlInput1" class="form-label">Name:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div className="col-4 slwidth ">
                <label for="exampleFormControlInput1" class="form-label">Date:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div className="col-4  slwidth ">
                <label for="exampleFormControlInput1" class="form-label">From:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>

            </div>
            <div className="d-flex ">

              <div className="col-4 slwidth  ">
                <label for="exampleFormControlInput1" class="form-label">To:</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
              </div>
              <div class="col-8 signwidth">
                <label for="formFile" class="form-label">Sign Upload :</label>
                <input class="form-control signsize" type="file" id="portofolio" accept="image/*" multiple=""></input>
              </div>

            </div>
            <div className="d-flex gap-3   mt-2">

             <div class="col-6 transpoter">
                <label for="formFile" class="form-label">Upload Agent Sign/Stamp  :</label>
                <input class="form-control signsize" type="file" id="portofolio" accept="image/*" multiple=""></input>
              </div>
              <div class="col-6 transpoter">
                <label for="formFile" class="form-label"> Upload Transporter Name/Sign :</label>
                <input class="form-control signsize" type="file" id="portofolio" accept="image/*" multiple=""></input>
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

export default Transportationreciept;
