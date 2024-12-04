// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/loadingreport.css";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";

const LoadingReport = ({ open, onClose, templates }) => {
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
            <DialogTitle>LoadingReport </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}></DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default LoadingReport;
