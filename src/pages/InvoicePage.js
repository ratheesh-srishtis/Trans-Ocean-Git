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

import {
  sendInvoiceApi,
  getInvoiceDocumentsAPI,
  uploadDocuments,
} from "../services/apiService";
import PopUp from "./PopUp";
const transwave = require("../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
const Group = require("../assets/images/TRANSocean-LOGO.png");

const InvoicePage = ({
  open,
  onClose,
  services,

  selectedPdaData,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
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
                <td className="tdstylwidt">1</td>
                <td className="tdstyl"> Marine Charges</td>
                <td className="tdstyl"> $20</td>
                <td className="tdstyl">PerDay </td>
                <td className="tdstyl">100.000</td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">2</td>
                <td className="tdstyl">Otherport Charges</td>
                <td className="tdstyl"> $20</td>
                <td className="tdstyl">2Tugs* 2Hours </td>
                <td className="tdstyl">60.000</td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">3</td>
                <td className="tdstyl"> Arabian Maritime & Navigation Services</td>
                <td className="tdstyl"> $20</td>
                <td className="tdstyl">2*move </td>
                <td className="tdstyl">60.000</td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">4</td>
                <td className="tdstyl"> Husbandry services</td>
                <td className="tdstyl"> $20</td>
                <td className="tdstyl">2*move </td>
                <td className="tdstyl">60.000</td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">5</td>
                <td className="tdstyl"> OtherCharges</td>
                <td className="tdstyl"> $20</td>
                <td className="tdstyl">2*move </td>
                <td className="tdstyl">60.000</td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>

                  </div>
                </td>
                <td className="tdstyl">
                  <div className="templateouterinvoice">

                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>
                        <div
                          className="iconpdfinvoice"

                        >
                          <i className="bi bi-trash invoicetrash"></i>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center ">
                      <div className="tempgenerated ">
                        sssss
                      </div>
                      <div className="d-flex">
                        <div
                          className="icondowninvoice"

                        >
                          <i className="bi bi-eye invoiceeyee"></i>
                        </div>

                      </div>
                    </div>

                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="tabmain">
            <thead>
              <tr>
                <th className="tabhead">Description</th>
                <th className="tabhead">Date</th>
                <th className="tabhead">Time</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <td className="tdstyl">EOSP</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Dropped The Anchor</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Vessel Inward Submitted</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Inward Customs Approved</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Submitted for Port Clearence</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Port Controlled Approved</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Immigration Approved</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Coast guard Approved</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Customs Approved</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>
              </tr>
              <tr>
                <td className="tdstyl">Port Clearence Received</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">Port Clearence sent to Master</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
              <tr>
                <td className="tdstyl">COSP</td>
                <td className="tdstyl"> 01/02/2025</td>
                <td className="tdstyl">
                  11:56 AM
                </td>

              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center mt-4">
            <button
              className="btn btna submit-button"

            >
              Accept

            </button>

            <button
              className="btn btna generate-button"

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
    </>
  );
};

export default InvoicePage;
