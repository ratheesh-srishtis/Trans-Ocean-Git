// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/qqdialog.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
const QQDialog = ({ open, onClose }) => {
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
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>QQ Dialog </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className=" statement">QQ Dialog</div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default QQDialog;
