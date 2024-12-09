// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/loadingreport.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const LoadingReport = ({ open, onClose, templates }) => {
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
            <DialogTitle>LoadingReport </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>

          <div className=" statement">
              <h3>
                LOADING REPORT
              </h3>
            </div>
            <table className="tabmain">
              <thead>
                <tr>
                  <th className="tabhead">
                    Sl No:</th>
                  <th className="tabhead">
                    Description</th>
                  <th className="tabhead">Date
                  </th>
                  <th className="tabhead">Time
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="tdstylwidt"> 1</td>
                  <td className="tdstyl"> DRAFT SURVEY COMMENCED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 2</td>
                  <td className="tdstyl"> DRAFT SURVEY COMPLETED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 3</td>
                  <td className="tdstyl"> COMMENCED LOADING</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 4</td>
                  <td className="tdstyl"> LOADING COMPLETED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 5</td>
                  <td className="tdstyl"> FINAL DRAFT SURVEY COMMENCED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 6</td>
                  <td className="tdstyl"> FINAL DRAFT SURVEY COMPLETED </td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 7</td>
                  <td className="tdstyl"> DOCUMENTS ONBOARD</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 8</td>
                  <td className="tdstyl"> PILOT ON BOARD</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 9</td>
                  <td className="tdstyl"> VESSEL UNMOORED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 10</td>
                  <td className="tdstyl">PILOT AWAY</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 11</td>
                  <td className="tdstyl"> COSP</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input></td>
                </tr>
              </tbody>
            </table>
            <div className="partition">
              <div className="drafthead">
                Draft on Arrival
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">FWD:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">AFT:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="bunker">
                Bunkers on Arrival
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">FO:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">DO:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">AFT:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="drafthead">
                Draft on Departure
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">FWD:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">AFT:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="bunker">
                Bunkers on Departure
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">FO:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">DO:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3">
                  <label for="exampleFormControlInput1" class="form-label">AFT:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">Next Port:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
                <div className="col-3 arrival">
                  <label for="exampleFormControlInput1" class="form-label">ETA:</label>
                  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder=""></input>
                </div>
              </div>

            </div>
            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">General Remarks</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">Shipper Remarks</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>

            <div class="mt-3">
              <label for="exampleFormControlTextarea1" class="form-label">Master Remarks</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
            </div>
{/* <div className="d-flex justify-content-between mt-3">
<div className="master">
              Master Sign/ Ship Stamp
            </div>
            <div className="master">
              Shipper
            </div>

</div>
<div  className=" mt-2 master">
  Agent
</div> */}
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

          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default LoadingReport;
