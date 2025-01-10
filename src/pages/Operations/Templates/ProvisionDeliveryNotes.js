// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/provision-delivery.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import {
  generateTemplatePDF,
  getPdaTemplateDataAPI,
} from "../../../services/apiService";
import { da } from "date-fns/locale";
import PopUp from "../../PopUp";
import moment from "moment";

const ProvisionDeliveryNotes = ({
  open,
  onClose,
  templates,
  charge,
  onSubmit,
  selectedTemplateName,
  selectedTemplate,
  pdaResponse,
}) => {
  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const [formData, setFormData] = useState({
    supplyDate: "",
    refNo: "",
    items: [
      {
        description: "",
        qty: "",
        unit: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { description: "", qty: "", unit: "" }],
    }));
  };

  const deleteItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  const validateItems = () => {
    const isValid = formData.items.every(
      (item) => item.description !== "" || item.qty !== "" || item.unit !== ""
    );

    if (!isValid) {
      alert(
        "At least one field in each item (description, qty, unit) must have a value."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!date) {
      setDateError("Please select a date.");
      setMessage("Please select a date");
      setOpenPopUp(true);
    }
    if (date) {
      if (validateItems()) {
        // Submit form logic here
        const payload = {
          pdaChargeId: charge?._id,
          templateId: selectedTemplate,
          templateName: selectedTemplateName,
          supplyDate: moment(date).format("YYYY-MM-DD"),
          refNo: formData.refNo,
          items: formData.items,
        };

        try {
          const response = await generateTemplatePDF(payload);
          console.log(response, "login_response");
          if (response?.status === true) {
            setMessage("Template saved successfully!");
            setOpenPopUp(true);
            onSubmit(response);
          } else {
            setMessage("PDA failed. Please try again.");
            setOpenPopUp(true);
            onSubmit(response);
          }
        } catch (error) {
          setMessage("PDA failed. Please try again.");
          setOpenPopUp(true);
          onSubmit(error);
        }
        console.log("provision_payload>", payload);
        // Submit the payload to the server here
        console.log("Form submitted successfully", formData);
      }
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
    setDateError(false);
    console.log(date, "handleDateChange");
  };

  useEffect(() => {
    console.log(date, "date_delivery");
  }, [date]);

  const getPdaTemplateData = async () => {
    setIsLoading(true);
    try {
      let userData = {
        pdaId: pdaResponse?._id,
        templateId: selectedTemplate,
      };
      const response = await getPdaTemplateDataAPI(userData);

      if (response?.templateData) {
        const templateData = response.templateData;
        console.log(templateData, "templateData");
        setDate(
          templateData?.supplyDate
            ? moment.utc(templateData?.supplyDate).format("YYYY-MM-DD")
            : ""
        );
        setFormData({
          supplyDate: templateData?.supplyDate
            ? moment.utc(templateData?.supplyDate).format("YYYY-MM-DD")
            : "",

          refNo: templateData.refNo || "",
          items: templateData.items.map((item) => ({
            description: item.description || "",
            qty: item.qty || "",
            unit: item.unit || "",
          })),
        });
      }

      console.log("getPdaTemplateData:", response);

      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPdaTemplateData();
  }, []);

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
          onClose={(event, reason) => {
            if (reason === "backdropClick") {
              // Prevent dialog from closing when clicking outside
              return;
            }
            onClose(); // Allow dialog to close for other reasons
          }}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle></DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <div className="mm">
            <DialogContent style={{ marginBottom: "40px" }}>
              <div className=" statement mb-3">
                <h3>DELIVERY NOTE</h3>
              </div>
              <div className="d-flex  gap-2">
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Supply Date :
                  </label>

                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={date && new Date(date)} // Inline date conversion for prefilled value
                    onChange={handleDateChange}
                    className="form-control date-input"
                    id="etd-picker"
                    placeholderText="Select Date"
                    autoComplete="off"
                  />

                  {dateError && <div className="invalid">{dateError}</div>}
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Reference No :{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="refNo"
                    name="refNo"
                    value={formData.refNo}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {formData.items.map((item, index) => (
                <>
                  <div className="provisionborder">
                    <div className="d-flex  gap-2 " key={index}>
                      <div className="d-flex provisionmar">
                        <div className="col-3 provisionspace">
                          <label
                            htmlFor={`description-${index}`}
                            className="form-label"
                          >
                            Item description :{" "}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`description-${index}`}
                            name="description"
                            value={item.description}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </div>
                        <div className="col-3 provisionspace">
                          <label
                            htmlFor={`qty-${index}`}
                            className="form-label"
                          >
                            Qty:
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id={`qty-${index}`}
                            name="qty"
                            value={item.qty}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </div>
                        <div className="col-3 provisionspace">
                          <label
                            htmlFor={`unit-${index}`}
                            className="form-label"
                          >
                            Unit:
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id={`unit-${index}`}
                            name="unit"
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, e)}
                          />
                        </div>
                        <div className="col-3 d-flex align-items-end">
                          {formData.items.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteItem(index)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-info addmorebtn"
                  onClick={addItem}
                >
                  Add More
                </button>
              </div>

              <div className="footer-button d-flex justify-content-center mt-5">
                <button
                  type="button"
                  className="btn btncancel"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn generate-buttona"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default ProvisionDeliveryNotes;
