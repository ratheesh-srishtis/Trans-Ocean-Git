// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const AddPort = ({ open, onClose }) => {
  return (
    <>
      <Dialog sx={{
            width: 800, 
            margin: 'auto',
            borderRadius: 2,
          }} open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>Add Port</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>

        <div className="row">
            <div class="col-5 mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Port Name:</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>
            </div>
          </div>


          <div className="btnuser">
            <button class="btn btna submit-button btnfsize"> Submit </button>
          </div>



        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddPort;
