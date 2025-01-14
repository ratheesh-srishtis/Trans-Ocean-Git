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
  services,
  customers,
  ports,
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
  // const [fetchedCharges, setFetchedCharges] = useState(new Set());
  // const [fetchedSubCharges, setFetchedSubCharges] = useState(new Set());
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

  // const getItemName = (id, name) => {
  //   // if (name === "service") {
  //   //   if (id) {
  //   //     fetchCharges(id);
  //   //   }
  //   //   const service = services?.find((s) => s._id === id);
  //   //   return service ? service.serviceName : "Unknown Service";
  //   // } else if (name === "customer") {
  //   //   const customer = customers?.find((s) => s._id === id);
  //   //   return customer ? customer.customerName : "Unknown Customer";
  //   // } else if (name === "vendor") {
  //   //   const vendor = vendors?.find((s) => s._id === id);
  //   //   return vendor ? vendor.vendorName : "Unknown vendor";
  //   // } else if (name === "vessel") {
  //   //   const vessel = vessels?.find((s) => s._id === id);
  //   //   return vessel ? vessel.vesselName : "Unknown vessel";
  //   // } else if (name === "port") {
  //   //   const port = ports?.find((s) => s._id === id);
  //   //   return port ? port.portName : "Unknown port";
  //   // } else if (name === "cargo") {
  //   //   const cargo = cargos?.find((s) => s._id === id);
  //   //   return cargo ? cargo.cargoName : "Unknown cargo";
  //   // } else if (name === "chargeType") {
  //   //   if (id) {
  //   //     fetchSubCharges(id);
  //   //   }
  //   //   const charge = charges.find((s) => s._id === id);
  //   //   return charge ? charge.chargeName : "Unknown charge";
  //   // } else

  //   if (name === "subChargeType") {
  //     const subCharge = subCharges.find((s) => s._id === id);
  //     return subCharge ? subCharge.subchargeName : "Unknown subCharge";
  //   }
  // };

  // const fetchCharges = async (id) => {
  //   if (id) {
  //     if (!fetchedCharges.has(id)) {
  //       try {
  //         const response = await getCharges({
  //           serviceId: id,
  //         });
  //         setCharges((prev) => [...prev, ...response?.charges]);
  //         setFetchedCharges((prev) => new Set(prev).add(id));
  //         console.log("Fetched Charges:", response);
  //       } catch (error) {
  //         console.error("Error fetching charges:", error);
  //       }
  //     }
  //   }
  // };

  // const fetchSubCharges = async (id) => {
  //   console.log(id, "fetchSubCharges_ID_PDADIALOG");
  //   if (id) {
  //     if (!fetchedSubCharges.has(id)) {
  //       alert("fetchSubCharges pda ");
  //       try {
  //         const response = await getSubcharges({
  //           chargeId: id,
  //         });
  //         setSubCharges((prev) => [...prev, ...response?.subcharges]);
  //         setFetchedSubCharges((prev) => new Set(prev).add(id));
  //         console.log("Fetched SubCharges:", response);
  //       } catch (error) {
  //         console.error("Error fetching subcharges:", error);
  //       }
  //     }
  //   }
  // };

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

  const [fetchedCharges, setFetchedCharges] = useState(new Set());
  const [fetchedSubCharges, setFetchedSubCharges] = useState(new Set());

  // Fetch charges
  useEffect(() => {
    const uniqueChargeIds = new Set(
      pdaServices?.map((service) => service.serviceId).filter(Boolean)
    );

    uniqueChargeIds.forEach((id) => {
      if (!fetchedCharges.has(id)) {
        fetchCharges(id);
      }
    });
  }, [pdaServices, fetchedCharges]);

  // Fetch subcharges
  useEffect(() => {
    const uniqueSubChargeIds = new Set(
      pdaServices?.map((service) => service.chargeId).filter(Boolean)
    );

    uniqueSubChargeIds.forEach((id) => {
      if (!fetchedSubCharges.has(id)) {
        fetchSubCharges(id);
      }
    });
  }, [pdaServices, fetchedSubCharges]);

  const fetchCharges = async (id) => {
    if (!fetchedCharges.has(id)) {
      try {
        const response = await getCharges({ serviceId: id });
        console.log(response, "fetchCharges");

        setCharges((prev) => [...prev, ...response?.charges]);
        setFetchedCharges((prev) => new Set(prev).add(id));
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    }
  };

  const fetchSubCharges = async (id) => {
    if (!fetchedSubCharges.has(id)) {
      try {
        const response = await getSubcharges({ chargeId: id });
        console.log(response, "fetchSubCharges");
        setSubCharges((prev) => [...prev, ...response?.subcharges]);
        setFetchedSubCharges((prev) => new Set(prev).add(id));
      } catch (error) {
        console.error("Error fetching subcharges:", error);
      }
    }
  };

  const getItemName = (id, name) => {
    if (name === "subChargeType") {
      const subCharge = subCharges.find((s) => s._id === id);
      return subCharge ? subCharge.subchargeName : "Unknown subCharge";
    }
    if (name === "cargo") {
      const cargo = cargos?.find((s) => s._id === id);
      return cargo ? cargo.cargoName : "Unknown cargo";
    }
    if (name === "vessel") {
      const vessel = vessels?.find((s) => s._id === id);
      return vessel ? vessel.vesselName : "Unknown vessel";
    }
    if (name === "port") {
      const port = ports?.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    }
    if (name === "customer") {
      const customer = customers?.find((s) => s._id === id);
      return customer ? customer.customerName : "Unknown Customer";
    }
  };

  useEffect(() => {
    console.log(fetchedSubCharges, "fetchedSubCharges");
    console.log(subCharges, "subCharges");
  }, [fetchedSubCharges, subCharges]);

  return (
    <>
      <Dialog
        sx={{
          width: 1250,
          margin: "auto",
          borderRadius: 2,
        }}
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // Prevent dialog from closing when clicking outside
            return;
          }
          onClose(); // Allow dialog to close for other reasons
        }}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          style: { width: "1700px" }, // Custom width
        }}
      >
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
                <th colspan="6" className=" tableimage ">
                  <img className="logoimg" src={Group}></img>

                  <img className="sublogoimg" src={transwave}></img>
                </th>

                <th className="stylone"></th>
              </tr>
            </thead>
          </table>
          <table className="tabstyle">
            <thead className="tableheading">
              <tr>
                <th colspan="5" className="styltwo">
                  To :{" "}
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
            <thead className="tableheading">
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
                  {/* {moment.utc(pdaDetails?.ETA).format("DD-MM-YYYY HH:mm A")} */}
                  {moment.utc(pdaDetails?.ETA).format("DD-MM-YYYY HH:mm")}
                </th>
                <th className="mvstyl">
                  {" "}
                  {moment.utc(pdaDetails?.ETD).format("DD-MM-YYYY HH:mm")}
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
            <thead className="tableheading">
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
            <tbody className="tablebody">
              {pdaServices?.length > 0 &&
                pdaServices.map((charge, index) => (
                  <>
                    <tr key={index}>
                      <td className="stylc">{index + 1}</td>
                      <td className="stylc">
                        {charge.subchargeId
                          ? getItemName(charge.subchargeId, "subChargeType")
                          : ""}
                      </td>
                      <td className="stylq">{charge?.quantity}</td>

                      <td className="stylq">{charge.customerOMR.toFixed(3)}</td>
                      <td className="stylq">{charge.customerVAT.toFixed(3)}</td>
                      <td className="stylq">
                        {(
                          parseFloat(charge.customerOMR) +
                          parseFloat(charge.customerVAT)
                        ).toFixed(3)}
                      </td>
                      <td className="stylq">
                        {charge.customerTotalUSD.toFixed(2)}
                      </td>
                    </tr>
                    {charge?.remark && (
                      <>
                        <tr>
                          <td className="stylc"></td>
                          <td colspan="6" className="stylg ">
                            {charge?.remark}
                          </td>
                        </tr>
                      </>
                    )}
                  </>
                ))}

              <tr>
                <td colspan="5" className="stylh">
                  TOTAL AMOUNT
                </td>

                <td className="stylt">
                  {(
                    parseFloat(formattedTotals.customerOMR) +
                    parseFloat(formattedTotals.customerVAT)
                  ).toFixed(3)}
                </td>
                <td className="stylt">{formattedTotals.customerTotalUSD}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className="col-1 note">Note</div>
            <div className="subnote">
              **“Effective from 16th April 2021, 5% of VAT will applicable as
              per new Government regulation in the Sultanate of Oman."
              <br />
              ***Denotes estimated charges and actual as per port bills <br />
              ****Agency fess does not include Immarsat calls or telexes. If
              necessary will be charged out of costs
            </div>
          </div>
          <table className="styli">
            <thead className="tableheading">
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
            <tbody className="tablebody">
              <tr>
                <td className="stylk">1</td>
                <td className="stylk"> 185-199.99 M </td>
                <td className="stylm">
                  Charges per day(minimum a calendar day / 24 hours )
                </td>
                <td className="stylq">38.610</td>
                <td className="stylq"> 100.00</td>
              </tr>
              <tr>
                <td colspan="6" className="styln">
                  Vessels waiting at anchorage due non-availability of berth
                  shall not be charged anchorage fees.
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <div className="payment">
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
