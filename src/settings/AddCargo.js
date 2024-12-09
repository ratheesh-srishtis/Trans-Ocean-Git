// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveCargo,editCargo } from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddCharge = ({ open, onAddCargo,onClose,editMode, cargoSet }) => {
  const [formData, setFormData] = useState({
    cargoName: '',
    
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && cargoSet) {
      setFormData({
        cargoName: cargoSet.cargoName,
        cargoId:cargoSet._id,
      });
    } else {
      setFormData({
        cargoName: '',
      
      });
    }
  }, [editMode, cargoSet]);
  const fetchcargoList = async () => {
    setOpenPopUp(false);
    onAddCargo();
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
    if (!formData.cargoName) newErrors.cargoName = "Cargo Name is required";
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
        response = await editCargo(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveCargo(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      
      setFormData({ cargoName: ""});
      onAddCargo(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating cargo", error);
    }
  };

  return (
    <>
      <Dialog sx={{
            width: 800, 
            margin: 'auto',
            borderRadius: 2,
          }} open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>{editMode ? 'Edit Cargo' : 'Add Cargo'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div class="col-5 mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Cargo Name:</label>
                <input name="cargoName" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.cargoName}></input>
                  {errors.cargoName && <span className="invalid">{errors.cargoName}</span>}
              </div>
            </div>
          </div>


          <div className="btnuser">
            <button class="btn btna submit-button btnfsize"> Submit </button>
          </div>
         </form>


        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={fetchcargoList} />
      )}
    </>
  );
};

export default AddCharge;