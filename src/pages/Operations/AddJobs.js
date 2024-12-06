// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/editOperation.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import BerthReport from "./Templates/BerthReport";
import CrewChangeList from "./Templates/CrewChangeList";
import LoadingReport from "./Templates/LoadingReport";
import OKTBReport from "./Templates/OKTBReport";
import {
  getCharges,
  getSubcharges,
  uploadDocuments,
  fileUrl,
} from "../../services/apiService";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
} from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";
import ProvisionDeliveryNotes from "./Templates/ProvisionDeliveryNotes";
import Transportationreciept from "./Templates/Transportationreciept";
const AddJobs = ({
  open,
  onClose,
  templates,
  charge,
  services,
  ports,
  customers,
  editChargeQuotation,
  vendors,
}) => {
  console.log(templates, "templates");
  console.log(charge, "AddJobs_charge");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedTemplateName, setSelectedTemplateName] = useState("");
  const [isBerthReportOpen, setIsBerthReportOpen] = useState(false);
  const [isCrewChangeListOpen, setIsCrewChangeListOpen] = useState(false);
  const [isLoadingReportOpen, setIsLoadingReportOpen] = useState(false);
  const [isOKTBOpen, setIsOKTBOpen] = useState(false);
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);
  const [isTransportationOpen, setIsTransportationOpen] = useState(false);
  const [templatesList, setTemplatesList] = useState([]);

  const handleTemplateChange = (event) => {
    const selectedId = event.target.value; // Get the selected _id
    setSelectedTemplate(selectedId); // Set the selected _id in the state

    // Find the corresponding templateName
    const selectedTemplate = templates.find(
      (template) => template._id === selectedId
    );
    if (selectedTemplate) {
      setSelectedTemplateName(selectedTemplate.templateName); // Set the templateName in the state
    } else {
      setSelectedTemplateName(""); // Reset if no match found
    }

    console.log(
      selectedId,
      selectedTemplate?.templateName,
      "handleTemplateChange"
    );
  };

  useEffect(() => {
    console.log(selectedTemplate, "selectedTemplate");
    console.log(selectedTemplateName, "selectedTemplateName");
  }, [selectedTemplate, selectedTemplateName]);

  const handleOpenTemplate = () => {
    if (selectedTemplate === "6745cbea3b3ccd845065a96c") {
      setIsBerthReportOpen(true);
    } else if (selectedTemplate === "6745cbc83b3ccd845065a922") {
      setIsCrewChangeListOpen(true);
    } else if (selectedTemplate === "6745cbdd3b3ccd845065a955") {
      setIsLoadingReportOpen(true);
    } else if (selectedTemplate === "6745c91e3b3ccd845065a12b") {
      setIsOKTBOpen(true);
    } else if (selectedTemplate === "675182753b3ccd8450734a09") {
      setIsProvisionOpen(true);
    } else if (selectedTemplate === "675182483b3ccd84507349d7") {
      setIsTransportationOpen(true);
    }
  };

  const handleCloseAllDialogs = () => {
    setIsBerthReportOpen(false);
    setIsCrewChangeListOpen(false);
    setIsLoadingReportOpen(false);
    setIsOKTBOpen(false);
    setIsProvisionOpen(false);
    setIsTransportationOpen(false);
  };

  const handleOKTBReportSubmit = (response) => {
    console.log("template_Submitted:", response);
    if (response?.status == true) {
      setIsOKTBOpen(false);
      setTemplatesList((previousTemplates) => [
        ...previousTemplates,
        response?.pdfPath,
      ]);
    }
  };
  const handleBerthReportSubmit = (response) => {
    console.log("template_Submitted:", response);
  };
  const handleCrewSubmit = (response) => {
    console.log("template_Submitted:", response);
  };
  const handleLoadingReportSubmit = (response) => {
    console.log("template_Submitted:", response);
  };

  const [selectedStatus, setSelectedStatus] = useState(charge?.status);
  const [selectedServiceError, setSelectedServiceError] = useState(false);
  const [selectedChargesTypeError, setSelectedChargesTypeError] =
    useState(false);
  const [selectedSubhargesTypeError, setSelectedSubhargesTypeError] =
    useState(false);
  const [selectedQuantityError, setSelectedQuantityError] = useState(false);
  const [selectedNewCustomerError, setSelectedNewCustomerError] =
    useState(false);
  const [firstFieldSelected, setFirstFieldSelected] = useState(false);
  const [secondFieldSelected, setSecondFieldSelected] = useState(false);
  const [thirdFieldSelected, setThirdFieldSelected] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [selectedChargesType, setSelectedChargesType] = useState(null);
  const [selectedSubhargesType, setSelectedSubhargesType] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedNewCustomer, setSelectedNewCustomer] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [charges, setCharges] = useState([]);
  const [subCharges, setSubCharges] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [updatedServiceName, setUpdatedServiceName] = useState("");
  const [updatedChargename, setUpdatedChargename] = useState("");
  const [updatedSubChargeName, setUpdatedSubChargeName] = useState("");
  const [selectedVendorError, setSelectedVendorError] = useState(false);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "service":
        setSelectedService(services.find((service) => service?._id === value));
        setFirstFieldSelected(true);
        setSelectedServiceError(false);
        setCharges([]);
        setSubCharges([]);
        setSelectedChargesType(null);
        break;
      case "chargeType":
        setSelectedChargesType(charges.find((charge) => charge?._id === value));
        setSecondFieldSelected(true);
        setSelectedChargesTypeError(false);
        setSubCharges([]);
        break;
      case "subChargeType":
        setSelectedSubhargesType(
          subCharges.find((subCharge) => subCharge?._id === value)
        );
        setThirdFieldSelected(true);
        setSelectedSubhargesTypeError(false);
        break;
      case "customer":
        setSelectedNewCustomer(
          customers.find((customer) => customer?._id === value)
        );
        setSelectedNewCustomerError(false);
        break;
      case "vendor":
        setSelectedVendor(vendors.find((vendor) => vendor?._id === value));
        setSelectedVendorError(false);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges({
          serviceId: selectedService?.serviceId || selectedService?._id,
        });
        setCharges(response?.charges);
        console.log("Fetched Charges:", response);
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };

    if (selectedService) {
      fetchCharges();
      console.log(selectedService, "selectedService");
    }
  }, [selectedService]);

  useEffect(() => {
    const fetchSubCharges = async () => {
      // alert(selectedService?._id);
      try {
        const response = await getSubcharges({
          chargeId: selectedChargesType?.chargeId || selectedChargesType?._id,
        });
        setSubCharges(response?.subcharges);
        console.log("fetchSubCharges:", response);
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };
    if (selectedChargesType) {
      fetchSubCharges();
      console.log(selectedChargesType, "selectedChargesType");
    }
  }, [selectedChargesType]);

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

  const handleFileDelete = (fileToDelete) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file !== fileToDelete)
    );
  };

  const editCharges = async () => {
    // Individual checks for each field
    if (selectedService == null || selectedService === "") {
      setSelectedServiceError(true);
    } else {
      setSelectedServiceError(false);
    }
    if (selectedChargesType == null || selectedChargesType === "") {
      setSelectedChargesTypeError(true);
    } else {
      setSelectedChargesTypeError(false);
    }
    if (selectedSubhargesType == null || selectedSubhargesType === "") {
      setSelectedSubhargesTypeError(true);
    } else {
      setSelectedSubhargesTypeError(false);
    }

    if (selectedVendor == null || selectedVendor === "") {
      setSelectedVendorError(true);
    } else {
      setSelectedVendorError(false);
    }
    if (
      selectedService &&
      selectedChargesType &&
      selectedSubhargesType &&
      selectedVendor
    ) {
      let chargesPayload = {
        serviceId: selectedService?.serviceId || selectedService?._id,
        chargeId: selectedChargesType?.chargeId || selectedChargesType?._id,
        subchargeId:
          selectedSubhargesType?.subchargeId || selectedSubhargesType?._id,
        vendorId: selectedVendor?.vendorId || selectedVendor?._id,
        remark: remarks,
        status: selectedStatus,
        documents: uploadedFiles,
        templates: templatesList,
      };
      console.log(chargesPayload, "edit_charges_payload");
      try {
        const response = await editChargeQuotation(chargesPayload);
        setMessage("Charge updated successfully");
        setOpenPopUp(true);
        console.log("Fetched Charges:", response);
        onClose();
      } catch (error) {
        console.error("Error fetching charges:", error);
        setMessage("Failed to update charges");
        setOpenPopUp(true);
      }
    } else {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "remarks") {
      setRemarks(value);
    }
  };

  useEffect(() => {
    setRemarks(charge?.remark || ""); // Handle null/undefined charge
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      ...(charge?.documents || []), // Use empty array as fallback
    ]);
  }, [charge]);

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
            <DialogTitle>Update Charge</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div class="typesofcall-row ">
              <div class="row mb-3 align-items-start">
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Services <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="service"
                      className="form-select vesselbox"
                      onChange={handleSelectChange}
                      aria-label="Default select example"
                      value={selectedService?.serviceId || selectedService?._id}
                    >
                      <option value="">Choose Services</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {firstFieldSelected && (
                  <>
                    <div class="col-4">
                      <label for="exampleFormControlInput1" class="form-label">
                        Charges Type <span class="required"> </span> :
                      </label>
                      <div class="vessel-select">
                        <select
                          name="chargeType"
                          className="form-select vesselbox vesselbox:placeholder"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={selectedChargesType?._id}
                        >
                          <option value="">Choose Charge Type</option>
                          {charges?.map((charge) => (
                            <option key={charge._id} value={charge._id}>
                              {charge.chargeName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedChargesTypeError && (
                        <>
                          <div className="invalid">
                            Please select charges type
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}

                {secondFieldSelected && (
                  <>
                    <div class="col-4">
                      <label for="exampleFormControlInput1" class="form-label">
                        {" "}
                        Sub Charges Type <span class="required"> </span> :
                      </label>
                      <div class="vessel-select">
                        <select
                          name="subChargeType"
                          className="form-select vesselbox "
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={selectedSubhargesType?._id}
                        >
                          <option value="">Choose Sub Charge Type</option>
                          {subCharges?.map((charge) => (
                            <option key={charge._id} value={charge._id}>
                              {charge.subchargeName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedSubhargesTypeError && (
                        <>
                          <div className="invalid">
                            Please select sub charges type
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {thirdFieldSelected && (
              <>
                <div class="typesofcall-row ">
                  <div class="row mb-3 align-items-start">
                    <div class="col-4">
                      <label for="exampleFormControlInput1" class="form-label">
                        {" "}
                        Status <span class="required"> </span> :
                      </label>
                      <div class="vessel-select">
                        <select
                          name="status"
                          class="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={selectedStatus}
                        >
                          <option value={1}>Open </option>
                          <option value={2}>In Progress </option>
                          <option value={3}>In Progress </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-4">
                      <label for="exampleFormControlInput1" class="form-label">
                        Vendor Name <span class="required"> </span> :
                      </label>
                      <div class="vessel-select">
                        <select
                          name="vendor"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={selectedVendor?._id}
                        >
                          <option value="">Choose Vendor</option>
                          {vendors?.map((vendor) => (
                            <option key={vendor._id} value={vendor._id}>
                              {vendor.vendorName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div class="col-4">
                      <label for="exampleFormControlInput1" class="form-label">
                        {" "}
                        Templates <span class="required"> </span> :
                      </label>
                      <div class="vessel-select">
                        <select
                          name="template"
                          className="form-select vesselbox"
                          aria-label="Default select example"
                          value={selectedTemplate}
                          onChange={handleTemplateChange}
                        >
                          <option value="">Choose Template</option>
                          {templates.map((template) => (
                            <option key={template._id} value={template._id}>
                              {template.templateName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="typesofcall-row ">
                  <div class="row align-items-start">
                    <div class="mb-2">
                      <label for="formFile" class="form-label">
                        Documents Upload:
                      </label>
                      <input
                        class="form-control documentsfsize"
                        type="file"
                        id="portofolio"
                        accept="image/*"
                        multiple
                        onChange={documentsUpload}
                      ></input>
                    </div>
                    {uploadedFiles?.length > 0 && (
                      <>
                        <Paper
                          elevation={1}
                          style={{ marginTop: 16, padding: 8 }}
                        >
                          <List>
                            {uploadedFiles.map((file, index) => (
                              <ListItem key={index}>
                                <ListItemText primary={file} />
                                <ListItemSecondaryAction>
                                  <IconButton
                                    edge="end"
                                    onClick={() =>
                                      window.open(
                                        `https://hybrid.sicsglobal.com/${file}`,
                                        "_blank"
                                      )
                                    }
                                  >
                                    <Visibility />
                                  </IconButton>
                                  <IconButton
                                    edge="end"
                                    onClick={() => handleFileDelete(file)} // Pass the file to the delete function
                                  >
                                    <Delete />
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
                <div class=" typesofcall-row">
                  <div class="row align-items-start">
                    <div class="col-8 ">
                      <div class="mb-3">
                        <div class="col">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Remarks:
                          </label>
                          <textarea
                            rows="1"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder=""
                            name="remarks"
                            onChange={handleInputChange}
                            value={remarks}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="btnjobrole col-4">
                      <button
                        className="btn btna submit-button btnfsize"
                        onClick={handleOpenTemplate}
                        disabled={!selectedTemplate}
                      >
                        Open Template
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="col-12 mt-5">
              <div className="footer-button d-flex justify-content-center ">
                <button type="button" className="btn btncancel">
                  Close
                </button>

                <button
                  type="button"
                  className="btn  generate-buttona "
                  onClick={() => {
                    editCharges();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Dialog Components */}
      {isBerthReportOpen && (
        <BerthReport
          open={isBerthReportOpen}
          onClose={handleCloseAllDialogs}
          charge={charge}
          selectedTemplateName={selectedTemplateName}
          onSubmit={handleBerthReportSubmit}
        />
      )}
      {isCrewChangeListOpen && (
        <CrewChangeList
          open={isCrewChangeListOpen}
          onClose={handleCloseAllDialogs}
          charge={charge}
          selectedTemplateName={selectedTemplateName}
          onSubmit={handleCrewSubmit}
        />
      )}
      {isLoadingReportOpen && (
        <LoadingReport
          open={isLoadingReportOpen}
          onClose={handleCloseAllDialogs}
          charge={charge}
          selectedTemplateName={selectedTemplateName}
          onSubmit={handleLoadingReportSubmit}
        />
      )}
      {isOKTBOpen && (
        <OKTBReport
          open={isOKTBOpen}
          onClose={handleCloseAllDialogs}
          charge={charge}
          selectedTemplateName={selectedTemplateName}
          onSubmit={handleOKTBReportSubmit}
        />
      )}
      {isProvisionOpen && (
        <ProvisionDeliveryNotes
          open={isProvisionOpen}
          onClose={handleCloseAllDialogs}
        />
      )}
      {isTransportationOpen && (
        <Transportationreciept
          open={isTransportationOpen}
          onClose={handleCloseAllDialogs}
        />
      )}
    </>
  );
};

export default AddJobs;
