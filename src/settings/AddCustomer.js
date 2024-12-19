// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveCustomer, editCustomer } from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddCustomer = ({
  open,
  onAddCustomer,
  onClose,
  editMode,
  customerSet,
}) => {
  const [formData, setFormData] = useState({
    customerName: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && customerSet) {
      setFormData({
        customerName: customerSet.customerName,
        customerId: customerSet._id,
      });
    } else {
      setFormData({
        customerName: "",
      });
    }
  }, [editMode, customerSet]);
  const fetchcustomerList = async () => {
    setOpenPopUp(false);
    onAddCustomer();
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
    if (!formData.customerName)
      newErrors.customerName = "Customer Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (editMode) {
        console.log("Edit mode formData:", formData);
        response = await editCustomer(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData);
        response = await saveCustomer(formData);
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }

      setFormData({ customerName: "" });
      onAddCustomer(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating customer", error);
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
        onClose={onClose}
        fullWidth
        maxWidth="lg"
      >
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>
            {editMode ? "Edit Customer" : "Add Customer"}
          </DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-5 mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    Customer Name:
                  </label>
                  <input
                    name="customerName"
                    type=""
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.customerName}
                  ></input>
                  {errors.customerName && (
                    <span className="invalid">{errors.customerName}</span>
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
      {openPopUp && <PopUp message={message} closePopup={fetchcustomerList} />}
    </>
  );
};

export default AddCustomer;
