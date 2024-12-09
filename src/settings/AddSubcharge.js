// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getAllCharges, saveSubcharge,editSubcharge } from "../services/apiService";
import PopUp from "../pages/PopUp";
import Swal from "sweetalert2";
const AddSubcharge = ({ open, onAddSubcharge,onClose,editMode, subchargeSet }) => {
  const [ChargeList, setChargeList] = useState([]);
  const [formData, setFormData] = useState({
    subchargeName: '',
    chargeId: '',
   
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [closePopUp, setclosePopup] = useState(false);
  useEffect(() => {
    fetchchargeList();
  }, []);
  useEffect(() => {
    if (editMode && subchargeSet) {
      setFormData({
        subchargeName: subchargeSet.subchargeName,
        chargeId: subchargeSet.chargeId._id,
        subchargeId:subchargeSet._id,
      });
    } else {
      setFormData({
        subchargeName: '',
        chargeId: '',
      
       
      });
    }
  }, [editMode, subchargeSet]);
  const fetchchargeList = async () => {
    try {
      
      const listallcharges = await getAllCharges();
      setChargeList(listallcharges?.charges || []);
      
    } catch (error) {
      console.error("Failed to fetch charges", error);
      
    }
  };
  const fetchsubchargeList = async () => {
    if(closePopUp==false){
      onAddSubcharge();
      onClose();
    }
    setOpenPopUp(false);
   
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
    if (!formData.subchargeName) newErrors.subchargeName = "SubCharge Name is required";
    if (!formData.chargeId) newErrors.chargeId = "Charge Name is required";
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
        response = await editSubcharge(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveSubcharge(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
        setFormData({ subchargeName: "", chargeId: ""});
        onAddSubcharge(formData);
        onClose();
      }
      else{
       
        setMessage(response.message);
        setOpenPopUp(true);
        setclosePopup(true);
      }
      
     
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating subcharge", error);
    }
  };


  return (
    <>
      <Dialog sx={{
        width: 800,
        margin: 'auto',
        borderRadius: 2,
      }} open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between " onClick={onClose}>
          <DialogTitle>{editMode ? 'Edit Subcharge' : 'Add Subcharge'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> Name:</label>
                <input name="subchargeName" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.subchargeName}></input>
                   {errors.subchargeName && <span className="invalid">{errors.subchargeName}</span>}
              </div>
            </div>
           
          </div>
          
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label">Charges <span class="required"> * </span> :</label>
                <div class="vessel-select">
                  <select name="chargeId" class="form-select vesselbox" aria-label="Default select example" onChange={handleChange}
                      value={formData.chargeId}>
                    <option value="">Choose Charge </option>
                    {ChargeList.map((charges) => (
                    <option key= {charges._id} value={charges._id}>{charges.chargeName} </option>
                   
                  ))}
                  </select>
                  {errors.chargeId && <span className="invalid">{errors.chargeId}</span>}
                </div>
              </div>
            </div>
           <div class="col mb-3 align-items-start">
               {/*<div class="">
                <label for="exampleFormControlInput1" class="form-label">  Phone Number:</label>
                <input name="phone" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.phone}></input>
              </div>*/}
            </div>
          </div>


          <div className="btnuser">
            <button class="btn btna submit-button btnfsize"> Submit </button>
          </div>

          </form>



        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={fetchsubchargeList} />
      )}
    </>
  );
};

export default AddSubcharge;
