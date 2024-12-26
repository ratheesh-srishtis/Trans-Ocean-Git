// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { ChangePassword } from "../services/apiService";
import PopUp from "../pages/PopUp";

const ResetPassword = ({ open, onRequestPassword, onClose, requestSet }) => {
  const [formData, setFormData] = useState({ password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (requestSet) {
      setFormData({
        password: "",
        userId: requestSet._id,
      });
    }
  }, [requestSet]);
  const fetchrequests = async () => {
    setOpenPopUp(false);
    onRequestPassword();
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      let response;

      response = await ChangePassword(formData);
      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      setFormData({ password: "", confirmPassword: "" });
      onRequestPassword(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error updating password", error);
    }
  };

  return (
    <>
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
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>Reset Password</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    Password:
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.password}
                  ></input>
                  {errors.password && (
                    <span className="invalid">{errors.password}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    Confirm Password :
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.confirmPassword}
                  ></input>
                  {errors.confirmPassword && (
                    <span className="invalid">{errors.confirmPassword}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="btnuser">
              <button className="btn btna submit-button btnfsize">
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {openPopUp && <PopUp message={message} closePopup={fetchrequests} />}
    </>
  );
};

export default ResetPassword;
