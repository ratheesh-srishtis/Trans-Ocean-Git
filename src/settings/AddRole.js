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

const AddRole = ({ open, onClose }) => {
  return (
    <>
<div >
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

          <div class="typesofcall-row ">
            <div class="row mb-3 align-items-start">
              <div class="col-4">
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
          </div>
          <div class="row mb-3 align-items-start">
            <div class="col-4">
              <label for="exampleFormControlInput1" class="form-label">Assigned To:</label>
              <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
            </div>
          </div>
          <div className="choosepermi" >Choose Permissions</div>
          <div className="permissionlist gap-5">
            <div>
              <form action="/action_page.php">
                <input type="checkbox" className="checkboxrole"></input>
                <label for="" className="permissionfont"> Dashboard </label> <br></br>
                <input type="checkbox" className="checkboxrole" ></input>
                <label for="" className="permissionfont"> Soa</label>
              </form>
            </div>
            <div>
              <form action="/action_page.php">
                <input type="checkbox" className="checkboxrole"></input>
                <label for="" className="permissionfont"> Quotations </label> <br></br>
                <input type="checkbox" className="checkboxrole" ></input>
                <label for="" className="permissionfont"> Settings</label>
              </form>
            </div>
            <div>
              <form action="/action_page.php">
                <input type="checkbox" className="checkboxrole"></input>
                <label for="" className="permissionfont"> Jobs </label> <br></br>
                <input type="checkbox" className="checkboxrole" ></input>
                <label for="" className="permissionfont"> Payments</label>
              </form>
            </div>
            <div>
              <form action="/action_page.php">
                <input type="checkbox" className="checkboxrole"></input>
                <label for="" className="permissionfont"> Report </label> <br></br>
                <input type="checkbox" className="checkboxrole" ></input>
                <label for="" className="permissionfont"> Signout</label>
              </form>
            </div>
          </div>
          <div className="btnrole">
            <button class="btn btna submit-button btnfsize"> Submit </button>
          </div>





        </DialogContent>
      </Dialog>
</div>
    </>
  );
};

export default AddRole;
