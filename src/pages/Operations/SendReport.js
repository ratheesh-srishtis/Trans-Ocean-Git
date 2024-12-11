// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/editOperation.css";
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
            send report
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
