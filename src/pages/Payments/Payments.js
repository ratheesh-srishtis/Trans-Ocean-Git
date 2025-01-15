import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllCustomers,getAllVendors } from "../../services/apiService";
import "../../css/payment.css";
const Payments = () => {
  const Group = require("../../assets/images/payments.png");
  const [currentDate, setCurrentDate] = useState('');
  const [CustomerList, setCustomerList] = useState([]);
  const [VendorList, setVendorList] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customers: "",
      vendors: "",
      voucher:"",
     
    });
  const loginResponse = JSON.parse(localStorage.getItem("loginResponse"));
  const currentroleType = loginResponse.data?.userRole?.roleType;
  const permissions = loginResponse.permission;
  
  
  const fetchCustomerList = async () => {
    try {
      let payload = {sortByName:true};
      const listallUsers = await getAllCustomers(payload);
      setCustomerList(listallUsers?.customers || []);
     
      } catch (error) {
      console.error("Failed to fetch customers", error);
      
    }
  };
  const fetchVendorList = async () => {
    try {
      let payload = {sortByName:true};
      const listallVendors = await getAllVendors(payload);
      setVendorList(listallVendors?.vendors || []);
      
      
    } catch (error) {
      console.error("Failed to fetch vendors", error);
      
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if(name === "customers"){
      const selectedCustomer = CustomerList.find(customer => customer._id === e.target.value);
      navigate('/customerpayment', { state: { customerId: value,totalInvoiceAmount: selectedCustomer.totalInvoiceAmount,paidAmount: selectedCustomer.paidAmount} });
    }
    else if(name === "vendors"){
      const selectedVendor = VendorList.find(vendor => vendor._id === e.target.value);
      navigate('/vendorpayment', { state: { vendorId: value,totalInvoiceAmount: selectedVendor.totalInvoiceAmount,paidAmount: selectedVendor.paidAmount} });
    }
    else if(name === "voucher"){
      const selectedVendorvoucher = VendorList.find(vendor => vendor._id === e.target.value);
      navigate('/vendorvouchers', { state: { vendorId: value,totalInvoiceAmount: selectedVendorvoucher.totalInvoiceAmount,paidAmount: selectedVendorvoucher.paidAmount} });
    }
    
  };
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}/${("0" + today.getDate()).slice(-2)}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
    fetchCustomerList();
    fetchVendorList();
  }, []);

  return (
    <div >

    
      <div className="charge">
        <div className="rectangle"></div>
        <div>
          <img src={Group}></img>
        </div>
      </div>
      <div className="choosecargo-row p-3 ">
            <div className="row ">
              <div className="col-6">
                <div className="mb-3">
                {permissions.includes('receivables') && (
  <>
    <label for="exampleFormControlInput1" className="form-label customerpayment">
      Customer Payment:
    </label>
    <div className="vessel-select">
      <select
        name="customers"
        id="customers"
        onChange={handleChange}
        value={formData.customers}
        className="form-select vesselbox vboxholder paymentcustomer"
      >
        <option value="">Choose Customer Name</option>
        {CustomerList.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.customerName}
          </option>
        ))}
      </select>
    </div>
  </>
)}

                 
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                {permissions.includes('payables') && (
                   <>
                    <label for="exampleFormControlInput1" className="form-label customerpayment">
                    Vendor Payment:
                  </label>
                  <div className="vessel-select">
                    <select
                      name="vendors" onChange={handleChange}
                      value={formData.vendors}
                      className="form-select vesselbox vboxholder paymentcustomer"
                    >
                      <option value="">Choose Vendor Name</option>
                      {VendorList.map((vendor) => (
                        <option key={vendor._id} value={vendor._id}>
                          {vendor.vendorName}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                   </>
                )}
                 
                </div>
              </div>
            </div>
          </div>  

          <div className="choosecargo-row p-3 ">
          <div className="row ">
          <div className="col-6">
          <div className="mb-3">
          {permissions.includes('petty') && (
            <>
            <label for="exampleFormControlInput1" className="form-label customerpayment">
                    Petty Cash:
                  </label>
                  <div className="vessel-select">
                    <select
                      name="voucher" onChange={handleChange}
                      value={formData.voucher}
                      className="form-select vesselbox vboxholder paymentcustomer"
                    >
                      <option value="">Choose Vendor Name</option>
                      {VendorList.map((vendor) => (
                        <option key={vendor._id} value={vendor._id}>
                          {vendor.vendorName}{" "}
                        </option>
                      ))}
                    </select>
                    </div>
            </>
          )}
                  
                  </div>
                  </div>
            </div>
            </div>


    </div>
  );
};

export default Payments;
