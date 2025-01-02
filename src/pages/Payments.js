import React from "react";
import "../css/payment.css";

const Payments = () => {
  const Group = require("../assets/images/payments.png");
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
              02/01/2025
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
                      name="cargo"
                      className="form-select vesselbox vboxholder paymentcustomer"
                    >
                      <option value="">Choose Customer Name</option>
                      <option value="">Customer 1</option>
                      <option value="">Customer 2</option>
                      <option value="">Customer 3</option>
                      <option value="">Customer 4</option>
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
                      name="cargo"
                      className="form-select vesselbox vboxholder paymentcustomer"
                    >
                      <option value="">Choose Vendor Name</option>
                      <option value="">Vendor 1</option>
                      <option value="">Vendor 2</option>
                      <option value="">Vendor 3</option>
                      <option value="">Vendor 4</option>
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
