// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/qqdialog.css";


import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const QQDialog = ({ open, onClose }) => {
  const transwave = require("../../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
  const Group = require("../../assets/images/TRANSocean-LOGO.png");
  const footer = require("../../assets/images/4.jpg");
  const arab = require("../../assets/images/5.jpg");
  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 1200,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>QQ Dialog </DialogTitle>
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

            <div className=" introstyl mt-4 p-4">
              <div>
                Good day, <br />
                Transocean Maritime Services is committed to continuously improving our operation standards to ensure
                customer
                satisfaction and requirements. Your valuable feedback/suggestions are essential to help our company to
                fulfill
                customer's expectations and requirements. it would be greatly appreciated if you would complete this simple
                questionnaire and return it to us during this port call. Many Thanks.
              </div>

              <div className="portofcall mt-4">
                <table className="portofcallstyl">
                  <thead>
                    <tr>
                      <td className="PortofCallCountry">
                      Job Ref Number 
                       </td>
                      <td className="PortofCallCountry">
                        Vessel Name</td>
                      <td className="PortofCallCountry">
                        Date</td>
                      <td className="jobrefn">
                        Port of Call/Country</td>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="pocstyl">value</td>
                      <td className="pocstyl">value</td>
                      <td className="pocstyl"> value</td>
                      <td className="pocstyl">value</td>
                    </tr>
                  </tbody>
                </table>

              </div>

              <div className="mt-3">
                Grades
                <span>( <i class="bi bi-check-lg"></i>)</span>
              </div>

              <div className="grstyl">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="Excellent">
                        01.</td>
                      <td className=" satisfactory" >
                        Excellent Service </td>
                    </tr>
                    <tr>
                      <td
                        className="grtwostyl">
                        02.</td>
                      <td
                        className="good">
                        Good </td>
                    </tr>
                    <tr>
                      <td className="grthreestyl">
                        03.</td>
                      <td className=" satisfactory">
                        Satisfactory </td>
                    </tr>
                    <tr>
                      <td className="grthreestyl">
                        04.</td>
                      <td className=" satisfactory">
                        Average </td>
                    </tr>
                    <tr>
                      <td className="grthreestyl">
                        05.</td>
                      <td className=" satisfactory">
                        Need Improvements </td>
                    </tr>
                    <tr>
                      <td className="grthreestyl">
                        N/A</td>
                      <td className=" satisfactory">
                        Not Applicable </td>
                    </tr>
                  </thead>

                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  How would you rate the port instructions / pre arrival and husbandry informations provided by our team ?
                </span>
              </div>
              <div className="margineight">
                <table className="portofcallstyl">
                  <thead>
                    <tr>
                      <td className="quesones">
                        01.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="quesones">
                        02.</td>
                      <td
                        className="questhree">
                      </td>
                      <td className="quesones">
                        03.</td>
                      <td
                        className="questhree">
                      </td>
                      <td className="quesones">
                        04.</td>
                      <td
                        className="questhree">
                      </td>
                      <td className="quesones">
                        05.</td>
                      <td
                        className="questhree">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  Was communication and information expected progress timely and accurately provided for?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">

                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="texcenwidt">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  How would you rate the Transportation / Hotel / crew change arrangements ?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="texcenwidt">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  How would you rate the arrangements for technical attendance / supplies ?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="texcenwidt">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  Please rate the availability of our TOMS staff as per your service requirements ?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="quesonestyl">

                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  Overall. How would you rate the services provided by our team for your good vessel?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="texcenwidt">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="que">
                <span className="queclr">
                  <i class="bi bi-caret-right-fill"></i>
                </span>
                <span className="queclr">
                  Would you recommend Transocean Maritime Service to others?
                </span>
              </div>
              <div className="margineight">
                <table className="grtabstyl">
                  <thead>
                    <tr>
                      <td className="texcen">
                        01.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        02.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        03.</td>
                      <td
                        className="quesonestyl">

                      </td>
                      <td className="texcen">
                        04.</td>
                      <td
                        className="texcenwidt">
                      </td>
                      <td className="texcen">
                        05.</td>
                      <td
                        className="texcenwidt">
                      </td>
                    </tr>
                  </thead>
                </table>

              </div>

              <div className="conclusion">
                Thank you for taking the time to complete this questionnaire. Your valuable feedback is essential to help
                our company to fulfill your requirements for smooth arrangements.
              </div>


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

export default QQDialog;
