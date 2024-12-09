// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveService,editService } from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddService = ({ open, onAddService,onClose,editMode, serviceSet }) => {
  const [formData, setFormData] = useState({
    serviceName: '',
    
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && serviceSet) {
      setFormData({
        serviceName: serviceSet.serviceName,
        serviceId:serviceSet._id,
      });
    } else {
      setFormData({
        serviceName: '',
      
      });
    }
  }, [editMode, serviceSet]);
  const fetchserviceList = async () => {
    setOpenPopUp(false);
    onAddService();
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
    if (!formData.serviceName) newErrors.serviceName = "Service is required";
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
        response = await editService(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveService(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      
      setFormData({ serviceName: ""});
      onAddService(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating service", error);
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
          <DialogTitle>{editMode ? 'Edit Service' : 'Add Service'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "60px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div class="col-5 mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">  Service Name:</label>
                <input name="serviceName" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.serviceName}></input>
                  {errors.serviceName && <span className="invalid">{errors.serviceName}</span>}
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
        <PopUp message={message} closePopup={fetchserviceList} />
      )}
    </>
  );
};

export default AddService;