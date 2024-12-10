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
import Loader from "./Loader";
import "../css/addcharges.css";
import "../css/editcharges.css";
import "../css/sendquotation.css";
import "../css/generatepda.css";
import "../css/epda.css";
import { getPdaFile } from "../services/apiService";
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
} from "../services/apiService";

import PopUp from "./PopUp";
const transwave = require("../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
  const Group = require("../assets/images/TRANSocean-LOGO.png");

const PdaDialog = ({
  open,
  onClose,
  onSubmit,
  selectedVessel,
  selectedPort,
  selectedCargo,
  selectedVesselType,
  selectedCustomer,
  eta,
  etd,
  status,
  formData,
  services,
  customers,
  ports,
  isEditcharge,
  editCharge,
  editIndex,
  pdaResponse,
}) => {
  console.log(services, "services");
  console.log(pdaResponse, "pdaResponse_dialog");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const fetchPdaFile = async () => {
    if (pdaResponse?._id) {
      setIsLoading(true);

      let data = { pdaId: pdaResponse?._id };
      try {
        const pdaFile = await getPdaFile(data);
        console.log("pdaFile", pdaFile); // Use pdaFile directly
        setPdfData(pdaFile); // Update state for future renders
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch quotations:", error);
        setIsLoading(false);
      }
    }
  };

  // useEffect(() => {
  //   fetchPdaFile();
  // }, [pdaResponse]);

  useEffect(() => {
    console.log(open, "open");
    if (open == true) {
      setPdfData(null);
      fetchPdaFile();
    }
  }, [open]);

  useEffect(() => {
    console.log(pdfData, "pdfData");
  }, [pdfData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle></DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent>
          {/* {pdfData?.status && (
            <>
              <iframe
                src={`${pdfData.pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                title="PDF Viewer"
                style={{
                  width: "100%",
                  height: "700px",
                  border: "none",
                }}
              />
            </>
          )} */}
          <table className="tabstyle">
            <thead>
              <tr>
                <th
                  colspan="6"
                  class=" tableimage "                 
                >
              
                  <img className="logoimg" src={Group}></img>

              
                  <img className="sublogoimg" src={transwave}></img>
                  
                </th>

                <th className="stylone"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead class="tableheading">
              <tr>
                <th
                  colspan="5"
                  className="styltwo"
                >
                  TO TBA
                </th>

                <th className="stylthree">
                  Date:13/11/2024
                </th>
                <th className="stylfour"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead class="tableheading">
              <tr>
                <th
                  colspan="3"
                  className="stylfive"
                >
                  VESSEL
                </th>

                <th className="stylsix">
                  LOCATION
                </th>
                <th className="stylseven">
                  ETA
                </th>
                <th className="styleight">
                  ETD
                </th>
                <th className="stylnine">
                  CARGO
                </th>
                <th className="stylten">
                  LOA
                </th>
                <th className="styla"></th>
              </tr>
              <tr>
                <th
                  colspan="3"
                  className="mvstyl"
                >
                  {" "}
                  MV TBN
                </th>

                <th  className="mvstyl">
                  SALALAH PORT
                </th>
                <th  className="mvstyl">
                  {" "}
                  TBA
                </th>
                <th  className="mvstyl">
                  TBA
                </th>
                <th className="mvstyl">
                  GYPSUM
                </th>
                <th className="mvstyl">
                  199.90
                </th>
                <th className="stylee "></th>
              </tr>
              <tr>
                <th
                  colspan="3"
                  className="mvstyl"
                >
                  GRT
                </th>

                <th className="stylee">
                  36,336
                </th>
                <th className="mvstyl">
                  {" "}
                  NRT
                </th>
                <th className="mvstyl">
                  21,330
                </th>
                <th className="mvstyl">
                  65K
                </th>
                <th className="mvstyl"></th>
                <th className="stylb"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead class="tableheading">
              <tr>
                <th className="slstyl">
                  Sl.No
                </th>
                <th className="slstyl">
                  Particulars
                </th>
                <th className="slstyl">
                  Quantity
                </th>
                <th className="omrstyl">
                  Amount (OMR)
                </th>
                <th className="omrstyl">
                  VAT AMOUNT
                </th>
                <th className="omrstyl">
                  TOTAL AMOUNT (OMR)
                </th>
                <th className="omrstyl">
                  TOTAL AMOUNT (USD)
                </th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr>
                <td className="stylc">
                  A1
                </td>
                <td className="stylc">
                  Consolidated Marine Charges (USD 4150 Up to 24 Hours or part
                  thereof)
                </td>
                <td className="stylc">
                  1 day
                </td>
                <td className="styld">
                  1,583.969
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  1,583.969
                </td>
                <td className="styld">
                  4,150.00
                </td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylf">
                  after Every 24 Hours or part thereof USD 1700 - final amount
                  will be change as per actual Salalah port invoice based on
                  vessel stay{" "}
                </td>
                <td className="stylc">
                  4 days
                </td>
                <td className="styld">
                  648.855
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  2,595.420
                </td>
                <td className="styld">
                  6,800.00
                </td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylf">
                  Delay in vessel operations or vessel staying alongside after
                  completion of operation
                </td>
                <td className="stylc"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylf">
                  First 2 hours beyond permitted period (USD 250 per hour or
                  part thereof)
                </td>
                <td className="stylc"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylf">
                  For next 2 hours or part thereof USD 500{" "}
                </td>
                <td className="stylc"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylf">
                  Subsequent period per hour or part thereof USD 1500
                </td>
                <td className="stylc"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
              </tr>
              <tr>
                <td className="stylc">
                  A2
                </td>
                <td className="stylc">
                  {" "}
                  CUSTOMS
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  50.000
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  50.000
                </td>
                <td className="styld">
                  131.00
                </td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td
                  colspan="6"
                  className="stylg "
                >
                  {" "}
                  * CUSTOMS FINE : - As per the Salalah port customs rule it’s
                  mandatory to mention in last port clearance next port as
                  Salalah, failing to comply it will attract fine USD 1310.00
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A3
                </td>
                <td className="stylc">
                  {" "}
                  HEALTH(QUARANTINE)
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  50.000
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  50.000
                </td>
                <td className="styld">
                  131.00
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A4
                </td>
                <td className="stylc">
                  {" "}
                  Issue of Port clearance
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  21.000
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  21.000
                </td>
                <td className="styld">
                  55.02
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A5
                </td>
                <td className="stylc">
                  {" "}
                  ENVIORMENTS FEE (General Cargo vessels and container vessels –
                  per call)
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  {" "}
                  47.000
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  {" "}
                  47.000
                </td>
                <td className="styld">
                  123.14
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A6
                </td>
                <td className="stylc">
                  {" "}
                  GARBAGE SKIP (Compulsory)
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  {" "}
                  37.000
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  {" "}
                  37.000
                </td>
                <td className="styld">
                  {" "}
                  96.94
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A7
                </td>
                <td className="stylc">
                  {" "}
                  AMNAS (ARABIAN MARITIME & NAVIGATION SERVICES)
                </td>
                <td className="stylc"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
                <td className="styld"></td>
              </tr>
              <tr>
                <td className="stylc"></td>
                <td className="stylg">
                  {" "}
                  Per call(OMR 1.375 per 100NRT)-***as per NRT OF THE VESSE
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  293.288
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  293.288
                </td>
                <td className="styld">
                  {" "}
                  768.41
                </td>
              </tr>
              <tr>
                <td className="stylc">
                  A9
                </td>
                <td className="stylc">
                  {" "}
                  AGENCY CHARGES
                </td>
                <td className="stylc">
                  1
                </td>
                <td className="styld">
                  {" "}
                  76.336
                </td>
                <td className="styld">
                  0.000
                </td>
                <td className="styld">
                  {" "}
                  76.336
                </td>
                <td className="styld">
                  200.00
                </td>
              </tr>
              <tr>
                <td
                  colspan="5"
                  className="stylh"
                >
                  TOTAL AMOUNT
                </td>

                <td className="stylh">
                  4,754.013
                </td>
                <td className="stylh">
                  12,455.51
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div class="col-1 note">Note</div>
            <div class="subnote">
              **“Effective from 16th April 2021, 5% of VAT will applicable as
              per new Government regulation in the Sultanate of Oman."
              <br />
              ***Denotes estimated charges and actual as per port bills <br />
              ****Agency fess does not include Immarsat calls or telexes. If
              necessary will be charged out of costs
            </div>
          </div>
          <table className="styli">
            <thead class="tableheading">
              <tr>
                <th className="slstyl"></th>
                <th
                  colspan="4"
                  className="stylj"
                >
                  Anchorage Stay Charges
                </th>
              </tr>
              <tr>
                <th className="stylk">
                  NO
                </th>
                <th className="stylk">
                  Duration{" "}
                </th>
                <th className="styll">
                  Description
                </th>
                <th className="stylk">
                  OMR
                </th>
                <th className="stylk">
                  USD
                </th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr>
                <td className="stylc">
                  1
                </td>
                <td lassName="stylc">
                  {" "}
                  185-199.99 M{" "}
                </td>
                <td className="stylm">
                  Charges per day(minimum a calendar day / 24 hours )
                </td>
                <td className="styld">
                  38.610
                </td>
                <td className="styld">
                  {" "}
                  100.00
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  className="styln;"
                >
                  Vessels waiting at anchorage due non-availability of berth
                  shall not be charged anchorage fees.
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div class="payment">
              Payment:
              <br /> Payment in advance prior to vessel arrival as per below
              bank account details:
              <br /> OUR BANKING ACCOUNT DETAILS
              <br /> TRANS OCEAN MARITIME SERVICES LLC
              <br /> BANK MUSCAT
              <br /> FALAJ AL QABAIL SOHAR, SULTANATE OF OMAN
              <br /> A/C NUMBER:- 0423061688920014 (OMR)
              <br /> A/C NUMBER:- 0423061688920022 (USD)
              <br /> SWIFT CODE: - BMUSOMRXXXX
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default PdaDialog;
