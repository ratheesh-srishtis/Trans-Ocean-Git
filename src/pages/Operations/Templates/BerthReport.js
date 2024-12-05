// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/bertreport.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const BerthReport = ({ open, onClose, templates }) => {
  console.log(templates, "templates");

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
            <DialogTitle>BerthReport </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>

            <div className=" statement">
              <h3>
                BIRTHING REPORT
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
                  <td className="tdstyl"> ESOP</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 2</td>
                  <td className="tdstyl"> ANCHORED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 3</td>
                  <td className="tdstyl"> NOR TENDER</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 4</td>
                  <td className="tdstyl"> ANCHOR AWEIGH</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 5</td>
                  <td className="tdstyl"> POB</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 6</td>
                  <td className="tdstyl"> FIRST LINE</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 7</td>
                  <td className="tdstyl"> ALL FAST - ALONG SIDE BERTH 31</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 8</td>
                  <td className="tdstyl"> PILOT OFF</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 9</td>
                  <td className="tdstyl"> GANGWAY LOWERED</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 10</td>
                  <td className="tdstyl"> CUSTOMS CLEARENCE</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
                </tr>
                <tr>
                  <td className="tdstylwidt"> 11</td>
                  <td className="tdstyl"> FREE PRATIQUE</td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="05/12/2024"></input></td>
                  <td className="tdstyl"> <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="12:00 am"></input></td>
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
<div className="d-flex justify-content-between mt-3">
<div>
              Master Sign/ Ship Stamp
            </div>
            <div>
              Shipper
            </div>

</div>
<div  className=" mt-2">
  Agent
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


          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BerthReport;