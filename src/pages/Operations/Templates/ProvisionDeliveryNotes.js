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
import { generateTemplatePDF } from "../../../services/apiService";
import { da } from "date-fns/locale";
import PopUp from "../../PopUp";
const ProvisionDeliveryNotes = ({
  open,
  onClose,
  templates,
  charge,
  onSubmit,
  selectedTemplateName,
}) => {
  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

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
          templateName: selectedTemplateName,
          supplyDate: date,
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

  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 1100,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>Provision delivery</DialogTitle>
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
                  <label for="exampleFormControlInput1" class="form-label">
                    SUPPLY DATE :
                  </label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy" // Date format without time
                    selected={
                      date ? parse(date, "dd/MM/yyyy", new Date()) : null
                    } // Parse date if not null
                    onChange={(selectedDate) => {
                      if (selectedDate) {
                        const formattedDate = format(
                          selectedDate,
                          "dd/MM/yyyy"
                        ); // Format the selected date
                        setDate(formattedDate); // Set the formatted date
                        setDateError(false); // Clear error if a date is selected
                      } else {
                        setDate(""); // Clear the date if invalid
                        setDateError(true); // Set error if invalid
                      }
                    }}
                    className="form-control date-input"
                    id="date-picker"
                    placeholderText="Select Date"
                    autoComplete="off"
                  />
                  {dateError && <div className="invalid">{dateError}</div>}
                </div>
                <div className="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    REFERENCE NO :{" "}
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
                  <div className="d-flex  gap-2" key={index}>
                    <div className="col-4">
                      <label
                        htmlFor={`description-${index}`}
                        class="form-label"
                      >
                        ITEM DESCRIPTION :{" "}
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
                    <div className="col-4">
                      <label htmlFor={`qty-${index}`} className="form-label">
                        QTY:
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
                    <div className="col-4">
                      <label htmlFor={`unit-${index}`} className="form-label">
                        UNIT:
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
                    <div className="col-1 d-flex align-items-end">
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
                </>
              ))}

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={addItem}
                >
                  Add More
                </button>
              </div>

              <div className="footer-button d-flex justify-content-center mt-5">
                <button type="button" className="btn btncancel">
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
