// ResponsiveDialog.js
import React, { useState, useEffect } from "react";

import Loader from "./Loader";
import "../css/invoicepage.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from "@mui/material";
import { AttachFile, Delete, Visibility } from "@mui/icons-material";
import Remarks from "./Remarks";
import { changeInvoiceStatus, getServiceReport } from "../services/apiService";
import PopUp from "./PopUp";
import moment from "moment";

const transwave = require("../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
const Group = require("../assets/images/TRANSocean-LOGO.png");

const InvoicePage = ({
  open,
  onClose,
  services,
  selectedPdaData,
  pdaResponse,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [remarksOpen, setRemarksOpen] = useState(false);
  const [serviceReports, setServiceReports] = useState([]);

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

  useEffect(() => {
    console.log(pdaResponse, "pdaResponse");
    if (pdaResponse?._id) {
      serviceReportGet(pdaResponse?._id);
    }
  }, [pdaResponse]);

  useEffect(() => {
    console.log(serviceReports, "serviceReports");
  }, [serviceReports]);

  const handleRemarksOpen = () => {
    setRemarksOpen(true);
  };

  const handleRemarksClose = () => {
    setRemarksOpen(false);
  };

  const handleRemarksSubmit = async (remark) => {
    console.log(remark, "handleRemarksSubmit");
    let pdaPayload = {
      pdaId: pdaResponse?._id,
      status: 2,
      rejectedRemark: remark,
    };
    try {
      const response = await changeInvoiceStatus(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setMessage("Invoice has been Rejected by Finance Manager");
        setOpenPopUp(true);
        setRemarksOpen(false);
      } else {
        setMessage("Invoice failed. Please try again");
        setOpenPopUp(true);
        setRemarksOpen(false);
      }
    } catch (error) {
      setMessage("Invoice failed. Please try again");
      setOpenPopUp(true);
      setRemarksOpen(false);
    } finally {
    }
  };
  const acceptInvoice = async (remark) => {
    console.log(remark, "handleRemarksSubmit");
    let pdaPayload = {
      pdaId: pdaResponse?._id,
      status: 3,
    };
    try {
      const response = await changeInvoiceStatus(pdaPayload);
      console.log(response, "login_response");
      if (response?.status == true) {
        setMessage("Invoice accepted successfully");
        setOpenPopUp(true);
        setRemarksOpen(false);
      } else {
        setMessage("Invoice failed. Please try again");
        setOpenPopUp(true);
        setRemarksOpen(false);
      }
    } catch (error) {
      setMessage("Invoice failed. Please try again");
      setOpenPopUp(true);
      setRemarksOpen(false);
    } finally {
    }
  };

  return (
    <>
      <Dialog
        sx={{
          width: 1300,
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
          <div className=" statement">
            <h3>INVOICE GENERATION</h3>
          </div>

          <table className="tabmain">
            <thead>
              <tr>
                <th className="tabhead">Sl No:</th>
                <th className="tabhead">Charge Type</th>
                <th className="tabhead">Price</th>
                <th className="tabhead">Quantity</th>
                <th className="tabhead">Total</th>
                <th className="tabhead">Documents</th>
                <th className="tabhead">Attachments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tdstylwidtinvoice">1</td>
                <td className="tdstylinvoice"> Marine Charges</td>
                <td className="tdstylinvoice"> $20</td>
                <td className="tdstylinvoice">PerDay </td>
                <td className="tdstylinvoice">100.000</td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidtinvoice">2</td>
                <td className="tdstylinvoice">Otherport Charges</td>
                <td className="tdstylinvoice"> $20</td>
                <td className="tdstylinvoice">2Tugs* 2Hours </td>
                <td className="tdstylinvoice">60.000</td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidtinvoice">3</td>
                <td className="tdstylinvoice">
                  {" "}
                  Arabian Maritime & Navigation Services
                </td>
                <td className="tdstylinvoice"> $20</td>
                <td className="tdstylinvoice">2*move </td>
                <td className="tdstylinvoice">60.000</td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidtinvoice">4</td>
                <td className="tdstylinvoice"> Husbandry services</td>
                <td className="tdstylinvoice"> $20</td>
                <td className="tdstylinvoice">2*move </td>
                <td className="tdstylinvoice">60.000</td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidtinvoice">5</td>
                <td className="tdstylinvoice"> OtherCharges</td>
                <td className="tdstylinvoice"> $20</td>
                <td className="tdstylinvoice">2*move </td>
                <td className="tdstylinvoice">60.000</td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstylinvoice">
                  <div className="templateouterinvoice">
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">sssss</div>
                      <div className="d-flex">
                        <div className="icondowninvoice">
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          {serviceReports?.length > 0 && (
            <>
              <table className="portofcallstyl mt-3">
                <thead>
                  <tr>
                    <th className="PortofCallCountry">SL NO.</th>
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
                        <td className="pocstyl">{index + 1}</td>
                        <td className="pocstyl">{report?.description}</td>
                        <td className="pocstyl">
                          {moment
                            .utc(report?.serviceDate, "DD-MM-YYYY HH:mm")
                            .format("DD-MM-YYYY HH:mm A")}
                        </td>
                        <td className="pocstyl">{report?.serviceActivity}</td>
                        <td className="pocstyl">{report?.quantity}</td>
                        <td className="pocstyl">{report?.remark}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}

          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btna submit-button"
              onClick={() => {
                acceptInvoice();
              }}
            >
              Accept
            </button>

            <button
              className="btn btna generate-button"
              onClick={() => {
                handleRemarksOpen();
              }}
            >
              Reject
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
      <Remarks
        open={remarksOpen}
        onClose={handleRemarksClose}
        onRemarksSubmit={handleRemarksSubmit}
      />
    </>
  );
};

export default InvoicePage;
