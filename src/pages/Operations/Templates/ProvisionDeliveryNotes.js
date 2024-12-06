// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/provision-delivery.css";
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

const ProvisionDeliveryNotes = ({ open, onClose, templates }) => {


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
            <DialogTitle>Provision delivery</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <div className="mm">
            <DialogContent style={{ marginBottom: "40px" }}>
              <div className=" statement mb-3">
                <h3>
                  DELIVERY NOTE
                </h3>
              </div>
              <div className="d-flex justify-content-between gap-2">
                <div className="col-4 ">
                  <label for="exampleFormControlInput1" class="form-label">VESSEL NAME :</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">PORT NAME :</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">ETA :</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>

              </div>
              <div className="d-flex  gap-2">
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">SUPPLY DATE :</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">REFERENCE NO : </label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">SL NO:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex  gap-2">

                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">ITEM DESCRIPTION : </label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">QTY: </label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">UNIT: </label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex gap-3   mt-2">

                <div class="col-6 ">
                  <label for="formFile" class="form-label">Upload Supplied by Stamp  :</label>
                  <input class="form-control signsize" type="file" id="portofolio" accept="image/*" multiple=""></input>
                </div>
                <div class="col-6 ">
                  <label for="formFile" class="form-label"> Upload Received by Stamp :</label>
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
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default ProvisionDeliveryNotes;
