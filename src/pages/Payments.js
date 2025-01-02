import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getAllPdaValuesApi } from "../services/apiService";
import "../css/payment.css";
const Payments = () => {
  const Group = require("../assets/images/payments.png");
  const [currentDate, setCurrentDate] = useState('');
  const [CustomerList, setCustomerList] = useState([]);
  const [VendorList, setVendorList] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customers: "",
      vendors: "",
     
    });
    
  const fetchCustomerVendorList = async () => {
    try {
      const listallUsers = await getAllPdaValuesApi();
      setCustomerList(listallUsers?.customers || []);
      setVendorList(listallUsers?.vendors || []);
      
      
    } catch (error) {
      console.error("Failed to fetch customers", error);
      
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    const selectedCustomer = CustomerList.find(customer => customer._id === e.target.value);
    navigate('/customerpayment', { state: { customerId: value,customerName: selectedCustomer.customerName } });
  };
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${("0" + (today.getMonth() + 1)).slice(-2)}/${("0" + today.getDate()).slice(-2)}/${today.getFullYear()}`;
    setCurrentDate(formattedDate);
    fetchCustomerVendorList();
  }, []);

  return (
    <div >
      <div className=" mt-3 d-flex">
        <div className="pdadate">
          <label
            for="inputPassword"
            className=" col-form-label text-nowrap"
          >
            Quotation Date:
          </label>
          <div className="">
            <div className="fw-bolder paymentpdafontweight">
            {currentDate}
            </div>
          </div>
        </div>
        <div className=" sortpayment ">
          <i className="bi bi-funnel-fill filtericon"></i>
          <select
            className="form-select form-select-sm filter"
            aria-label="Small select example"
            name="status"    >
            <option value="">Sort by Quotation</option>
            <option value="">Quotation 1</option>
            <option value="">Quotation 2</option>
            <option value="">Quotation 3</option>
            <option value="">Quotation 4</option>
            <option value="">Quotation 5</option>
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
      <div className="choosecargo-row p-3 ">
            <div className="row ">
              <div className="col-6">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label customerpayment">
                    Customer Payment:
                  </label>
                  <div className="vessel-select">
                    <select
                      name="customers" id="customers" onChange={handleChange}
                      value={formData.customers}
                      className="form-select vesselbox vboxholder paymentcustomer"
                    >
                      <option value="">Choose Customer Name</option>
                      {CustomerList.map((customer) => (
                        <option key={customer._id} value={customer._id}>
                          {customer.customerName}{" "}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
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
                </div>
              </div>
            </div>
          </div>  


    </div>
  );
};

export default Payments;
