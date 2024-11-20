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
import "../css/addcharges.css";
import "../css/editcharges.css";
import "../css/sendquotation.css";
import "../css/generatepda.css";
import { getPdaFile } from "../services/apiService";
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
} from "../services/apiService";

import PopUp from "./PopUp";

const PdaDialog = ({
  open,
  onClose,
  onSubmit,
  selectedVessel,
  selectedPort,
  selectedCargo,
  selectedVesselType,
  selectedCustomer,
  eta,
  etd,
  status,
  formData,
  services,
  customers,
  ports,
  isEditcharge,
  editCharge,
  editIndex,
  pdaResponse,
}) => {
  console.log(services, "services");
  console.log(pdaResponse, "pdaResponse_dialog");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [pdfData, setPdfData] = useState(null);

  const fetchPdaFile = async () => {
    // alert("fetchPdaFile");
    let data = {
      pdaId: pdaResponse?._id,
    };
    try {
      const pdaFile = await getPdaFile(data);
      setPdfData(pdaFile);
      console.log("pdaFile", pdaFile);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    fetchPdaFile();
  }, [pdaResponse]);
  useEffect(() => {
    console.log(pdfData, "pdfData");
  }, [pdfData]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle></DialogTitle>
          <div className="closeicon">
            <i class="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent>
          {pdfData?.status ? (
            <iframe
              src={`${pdfData.pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Viewer"
              style={{
                width: "100%",
                height: "700px",
                border: "none",
              }}
            />
          ) : (
            <p>No PDF available to display</p>
          )}
        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default PdaDialog;
