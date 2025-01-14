// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import{saveVoucher,editVoucher} from "../../services/apiService";
import PopUp from ".././PopUp";

const AddVoucher = ({ open,onClose,vendorId,ListVouchers,editMode,prevVouchers}) => {
   useEffect(() => {
        if (editMode && prevVouchers) {
        
          setFormData({
            amount: prevVouchers.amount,
            voucherNumber:prevVouchers.voucherNumber,
            through:prevVouchers.through,
            voucherParticulers:prevVouchers.voucherParticulers,
            voucherAccount:prevVouchers.voucherAccount,
            paymentDate:prevVouchers.dateofPay,
            pettyId: prevVouchers._id,
          });
        } else {
          setFormData({
            amount: "",
            voucherNumber: "",
            through: "",
            voucherParticulers: "",
            voucherAccount:"",
            paymentDate:"",
          });
        }
      }, [editMode, prevVouchers]);
 const [formData, setFormData] = useState({
      amount: "",
       voucherNumber: "",
       through: "",
       voucherParticulers: "",
       voucherAccount:"",
       paymentDate:"",
     });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
   const validateForm=()=>{
   const newErrors={};
   
   if(!formData.voucherNumber) newErrors.voucherNumber = "voucher Number is required";
   if(!formData.amount) newErrors.amount = "Amount is required";
   else if (!/^\d*\.?\d+$/.test(formData.amount) || parseFloat(formData.amount) <= 0) { newErrors.amount = "Amount must be numbers"; }
   if(!formData.through) newErrors.through = "Through is required";
   if(!formData.voucherParticulers) newErrors.voucherParticulers = "Voucher particular is required";
   if(!formData.voucherAccount) newErrors.voucherAccount = "Voucher Account is required";
   if (!formData.paymentDate) { newErrors.paymentDate = "Payment Date  is required"};
   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };
const handleSubmit =async(event)=>{
  event.preventDefault();
  if (!validateForm()) return;
  try{
    formData.vendorId=vendorId;
    let response;
     if (editMode)
     response = await editVoucher(formData);
     else
    response =await saveVoucher(formData);
    if(response.status === true){
        setOpenPopUp(true);
        setMessage(response.message);
        setFormData({
          amount: "",
          voucherNumber: "",
          through: "",
          voucherParticulers: "",
          voucherAccount: "",
          paymentDate:"",
        });
        let payload ={vendorId:vendorId};
        ListVouchers(payload);
        onClose();
    }else{
      setMessage(response.message);
        setOpenPopUp(true);
        
    }

  }catch(error){
    setMessage(error);
    setOpenPopUp(true);
  }
   
  

}
const fetchVouchers = async()=>{
  setOpenPopUp(false);
  let payload ={vendorId:vendorId};
  ListVouchers(payload);
 
  onClose();
}
const handleChange = (e) =>{
  const {name,value} = e.target;
   setFormData((prevData)=>({
     ...prevData,
     [name]:value,
    }))
 }
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
            <div className="d-flex justify-content-between " onClick={onClose}>
                       <DialogTitle>{editMode ? "Edit Petty" : "Add Petty"}</DialogTitle>
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
                                       Voucher Number <span className="required"> * </span> :
                                      </label>
                                      <input
                                        name="voucherNumber"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="voucherNumber"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.voucherNumber}
                                       
                                      ></input>
                                     {errors.voucherNumber &&( <span className="invalid">{errors.voucherNumber}</span>)}
                                    </div>
                                  </div>
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                       Amount <span className="required"> * </span> :
                                      </label>
                                      <input
                                        name="amount"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="amount"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.amount}
                                       
                                      ></input>
                                     {errors.amount &&( <span className="invalid">{errors.amount}</span>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                       Through <span className="required"> * </span>:
                                      </label>
                                      <input
                                        name="through"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="through"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.through}
                                      ></input>
                                     {errors.through &&( <span className="invalid">{errors.through}</span>)}
                                    </div>
                                  </div>
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                        Particulars <span className="required"> * </span> :
                                      </label>
                                      <input
                                        name="voucherParticulers"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="voucherParticulers"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.voucherParticulers}
                                      ></input>
                                     {errors.voucherParticulers &&(<span className="invalid">{errors.voucherParticulers}</span>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-6 mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                       On Account of <span className="required"> * </span> :
                                      </label>
                                      <div className="vessel-select">
                                      <input
                                        name="voucherAccount"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="voucherAccount"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.voucherAccount}
                                      ></input>
                                       {errors.voucherAccount && (<span className="invalid">{errors.voucherAccount}</span>)}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-6 mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                       Payment Date <span className="required">  </span> :
                                      </label>
                                      <div className="vessel-select">
                                      <input
                                        name="paymentDate"
                                        type="date"
                                        className="form-control vessel-voyage"
                                        id="bank"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.paymentDate}
                                      ></input>
                                        
                                       {errors.paymentDate && (<span className="invalid">{errors.paymentDate}</span>)}
                                      </div>
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
           {openPopUp && <PopUp message={message} closePopup={fetchVouchers}/>}
    </>
  );
};

export default AddVoucher;
