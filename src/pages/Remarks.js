// ResponsiveDialog.js
import React, { useState, useEffect } from "react";

import "../css/addcharges.css";
import "../css/editcharges.css";
import "../css/sendquotation.css";
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
  sendQuotationAPI,
} from "../services/apiService";
import PopUp from "./PopUp";
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
const Remarks = ({ open, onClose }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {
    setMessage("PDA has been Rejected by Finance Manager");
    setOpenPopUp(true);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <div className="d-flex justify-content-between">
          <DialogTitle>Remarks</DialogTitle>
          <div className="closeicon" onClick={onClose}>
            <i class="bi bi-x-lg "></i>
          </div>
        </div>

        <DialogContent>
          <div class="Anchoragecall">
            <div class="row ">
              <div class="col">
                <div class="mb-3">
                  <div class="col">
                    <textarea
                      rows="5"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Remarks"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="firstfooter d-flex justify-content-end">
              <button
                type="button"
                class="btn add-button"
                onClick={handleSubmit}
              >
                OK
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default Remarks;
