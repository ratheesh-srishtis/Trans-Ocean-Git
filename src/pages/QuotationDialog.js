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
const QuotationDialog = ({
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

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    cc: "",
    bcc: "",
    emailbody: "",
    pdaId: "",
    files: [],
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    // Update the state with the files
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: [...prevFormData.files, ...uploadedFiles], // append files to the existing array
    }));
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFileIndex(null);
  };

  const handleFileDelete = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      files: prevFormData.files.filter(
        (_, index) => index !== selectedFileIndex
      ),
    }));
    handleMenuClose();
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    // Append each file to FormData
    formData.files.forEach((file) => {
      formDataToSend.append("files", file); // 'files' is the key expected on the server side
    });

    // Append other form data
    formDataToSend.append("to", formData.to);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("cc", formData.cc);
    formDataToSend.append("bcc", formData.bcc);
    formDataToSend.append("emailbody", formData.emailbody);
    formDataToSend.append("pdaId", pdaResponse?._id);

    try {
      const response = await sendQuotationAPI(formDataToSend);
      console.log(response, "sendQuotationAPI_response");
      if (response?.status === true) {
        setMessage("Quotation sent successfully");
        setOpenPopUp(true);
      } else {
        setMessage("Send quotation failed. please try again");
        setOpenPopUp(true);
      }
    } catch (error) {
      setMessage("Send quotation failed. please try again");
      setOpenPopUp(true);
    } finally {
      onClose();
    }
  };

  const handleViewFile = (file) => {
    // Open the file in a new window
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, "_blank");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <div className="d-flex justify-content-between">
          <DialogTitle>Send Quotation</DialogTitle>
          <div className="closeicon" onClick={onClose}>
            <i class="bi bi-x-lg "></i>
          </div>
        </div>

        <DialogContent>
          <div class="Anchoragecall">
            <div class="toaddress ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        To Address:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.to}
                        onChange={(e) =>
                          setFormData({ ...formData, to: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Cc:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.cc}
                        onChange={(e) =>
                          setFormData({ ...formData, cc: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ccbcc ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Bcc:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.bcc}
                        onChange={(e) =>
                          setFormData({ ...formData, bcc: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Subject:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="row ">
              <div class="col">
                <div class="mb-3">
                  <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">
                      EmailBody:
                    </label>
                    <textarea
                      rows="3"
                      class="form-control"
                      id="exampleFormControlInput1"
                      value={formData.emailbody}
                      onChange={(e) =>
                        setFormData({ ...formData, emailbody: e.target.value })
                      }
                      placeholder="I am writing to seek your approval for the Quotation. Please find attached a copy of the signed quotation for your records. Once approved, we will proceed with the Quotation as per our standard procedures. Thank you for your prompt attention to this matter."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="mb-3">
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Attachments:
                  </label>
                  <div class="rectangle-quotation">
                    <div class="invoice">Quotation PDF</div>
                    <div class="Attach">
                      <i class="bi bi-filetype-pdf"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="mb-3">
                <div class="col">
                  <div style={{ marginTop: 16 }}>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<AttachFile />}
                      >
                        Upload Attachments
                      </Button>
                    </label>
                    {formData?.files?.length > 0 && (
                      <>
                        <Paper
                          elevation={1}
                          style={{ marginTop: 16, padding: 8 }}
                        >
                          <List>
                            {formData.files.map((file, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={file.name} />
                                <ListItemSecondaryAction>
                                  {/* <IconButton
                                    edge="end"
                                    onClick={() => handleViewFile(file)}
                                  >
                                    <Visibility />
                                  </IconButton> */}
                                  <IconButton
                                    edge="end"
                                    onClick={() => {
                                      setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        files: prevFormData.files.filter(
                                          (_, i) => i !== index
                                        ),
                                      }));
                                    }}
                                  >
                                    <Delete
                                      onClick={() => {
                                        handleFileDelete();
                                      }}
                                    />
                                  </IconButton>
                                </ListItemSecondaryAction>
                              </ListItem>
                            ))}
                          </List>
                        </Paper>
                      </>
                    )}
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

export default QuotationDialog;
