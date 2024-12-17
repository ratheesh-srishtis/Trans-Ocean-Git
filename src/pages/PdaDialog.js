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
import { getPdaFile, getPdaDetails } from "../services/apiService";
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
} from "../services/apiService";
import moment from "moment";

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
  vendors,
  vessels,
  cargos,
}) => {
  console.log(services, "services");
  console.log(pdaResponse, "pdaResponse_dialog");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [pdaDetails, setPdaDetails] = useState(null);
  const [pdaServices, setpdaServices] = useState(null);
  const [charges, setCharges] = useState([]);
  const [subCharges, setSubCharges] = useState([]);
  const [fetchedCharges, setFetchedCharges] = useState(new Set());
  const [fetchedSubCharges, setFetchedSubCharges] = useState(new Set());
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

  const fetchPdaDetails = async () => {
    let data = {
      pdaId: pdaResponse?._id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      console.log(pdaDetails, "pdaDetails");
      setPdaDetails(pdaDetails?.pda);
      setpdaServices(pdaDetails?.pdaServices);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    console.log(pdaDetails, "pdaDetails");
    console.log(pdaServices, "pdaServices");
  }, [pdaDetails, pdaServices]);

  useEffect(() => {
    console.log(open, "open");
    if (open == true) {
      setPdfData(null);
      fetchPdaFile();
      fetchPdaDetails();
    }
  }, [open]);

  useEffect(() => {
    console.log(pdfData, "pdfData");
  }, [pdfData]);

  const getItemName = (id, name) => {
    if (name === "service") {
      if (id) {
        fetchCharges(id);
      }
      const service = services?.find((s) => s._id === id);
      return service ? service.serviceName : "Unknown Service";
    } else if (name === "customer") {
      const customer = customers?.find((s) => s._id === id);
      return customer ? customer.customerName : "Unknown Customer";
    } else if (name === "vendor") {
      const vendor = vendors?.find((s) => s._id === id);
      return vendor ? vendor.vendorName : "Unknown vendor";
    } else if (name === "vessel") {
      const vessel = vessels?.find((s) => s._id === id);
      return vessel ? vessel.vesselName : "Unknown vessel";
    } else if (name === "port") {
      const port = ports?.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    } else if (name === "cargo") {
      const cargo = cargos?.find((s) => s._id === id);
      return cargo ? cargo.cargoName : "Unknown cargo";
    } else if (name === "chargeType") {
      if (id) {
        fetchSubCharges(id);
      }
      const charge = charges.find((s) => s._id === id);
      return charge ? charge.chargeName : "Unknown charge";
    } else if (name === "subChargeType") {
      const subCharge = subCharges.find((s) => s._id === id);
      return subCharge ? subCharge.subchargeName : "Unknown subCharge";
    }
  };

  const fetchCharges = async (id) => {
    if (!fetchedCharges.has(id)) {
      try {
        const response = await getCharges({
          serviceId: id,
        });
        setCharges((prev) => [...prev, ...response?.charges]);
        setFetchedCharges((prev) => new Set(prev).add(id));
        console.log("Fetched Charges:", response);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    }
  };

  const fetchSubCharges = async (id) => {
    if (!fetchedSubCharges.has(id)) {
      try {
        const response = await getSubcharges({
          chargeId: id,
        });
        setSubCharges((prev) => [...prev, ...response?.subcharges]);
        setFetchedSubCharges((prev) => new Set(prev).add(id));
        console.log("Fetched SubCharges:", response);
      } catch (error) {
        console.error("Error fetching subcharges:", error);
      }
    }
  };

  const totalValues = pdaServices?.reduce(
    (totals, charge) => {
      totals.quantity += parseInt(charge.quantity || 0, 10); // Default to 0 if null/undefined
      totals.customerOMR += parseFloat(charge.customerOMR || 0);
      totals.customerVAT += parseFloat(charge.customerVAT || 0);
      totals.customerTotalUSD += parseFloat(charge.customerTotalUSD || 0);
      return totals;
    },
    { quantity: 0, customerOMR: 0, customerVAT: 0, customerTotalUSD: 0 }
  );

  const formattedTotals = {
    quantity: totalValues?.quantity,
    customerOMR: totalValues?.customerOMR.toFixed(3),
    customerVAT: totalValues?.customerVAT.toFixed(3),
    customerTotalUSD: totalValues?.customerTotalUSD.toFixed(2),
  };

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
                <th colspan="6" class=" tableimage ">
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
                <th colspan="5" className="styltwo">
                  To{" "}
                  {pdaDetails?.customerId
                    ? getItemName(pdaDetails?.customerId, "customer")
                    : ""}
                </th>

                <th className="stylthree">
                  Date:{" "}
                  {new Date(pdaDetails?.createdAt).toLocaleDateString("en-GB")}
                </th>
                <th className="stylfour"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead class="tableheading">
              <tr>
                <th colspan="3" className="stylfive">
                  VESSEL
                </th>

                <th className="stylsix">LOCATION</th>
                <th className="stylseven">ETA</th>
                <th className="styleight">ETD</th>
                <th className="stylnine">CARGO</th>
                <th className="stylten">LOA</th>
                <th className="styla"></th>
              </tr>
              <tr>
                <th colspan="3" className="mvstyl">
                  {" "}
                  {pdaDetails?.vesselId
                    ? getItemName(pdaDetails?.vesselId, "vessel")
                    : ""}
                </th>

                <th className="mvstyl">
                  {pdaDetails?.portId
                    ? getItemName(pdaDetails?.portId, "port")
                    : ""}
                </th>
                <th className="mvstyl">
                  {" "}
                  {moment(pdaDetails?.ETA).format("DD-MM-YYYY hh:mm A")}
                </th>
                <th className="mvstyl">
                  {" "}
                  {moment(pdaDetails?.ETD).format("DD-MM-YYYY hh:mm A")}
                </th>
                <th className="mvstyl">
                  {" "}
                  {pdaDetails?.cargoId
                    ? getItemName(pdaDetails?.cargoId, "cargo")
                    : ""}
                </th>
                <th className="mvstyl">{pdaDetails?.LOA}</th>
                <th className="stylee "></th>
              </tr>
              <tr>
                <th colspan="3" className="mvstyl">
                  GRT
                </th>

                <th className="stylee">{pdaDetails?.GRT}</th>
                <th className="mvstyl"> NRT</th>
                <th className="mvstyl">{pdaDetails?.NRT}</th>
                <th className="mvstyl"></th>
                <th className="mvstyl"></th>
                <th className="stylb"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead class="tableheading">
              <tr>
                <th className="slstyl">Sl.No</th>
                <th className="slstyl">Particulars</th>
                <th className="slstyl">Quantity</th>
                <th className="omrstyl">Amount (OMR)</th>
                <th className="omrstyl">VAT AMOUNT</th>
                <th className="omrstyl">TOTAL AMOUNT (OMR)</th>
                <th className="omrstyl">TOTAL AMOUNT (USD)</th>
              </tr>
            </thead>
            <tbody class="tablebody">
              {pdaServices?.length > 0 &&
                pdaServices.map((charge, index) => (
                  <tr key={index}>
                    <td className="stylc">{index + 1}</td>
                    <td className="stylc">
                      {charge.serviceId
                        ? getItemName(charge.serviceId, "service")
                        : ""}
                    </td>
                    <td className="stylc">{charge?.quantity}</td>

                    <td className="styld">{charge.customerOMR.toFixed(3)}</td>
                    <td className="styld">{charge.customerVAT.toFixed(3)}</td>
                    <td className="styld">
                      {(
                        parseFloat(charge.customerOMR) +
                        parseFloat(charge.customerVAT)
                      ).toFixed(3)}
                    </td>
                    <td className="styld">
                      {charge.customerTotalUSD.toFixed(2)}
                    </td>
                  </tr>
                ))}
              <tr>
                <td className="stylc"></td>
                <td colspan="6" className="stylg ">
                  {" "}
                  * CUSTOMS FINE : - As per the Salalah port customs rule it’s
                  mandatory to mention in last port clearance next port as
                  Salalah, failing to comply it will attract fine USD 1310.00
                </td>
              </tr>

              <tr>
                <td colspan="5" className="stylh">
                  TOTAL AMOUNT
                </td>

                <td className="stylh">
                  {(
                    parseFloat(formattedTotals.customerOMR) +
                    parseFloat(formattedTotals.customerVAT)
                  ).toFixed(3)}
                </td>
                <td className="stylh">{formattedTotals.customerTotalUSD}</td>
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
                <th colspan="4" className="stylj">
                  Anchorage Stay Charges
                </th>
              </tr>
              <tr>
                <th className="stylk">NO</th>
                <th className="stylk">Duration </th>
                <th className="styll">Description</th>
                <th className="stylk">OMR</th>
                <th className="stylk">USD</th>
              </tr>
            </thead>
            <tbody class="tablebody">
              <tr>
                <td className="stylc">1</td>
                <td lassName="stylc"> 185-199.99 M </td>
                <td className="stylm">
                  Charges per day(minimum a calendar day / 24 hours )
                </td>
                <td className="styld">38.610</td>
                <td className="styld"> 100.00</td>
              </tr>
              <tr>
                <td colspan="6" className="styln;">
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
