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

const AddUser = ({ open, onClose }) => {
  return (
    <>
      <Dialog sx={{
        width: 800,
        margin: 'auto',
        borderRadius: 2,
      }} open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between " onClick={onClose}>
          <DialogTitle>Add Role</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>

          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> Name:</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> User Name:</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> Password:</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Mail ID:</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">Role <span class="required"> * </span> :</label>
                <div class="vessel-select">
                  <select name="vessel" class="form-select vesselbox" aria-label="Default select example">
                    <option value="">Choose Role </option>
                    <option value="671a62f13b3ccd845029310b">HR </option>
                    <option value="671a63363b3ccd8450293160">Admin   </option>
                    <option value="671a63823b3ccd84502931bf">Finance   </option>
                    <option value="672b44d13b3ccd84503dde97">Operations </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Phone Number:</label>
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

export default AddUser;
