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

import {
  sendInvoiceApi,
  getInvoiceDocumentsAPI,
  uploadDocuments,
} from "../services/apiService";
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

    // // Combine all files into a single File or Blob
    // const combinedFiles = new Blob(formData.attachments, {
    //   type: "application/octet-stream",
    // });

    // // Append the single 'attachments' field
    // formDataToSend.append("attachments", combinedFiles);

    // Append other form data
    formDataToSend.append("to", formData.to);
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("cc", formData.cc);
    formDataToSend.append("bcc", formData.bcc);
    formDataToSend.append("emailbody", formData.emailbody);
    formDataToSend.append("pdaId", selectedPdaData?.id);
    formDataToSend.append("attachments", uploadedFiles);
    formDataToSend.append("documents", documentPathArray);

    console.log("FormDataToSend:");
    formDataToSend.forEach((value, key) => {
      console.log(key, value, "FormDataToSend");
    });

    try {
      const response = await sendInvoiceApi(formDataToSend);
      console.log(response, "sendInvoiceApi_response");
      if (response?.status === true) {
        setMessage("Invoice sent successfully");
        setUploadedFiles([]);
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

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const documentsUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();

      // Append all selected files to FormData
      Array.from(event.target.files).forEach((file) => {
        console.log(file, "file");
        formData.append("files", file); // "files" is the expected key for your API
      });

      try {
        setUploadStatus("Uploading...");
        const response = await uploadDocuments(formData);

        if (response.status) {
          setUploadStatus("Upload successful!");
          setUploadedFiles((prevFiles) => [...prevFiles, ...response.data]); // Append new files to existing ones
        } else {
          setUploadStatus("Upload failed. Please try again.");
        }
      } catch (error) {
        console.error("File upload error:", error);
        setUploadStatus("An error occurred during upload.");
      }
    }
  };

  const handleFileDelete = async (fileUrl, index) => {
    // Update the state by filtering out the file with the specified URL
    // const updatedFiles = uploadedFiles.filter((file) => file.url !== fileUrl);
    // setUploadedFiles(updatedFiles);
    console.log(fileUrl, "fileUrl");

    // if (fileUrl?._id) {
    //   let payload = {
    //     pdaId: editData?._id,
    //     documentId: fileUrl?._id,
    //   };
    //   try {
    //     const response = await deletePdaDocument(payload);
    //     if (response.status) {
    //       const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    //       console.log(updatedFiles, "updatedFiles");
    //       setUploadedFiles(updatedFiles);
    //       setMessage("File has been deleted successfully");
    //       setOpenPopUp(true);
    //       fetchPdaDetails(editData?._id);
    //     } else {
    //       setMessage("Failed please try again!");
    //       setOpenPopUp(true);
    //     }
    //   } catch (error) {
    //     setMessage("Failed please try again!");
    //     setOpenPopUp(true);
    //   }
    // } else if (!fileUrl?._id) {
    //   const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    //   console.log(updatedFiles, "updatedFiles");
    //   setUploadedFiles(updatedFiles);
    //   setMessage("File has been deleted successfully");
    //   setOpenPopUp(true);
    // }
  };

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
          <div className="Anchoragecall">
            <div className="toaddress ">
              <div className="row align-items-start">
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label for="exampleFormControlInput1" className="form-label">
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
            <div className="ccbcc ">
              <div className="row align-items-start">
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label for="exampleFormControlInput1" className="form-label">
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
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label for="exampleFormControlInput1" className="form-label">
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
            <div className="ccbcc ">
              <div className="row align-items-start">
                <div className="col">
                  <div className="mb-3">
                    <div className="col">
                      <label for="exampleFormControlInput1" className="form-label">
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
              
              </div>
            </div>
            <div className="row ">
              <div className="col">
                <div className="mb-3">
                  <div className="col">
                    <label for="exampleFormControlInput1" className="form-label">
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
            

            <div className="typesofcall-row ">
              <div className="row align-items-start">
                <div className="mb-2 col-4 docuplo">
                  <label for="formFile" className="form-label">
                    Documents Upload:
                  </label>
                  <input
                    className="form-control documentsfsize linheight"
                    type="file"
                    id="portofolio"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      documentsUpload(e); // Call your upload handler
                      e.target.value = ""; // Reset the file input value to hide uploaded file names
                    }}
                  ></input>
                </div>
                <div className="mb-2 col-8">
                  {uploadedFiles && uploadedFiles?.length > 0 && (
                    <>
                      <div className="templatelink">Uploaded Files:</div>
                      <div className="templateouter">
                        {uploadedFiles?.length > 0 &&
                          uploadedFiles?.map((file, index) => {
                            return (
                              <>
                                <div className="d-flex justify-content-between ">
                                  <div className="tempgenerated ">
                                    {file?.originalName}
                                  </div>
                                  <div className="d-flex">
                                    <div
                                      className="icondown"
                                      onClick={() =>
                                        window.open(
                                          `https://hybrid.sicsglobal.com/transocean_api/assets/${file?.url}`,
                                          "_blank"
                                        )
                                      }
                                    >
                                      <i className="bi bi-eye"></i>
                                    </div>
                                    <div
                                      className="iconpdf"
                                      onClick={() =>
                                        handleFileDelete(file, index)
                                      }
                                    >
                                      <i className="bi bi-trash"></i>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-7">
                <div className="mb-3">
                  <div className="col">
                    <label for="exampleFormControlInput1" className="form-label">
                      Supporting Documents:
                    </label>
                    <div className="rec">
                      
                      {fecthedDocuments?.length > 0 && (
  <>
    <ul className="firstsection">
      {fecthedDocuments
        .slice(0, Math.ceil(fecthedDocuments.length / 3))
        .map((file, index) => (
          <a
            key={`first-${index}`}
            className="supporting"
            onClick={() =>
              window.open(
                `https://hybrid.sicsglobal.com/transocean_api/assets/template_pdf/${file?.pdfPath}`,
                "_blank"
              )
            }
          >
            <li className="supporting">{file?.templateName}</li>
          </a>
        ))}
    </ul>
    <ul className="secondsection">
      {fecthedDocuments
        .slice(
          Math.ceil(fecthedDocuments.length / 3),
          Math.ceil((2 * fecthedDocuments.length) / 3)
        )
        .map((file, index) => (
          <a
            key={`second-${index}`}
            className="supporting"
            onClick={() =>
              window.open(
                `https://hybrid.sicsglobal.com/transocean_api/assets/template_pdf/${file?.pdfPath}`,
                "_blank"
              )
            }
          >
            <li className="supporting">{file?.templateName}</li>
          </a>
        ))}
    </ul>
    <ul className="thirdsection">
      {fecthedDocuments
        .slice(Math.ceil((2 * fecthedDocuments.length) / 3))
        .map((file, index) => (
          <a
            key={`third-${index}`}
            className="supporting"
            onClick={() =>
              window.open(
                `https://hybrid.sicsglobal.com/transocean_api/assets/template_pdf/${file?.pdfPath}`,
                "_blank"
              )
            }
          >
            <li className="supporting">{file?.templateName}</li>
          </a>
        ))}
    </ul>
  </>
)}
                    </div>
                  </div>
                </div>
              </div>

              {isFinalreport && (
                <>
                  <div className="col-5">
                    <div className="mb-3">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Attach Invoice:
                        </label>
                        <div className="rectangle-invoice">
                          <div className="invoice">Invoice PDF</div>
                          <div className="Attach">
                            <i className="bi bi-file-earmark-fill filearmark"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default SendInvoice;
