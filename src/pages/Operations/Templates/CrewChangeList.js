// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../../css/templates/crewchangelist.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { generateTemplatePDF } from "../../../services/apiService";
import PopUp from "../../PopUp";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CrewChangeList = ({
  open,
  onClose,
  templates,
  onSubmit,
  charge,
  selectedTemplateName,
  selectedTemplate,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    onSigners: [
      {
        CrewName: "",
        Flight: "",
        ATAMuscat: "",
        Hotel: "",
        CheckIn: "",
        CheckOut: "",
        Food: "",
        Transportation: "",
      },
    ],
    offSigners: [
      {
        CrewName: "",
        Flight: "",
        ATAMuscat: "",
        Hotel: "",
        CheckIn: "",
        CheckOut: "",
        Food: "",
        Transportation: "",
      },
    ],
  });

  useEffect(() => {
    console.log(formValues, "formValues");
  }, [formValues]);

  // Handle Input Change
  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedSigners = [...formValues[type]];
    updatedSigners[index][name] = value;
    setFormValues((prevState) => ({
      ...prevState,
      [type]: updatedSigners,
    }));
  };

  // Add New Signer
  const addNewSigner = (type) => {
    const newSigner = {
      CrewName: "",
      Flight: "",
      ATAMuscat: "",
      Hotel: "",
      CheckIn: "",
      CheckOut: "",
      Food: "",
      Transportation: "",
    };
    setFormValues((prevState) => ({
      ...prevState,
      [type]: [...prevState[type], newSigner],
    }));
  };

  // Delete a Signer
  const deleteSigner = (type, index) => {
    const updatedSigners = [...formValues[type]];
    updatedSigners.splice(index, 1);
    setFormValues((prevState) => ({
      ...prevState,
      [type]: updatedSigners,
    }));
  };

  // Validation
  const isFormValid = () => {
    const validateSigners = (signers) =>
      signers.some((signer) =>
        Object.values(signer).some((value) => String(value).trim() !== "")
      );
    return (
      validateSigners(formValues.onSigners) ||
      validateSigners(formValues.offSigners)
    );
  };

  // Handle Save
  const handleSave = async () => {
    if (!isFormValid()) {
      setMessage(
        "At least one field must be filled in either On-Signers or Off-Signers."
      );
      setOpenPopUp(true);
      return;
    }

    const formattedOnSigners = formValues.onSigners.map((signer) => ({
      ...signer,
      ATAMuscat: signer.ATAMuscat
        ? moment(signer.ATAMuscat).format("YYYY-MM-DD HH:mm")
        : "",
      CheckIn: signer.CheckIn
        ? moment(signer.CheckIn).format("YYYY-MM-DD")
        : "",
      CheckOut: signer.CheckOut
        ? moment(signer.CheckOut).format("YYYY-MM-DD")
        : "",
    }));

    const formattedOffSigners = formValues.offSigners.map((signer) => ({
      ...signer,
      ATAMuscat: signer.ATAMuscat
        ? moment(signer.ATAMuscat).format("YYYY-MM-DD HH:mm")
        : "",
      CheckIn: signer.CheckIn
        ? moment(signer.CheckIn).format("YYYY-MM-DD")
        : "",
      CheckOut: signer.CheckOut
        ? moment(signer.CheckOut).format("YYYY-MM-DD")
        : "",
    }));

    const templateBpdy = {
      pdaChargeId: charge?._id,
      templateName: selectedTemplateName,
      onsigners: formattedOnSigners,
      offsigners: formattedOffSigners,
      templateId: selectedTemplate,
    };
    console.log(templateBpdy, "crew_change_payload");
    try {
      const response = await generateTemplatePDF(templateBpdy);
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
    // Perform API call here using the payload
  };

  const fieldOrder = [
    "CrewName",
    "Flight",
    "ATAMuscat",
    "Hotel",
    "CheckIn",
    "CheckOut",
    "Food",
    "Transportation",
  ];

  const handleDateChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["ATAMuscat"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
  };
  const handleCheckInDateChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["CheckIn"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
  };
  const handleCheckOutDateChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["CheckOut"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
  };

  const handleOffsignersDateChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["ATAMuscat"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
  };

  const handleOffsignersCheckInChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["CheckIn"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
  };
  const handleOffsignersCheckoutChange = (date, index, group) => {
    const updatedGroup = [...formValues[group]];
    updatedGroup[index]["CheckOut"] = date;
    setFormValues((prevValues) => ({
      ...prevValues,
      [group]: updatedGroup,
    }));
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
            <DialogTitle> </DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div className=" statement">
              <h3>CREW CHANGE LIST</h3>
            </div>
            <div className="onsign">ON SIGNERS</div>
            {formValues.onSigners.map((signer, index) => (
              <div key={index} className="d-flex flex-wrap signers-wrapper">
                {fieldOrder.map((field) =>
                  field === "ATAMuscat" ? (
                    <div className="col-3 crew" key={field}>
                      <label className="form-label">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <DatePicker
                        dateFormat="dd/MM/yyyy HH:mm aa"
                        selected={
                          signer[field] ? new Date(signer[field]) : null
                        }
                        onChange={(date) =>
                          handleDateChange(date, index, "onSigners")
                        }
                        showTimeSelect
                        timeFormat="HH:mm aa"
                        timeIntervals={15}
                        className="form-control date-input"
                        placeholderText=""
                        autoComplete="off"
                      />
                    </div>
                  ) : field === "CheckIn" ? (
                    <>
                      <div className="col-3 crew" key={field}>
                        <label className="form-label">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>

                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={
                            signer[field] ? new Date(signer[field]) : null
                          }
                          onChange={(date) =>
                            handleCheckInDateChange(date, index, "onSigners")
                          }
                          className="form-control date-input"
                          placeholderText=""
                          autoComplete="off"
                        />
                      </div>
                    </>
                  ) : field === "CheckOut" ? (
                    <>
                      <div className="col-3 crew" key={field}>
                        <label className="form-label">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>

                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={
                            signer[field] ? new Date(signer[field]) : null
                          }
                          onChange={(date) =>
                            handleCheckOutDateChange(date, index, "onSigners")
                          }
                          className="form-control date-input"
                          placeholderText=""
                          autoComplete="off"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="col-3 crew" key={field}>
                      <label className="form-label">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={signer[field]}
                        onChange={(e) =>
                          handleInputChange(e, index, "onSigners")
                        }
                      />
                    </div>
                  )
                )}
                {formValues.onSigners.length > 1 && (
                  <div className="">
                    <button
                      type="button"
                      className="btn generate-buttona crewbtn"
                      onClick={() => deleteSigner("onSigners", index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn generate-buttona addoncrewbtn"
              onClick={() => addNewSigner("onSigners")}
            >
              Add On Signer
            </button>

            <div className="onsign mt-5">OFF SIGNERS</div>

            {formValues.offSigners.map((signer, index) => (
              <div key={index} className="d-flex flex-wrap signers-wrapper">
                {fieldOrder.map((field) =>
                  field === "ATAMuscat" ? (
                    <div className="col-3 crew" key={field}>
                      <label className="form-label">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <DatePicker
                        dateFormat="dd/MM/yyyy HH:mm aa"
                        selected={
                          signer[field] ? new Date(signer[field]) : null
                        }
                        onChange={(date) =>
                          handleOffsignersDateChange(date, index, "offSigners")
                        }
                        showTimeSelect
                        timeFormat="HH:mm aa"
                        timeIntervals={15}
                        className="form-control date-input"
                        placeholderText=""
                        autoComplete="off"
                      />
                    </div>
                  ) : field === "CheckIn" ? (
                    <>
                      <div className="col-3 crew" key={field}>
                        <label className="form-label">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>

                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={
                            signer[field] ? new Date(signer[field]) : null
                          }
                          onChange={(date) =>
                            handleOffsignersCheckInChange(
                              date,
                              index,
                              "offSigners"
                            )
                          }
                          className="form-control date-input"
                          placeholderText=""
                          autoComplete="off"
                        />
                      </div>
                    </>
                  ) : field === "CheckOut" ? (
                    <>
                      <div className="col-3 crew" key={field}>
                        <label className="form-label">
                          {field.replace(/([A-Z])/g, " $1")}
                        </label>

                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={
                            signer[field] ? new Date(signer[field]) : null
                          }
                          onChange={(date) =>
                            handleOffsignersCheckoutChange(
                              date,
                              index,
                              "offSigners"
                            )
                          }
                          className="form-control date-input"
                          placeholderText=""
                          autoComplete="off"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="col-3 crew" key={field}>
                      <label className="form-label">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name={field}
                        value={signer[field]}
                        onChange={(e) =>
                          handleInputChange(e, index, "offSigners")
                        }
                      />
                    </div>
                  )
                )}
                {formValues.offSigners.length > 1 && (
                  <div className="">
                    <button
                      type="button"
                      className="btn generate-buttona crewbtn"
                      onClick={() => deleteSigner("offSigners", index)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn generate-buttona addoncrewbtn"
              onClick={() => addNewSigner("offSigners")}
            >
              Add Off Signer
            </button>
            <div className="footer-button d-flex justify-content-center mt-5">
              <button type="button" className="btn btncancel" onClick={onClose}>
                Cancel
              </button>
              <button
                type="button"
                className="btn generate-buttona"
                onClick={handleSave}
              >
                Save
              </button>
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

export default CrewChangeList;
