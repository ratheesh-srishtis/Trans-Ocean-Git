import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getAllCustomers,getPayments,getAllQuotationIds} from "../services/apiService";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Addpayment from './AddPayment';
import "../css/payment.css";
const CustomerPayments = () => {
  const Group = require("../assets/images/payments.png");
  const[QuotationList,setQuotationList] = useState([]);
  const [customerList,setCustomerList]=useState([]);
  const [selectedCustomerid,setSelectedCustomerid]=useState("");
  const [totalInvoiceAmount, setInvoiceAmount] = useState(0); 
  const [paidAmount, setPaidAmount] = useState(0); 
  const [balanceAmount, setBalanceAmount] = useState(0);
  const[open,setOpen]=useState(false);
   const[customerpayment,setCustomerpayment]=useState([]);
   const location = useLocation(); 
    const { customerId} = location.state || {};
  //const { customerId,totalInvoiceAmount,paidAmount } = location.state || {};
  //const balanceAmount = totalInvoiceAmount - paidAmount;
  const fetchCustomerList=async()=>{
    try{
      const listcustomers = await getAllCustomers();
      setCustomerList(listcustomers?.customers ||[]);

    }catch(error){
      console.log("Cannot fecth customer",error);
    }

  };
    const fecthQuotations = async()=>{
      try{
         
        const listquotations = await getAllQuotationIds();
        setQuotationList(listquotations?.quotations||[]);
      }catch(error){
        console.log("Invoice list Error",error);
      }
  
    };
 /* useEffect(() => {
    if (location.state) {
      const { totalInvoiceAmount, paidAmount } = location.state;
      setInvoiceAmount(totalInvoiceAmount);
      setPaidAmount(paidAmount);
      setBalanceAmount(totalInvoiceAmount - paidAmount);
    }
  }, [location.state]);*/
  useEffect(()=>{
    fetchCustomerList();
    fecthQuotations();
    if(customerId)
      setSelectedCustomerid(customerId);
    fetchCustomerpayments();
  },[customerId]);
  useEffect(() => { 
    if (selectedCustomerid) { 
      fetchCustomerpayments(); 
    } 
   }, [selectedCustomerid]);
  const fetchCustomerpayments =async()=>{
    let payload ="";
    if(selectedCustomerid)
    payload = {customerId:selectedCustomerid};
    else
    payload = {customerId:customerId};
 
    try{
      const Listpayments = await getPayments(payload);
       setCustomerpayment(Listpayments?.payments||[]);
       setInvoiceAmount(Listpayments?.totalInvoiceAmount||0);
       setPaidAmount(Listpayments?.paidAmount||0);
        const totalAmount = Listpayments?.totalInvoiceAmount || 0;
        const amountpaid = Listpayments?.paidAmount || 0
       setBalanceAmount(totalAmount - amountpaid);   

    }catch(error){
      console.log("Error in Api",error);
    }
  
    }

    const handleListCustomer = (newUsers) => {
      fetchCustomerpayments();
      setOpen(false);
    };

    const handleChange =(e)=>{
   
    /*const selectedCustomer = customerpayment.find( (customer) => customer.customerId._id === e.target.value );
    if (selectedCustomer) {
      const totalInvoiceAmount = selectedCustomer.totalInvoiceAmount;
      const paidAmount = selectedCustomer.paidAmount;

      setInvoiceAmount(totalInvoiceAmount);
      setPaidAmount(paidAmount);
      setBalanceAmount(totalInvoiceAmount - paidAmount);
      setSelectedCustomerid(e.target.value);
    }*/
      setSelectedCustomerid("");
     setSelectedCustomerid(e.target.value); 
     fetchCustomerpayments();
    
  };
  const OpenDialog =()=>{
    handClickOpen();
  }
  const handClickOpen=()=>{
    setOpen(true);
  }
  const handleClose=()=>{
    setOpen(false);
  }
  const NoRowsOverlay = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "gray",
      }}
    >
      <Typography>No Record Found</Typography>
    </Box>
  );

  const columns = [
    { field: "jobId", headerName: "jobId", flex: 2 },
    { field: "quotation", headerName: "Quotation Number", flex: 2 },
    { field: "invoice", headerName: "Invoice", flex: 4 },
    { field: "amount", headerName: "Paid Amount", flex: 2 },
    { field: "currency", headerName: "Currency", flex: 2 },
    { field: "modeofPayment", headerName: "Mode of Payment", flex: 2 },
    { field: "dateofpay", headerName: "Payment Date", flex: 2 },
    { field: "bank", headerName: "Bank", flex: 2 },

  ];
  return (
    <div >
      <div className=" mt-3 d-flex">
      <div className=" d-flex paymentbycus">
          <label
            for="exampleFormControlInput1"
            className="form-label filterbypayment "
          >
            {" "}
            Customer Name: 
          </label>
          <div className="vessel-select">
            <select
               className="form-select vesselbox statusscustomer" name="customers" value={selectedCustomerid || ''} onChange={handleChange}>
               {customerList.map((customer)=>(
                  <option key= {customer._id} value={customer._id}>{customer.customerName} {""}</option>
                 ))}
            
             </select>
          </div>
        </div>
        <div className="pdadate">
          <label
            for="inputPassword"
            className=" col-form-label text-nowrap"
          >
            Payment Date:
          </label>
          <div className="">
            <div className="fw-bolder paymentpdafontweight">
           
            </div>
          </div>
        </div>
        <div className="">
          {/*<i className="bi bi-funnel-fill filtericon"></i>*/}
          <input type="date" name="search-voucher-date" class="sortpayment form-select vesselbox statusspayment" placeholder="Select Date"></input>
       
        </div>
        <div className=" sortpayment ">
          <i className="bi bi-funnel-fill filtericon"></i>
          <select 
              name="quotations"
                      className="form-select form-select-sm filter"
                      aria-label="Small select example"
                        >
                                  <option value="">Choose Quotation </option>
                                  {QuotationList.map((invoice) => (
                                    <option key={invoice._id} value={invoice._id}>
                                     {invoice.pdaNumber}{invoice.invoiceId ? ` - ${invoice.invoiceId}` : ''}
                                    </option>
                                  ))}
                                </select>
        </div>
        <div className=" d-flex filterpayment">
          <label
            for="exampleFormControlInput1"
            className="form-label filterbypayment "
          >
            {" "}
            Filter By:
          </label>
          <div className="vessel-select">
            <select
              name="status"
              className="form-select vesselbox statuss"

            >
              <option value={1}>Monthly </option>
              <option value={2}>Yearly </option>

            </select>
          </div>
        </div>
      </div>
      <div className="charge">
        <div className="rectangle"></div>
        <div>
          <img src={Group}></img>
        </div>
      </div>

     
      <Addpayment open={open} onClose={handleClose} customerId={selectedCustomerid} vendorId="" ListCustomer={handleListCustomer} Balance={balanceAmount}/>
      
     
     <div className="paymeamount">
     <div className=" d-flex" >
       <div className="totalinvocie"> Total Invoice Amount:</div> <div className="amountpayment"> ${totalInvoiceAmount} </div>
      </div>
      <div className=" d-flex" >
       <div className="totalinvocie"> Paid Amount:</div> <div className="amountpayment"> ${paidAmount} </div>
      </div>
      <div className=" d-flex" >
       <div className="totalinvocie"> Balance Amount:</div> <div className="amountpayment"> ${balanceAmount} </div>
      </div>
     
    <div className="paymentbtn">
        <button onClick={()=>{
          OpenDialog();
        }}  className="btn btn-info infobtn">Add payment</button>
      </div>
     </div>


     <DataGrid
       rows={customerpayment.map((item) => {
        // Check if item.pdaIds is an array and contains objects
        const pdaIds = Array.isArray(item.pdaIds) ? item.pdaIds.filter(pda => pda.invoiceId).map(pda => pda.invoiceId).join(', '): '';
        const pdaNumbers = Array.isArray(item.pdaIds) ? item.pdaIds.filter(pda => pda.pdaNumber).map(pda => pda.pdaNumber).join(', ') : ''; 
        const jobIds = Array.isArray(item.pdaIds) ? item.pdaIds.filter(pda => pda.jobId).map(pda => pda.jobId).join(', ') : '';
        const dateOnly = (item.paymentDate).split('T')[0];
        return {
          id: item._id,
          jobId:jobIds || "N/A",
          quotation:pdaNumbers || "N/A",
          invoice: pdaIds || "N/A",
          amount: item.amount || "N/A",
          currency: item.currency || "N/A",
          modeofPayment: item.modeofPayment || "N/A",
          dateofpay:dateOnly || "N/A",
          bank: item.bank || "N/A",

          ...item,
        };
      })}
              columns={columns}
              getRowId={(row) => row._id} // Use id field for unique row identification
              disableSelectionOnClick // Disables checkbox selection to prevent empty column
              disableColumnMenu // Removes column menu
              components={{
                NoRowsOverlay,
              }}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#eee !important", // Set gray background color
                  color: "#000000", // Set white text color for contrast
                  fontWeight: "bold", // Optional: Make the text bold
                },
                "& .MuiDataGrid-cell": {
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                "& .MuiTablePagination-toolbar": {
                  alignItems: "baseline", // Apply align-items baseline
                },
                "& .MuiDataGrid-columnHeaderTitle": 
                { fontWeight: "bold", 
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#eee", // Gray background for the footer
                },
              }}
              pagination // Enables pagination
              pageSizeOptions={[5, 10, 20]} // Sets available page size options
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10, // Default page size
                    page: 0, // Default page index
                  },
                },
              }}
            />
      {customerpayment?.length === 0 && (
        <div className="no-data">
          <p>No Data Found</p>
        </div>
      )}

    </div>






  );
};

export default CustomerPayments;
