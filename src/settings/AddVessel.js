// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { saveVessel, editVessel} from "../services/apiService";
import PopUp from "../pages/PopUp";

const AddVessel = ({ open, onAddVessel, onClose, editMode, roleVessel }) => {
  const [formData, setFormData] = useState({
    vesselName: '',
    IMONumber: '',
    loa: '',
    grt: '',
    nrt: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  useEffect(() => {
    if (editMode && roleVessel) {
      setFormData({
        vesselName: roleVessel.vesselName,
        IMONumber: roleVessel.IMONumber,
        loa: roleVessel.LOA || [],
        grt:roleVessel.GRT,
        nrt:roleVessel.NRT,
        vesselId:roleVessel._id,
      });
    } else {
      setFormData({
        vesselName: '',
        IMONumber: '',
        loa: '',
        grt:'',
        nrt:'',
      });
    }
  }, [editMode, roleVessel]);
  const fetchvesselList = async () => {
    setOpenPopUp(false);
    onAddVessel();
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
    if (!formData.vesselName) newErrors.vesselName = "Vessel Name is required";
    if (!formData.IMONumber) newErrors.IMONumber = "IMO Number is required";
    if(!formData.loa) newErrors.loa = "LOA is required";
    if(!formData.grt) newErrors.grt = "GRT is required";
    if(!formData.nrt) newErrors.nrt = "NRT is required";
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
        response = await editVessel(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData); 
        response = await saveVessel(formData); 
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }
      
      setFormData({ vesselName: "", IMONumber: "", loa: "", grt: "",nrt:""});
      onAddVessel(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating vessels", error);
    }
  };
  
  return (
    <>
      <Dialog sx={{
            width: 800, 
            margin: 'auto',
            borderRadius: 2,
          }}open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>{editMode ? 'Edit Vessel' : 'Add Vessel'}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>
        <form onSubmit={handleSubmit}>
        <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> Vessel Name:</label>
                <input name="vesselName" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.vesselName}></input>
                {errors.vesselName && <span className="invalid">{errors.vesselName}</span>}
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              {/*<div class="">
                <label for="exampleFormControlInput1" class="form-label"> Type of Vessel :</label>
                <input name="vesselVoyageNumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" value=""></input>
              </div>*/}
            </div>
          </div>
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> IMO No :</label>
                <input name="IMONumber" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.IMONumber}></input>
                   {errors.IMONumber && <span className="invalid">{errors.IMONumber}</span>}
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> LOA No :</label>
                <input name="loa" type="" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.loa}></input>
                    {errors.loa && <span className="invalid">{errors.loa}</span>}
              </div>
            </div>
          </div>
          <div className="row">
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> GRT :</label>
                <input name="grt" type="number" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.grt}></input>
                    {errors.grt && <span className="invalid">{errors.grt}</span>}
              </div>
            </div>
            <div class="col mb-3 align-items-start">
              <div class="">
                <label for="exampleFormControlInput1" class="form-label"> NRT :</label>
                <input name="nrt" type="number" class="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.nrt}></input>
                   {errors.nrt && <span className="invalid">{errors.nrt}</span>}
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
        <PopUp message={message} closePopup={fetchvesselList} />
      )}
    </>
  );
};

export default AddVessel;
