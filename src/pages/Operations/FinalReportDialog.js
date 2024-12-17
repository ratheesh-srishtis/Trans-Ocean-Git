// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/finalreportdialog.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
const FinalReportDialog = ({ open, onClose }) => {
  const transwave = require("../../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
  const Group = require("../../assets/images/TRANSocean-LOGO.png");
  const footer = require("../../assets/images/4.jpg");
  const arab = require("../../assets/images/5.jpg");
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
            <DialogTitle>final report dialog </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>

            <table className="tabstyle">
              <thead>
                <tr>
                  <th colspan="6" class=" tableimage ">
                    <img className="logoimg" src={Group}></img>

                    <img className="sublogoimg" src={transwave}></img>
                  </th>

                  {/* <th className="stylone"></th> */}
                </tr>
              </thead>
            </table>


            <div className="portofcall mt-4">

              <table className="portofcallstyl">
                <thead>
                  <tr>
                    <th className="PortofCallCountry">
                      PORT
                    </th>
                    <th className="PortofCallCountry">
                      ANCHORAGE LOCATION</th>
                    <th className="PortofCallCountry">
                      ARRIVAL DATE</th>
                    <th className="jobrefn">
                      DEPARTURE DATE</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pocstyl"> SOHAR ANCHORAGE</td>
                    <td className="pocstyl"> B </td>
                    <td className="pocstyl">10/12/2024</td>
                    <td className="pocstyl">10/12/2024</td>

                  </tr>
                </tbody>
              </table>
              <div className="soaf">
                STATEMENT OF FACTS -DAYTONA BEACH-SOHAR ANCHORAGE
              </div>
              <table className="portofcallstyl mt-3">
                <thead>
                  <tr>
                    <th className="PortofCallCountry">
                      DESCRIPTION
                    </th>
                    <th className="PortofCallCountry">
                      DATE & TIME </th>
                    <th className="PortofCallCountry">
                      SERVICE ACTIVTIES</th>
                    <th className="jobrefn">
                      QUANTITY</th>
                    <th className="PortofCallCountry">
                      REMARKS</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pocstyl"> ESOP</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl">DROPPED THE ANCHOR</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> VESSEL INWARD SUBMITTED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> INWARD CUSTOMS APPROVED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> SUBMITTED FOR PORT CLEARENCE</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> PORT CONTROL APPROVED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> IMMIGRATION APPROVED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> COASTGUARD APPROVED</td>
                    <td className="pocstyl"> </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> CUSTOMS APPROVED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> PORT CLEARENCE RECEIVED</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> PORT CLEARENCE SENT TO MASTER</td>
                    <td className="pocstyl">  </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                  <tr>
                    <td className="pocstyl"> CSOP</td>
                    <td className="pocstyl"> </td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                    <td className="pocstyl"></td>
                  </tr>
                </tbody>
              </table>

            </div>

            <div  className="p-3">
              <div className="d-flex justify-content-between">
                <div >
                  <i class="bi bi-envelope-fill istyl"></i>
                  <span className="fstyl">Manager@transocean-maritime.com</span>
                </div>
                <div >
                  <i class="bi bi-telephone-fill istyl"></i>
                  <span className="fstyl">+968 26949863 | +968 91918073</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div >
                  <i class="bi bi-geo-alt-fill istyl"></i>
                  <span className="fstyl">2nd Floor, B Block, Port City, Oman</span>
                </div>
                <div >
                  <i class="bi bi-browser-chrome istyl "></i>
                  <span className="fstyl"> www.transocean.com</span>
                </div>
              </div>

            </div>

<div className="d-flex justify-content-between">
<img className="footer" src={footer}></img>

<img className="arab" src={arab}></img>
</div>






          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default FinalReportDialog;
