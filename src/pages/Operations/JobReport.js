// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/jobreport.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import BerthReport from "./Templates/BerthReport";
import CrewChangeList from "./Templates/CrewChangeList";
import LoadingReport from "./Templates/LoadingReport";
import OKTBReport from "./Templates/OKTBReport";
import {
  getCharges,
  getSubcharges,
  uploadDocuments,
  editChargeQuotation,
} from "../../services/apiService";
import PopUp from "../PopUp";
import ProvisionDeliveryNotes from "./Templates/ProvisionDeliveryNotes";
import Transportationreciept from "./Templates/Transportationreciept";
const JobReport = ({
  open,
  onClose,
  templates,
  charge,
  services,
  ports,
  customers,

  vendors,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const Group = require("../../assets/images/job sheet.png");
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="p-3">
        <div className="summary">
          SUMMARY
        </div>
        <div className="bb"> </div>
        <div className="row mt-3">

          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label">Total No.of Vessels :</label>
            <input type="password" class="form-control totalnoinputb" id="inputPassword"></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label">Total No.of Services :</label>
            <input type="password" class="form-control totalnoinputa" id="inputPassword"></input>
          </div>


          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label"> No.of Tanker Vessels :</label>
            <input type="password" class="form-control totalnoinput" id="inputPassword"></input>
          </div>


          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label"> No.of Bulk Vessels :</label>
            <input type="password" class="form-control totalnoinput" id="inputPassword"></input>
          </div>


        </div>
        <div className="row mt-3">

          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label">Other Client Vessels :</label>
            <input type="password" class="form-control totalnoinput" id="inputPassword"></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" class=" form-label">Job Used in Each Port :</label>
            <input type="password" class="form-control totalnoinput" id="inputPassword"></input>
          </div>

        </div>
        <div className="bbn"> </div>
        <div className="row mt-4">
          <div className="col-3">
            <div className="jobfilter">
              <div>Filter By:</div>
              <div >
                <select class="form-select jobporrt" aria-label="Default select example">

                  <option value="1">Weekly</option>
                  <option value="2">Monthly</option>
                  <option value="3">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="jobfilter">
              <div>Sort By:</div>
              <div >
                <select class="form-select jobporrt " aria-label="Default select example">
                <option selected>Operation Status</option>
                  <option value="1">Pending</option>
                  <option value="2">Completed</option>
                  <option value="3">Awaiting Arrival</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="jobfilter">
              <div>Sort By:</div>
              <div >
                <select class="form-select jobporrt " aria-label="Default select example">
                <option selected>Port Name</option>
                  <option value="1">Port of Sultan</option>
                  <option value="2">Port of Sohar</option>
                  <option value="3">Port of Duqm</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="charge mt-2">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="createtable mt-4">
            <table className="table tableheadcolor">
              <thead className="tableheadcolor">
                <tr className="tableheadcolor">
                  <th className="tableheadcolor">Vessel Ref No</th>
                  <th className="tableheadcolor">Vessel Name</th>
                  <th className="tableheadcolor">Principal</th>
                  <th className="tableheadcolor">Job</th>
                  {/* <th>Quantity</th> */}
                  <th className="tableheadcolor"> Operation Status</th>
                  <th className="tableheadcolor">Port Name</th>
                  <th className="tableheadcolor">OPS By</th>
                  <th className="tableheadcolor">Final Report</th>
                  <th className="tableheadcolor">Actions</th>{" "}
                  {/* Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="proc"> PROCESS</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className=""> Completed</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="Awaitingcolo"> Awaiting Arrival</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="proc"> PROCESS</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className=""> Completed</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="Awaitingcolo"> Awaiting Arrival</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="Awaitingcolo"> Awaiting Arrival</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="proc"> PROCESS</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    <tr >
                      <td>TOMS/OM/24/0123</td>
                      <td>MT SEAMULL</td>
                      <td>
                        POSH INTERNATIONAL
                      </td>
                      <td className="jobsub">
                       CREWCHANGE
                      </td>
                      
                      <td className="proc"> PROCESS</td>
                      <td>SALALAH PORT</td>
                      <td>ADHIL SHAMEEN</td>
                      <td ><i class="bi bi-check chechkcolor"></i></td>
                      <td>
                      <button type="button" class="btn btn-info jobviewbtnn">View</button>
                      </td>
                    </tr>
                    
                    
                 
              </tbody>
              
            </table>
          </div>


      </div>










      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default JobReport;
