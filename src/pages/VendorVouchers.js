import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {getVouchers,getAllVendors,getAllQuotationIds} from "../services/apiService";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Addvoucher from './AddVoucher';
import ViewVoucher from './ViewVoucher';
import "../css/payment.css";
 const VendorVouchers = () => {
  const Group = require("../assets/images/payments.png");
  const [selectedRow, setSelectedRow] = useState(null);
  const [vendorList,setVendorList]=useState([]);
  const [selectedVendorid,setSelectedVendorid]=useState("");
  const[open,setOpen]=useState(false);
  const[viewopen,setviewOpen]=useState(false);
  const[voucherlist,setVoucherList]=useState([]);
  
  const location = useLocation(); 
  const { vendorId} = location.state || {};
 
  const fetchVendorList=async()=>{
    try{
      const listvendors = await getAllVendors();
      setVendorList(listvendors?.vendors ||[]);

    }catch(error){
      console.log("Cannot fecth vendor",error);
    }

  };

  useEffect(()=>{
    fetchVendorList();
    
    if(vendorId)
      setSelectedVendorid(vendorId);
    fetchVouchers();
  },[vendorId]);
  useEffect(() => { 
    if (selectedVendorid) { 
      fetchVouchers(); 
    } 
   }, [selectedVendorid]);
  const fetchVouchers =async()=>{
    let payload ="";
    if(selectedVendorid)
    payload = {vendorId:selectedVendorid};
    else
    payload = {vendorId:vendorId};
 
    try{
      const Listvouchers = await getVouchers(payload);
      setVoucherList(Listvouchers?.vouchers||[]);  
      
    }catch(error){
      console.log("Error in Api",error);
    }
  
    }

    const handleListVouchers = (newUsers) => {
      fetchVouchers();
      setOpen(false);
    };

    const handleChange =(e)=>{
    /*const selectedVendor = vendorList.find(customer => customer._id === e.target.value);
    if (selectedVendor) {
      const totalInvoiceAmount = selectedVendor.totalInvoiceAmount;
      const paidAmount = selectedVendor.paidAmount;

      setInvoiceAmount(totalInvoiceAmount);
      setPaidAmount(paidAmount);
      setBalanceAmount(totalInvoiceAmount - paidAmount);
      setSelectedVendorid(e.target.value);
    }*/
    setSelectedVendorid(e.target.value); 
    
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
  const handleView = (row) => {
    setSelectedRow(row);
    openViewDialog();
  };
  const openViewDialog=()=>{
    handleClickOpenView();
  }
  const handleClickOpenView = () => {
    setviewOpen(true);
  };

  const handleCloseView = () => {
    setviewOpen(false);
    setSelectedRow(null);
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
    { field: "voucher", headerName: "Voucher Number", flex: 2 },
    { field: "through", headerName: "Through", flex: 2 },
    { field: "amount", headerName: "Amount", flex: 2 },
    { field: "particulars", headerName: "Particulars", flex: 2 },
    { field: "accountof", headerName: "On Account Of", flex: 2 },
    { field: "created", headerName: "Created At", flex: 2 },
    {
      field: "actions",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => (
        <>
          <button
            className="btn btna submitpaymentbutton btnfsize"
            onClick={() => handleView(params.row)}
          >
            View
          </button>
        </>
      ),
    },

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
            Vendor Name: 
          </label>
          <div className="vessel-select">
            <select
              className="form-select vesselbox statuss" name="vendors" value={selectedVendorid || ''} onChange={handleChange}>
               {vendorList.map((vendor)=>(
                  <option key= {vendor._id} value={vendor._id}>{vendor.vendorName} {""}</option>
                 ))}
            
             </select>
          </div>
        </div>
        {/*<div className="pdadate">
          <label
            for="inputPassword"
            className=" col-form-label text-nowrap"
          >
            Quotation Date:
          </label>
          <div className="">
            <div className="fw-bolder paymentpdafontweight">
           
            </div>
          </div>
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
       
        </div>*/}
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

     
     <Addvoucher open={open} onClose={handleClose} vendorId={selectedVendorid}  ListVouchers={handleListVouchers}/>
      <ViewVoucher open={viewopen} onClose={handleCloseView} getvoucher={selectedRow}/>
     
     <div className="voucheramount">
     {/*<div className=" d-flex" >
       <div className="totalinvocie"> Total Invoice Amount:</div> <div className="amountpayment"> ${totalInvoiceAmount} </div>
      </div>
      <div className=" d-flex" >
       <div className="totalinvocie"> Paid Amount:</div> <div className="amountpayment"> ${paidAmount} </div>
      </div>
      <div className=" d-flex" >
       <div className="totalinvocie"> Balance Amount:</div> <div className="amountpayment"> ${balanceAmount} </div>
      </div>
      <div className=" ">
      <button
        type="button"
        className="btn btn-info infobtn"
      >
        Add Voucher
      </button>
    </div>
    <div className=" paymentbtn">
      <button
        type="button"
        className="btn btn-info infobtn"
      >
       View Voucher
      </button>
    </div>*/}
    <div className="">
        <button onClick={()=>{
          OpenDialog();
        }}  className="btn btn-info infobtn">Add Voucher</button>
      </div>
     </div>


     <DataGrid
       rows={voucherlist.map((item) => {
        // Check if item.pdaIds is an array and contains objects
       
        const dateOnly = (item.createdAt).split('T')[0];
        return {
          id: item._id,
          voucher:item.voucherNumber || "N/A",
          through: item.through || "N/A",
          amount: item.amount || "N/A",
          particulars: item.voucherParticulers || "N/A",
          accountof: item.voucherAccount || "N/A",
          created:dateOnly || "N/A",
         

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
      {voucherlist?.length === 0 && (
        <div className="no-data">
          <p>No Data Found</p>
        </div>
      )}

    </div>






  );
};

export default VendorVouchers;
