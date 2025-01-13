import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { getAllCustomers,getPayments,getAllQuotationIds,deletePayment} from "../../services/apiService";
import { Box, Typography,IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Addpayment from './AddPayment';
import Swal from "sweetalert2";
import "../../css/payment.css";
import PopUp from "../PopUp";
const CustomerPayments = () => {
  const Group = require("../../assets/images/payments.png");
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
  const [period, setPeriod] = useState("");
  const [inputFilterDate, setFilterDate] = useState("");
  const[inputpdaId,setPdaId]=useState("");
  const[FilterName,setFilterName]=useState("");
  const[FilterValue,setFilterValue]=useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
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
  const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const currentroleType = loginResponse.data?.userRole?.roleType;
  
  
  useEffect(()=>{
   fetchCustomerList();
    fecthQuotations();
    if(customerId)
      setSelectedCustomerid(customerId);
    let payload={customerId:customerId}
    fetchCustomerpayments(payload);
  },[customerId]);
  /*useEffect(() => {
    if (selectedCustomerid) { 
       let payload={customerId:selectedCustomerid}
      fetchCustomerpayments(payload); 
    } 
   }, [selectedCustomerid]);*/
  const fetchCustomerpayments =async(payload)=>{
   
    try{
      const Listpayments = await getPayments(payload);
       setCustomerpayment(Listpayments?.payments||[]);
       setInvoiceAmount(Listpayments?.totalInvoiceAmount||0);
       setPaidAmount(Listpayments?.paidAmount||0);
        const totalAmount = Listpayments?.totalInvoiceAmount || 0;
        const amountpaid = Listpayments?.paidAmount || 0;
        const balance = totalAmount - amountpaid;
       setBalanceAmount(parseFloat(balance.toFixed(2)));   

    }catch(error){
      console.log("Error in Api",error);
    }
  
    }

    const handleListCustomer = (payload) => {
      setEditMode(false);
      fetchCustomerpayments(payload);
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
     let paylaod = {customerId: e.target.value,paymentDate:inputFilterDate,pdaId:inputpdaId,filter:FilterName,[FilterName]:FilterValue};
     //let paylaod = {customerId:e.target.value};
     fetchCustomerpayments(paylaod);
    
  };
  const OpenDialog =()=>{
    handClickOpen();
  }
  const handClickOpen=()=>{
    setOpen(true);
  }
  const handleClose=()=>{
    setOpen(false);
    setEditMode(false);
    setSelectedRow(null);
  }

  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const years = [
    2025, 2026, 2027, 2028, 2029, 2030
  ];
   const handleTimeperiod =async(e)=>{
    let payload ="";
   
      const SelectBxname  = e.target.name;
      if(SelectBxname === "paymentDate"){
        setPeriod("");
        setFilterDate(e.target.value);
        payload = { customerId: selectedCustomerid, paymentDate: e.target.value,pdaId:inputpdaId};
      }
      else if(SelectBxname === "pdaId"){
        setPdaId(e.target.value);
        payload ={customerId: selectedCustomerid,paymentDate:inputFilterDate,pdaId:e.target.value,filter:FilterName,[FilterName]:FilterValue};
      }
         
      else{
        setFilterDate("");
        setFilterName(SelectBxname);
        setFilterValue(e.target.value);
        payload ={customerId: selectedCustomerid,paymentDate:"",pdaId:inputpdaId,filter:SelectBxname,[SelectBxname]:e.target.value};

      }
       console.log(payload);
      fetchCustomerpayments(payload);
     
      
    };
    const payloadParams ={customerId: selectedCustomerid,paymentDate:inputFilterDate,pdaId:inputpdaId,filter:FilterName,[FilterName]:FilterValue};
      const handleDelete = async (item) => {
        
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            if (item?._id) {
              try {
                let payload = {
                  paymentId: item?._id,
                };
                const response = await deletePayment(payload);
                
                setMessage(response.message);
                setOpenPopUp(true);
                fetchCustomerpayments(payloadParams);
              } catch (error) {
                Swal.fire("Error deleting payments");
                fetchCustomerpayments(payloadParams);
              }
            }
          }
        });
      };
      const handleEdit = (row) => {
        setSelectedRow(row);
        setEditMode(true);
        OpenDialog();
      };
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
    {
      field: "actions",
      headerName: "Action",
      flex: 0,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ fontSize: "19px" }} />
          </IconButton>
          {currentroleType === 'admin' && (
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon sx={{ fontSize: "19px" }} />
          </IconButton>
    )}
        </>
      ),
    }

  ];
  return (
    <>
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
        <div className="cusbydate">
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
          <input type="date" name="paymentDate" class="datebycustomerpayment form-select vesselbox statusspayment" placeholder="Select Date" onChange={handleTimeperiod} value={inputFilterDate}></input>
       
        </div>
        <div className="voucherbypayment">
          <i className="bi bi-funnel-fill filtericon"></i>
          <select 
              name="pdaId"
                      className="form-select form-select-sm filter"
                      aria-label="Small select example"
                      onChange={handleTimeperiod}
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
            className="form-label filterbycustpayment "
          >
            {" "}
            Filter By:
          </label>
          <div className="vessel-select">
          <select 
        name="status"
        className="form-select vesselbox statussbycustomer"
        onChange={(e) => setPeriod(e.target.value)}
        value={period}
      >
        <option value="">Select Period</option>
        <option value="month">Monthly</option>
        <option value="year">Yearly</option>
      </select>

          </div>
        </div>

        <div>
        {period === "month" && (
        <select
          name="month"
          className="form-select jobporrt mmonth" aria-label="Select Month"
          onChange={handleTimeperiod}
        >
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month.value}>{month.label}</option>
          ))}
        </select>
      )}

      {period === "year" && (
        <select
          name="year"
          className="form-select jobporrt mmonth" aria-label="Select Year"
          onChange={handleTimeperiod}
        >
          <option value="">Select Year</option>
          {years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      )}
          </div>
      </div>
      <div className="charge">
        <div className="rectangle"></div>
        <div>
          <img src={Group}></img>
        </div>
      </div>

     
      <Addpayment open={open} onClose={handleClose} customerId={selectedCustomerid} vendorId="" ListCustomer={handleListCustomer} Balance={balanceAmount}  editMode={editMode}  paymentvalues={selectedRow}/>
      
     
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

{openPopUp && (
  <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
)}

</>

  );
};

export default CustomerPayments;
