// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveVesselType,editVesselType } from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddVesselType = ({ open, onAddVesselType,onClose,editMode, vesselTypeSet }) => {
  const [formData, setFormData] = useState({
    port: '',
    
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && vesselTypeSet) {
      setFormData({
        vesselType: vesselTypeSet.vesselType,
        vesselTypeId:vesselTypeSet._id,
      });
    } else {
      setFormData({
        vesselType: '',
      
      });
    }
  }, [editMode, vesselTypeSet]);
  const fetchvesselTypeList = async () => {
    setOpenPopUp(false);
    onAddVesselType();
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
    if (!formData.vesselType) newErrors.vesselType = "VesselType is required";
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
        response = await editVesselType(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveVesselType(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      
      setFormData({ portName: ""});
      onAddVesselType(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating port", error);
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
          <DialogTitle>{editMode ? 'Edit VesselType' : 'Add VesselType'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div class="col-5 mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Vessel Type:</label>
                <input name="vesselType" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.vesselType}></input>
                  {errors.vesselType && <span className="invalid">{errors.vesselType}</span>}
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
        <PopUp message={message} closePopup={fetchvesselTypeList} />
      )}
    </>
  );
};

export default AddVesselType;