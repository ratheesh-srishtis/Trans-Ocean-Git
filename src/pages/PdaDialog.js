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
          <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead>
              <tr>
                <th
                  colspan="6"
                  class=" tableimage "
                  style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #c5d9f1; min-width:0px; max-width:100%; "
                >
                  <img class="logoimg" src="./TRANSocean-LOGO.png" />
                  <img
                    class="sublogoimg"
                    src="./EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg"
                  />
                </th>

                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:59px; max-width:100%;"></th>
              </tr>
            </thead>
          </table>
          <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead class="tableheading">
              <tr>
                <th
                  colspan="5"
                  style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #ffffff; min-width:949px; max-width:100%;"
                >
                  TO TBA
                </th>

                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffff;min-width:145px; max-width:100%;">
                  Date:13/11/2024
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #ffffff; min-width:141px; max-width:100%;"></th>
              </tr>
            </thead>
          </table>
          <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead class="tableheading">
              <tr>
                <th
                  colspan="3"
                  style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:116px; max-width:100%;"
                >
                  VESSEL
                </th>

                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:580px; max-width:100%; ">
                  LOCATION
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:65px; max-width:100%;">
                  ETA
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:97px; max-width:100%;">
                  ETD
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;min-width:92px; max-width:100%;">
                  CARGO
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;min-width:144px; max-width:100%;">
                  LOA
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; min-width:138px; max-width:100%;"></th>
              </tr>
              <tr>
                <th
                  colspan="3"
                  style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;"
                >
                  {" "}
                  MV TBN
                </th>

                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;  ">
                  SALALAH PORT
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  {" "}
                  TBA
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  TBA
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  GYPSUM
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  199.90
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; "></th>
              </tr>
              <tr>
                <th
                  colspan="3"
                  style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;"
                >
                  GRT
                </th>

                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;  ">
                  36,336
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  {" "}
                  NRT
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  21,330
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;">
                  65K
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1;"></th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center; background-color: #c5d9f1; "></th>
              </tr>
            </thead>
          </table>
          <table style="border-collapse: collapse; width: 100%; font-family: Arial, sans-serif;">
            <thead class="tableheading">
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">
                  Sl.No
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">
                  Particulars
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;">
                  Quantity
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">
                  Amount (OMR)
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">
                  VAT AMOUNT
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">
                  TOTAL AMOUNT (OMR)
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right; background-color: #f2f2f2;">
                  TOTAL AMOUNT (USD)
                </th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  Consolidated Marine Charges (USD 4150 Up to 24 Hours or part
                  thereof)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1 day
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  1,583.969
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  1,583.969
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  4,150.00
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #000000; padding: 8px; text-align: left; background-color: yellow;">
                  after Every 24 Hours or part thereof USD 1700 - final amount
                  will be change as per actual Salalah port invoice based on
                  vessel stay{" "}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  4 days
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  648.855
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  2,595.420
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  6,800.00
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #000000; padding: 8px; text-align: left; background-color: yellow;">
                  Delay in vessel operations or vessel staying alongside after
                  completion of operation
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #000000; padding: 8px; text-align: left; background-color: yellow;">
                  First 2 hours beyond permitted period (USD 250 per hour or
                  part thereof)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #000000; padding: 8px; text-align: left; background-color: yellow;">
                  For next 2 hours or part thereof USD 500{" "}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #000000; padding: 8px; text-align: left; background-color: yellow;">
                  Subsequent period per hour or part thereof USD 1500
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A2
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  CUSTOMS
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  50.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  50.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  131.00
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td
                  colspan="6"
                  style="border: 1px solid #ddd; padding: 8px; text-align: left; color: red; "
                >
                  {" "}
                  * CUSTOMS FINE : - As per the Salalah port customs rule it’s
                  mandatory to mention in last port clearance next port as
                  Salalah, failing to comply it will attract fine USD 1310.00
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A3
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  HEALTH(QUARANTINE)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  50.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  50.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  131.00
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A4
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  Issue of Port clearance
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  21.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  21.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  55.02
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A5
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  ENVIORMENTS FEE (General Cargo vessels and container vessels –
                  per call)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  47.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  47.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  123.14
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A6
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  GARBAGE SKIP (Compulsory)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  37.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  37.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  96.94
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A7
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  AMNAS (ARABIAN MARITIME & NAVIGATION SERVICES)
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;"></td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;"></td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; color: red; ">
                  {" "}
                  Per call(OMR 1.375 per 100NRT)-***as per NRT OF THE VESSE
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  293.288
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  293.288
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  768.41
                </td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  A9
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; ">
                  {" "}
                  AGENCY CHARGES
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  76.336
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  0.000
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  76.336
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  200.00
                </td>
              </tr>
              <tr>
                <td
                  colspan="5"
                  style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight:bolder; font-size:15px;"
                >
                  TOTAL AMOUNT
                </td>

                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;font-weight:bolder; font-size:15px; ">
                  4,754.013
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right; font-weight:bolder; font-size:15px; ">
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
          <table style="border-collapse: collapse; width: 70%; font-family: Arial, sans-serif;">
            <thead class="tableheading">
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: #f2f2f2;"></th>
                <th
                  colspan="4"
                  style="border: 1px solid #ddd; padding: 8px; text-align:center; background-color: #f2f2f2;"
                >
                  Anchorage Stay Charges
                </th>
              </tr>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; text-align:center ;">
                  NO
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align:center ;  ">
                  Duration{" "}
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align:center ; min-width:300px; max-width:100%;">
                  Description
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align:center ;">
                  OMR
                </th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align:center ;">
                  USD
                </th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">
                  1
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left;  ">
                  {" "}
                  185-199.99 M{" "}
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: left; min-width:300px; max-width:100%;">
                  Charges per day(minimum a calendar day / 24 hours )
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  38.610
                </td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">
                  {" "}
                  100.00
                </td>
              </tr>
              <tr>
                <td
                  colspan="6"
                  style="border: 1px solid #ddd; padding: 8px; text-align: left; background-color: yellow; font-weight: bold;"
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
