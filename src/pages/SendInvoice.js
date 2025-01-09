// ResponsiveDialog.js
import React, { useState, useEffect } from "react";

import Loader from "./Loader";
import "../css/sendinvoice.css";
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

import { sendInvoiceApi, getInvoiceDocumentsAPI } from "../services/apiService";
import PopUp from "./PopUp";
const transwave = require("../assets/images/EPDA-MV-TBN-SALALAH-CARGO-(3)-1.jpg");
const Group = require("../assets/images/TRANSocean-LOGO.png");

const SendInvoice = ({
  open,
  onClose,
  services,

  selectedPdaData,
}) => {
  console.log(services, "services");
  console.log(selectedPdaData, "selectedPdaData");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [fecthedDocuments, setFecthedDocuments] = useState([]); // Loader state
  const [isFinalreport, setIsFinalReport] = useState(false);
  const [documentPathArray, setDocumentPathArray] = useState([]); // New state for storing pdfPath

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    cc: "",
    bcc: "",
    emailbody:
      "I am writing to seek your approval for the Invoice. Please find attached a copy of the signed Invoice for your records. Once approved, we will proceed with the Invoice as per our standard procedures. Thank you for your prompt attention to this matter.",
    pdaId: "",
    attachments: [],
    documents: [],
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFileIndex, setSelectedFileIndex] = useState(null);

  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [emailBodyError, setEmailBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);

    // Filter files larger than 5MB (5 * 1024 * 1024 bytes)
    const validFiles = uploadedFiles.filter(
      (file) => file.size <= 5 * 1024 * 1024
    );

    // Notify the user if some files were rejected
    if (uploadedFiles.length !== validFiles.length) {
      setMessage("Some files exceed the 5MB size limit and were not added.");
      setOpenPopUp(true);
    }

    // Update the state with valid files
    setFormData((prevFormData) => ({
      ...prevFormData,
      attachments: [...(prevFormData.attachments || []), ...validFiles], // Append valid files to the existing array
    }));

    e.target.value = null; // Reset the input
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
      attachments: prevFormData.attachments.filter(
        (_, index) => index !== selectedFileIndex
      ),
    }));
    handleMenuClose();
  };

  const handleSubmit = async () => {
    const { to, subject, emailbody } = formData;
    if (!to.trim()) {
      setToError(true);
    }
    if (!subject.trim()) {
      setSubjectError(true);
    }
    if (!emailbody.trim()) {
      setEmailBodyError(true);
    }

    // Check if email address is valid
    if (!emailRegex.test(to)) {
      setEmailError(true);
      return;
    }

    if (!to.trim() || !subject.trim() || !emailbody.trim()) {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
      return;
    }

    const formDataToSend = new FormData();

    // Combine all files into a single File or Blob
    const combinedFiles = new Blob(formData.attachments, {
      type: "application/octet-stream",
    });

    // Append the single 'attachments' field
    formDataToSend.append("attachments", combinedFiles);

    // Append other form data
    formDataToSend.append("to", formData.to);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("cc", formData.cc);
    formDataToSend.append("bcc", formData.bcc);
    formDataToSend.append("emailbody", formData.emailbody);
    formDataToSend.append("pdaId", selectedPdaData?.id);

    // Combine all files into a single File or Blob
    const combinedDocs = new Blob(formData.documents, {
      type: "application/octet-stream",
    });
    formDataToSend.append("documents", combinedDocs);

    console.log(formData, "formData");
    console.log(formDataToSend, "formDataToSend");

    try {
      const response = await sendInvoiceApi(formDataToSend);
      console.log(response, "sendInvoiceApi_response");
      if (response?.status === true) {
        setMessage("Invoice sent successfully");
        setFormData({
          to: "",
          subject: "",
          cc: "",
          bcc: "",
          emailbody:
            "I am writing to seek your approval for the Invoice. Please find attached a copy of the signed Invoice for your records. Once approved, we will proceed with the Invoice as per our standard procedures. Thank you for your prompt attention to this matter.",
          pdaId: "",
          attachments: [],
        });

        setOpenPopUp(true);
      } else {
        setMessage("Send invoice failed. please try again");
        setOpenPopUp(true);
      }
    } catch (error) {
      setMessage("Send invoice failed. please try again");
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

  const getInvoiceDocuments = async (type) => {
    setIsLoading(true);
    try {
      let userData = {
        pdaId: selectedPdaData?.id,
      };
      const response = await getInvoiceDocumentsAPI(userData);
      console.log("response_getInvoiceDocuments:", response);
      console.log("response_getInvoiceDocuments:", response?.documents);
      setFecthedDocuments(response?.documents);
      // Extract pdfPath and store in documentPathArray
      const paths = response?.documents?.map((doc) => doc.pdfPath) || [];
      setDocumentPathArray(paths);
      if (response?.finalReport > 0) {
        setIsFinalReport(true);
      } else if (response?.finalReport == 0) {
        setIsFinalReport(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPdaData?.id) {
      getInvoiceDocuments();
    }
  }, [selectedPdaData]);

  useEffect(() => {
    console.log(fecthedDocuments, "fecthedDocuments");
    console.log(documentPathArray, "documentPathArray");
  }, [fecthedDocuments, documentPathArray]);

  return (
    <>
      <Dialog
        sx={{
          width: 1250,
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
                        className={`form-control vessel-voyage ${
                          emailError ? "is-invalid" : ""
                        }`}
                        id="exampleFormControlInput1"
                        placeholder="Enter recipient's email"
                        value={formData.to}
                        onChange={(e) => {
                          setFormData({ ...formData, to: e.target.value });
                          setToError(false); // Clear "to" error on change
                          setEmailError(false); // Clear email error on change
                        }}
                      />
                      {(toError || emailError) && (
                        <>
                          <div className="invalid">
                            Please enter a valid email address.
                          </div>
                        </>
                      )}
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
                        Cc:
                      </label>
                      <input
                        type="email"
                        className="form-control vessel-voyage"
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
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Bcc:
                      </label>
                      <input
                        type="email"
                        className="form-control vessel-voyage"
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
              </div>
            </div>
            <div class="ccbcc ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Subject:
                      </label>
                      <input
                        type="email"
                        className="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          setSubjectError(false);
                        }}
                      />
                      {subjectError && (
                        <>
                          <div className="invalid">Please enter subject</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Upload Attachments:
                      </label>
                      <input
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=" "
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
                      Email Body:
                    </label>
                    <textarea
                      rows="3"
                      className="form-control formlabelcolor"
                      id="exampleFormControlInput1"
                      value={formData.emailbody}
                      onChange={(e) => {
                        setFormData({ ...formData, emailbody: e.target.value });
                        setEmailBodyError(false);
                      }}
                      placeholder=""
                    ></textarea>
                    {emailBodyError && (
                      <>
                        <div className="invalid">Please enter emailbody</div>
                      </>
                    )}
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
                    {formData?.attachments?.length > 0 && (
                      <>
                        <Paper
                          elevation={1}
                          style={{ marginTop: 16, padding: 8 }}
                        >
                          <List>
                            {formData.attachments.map((file, index) => (
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
                                        attachments:
                                          prevFormData.attachments.filter(
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
            <div class="row ">
              <div class="col-7">
                <div class="mb-3">
                  <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">
                      Supporting Documents:
                    </label>
                    <div class="rec">
                      <ul>
                        {fecthedDocuments?.length > 0 &&
                          fecthedDocuments?.map((file, index) => {
                            return (
                              <>
                                <a
                                  class="supporting"
                                  onClick={() =>
                                    window.open(
                                      `https://hybrid.sicsglobal.com/transocean_api/assets/template_pdf/${file?.pdfPath}`,
                                      "_blank"
                                    )
                                  }
                                >
                                  <li class="supporting">
                                    {" "}
                                    {file?.templateName}
                                  </li>
                                </a>
                              </>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {isFinalreport && (
                <>
                  <div class="col-5">
                    <div class="mb-3">
                      <div class="col">
                        <label
                          for="exampleFormControlInput1"
                          class="form-label"
                        >
                          Attach Invoice:
                        </label>
                        <div class="rectangle-invoice">
                          <div class="invoice">Invoice PDF</div>
                          <div class="Attach">
                            <i class="bi bi-file-earmark-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default SendInvoice;
