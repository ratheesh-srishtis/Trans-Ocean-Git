// ResponsiveDialog.js
import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import "../css/addcharges.css";

const ResponsiveDialog = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the submit function passed as a prop
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Responsive Form</DialogTitle>
      <DialogContent>
        <div class="addcharges">
          <div class="Anchoragecall">
            <div class="Callhead">Service: Anchorage Call</div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Charges Type:*
                  </label>
                  <div class="vessel-select">
                    <select
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option selected>Choose Charge Type</option>
                      <option value="1">Marine Charges</option>
                      <option value="2">Port-related Charges</option>
                      <option value="3">AMNAS</option>
                      <option value="4">Husbandry Service</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Sub Charges Type:*
                  </label>
                  <div class="vessel-select">
                    <select
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option selected>Choose Sub Charges Type</option>
                      <option value="1">Port Charges</option>
                      <option value="2">Tug Charges</option>
                      <option value="3">Plot Charges</option>
                      <option value="4">Environmental Fee</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Quantity:*
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="PerDay"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="customerhead">
              <div class="headname">Customer Charges</div>
              <div class="rectangle"></div>
            </div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Customer:
                  </label>
                  <div class="vessel-select">
                    <select
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option selected>Choose Customer</option>
                      <option value="1">Carnival</option>
                      <option value="2">Customer 2</option>
                      <option value="3">Customer 3</option>
                      <option value="4">Customer 4</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Amount(OMR):*
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1/"
                        placeholder="200.00"
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        VAT Amount:*
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="50.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col-4  ">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total OMR:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="250.00"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total USD:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="25.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="customerhead">
              <div class="headname">Vendor Charges</div>
              <div class="rectangle"></div>
            </div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Vendor:
                  </label>
                  <div class="vessel-select">
                    <select
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option selected>Choose Vendor</option>
                      <option value="1">Vendor 1</option>
                      <option value="2">Vendor 2</option>
                      <option value="3">Vendor 3</option>
                      <option value="4">Vendor 4</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Amount(OMR):*
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="200.00"
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        VAT Amount:*
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="50.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col-4  ">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total OMR:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="250.00"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-4">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Total USD:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder="25.00"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Remarks:
                      </label>
                      <textarea
                        rows="3"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="RO 0.0049/day"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <div class="form-check pvendor">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Private Vendor
                  </label>
                </div>
              </div>
              <div class="col-4">
                <div class="firstfooter">
                  <button type="button" class="btn add-button">
                    Add charge
                  </button>
                </div>
              </div>
            </div>
            <div class="marinetable">
              <div class="tablehead">Marine Charges</div>
              <div class="tablesep">
                <div class="col ">
                  <div class="subh">
                    <span class="marinehead">Sub charge Type:</span>
                    <span class="subvalue">Port Charges</span>
                  </div>
                  <div class="subh">
                    <span class="marinehead">customer :</span>
                    <span class="subvalue">Norok Shipping</span>
                  </div>
                  <div class="subh d-flex">
                    <div class="omr">
                      <span class="marinehead">Amount(OMR) :</span>
                      <span class="subvalue">200.00</span>
                    </div>
                    <div class="vat ms-5">
                      <span class="marinehead">VAT Amount :</span>
                      <span class="subvalue">50.00</span>
                    </div>
                  </div>
                  <div class="subheadremarks">
                    <span class="marinehead">Remarks :</span>
                    <span class="subvalue">RO 0.0049/day</span>
                  </div>
                </div>
                <div class="marineseperation"></div>
                <div class="col ">
                  <div class="subhvendor d-flex justify-content-start">
                    <span class="marinehead">Quantity:</span>
                    <span class="subvalue">Per Day</span>
                  </div>
                  <div class="subhvendor d-flex justify-content-start">
                    <span class="marinehead">Vendor :</span>
                    <span class="subvalue">Port Khalid</span>
                  </div>
                  <div class="subhvendor d-flex justify-content-start">
                    <div class="omr">
                      <span class="marinehead">Amount(OMR) :</span>
                      <span class="subvalue">200.00</span>
                    </div>
                    <div class="vat ms-5">
                      <span class="marinehead">VAT Amount :</span>
                      <span class="subvalue">50.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-button d-flex justify-content-center">
              <button type="button" class="btn cancel-button" onClick={onClose}>
                Cancel{" "}
              </button>
              <button type="button" class="btn save-button">
                Save{" "}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveDialog;
