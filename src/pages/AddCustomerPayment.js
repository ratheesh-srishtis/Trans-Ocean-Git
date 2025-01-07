// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import{getAllQuotationIds,savePayment} from "../services/apiService";
import PopUp from "./PopUp";

const AddCustomerPayment = ({ open,onClose,customerId,ListCustomer,Balance}) => {
  const[QuotationList,setQuotationList] = useState([]);
  const [formData, setFormData] = useState({
      pdaIds: [],
      balance: "",
      currency: "",
      amount: "",
      modeofPayment: "",
      bank:"",
    });
  const handleChange = (e) =>{
   const {name,value,options,type} = e.target;
   if(type === "select-multiple"){
    const selectedValues = Array.from(options).filter(option=>option.selected).map(option=>option.value);
    setFormData((prevData)=>({
      ...prevData,
      [name]:selectedValues,
     }))

   }else{

    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
     }))

   }
   
  }
  const fecthQuotations = async()=>{
    try{
      
      const listquotations = await getAllQuotationIds();
      setQuotationList(listquotations?.quotations||[]);
    }catch(error){
      console.log("Invoice list Error",error);
    }

  };
useEffect(()=>{
  fecthQuotations();
},[]);
  
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
   const validateForm=()=>{
   const newErrors={};
   if (formData.pdaIds.length === 0) newErrors.pdaIds = "Invoice is required";
   if(formData.balance && (!/^\d*\.?\d+$/.test(formData.balance) || parseFloat(formData.balance) <= 0)) newErrors.balance = "Balance is required";
   if(!formData.currency) newErrors.currency = "Currency is required";
   if(!formData.amount) newErrors.amount = "Amount is required";
   else if (!/^\d*\.?\d+$/.test(formData.amount) || parseFloat(formData.amount) <= 0) { newErrors.amount = "Amount must be numbers"; }
   if(!formData.modeofPayment) newErrors.modeofPayment = "mode of payment is required";
   if (formData.modeofPayment === "bank" && !formData.bank) { newErrors.bank = "Bank name is required"};
   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };
const handleSubmit =async(event)=>{
  event.preventDefault();
  if (!validateForm()) return;
  try{
    formData.vendorId="";
   formData.customerId = customerId;
   const response =await savePayment(formData);
    if(response.status === true){
        setOpenPopUp(true);
        setMessage(response.message);
        setFormData({
          pdaIds: [],
          balance: "",
          currency: "",
          amount: "",
          modeofPayment: "",
          bank:"",
        });
        ListCustomer();
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
const fetchPayments = async()=>{
  setOpenPopUp(false);
  ListCustomer();
  onClose();
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
                      <DialogTitle>Add Payment</DialogTitle>
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
                                       Quotation Number:
                                      </label>
                                      <select
                                  name="pdaIds"
                                  className="form-select vesselbox"
                                  aria-label="Default select example"
                                  onChange={handleChange}
                                  value={formData.pdaIds}
                                  multiple
                                >
                                  <option value="">Choose Quotation </option>
                                  {QuotationList.map((invoice) => (
                                    <option key={invoice._id} value={invoice._id}>
                                     {invoice.pdaNumber}{invoice.invoiceId ? ` - ${invoice.invoiceId}` : ''}
                                    </option>
                                  ))}
                                </select>
                                {errors.pdaIds && (
                    <span className="invalid">{errors.pdaIds}</span>
                   )}
                                    </div>
                                  </div>
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                        Balance Dues:
                                      </label>
                                      <input
                                        name="balance"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="balance"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={Balance}
                                        readOnly
                                      ></input>
                                     {errors.balance &&( <span className="invalid">{errors.balance}</span>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                       Amount
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
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                        Currency:
                                      </label>
                                      <select
                                          name="currency"
                                          className="form-select vesselbox"
                                          aria-label="Default select example"
                                          onChange={handleChange}
                                          value={formData.currency}
                                        >
                                          <option value="">Choose Currency </option>
                                          <option value="usd">USD </option>
                                          <option value="aed">AED </option>
                                          <option value="omr">OMR </option>
                                         
                                        </select>
                                     {errors.currency &&(<span className="invalid">{errors.currency}</span>)}
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        Mode of Payment <span className="required"> * </span> :
                                      </label>
                                      <div className="vessel-select">
                                        <select
                                          name="modeofPayment"
                                          className="form-select vesselbox"
                                          aria-label="Default select example"
                                          onChange={handleChange}
                                          value={formData.modeofPayment}
                                        >
                                          <option value="">Mode of payment </option>
                                          <option value="cash">Cash </option>
                                         <option value="bank">Bank</option>
                                         </select>
                                       {errors.modeofPayment && (<span className="invalid">{errors.modeofPayment}</span>)}
                                      </div>
                                    </div>
                                  </div>
                                  
                                </div>
                                <div className="row">
                                  <div className="col mb-3 align-items-start">
                                    <div className="">
                                      <label for="exampleFormControlInput1" className="form-label">
                                       Bank <span className="required">  </span> :
                                      </label>
                                      <div className="vessel-select">
                                      <input
                                        name="bank"
                                        type="text"
                                        className="form-control vessel-voyage"
                                        id="bank"
                                        placeholder=""
                                        onChange={handleChange}
                                        value={formData.bank}
                                      ></input>
                                        
                                       {errors.bank && (<span className="invalid">{errors.bank}</span>)}
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
           {openPopUp && <PopUp message={message} closePopup={fetchPayments}/>}
    </>
  );
};

export default AddCustomerPayment;
