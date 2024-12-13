// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/transportationreciept.css";
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
import { generateTemplatePDF } from "../../../services/apiService";
import { format, parse } from "date-fns";
import PopUp from "../../PopUp";
const Transportationreciept = ({
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
    jobTitle: "",
    refNo: "",
    agent: "",
    transporter: "",
    items: [
      {
        seaName: "",
        date: "",
        from: "",
        to: "",
      },
    ],
  });

  const handleDateChange = (date, index) => {
    const formattedDate = date ? format(date, "dd/MM/yyyy") : "";
    const updatedItems = [...formData.items];
    updatedItems[index].date = formattedDate;
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index !== null) {
      // Update items array for specific index
      const updatedItems = [...formData.items];
      updatedItems[index][name] = value;
      setFormData((prev) => ({ ...prev, items: updatedItems }));
    } else {
      // Update top-level fields
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
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
      items: [...prev.items, { seaName: "", date: "", from: "", to: "" }],
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
      (item) =>
        item.seaName !== "" ||
        item.date !== "" ||
        item.from !== "" ||
        item.to !== ""
    );

    if (!isValid) {
      alert(
        "At least one field in each item (description, qty, unit) must have a value."
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    console.log(formData, "transportations_formdata");
  }, [formData]);

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
          jobTitle: formData.jobTitle,
          date: date,
          refNo: formData.refNo,
          agent: formData.agent,
          transporter: formData.transporter,
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
            width: 1050,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle> Transport Receipt</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className=" statement">
              <h3>TRANSPORT RECEIPT</h3>
            </div>
            <div className="d-flex justify-content-between mb-5 mt-3">
              <div className="col-2  ">
                <label for="exampleFormControlInput1" class="form-label">
                  Reference No:
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
              <div className="col-2  ">
                <label for="exampleFormControlInput1" class="form-label">
                  Date:
                </label>
                <DatePicker
                  dateFormat="dd/MM/yyyy" // Date format without time
                  selected={date ? parse(date, "dd/MM/yyyy", new Date()) : null} // Parse date if not null
                  onChange={(selectedDate) => {
                    if (selectedDate) {
                      const formattedDate = format(selectedDate, "dd/MM/yyyy"); // Format the selected date
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
            </div>

            <div className="d-flex justify-content-between">
              <div className="col-4 slwidth  ">
                <label for="exampleFormControlInput1" class="form-label">
                  Job Title:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {formData.items.map((item, index) => (
              <div className="d-flex justify-content-between" key={index}>
                <div className="col-3 slwidth">
                  <label htmlFor={`seaname-${index}`} className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`seaname-${index}`}
                    name="seaName"
                    value={item.seaName}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div className="col-3 slwidth">
                  <label htmlFor={`date-${index}`} className="form-label">
                    Date:
                  </label>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    selected={
                      item.date
                        ? parse(item.date, "dd/MM/yyyy", new Date())
                        : null
                    }
                    onChange={(selectedDate) =>
                      handleDateChange(selectedDate, index)
                    }
                    className="form-control date-input"
                    id={`date-${index}`}
                    placeholderText="Select Date"
                    autoComplete="off"
                  />
                </div>
                <div className="col-3 slwidth">
                  <label htmlFor={`from-${index}`} className="form-label">
                    From:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`from-${index}`}
                    name="from"
                    value={item.from}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </div>
                <div className="col-3 slwidth">
                  <label htmlFor={`to-${index}`} className="form-label">
                    To:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`to-${index}`}
                    name="to"
                    value={item.to}
                    onChange={(e) => handleInputChange(e, index)}
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

            <div className="d-flex gap-3   mt-2">
              <div class="col-6 transpoter">
                <label for="formFile" class="form-label">
                  Agent Name :
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="agent"
                  name="agent"
                  value={formData.agent}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col-6 transpoter">
                <label for="formFile" class="form-label">
                  {" "}
                  Transporter Name :
                </label>
                <input
                  class="form-control"
                  type="text"
                  id="transporter"
                  name="transporter"
                  value={formData.transporter}
                  onChange={handleInputChange}
                ></input>
              </div>
            </div>
            <div className="footer-button d-flex justify-content-center mt-5">
              <button type="button" className="btn btncancel" onClick={onClose}>
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
        </Dialog>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default Transportationreciept;
