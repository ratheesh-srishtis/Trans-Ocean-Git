import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import "../css/payment.css";
const CustomerPayments = () => {
  const Group = require("../assets/images/payments.png");
  const location = useLocation(); 
  const { customerId,customerName } = location.state || {};
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
      
      {/*<p>Selected Customer ID: {customerId}</p>
      <p>Selected Customer ID: {customerName}</p>*/}

    </div>
  );
};

export default CustomerPayments;
