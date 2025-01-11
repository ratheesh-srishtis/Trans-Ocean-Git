// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import{getAllQuotationIds,savePayment,editPayment} from "../services/apiService";
import Multiselect from "multiselect-react-dropdown";
import PopUp from "./PopUp";
import "../css/payment.css";

const AddCustomerPayment = ({ open,onClose,customerId,vendorId,ListCustomer,Balance,editMode,paymentvalues}) => {
  const[QuotationList,setQuotationList] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
    useEffect(() => {
      if (editMode && paymentvalues) {
        const quotArr =  Array.isArray(paymentvalues.pdaIds) ? paymentvalues.pdaIds.filter(quot => quot._id).map(quot => quot._id): '';
       const selectedValues = Array.isArray(paymentvalues.pdaIds) 
        ? paymentvalues.pdaIds.filter(pda => pda._id).map(pda => ({
            pdaIds: pda.pdaNumber ? `${pda.pdaNumber}${pda.invoiceId ? ` - ${pda.invoiceId}` : ""}` : "",
            value: pda._id
          }))
        : [];
       
        setFormData({
          pdaIds:quotArr,
          prevSelectedOptions:selectedValues,
          balance: Balance,
          currency:paymentvalues.currency,
          amount:paymentvalues.amount,
          modeofPayment:paymentvalues.modeofPayment,
          bank:paymentvalues.bank,
          paymentDate:paymentvalues.dateofpay,
          paymentId: paymentvalues._id,
        });
      } else {
        setFormData({
          pdaIds: [],
          balance: "",
          currency: "",
          amount: "",
          modeofPayment: "",
          bank:"",
          paymentDate:"",
        });
      }
    }, [editMode, paymentvalues]);
  const [formData, setFormData] = useState({
      pdaIds: [],
      balance: "",
      currency: "",
      amount: "",
      modeofPayment: "",
      bank:"",
      paymentDate:"",
    });
  const handleChange = (e) =>{
   const {name,value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]:value,
     }))
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

 // Multi select
 
 const customStyles = {
  multiselectContainer: {
  
    // Optional: Style for the container if needed
  },
  
  option: {
    width: "200px",
    fontSize: "0.7rem", // Set font size for dropdown options
    padding: "5px 10px", // Optional: Add padding for better spacing
    cursor: "pointer", // Ensure options look clickable
  },
  optionContainer: {
    // Optional: Customize the option container (dropdown menu)
  },
};

const hoverStyles = {
  backgroundColor: "#eee !important", // Apply the background color on hover
};

const options = QuotationList.map((invoice) => ({
  pdaIds: invoice.pdaNumber ? `${invoice.pdaNumber}${invoice.invoiceId ? ` - ${invoice.invoiceId}` : ""}` : "",
  value: invoice._id,
}));

const handleSelect = (selectedList) => {
  setFormData((prevData) => ({
    ...prevData,
    pdaIds: selectedList.map((item) => item.value),
  }));
 
};

const handleRemove = (selectedList) => {
  setFormData((prevData) => ({
    ...prevData,
    pdaIds: selectedList.map((item) => item.value),
  }));
 
};



// end of multi select
  
  
   const validateForm=()=>{
   const newErrors={};
   if (formData.pdaIds.length === 0) newErrors.pdaIds = "Quotation Number is required";
   if(formData.balance && (!/^\d*\.?\d+$/.test(formData.balance) || parseFloat(formData.balance) <= 0)) newErrors.balance = "Balance is required";
   if(!formData.currency) newErrors.currency = "Currency is required";
   if(!formData.amount) newErrors.amount = "Amount is required";
   else if (!/^\d*\.?\d+$/.test(formData.amount) || parseFloat(formData.amount) <= 0) { newErrors.amount = "Amount must be numbers"; }
   if(!formData.modeofPayment) newErrors.modeofPayment = "mode of payment is required";
   if (formData.modeofPayment === "bank" && !formData.bank) { newErrors.bank = "Bank name is required"};
   if (!formData.paymentDate) { newErrors.paymentDate = "Payment Date  is required"};
   
   setErrors(newErrors);
   return Object.keys(newErrors).length === 0;
 };
const handleSubmit =async(event)=>{
  event.preventDefault();
  if (!validateForm()) return;
  try{
    if(vendorId){
      formData.vendorId=vendorId;
      formData.customerId = "";
    }
    else if(customerId){
      formData.vendorId="";
      formData.customerId = customerId;
    }
    
    let response;
    if (editMode)
    response = await editPayment(formData);
    else
   response =await savePayment(formData);
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
          paymentDate:"",
        });
        let payload="";
        if(customerId)
        payload={customerId:customerId};
      else if(vendorId)
        payload={vendorId:vendorId};
        ListCustomer(payload);
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
  let payloads="";
  if(customerId)
  payloads={customerId:customerId};
  else if(vendorId)
  payloads={customerId:customerId};
  ListCustomer(payloads);
  onClose();
}
  return (
    <>
      <Dialog
             sx={{
               width: 850,
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
                      <DialogTitle>{editMode ? "Edit Payment" : "Add payment"}</DialogTitle>
                      <div className="closeicon">
                        <i className="bi bi-x-lg "></i>
                      </div>
                    </div>
                    <DialogContent style={{ marginBottom: "40px" }}>
                              <form onSubmit={handleSubmit}>
                                <div className="row">
                                  <div className="col mb-3 align-items-start">
                                    <div className="payment-page">
                                      <label for="exampleFormControlInput1" className="form-label">
                                        {" "}
                                       Quotation Number:
                                      </label>
                                     <div className="payment-page">
                                       <Multiselect
                                                    options={options}
                                                    selectedValues={formData.prevSelectedOptions}
                                                    displayValue="pdaIds" // Display the serviceName in the dropdown
                                                    showCheckbox
                                                    onSelect={handleSelect} // Triggered when an item is selected
                                                    onRemove={handleRemove} // Triggered when an item is removed
                                                    className="" // Apply custom class
                                                    style={{
                                                     
                                                      ...customStyles,
                                                      option: {
                                                        ...customStyles.option,
                                                        ":hover": hoverStyles, // Add hover styling
                                                      },
                                                    }}
                                                  />
                                    </div>
                                    
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
                                  <div className="col-6 mb-3 align-items-start">
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
