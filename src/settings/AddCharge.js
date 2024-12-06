// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveCharge,editCharge } from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddCharge = ({ open, onAddCharge,onClose,editMode, chargeSet }) => {
  const [formData, setFormData] = useState({
    chargeName: '',
    
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && chargeSet) {
      setFormData({
        chargeName: chargeSet.chargeName,
        chargeId:chargeSet._id,
      });
    } else {
      setFormData({
        chargeName: '',
      
      });
    }
  }, [editMode, chargeSet]);
  const fetchchargeList = async () => {
    setOpenPopUp(false);
    onAddCharge();
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
    if (!formData.chargeName) newErrors.chargeName = "Charge Name is required";
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
        response = await editCharge(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveCharge(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      
      setFormData({ chargeName: ""});
      onAddCharge(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating charge", error);
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
          <DialogTitle>{editMode ? 'Edit Charge' : 'Add Charge'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div class="col-5 mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Charge Name:</label>
                <input name="chargeName" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.chargeName}></input>
                  {errors.chargeName && <span className="invalid">{errors.chargeName}</span>}
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
        <PopUp message={message} closePopup={fetchchargeList} />
      )}
    </>
  );
};

export default AddCharge;
