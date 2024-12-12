// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/sendreport.css";
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
const SendReport = ({
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
  const [message, setMessage] = useState("");
  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 800,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle> send report</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>

            <div className="Anchoragecall">
              <div className="toaddress ">
                <div className="row align-items-start">
                  <div className="col">
                    <div className="mb-3">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          To Address:
                        </label>


                        <input
                          type="email"
                          className="form-control vessel-voyage "
                          id="exampleFormControlInput1"
                          placeholder="Enter recipient's email"

                        />



                        <div className="invalid">
                          Please enter a valid email address.
                        </div>


                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Cc:
                        </label>
                        <input
                          type="email"
                          className="form-control vessel-voyage"
                          id="exampleFormControlInput1"
                          placeholder=""

                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ccbcc ">
                <div className="row align-items-start">
                  <div className="col">
                    <div className="mb-3">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Bcc:
                        </label>
                        <input
                          type="email"
                          className="form-control vessel-voyage"
                          id="exampleFormControlInput1"
                          placeholder=""

                        />
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Subject:
                        </label>
                        <input
                          type="text"
                          className="form-control vessel-voyage"
                          id="exampleFormControlInput1"
                          placeholder=""

                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label for="exampleFormControlTextarea1" class="form-label">Email Body :</label>
                      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="I am writing to bring your attention to the Final Report. Enclosed herewith, please find a copy of the duly signed documents for your perusal and records. Upon your approval, we will proceed with our standard operating procedures. Kindly acknowledge the receipt of this email at your earliest convenience.

Should you have any queries or require clarification on any aspect of the report, please do not hesitate to contact us.

Thank you for your attention to this matter."> </textarea>

                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3">
                  <div className="col">
                    <label for="exampleFormControlInput1" className="form-label">
                      Attachments:
                    </label>
                    <div className="rectangle-quotation">
                      <div className="invoice">Quotation PDF</div>
                      <div className="Attach">
                        <i className="bi bi-filetype-pdf"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="mb-3">
                <div className="col">
                  <div style={{ marginTop: 16 }}>
                    
                  <div className="bguplo">
                    <span className="uplo">
                    <i class="bi bi-paperclip"></i>
                    </span>
                      <span className="uplo" >
                        Upload Attachments
                      </span>
                    </div>
                   
                    
                        
                   
                  </div>
                </div>
              </div>
            </div>
           




              <div className="firstfooter d-flex justify-content-end">
                <button
                  type="button"
                  className="btn add-button"

                >
                  OK
                </button>
              </div>
            </div>





          </DialogContent>
        </Dialog>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default SendReport;
