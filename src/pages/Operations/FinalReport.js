import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/finalreport.css";
import SendReport from "./SendReport";
import PopUp from "../PopUp";
import FinalReportDialog from "./FinalReportDialog";
import QQDialog from "./QQDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  saveServiceReport,
  getServiceReport,
  uploadDocuments,
  deleteServiceReportDocument,
  deleteServiceReport,
} from "../../services/apiService";
import Loader from "../Loader";
const FinalReport = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  employees,
  templates,
  vendors,
}) => {
  const Group = require("../../assets/images/jobreport.png");
  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [pdaId, setPdaId] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [serviceReports, setServiceReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [finalDialogOpen, setFinalDialogOpen] = useState(false);

  const openFinalDialog = () => {
    handleFinalDialogClickOpen();
  };

  const handleFinalDialogClickOpen = () => {
    setFinalDialogOpen(true);
  };

  const handleFinalDialogueClose = () => {
    setFinalDialogOpen(false);
  };

  const [QQDialogOpen, setQQDialogOpen] = useState(false);

  const openQQDialog = () => {
    handleQQClickOpen();
  };

  const handleQQClickOpen = () => {
    setQQDialogOpen(true);
  };

  const handleQQDialogueClose = () => {
    setQQDialogOpen(false);
  };

  const [rows, setRows] = useState([
    {
      description: "",
      serviceDate: "",
      serviceActivity: "",
      quantity: "",
      remark: "",
    },
  ]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        description: "",
        serviceDate: "",
        serviceActivity: "",
        quantity: "",
        remark: "",
      },
    ]);
  };

  const handleRemoveRow = async (index, event) => {
    console.log(event, "event");

    if (rows.length === 1) {
      alert("At least one row is required.");
      return;
    } else {
      if (event?._id) {
        let payload = {
          serviceReportId: event?._id,
        };
        try {
          const response = await deleteServiceReport(payload);
          if (response.status) {
            serviceReportGet(pdaId);
            setMessage("File has been deleted successfully");
            setOpenPopUp(true);
          } else {
            setMessage("Failed please try again!");
            setOpenPopUp(true);
          }
        } catch (error) {
          setMessage("Failed please try again!");
          setOpenPopUp(true);
        }
      } else {
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);
      }
    }
  };

  // Handle input changes for specific fields
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const isFormValid = () => {
    // Check if any row object has at least one non-empty field
    return rows.some((row) =>
      Object.values(row).some((value) => String(value).trim() !== "")
    );
  };

  const location = useLocation();

  const row = location.state?.editData; // Access the passed row object

  const serviceReportGet = async (id) => {
    let data = {
      pdaId: id,
    };
    try {
      const serviceReportResponse = await getServiceReport(data);
      console.log("serviceReportGet", serviceReportResponse);

      setServiceReports(serviceReportResponse?.report);
      setUploadedFiles(serviceReportResponse?.reportDocument?.serviceDocuments);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    serviceReportGet(row?._id);
    console.log("Row data:", row);
    setPdaId(row?._id);
  }, [row]);

  // Function to load data from API response
  const loadReports = () => {
    const moment = require("moment");

    const updatedRows = serviceReports.map((report) => ({
      description: report.description,
      serviceDate: moment
        .utc(report.serviceDate, "YYYY-MM-DD HH:mm")
        .format("YYYY-MM-DD HH:mm"),
      serviceActivity: report.serviceActivity,
      quantity: report.quantity,
      remark: report.remark,
      _id: report?._id,
    }));
    console.log(updatedRows, "updatedRows");
    setRows(updatedRows);

    // setUploadedFiles(serviceReports?.serviceDocuments); // Append new files to existing ones
  };
  // moment.utc(report.serviceDate)

  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const documentsUpload = async (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const formData = new FormData();
      // Append all selected files to FormData
      Array.from(event.target.files).forEach((file) => {
        formData.append("files", file); // "files" is the expected key for your API
      });

      try {
        setUploadStatus("Uploading...");
        const response = await uploadDocuments(formData);
        if (response.status) {
          setUploadStatus("Upload successful!");
          if (uploadedFiles?.length > 0) {
            setUploadedFiles((prevFiles) => [...prevFiles, ...response.data]); // Append new files to existing ones
          } else {
            setUploadedFiles(response.data); // Append new files to existing ones
          }
        } else {
          setUploadStatus("Upload failed. Please try again.");
        }
      } catch (error) {
        console.error("File upload error:", error);
        setUploadStatus("An error occurred during upload.");
      }
    }
  };

  const handleFileDelete = async (fileUrl) => {
    // Update the state by filtering out the file with the specified URL
    console.log(fileUrl, "fileUrl");

    if (fileUrl?._id) {
      let payload = {
        pdaId: pdaId,
        documentId: fileUrl?._id,
      };
      try {
        const response = await deleteServiceReportDocument(payload);
        if (response.status) {
          const updatedFiles = uploadedFiles.filter(
            (file) => file.url !== fileUrl?.url
          );
          setUploadedFiles(updatedFiles);
          setMessage("File has been deleted successfully");
          setOpenPopUp(true);
        } else {
          setMessage("Failed please try again!");
          setOpenPopUp(true);
        }
      } catch (error) {
        setMessage("Failed please try again!");
        setOpenPopUp(true);
      }
    } else {
      const updatedFiles = uploadedFiles.filter(
        (file) => file.url !== fileUrl?.url
      );
      setUploadedFiles(updatedFiles);
    }
  };

  useEffect(() => {
    console.log("serviceReports:", serviceReports);
    console.log("uploadedFiles:", uploadedFiles);
    if (serviceReports?.length > 0) {
      loadReports(); // Simulate fetching and loading data
    }
  }, [serviceReports, uploadedFiles]);

  useEffect(() => {
    console.log("rows:", rows);
  }, [rows]);

  const openDialog = () => {
    // handleSubmit();
    // Check if there is at least one row with any valid (non-empty, non-null) value
    serviceReportGet(pdaId);
    const isValid = serviceReports.some((row) =>
      Object.values(row).some((value) => value !== null && value !== "")
    );

    if (!isValid) {
      // alert("At least one field in the rows must have a valid value.");
      setMessage("please save the report before sending report");
      setOpenPopUp(true);
      return; // Exit the function if validation fails
    }

    // Proceed with the submit logic if the validation passes

    handleClickOpen();
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      setMessage("At least one field must be filled.");
      setOpenPopUp(true);
      return;
    }
    setIsLoading(true);
    const payload = {
      pdaId: pdaId,
      reports: rows.map((row) => ({
        description: row.description,
        serviceDate: row.serviceDate
          ? moment(row.serviceDate).format("YYYY-MM-DD HH:mm")
          : "",
        serviceActivity: row.serviceActivity,
        quantity: row.quantity,
        remark: row.remark,
      })),
      serviceDocuments: uploadedFiles?.length > 0 ? uploadedFiles : [],
    };
    console.log("Payload to be sent:", payload);
    // Call the POST API
    try {
      const response = await saveServiceReport(payload);
      console.log(response, "login_response");
      if (response?.status === true) {
        setMessage("Report saved successfully!");
        setOpenPopUp(true);
        setIsLoading(false);
      } else {
        setMessage("Report failed. Please try again.");
        setOpenPopUp(true);
        setIsLoading(false);
      }
    } catch (error) {
      setMessage("Report failed. Please try again.");
      setOpenPopUp(true);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="">
        <div className="charge mt-4">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="p-3">
          <table className="tabmain">
            <thead>
              <tr>
                <th className="tabhead">SL NO.</th>
                <th className="tabhead">DESCRIPTION</th>
                <th className="tabhead">DATE & TIME</th>
                <th className="tabhead">SERVICE ACTIVITIES</th>
                <th className="tabhead">QUANTITY </th>
                <th className="tabhead">REMARKS </th>
                <th className="tabhead"> </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td className="tdstylwidt">{index + 1}</td>
                  <td className="tdstyl">
                    <input
                      type="text"
                      className="form-control"
                      value={row.description}
                      onChange={(e) =>
                        handleInputChange(index, "description", e.target.value)
                      }
                    />
                  </td>
                  <td className="tdstyl">
                    <DatePicker
                      dateFormat="dd/MM/yyyy HH:mm aa"
                      selected={
                        row.serviceDate ? new Date(row.serviceDate) : ""
                      }
                      onChange={(date) =>
                        handleInputChange(index, "serviceDate", date)
                      }
                      showTimeSelect
                      timeFormat="HH:mm aa"
                      timeIntervals={15}
                      className="form-control date-input"
                      id="eta-picker"
                      autoComplete="off"
                    />
                  </td>
                  <td className="tdstyl">
                    <input
                      type="text"
                      className="form-control"
                      value={row.serviceActivity}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "serviceActivity",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td className="tdstyl">
                    <input
                      type="number"
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) =>
                        handleInputChange(index, "quantity", e.target.value)
                      }
                    />
                  </td>
                  <td className="tdstyl">
                    <input
                      type="text"
                      className="form-control"
                      value={row.remark}
                      onChange={(e) =>
                        handleInputChange(index, "remark", e.target.value)
                      }
                    />
                  </td>
                  <td className="tdstyl">
                    <i
                      className="bi bi-trash-fill jobdeleiconn"
                      onClick={() => handleRemoveRow(index, row)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="attach">Attach Documents :</div>
          <div className="d-flex justify-content-between">
            {/* <div className="d-flex justify-content-between pdf">
              <div>Attach PDFs</div>
              <div>
                <i className="bi bi-file-earmark-pdf"></i>
              </div>
            </div> */}
            {/* fifthrowdocumentsupload */}
            <div className="typesofcall-row ">
              <div className="row align-items-start">
                <div className="mb-2">
                  <input
                    className="form-control documentsfsize"
                    type="file"
                    id="portofolio"
                    accept="image/*"
                    multiple
                    onChange={documentsUpload}
                  ></input>
                </div>
                <div className="ml-2">
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
                                      onClick={() => handleFileDelete(file)}
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

            <div>
              <button
                className="btn btna submit-button btnfsize addmorebutton"
                onClick={handleAddRow}
              >
                Add More
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="buttons-wrapper">
        <div className="left">
          <button
            className="btn btna submit-button btnfsize"
            onClick={() => {
              openFinalDialog();
            }}
          >
            Generate Report
          </button>
        </div>
        <div className="right d-flex">
          <button
            className="btn btna submit-button btnfsize"
            onClick={handleSubmit}
          >
            Save Report
          </button>
          <button
            className="btn btna submit-button btnfsize"
            onClick={() => {
              openDialog();
            }}
          >
            Send Report
          </button>
          <button
            className="btn btna submit-button btnfsize"
            onClick={() => {
              openQQDialog();
            }}
          >
            QQ Form
          </button>
        </div>
      </div>

      <SendReport open={open} onClose={handleClose} pdaId={pdaId} />
      <FinalReportDialog
        open={finalDialogOpen}
        onClose={handleFinalDialogueClose}
        pdaId={pdaId}
        ports={ports}
      />
      <QQDialog
        open={QQDialogOpen}
        onClose={handleQQDialogueClose}
        pdaId={pdaId}
        ports={ports}
        vessels={vessels}
      />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default FinalReport;
