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
const CrewChangeList = ({
  open,
  onClose,
  templates,
  onSubmit,
  charge,
  selectedTemplateName,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, setFormValues] = useState({
    onSigners: [
      {
        creawName: "",
        flight: "",
        ATAMuscat: "",
        hotel: "",
        checkIn: "",
        checkOut: "",
        food: "",
        transportation: "",
      },
    ],
    offSigners: [
      {
        creawName: "",
        flight: "",
        ATAMuscat: "",
        hotel: "",
        checkIn: "",
        checkOut: "",
        food: "",
        transportation: "",
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
      creawName: "",
      flight: "",
      ATAMuscat: "",
      hotel: "",
      checkIn: "",
      checkOut: "",
      food: "",
      transportation: "",
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
        Object.values(signer).some((value) => value.trim() !== "")
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
    const templateBpdy = {
      pdaChargeId: charge?._id,
      templateName: selectedTemplateName,
      onsigners: formValues.onSigners,
      offsigners: formValues.offSigners,
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
            <DialogTitle>CrewChangeList </DialogTitle>
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
                {Object.keys(signer).map((field) => (
                  <div className="col-3 crew" key={field}>
                    <label className="form-label">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name={field}
                      value={signer[field]}
                      onChange={(e) => handleInputChange(e, index, "onSigners")}
                    />
                  </div>
                ))}
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
                {Object.keys(signer).map((field) => (
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
                ))}
                {formValues.offSigners.length > 1 && (
                  <button
                    type="button"
                    className="btn generate-buttona crewbtn"
                    onClick={() => deleteSigner("offSigners", index)}
                  >
                    Delete
                  </button>
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
