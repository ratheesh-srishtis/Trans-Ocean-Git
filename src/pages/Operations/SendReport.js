// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/sendreport.css";

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

import {
  getCharges,
  getSubcharges,
  uploadDocuments,
  sendServiceReport,
} from "../../services/apiService";
import { AttachFile, Delete, Visibility } from "@mui/icons-material";

import PopUp from "../PopUp";
const SendReport = ({
  open,
  onClose,
  templates,
  charge,
  services,
  ports,
  customers,
  pdaId,
  vendors,
}) => {
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

  const [toError, setToError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [emailBodyError, setEmailBodyError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // const handleFileUpload = (e) => {
  //   const uploadedFiles = Array.from(e.target.files);

  //   // Update the state with the files
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     files: [...prevFormData.files, ...uploadedFiles], // append files to the existing array
  //   }));

  //   e.target.value = null;
  // };

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
      files: [...(prevFormData.files || []), ...validFiles], // Append valid files to the existing array
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
      files: prevFormData.files.filter(
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
    formDataToSend.append("pdaId", pdaId);

    try {
      const response = await sendServiceReport(formDataToSend);
      console.log(response, "sendServiceReport_response");
      if (response?.status === true) {
        setMessage("Quotation sent successfully");
        setFormData({
          to: "",
          subject: "",
          cc: "",
          bcc: "",
          emailbody:
            "I am writing to seek your approval for the Quotation. Please find attached a copy of the signed quotation for your records. Once approved, we will proceed with the Quotation as per our standard procedures. Thank you for your prompt attention to this matter.",
          pdaId: "",
          files: [],
        });

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
          <DialogContent>
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
                        {/* <input
                        type="email"
                        className="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                        value={formData.to}
                        onChange={(e) => {
                          setFormData({ ...formData, to: e.target.value });
                          setToError(false);
                        }}
                      /> */}

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

                        {/* {toError && (
                        <>
                          <div className="invalid">Please enter to address</div>
                        </>
                      )} */}
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
                          value={formData.bcc}
                          onChange={(e) =>
                            setFormData({ ...formData, bcc: e.target.value })
                          }
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
                          type="email"
                          className="form-control vessel-voyage"
                          id="exampleFormControlInput1"
                          placeholder=""
                          value={formData.subject}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            });
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
                </div>
              </div>

              <div className="row ">
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label formlabelcolor"
                      >
                        EmailBody:
                      </label>
                      <textarea
                        rows="3"
                        className="form-control formlabelcolor"
                        id="exampleFormControlInput1"
                        value={formData.emailbody}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            emailbody: e.target.value,
                          });
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
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
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
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default SendReport;
