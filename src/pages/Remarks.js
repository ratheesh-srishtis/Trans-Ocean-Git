// ResponsiveDialog.js
import React, { useState, useEffect } from "react";

import "../css/addcharges.css";
import "../css/editcharges.css";
import "../css/sendquotation.css";

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
const Remarks = ({ open, onClose, onRemarksSubmit }) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [remarks, setRemarks] = useState("");
  const handleSubmit = async () => {
    onRemarksSubmit(remarks);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // Prevent dialog from closing when clicking outside
            return;
          }
          onClose(); // Allow dialog to close for other reasons
        }}
        fullWidth
        maxWidth="sm"
      >
        <div className="d-flex justify-content-between">
          <DialogTitle>Remarks</DialogTitle>
          <div className="closeicon" onClick={onClose}>
            <i className="bi bi-x-lg "></i>
          </div>
        </div>

        <DialogContent>
          <div className="Anchoragecall">
            <div className="row ">
              <div className="col">
                <div className="mb-3">
                  <div className="col">
                    <textarea
                      rows="5"
                      className="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Remarks"
                      value={remarks}
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="firstfooter d-flex justify-content-end">
              <button
                type="button"
                className="btn add-button"
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
