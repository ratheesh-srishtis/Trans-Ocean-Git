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
import {
  getServiceReport,
  getPdaDetails,
  getAnchorageLocations,
} from "../../services/apiService";
import { useRef } from "react";

const FinalReportDialog = ({ open, onClose, pdaId, ports }) => {
  const transwave = require("../../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
  const Group = require("../../assets/images/TRANSocean-LOGO.png");
  const footer = require("../../assets/images/4.jpg");
  const arab = require("../../assets/images/5.jpg");
  const [serviceReports, setServiceReports] = useState([]);
  const [pdaResponse, setPdaResponse] = useState(null);
  const [anchorageLocations, setAnchorageLocations] = useState([]);

  const serviceReportGet = async (id) => {
    let data = {
      pdaId: id,
    };
    try {
      const serviceReportResponse = await getServiceReport(data);
      console.log("serviceReportGet", serviceReportResponse);
      setServiceReports(serviceReportResponse?.report);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  const fetchPdaDetails = async (id) => {
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      console.log("PDADETAILS", pdaDetails);
      setPdaResponse(pdaDetails?.pda);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    console.log(pdaId, "pdaId");
    if (pdaId) {
      fetchPdaDetails(pdaId);
      serviceReportGet(pdaId);
    }
  }, [pdaId]);

  useEffect(() => {
    console.log(open, "open");
    if (open == true) {
      fetchPdaDetails(pdaId);
      serviceReportGet(pdaId);
    }
  }, [open, pdaId]);

  const hasFetchedAnchorage = useRef(false);

  const fetchAnchorageValues = async (data) => {
    console.log(data, "id_fetchAnchorageValues");
    try {
      const formdata = {
        portId: data,
      };
      const response = await getAnchorageLocations(formdata);
      console.log(response, "response_fetchAnchorageValues");
      if (response.status) {
        setAnchorageLocations(response?.area);
        localStorage.setItem(
          "anchorage_locations_list",
          JSON.stringify(response.area)
        );
      }
    } catch (error) {
      console.error("Error fetching anchorage values:", error);
    }
  };

  useEffect(() => {
    console.log(pdaResponse, "pdaResponse");
    console.log(anchorageLocations, "anchorageLocations");
    console.log(ports, "ports");
    if (pdaResponse?.portId && !hasFetchedAnchorage.current) {
      fetchAnchorageValues(pdaResponse?.portId);
      hasFetchedAnchorage.current = true; // Mark as fetched
    }
  }, [pdaResponse, ports, anchorageLocations]);

  const getItemName = (id, name) => {
    console.log(id, "getItemName");
    if (name == "port" && id) {
      const port = ports?.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    } else if (name == "anchorage" && id) {
      const anchorage = anchorageLocations.find((s) => s._id === id);
      return anchorage ? anchorage.area : "Unknown anchorage";
    }
  };

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
          onClose={(event, reason) => {
            if (reason === "backdropClick") {
              // Prevent dialog from closing when clicking outside
              return;
            }
            onClose(); // Allow dialog to close for other reasons
          }}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle> </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <table className="tabstyle">
              <thead>
                <tr>
                  <th colspan="6" className=" tableimage ">
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
                    <th className="PortofCallCountry">PORT</th>
                    <th className="PortofCallCountry">ANCHORAGE LOCATION</th>
                    <th className="PortofCallCountry">ARRIVAL DATE</th>
                    <th className="jobrefn">DEPARTURE DATE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="pocstyl">
                      {getItemName(pdaResponse?.portId, "port")}
                    </td>
                    <td className="pocstyl">
                      {" "}
                      {getItemName(
                        pdaResponse?.anchorageLocation,
                        "anchorage"
                      )}{" "}
                    </td>
                    <td className="pocstyl">
                      {" "}
                      {new Date(pdaResponse?.ETA).toLocaleDateString(
                        "en-GB"
                      )}{" "}
                    </td>
                    <td className="pocstyl">
                      {new Date(pdaResponse?.ETD).toLocaleDateString("en-GB")}{" "}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="soaf">
                STATEMENT OF FACTS -DAYTONA BEACH-SOHAR ANCHORAGE
              </div>
              <table className="portofcallstyl mt-3">
                <thead>
                  <tr>
                    <th className="PortofCallCountry">DESCRIPTION</th>
                    <th className="PortofCallCountry">DATE & TIME </th>
                    <th className="PortofCallCountry">SERVICE ACTIVTIES</th>
                    <th className="jobrefn">QUANTITY</th>
                    <th className="PortofCallCountry">REMARKS</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceReports?.length > 0 &&
                    serviceReports.map((report, index) => (
                      <tr key={index}>
                        <td className="pocstyl">{report?.description}</td>
                        <td className="pocstyl">{report?.serviceDate}</td>
                        <td className="pocstyl">{report?.serviceActivity}</td>
                        <td className="pocstyl">{report?.quantity}</td>
                        <td className="pocstyl">{report?.remark}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-envelope-fill istyl"></i>
                  <span className="fstyl">Manager@transocean-maritime.com</span>
                </div>
                <div>
                  <i className="bi bi-telephone-fill istyl"></i>
                  <span className="fstyl">+968 26949863 | +968 91918073</span>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <i className="bi bi-geo-alt-fill istyl"></i>
                  <span className="fstyl">
                    2nd Floor, B Block, Port City, Oman
                  </span>
                </div>
                <div>
                  <i className="bi bi-browser-chrome istyl "></i>
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
