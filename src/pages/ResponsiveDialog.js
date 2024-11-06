// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
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
import "../css/editcharges.css";
import { getSubcharges, getCharges } from "../services/apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResponsiveDialog = ({
  open,
  onClose,
  onSubmit,
  selectedVessel,
  selectedPort,
  selectedCargo,
  selectedVesselType,
  selectedCustomer,
  eta,
  etd,
  status,
  formData,
  services,
  customers,
  ports,
  isEditcharge,
  editCharge,
  editIndex,
}) => {
  console.log(services, "services");
  const [firstFieldSelected, setFirstFieldSelected] = useState(false);
  const [secondFieldSelected, setSecondFieldSelected] = useState(false);
  const [thirdFieldSelected, setThirdFieldSelected] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedChargesType, setSelectedChargesType] = useState(null);
  const [selectedSubhargesType, setSelectedSubhargesType] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedNewCustomer, setSelectedNewCustomer] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [customerAmount, setCustomerAmount] = useState(null);
  const [customerVatAmount, setCustomerVatAmount] = useState(null);
  const [customerOmrAmount, setCustomerOmrAmount] = useState(null);
  const [customerTotalUSD, setCustomerTotalUSD] = useState(null);
  const [vendorAmount, setVendorAmount] = useState(null);
  const [vendorVatAmount, setVendorVatAmount] = useState(null);
  const [vendorOmrAmount, setVendorOmrAmount] = useState(null);
  const [vendorTotalUSD, setVendorTotalUSD] = useState(null);
  const [customerTotalOmr, setCustomerTotalOmr] = useState(null);
  const [vendorTotalOmr, setVendorTotalOmr] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [charges, setCharges] = useState([]);
  const [subCharges, setSubCharges] = useState([]);
  const [isPrivateVendor, setIsPrivateVendor] = useState(false);
  const [chargesArray, setChargesArray] = useState([]);

  const resetCharges = () => {
    setFirstFieldSelected(false);
    setSecondFieldSelected(false);
    setThirdFieldSelected(false);
    setSelectedService("");
    setSelectedChargesType("");
    setSelectedSubhargesType("");
    setSelectedVendor("");
    setSelectedNewCustomer("");
    setSelectedQuantity("");
    setCustomerAmount("");
    setCustomerVatAmount("");
    setCustomerOmrAmount("");
    setCustomerTotalUSD("");
    setVendorAmount("");
    setVendorVatAmount("");
    setVendorOmrAmount("");
    setVendorTotalUSD("");
    setRemarks("");
    setIsPrivateVendor(false);
  };

  const handleCheckboxChange = (e) => {
    setIsPrivateVendor(e.target.checked);
  };

  const handleFirstFieldChange = (e) => {
    setFirstFieldSelected(true);
  };

  const handleSecondFieldChange = (e) => {
    setSecondFieldSelected(true);
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "service":
        setSelectedService(services.find((service) => service?._id === value));
        setFirstFieldSelected(true);
        break;
      case "chargeType":
        setSelectedChargesType(charges.find((charge) => charge?._id === value));
        setSecondFieldSelected(true);
        break;
      case "subChargeType":
        setSelectedSubhargesType(
          subCharges.find((subCharge) => subCharge?._id === value)
        );
        setThirdFieldSelected(true);
        break;
      case "customer":
        setSelectedNewCustomer(
          customers.find((customer) => customer?._id === value)
        );
        break;
      case "vendor":
        setSelectedVendor(ports.find((port) => port?._id === value));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges({
          serviceid: selectedService?._id,
        });
        setCharges(response?.charges);
        console.log("Fetched Charges:", response);
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };

    if (selectedService) {
      fetchCharges();
      console.log(selectedService, "selectedService");
    }
  }, [selectedService]);

  useEffect(() => {
    const fetchSubCharges = async () => {
      // alert(selectedService?._id);
      try {
        const response = await getSubcharges({
          chargeid: selectedChargesType?._id,
        });
        setSubCharges(response?.subcharges);
        console.log("fetchSubCharges:", response);
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };
    if (selectedChargesType) {
      fetchSubCharges();
      console.log(selectedChargesType, "selectedChargesType");
    }
  }, [selectedChargesType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      setSelectedQuantity(value);
    } else if (name === "customerAmount") {
      setCustomerAmount(value);
    } else if (name === "customerVatAmount") {
      setCustomerVatAmount(value);
    } else if (name === "customerOmrAmount") {
      setCustomerOmrAmount(value);
    } else if (name === "vendorAmount") {
      setVendorAmount(value);
    } else if (name === "vendorOmrAmount") {
      setVendorOmrAmount(value);
    } else if (name === "vendorVatAmount") {
      setVendorVatAmount(value);
    } else if (name === "vendorTotalUSD") {
      setVendorTotalUSD(value);
    } else if (name === "customerTotalUSD") {
      setCustomerTotalUSD(value);
    } else if (name === "vendorTotalUSD") {
      setVendorTotalUSD(value);
    } else if (name === "remarks") {
      setRemarks(value);
    }
  };

  useEffect(() => {
    console.log(chargesArray, "chargesArray");
  }, [chargesArray]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      alert("If you reload, your changes may not be saved.");

      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getItemName = (id, name) => {
    if (name == "service") {
      const service = services.find((s) => s._id === id);
      return service ? service.serviceName : "Unknown Service";
    } else if (name == "customer") {
      const customer = customers.find((s) => s._id === id);
      return customer ? customer.customerName : "Unknown Customer";
    } else if (name == "vendor") {
      const port = ports.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    } else if (name == "chargeType") {
      const charge = charges.find((s) => s._id === id);
      return charge ? charge.chargeName : "Unknown charge";
    } else if (name == "subChargeType") {
      const subCharge = subCharges.find((s) => s._id === id);
      return subCharge ? subCharge.subchargeName : "Unknown subCharge";
    }
  };

  // const addCharges = () => {
  //   console.log(selectedService, "selectedService");
  //   console.log(selectedChargesType, "selectedChargesType");
  //   console.log(selectedSubhargesType, "selectedSubhargesType");
  //   console.log(selectedQuantity, "selectedQuantity");
  //   console.log(selectedNewCustomer, "selectedNewCustomer");
  //   console.log(customerAmount, "customerAmount");
  //   console.log(customerOmrAmount, "customerOmrAmount");
  //   console.log(customerTotalUSD, "customerTotalUSD");
  //   console.log(customerVatAmount, "customerVatAmount");
  //   console.log(selectedVendor, "selectedVendor");
  //   console.log(vendorAmount, "vendorAmount");
  //   console.log(vendorOmrAmount, "vendorOmrAmount");
  //   console.log(vendorTotalUSD, "vendorTotalUSD");
  //   console.log(vendorVatAmount, "vendorVatAmount");
  //   if (
  //     selectedService &&
  //     selectedChargesType &&
  //     selectedSubhargesType &&
  //     selectedQuantity &&
  //     selectedNewCustomer &&
  //     customerAmount &&
  //     customerTotalUSD &&
  //     customerVatAmount &&
  //     selectedVendor &&
  //     vendorAmount &&
  //     vendorTotalUSD &&
  //     vendorVatAmount
  //   ) {
  //     let chargesPayload = {
  //       serviceid: selectedService?._id,
  //       chargeid: selectedChargesType?._id,
  //       subchargeid: selectedSubhargesType?._id,
  //       quantity: selectedQuantity,
  //       customerid: selectedNewCustomer?._id,
  //       customeramount: customerAmount,
  //       customervat: customerVatAmount,
  //       customerusd: customerTotalUSD,
  //       vendorid: selectedVendor?._id,
  //       vendoramount: vendorAmount,
  //       vendorvat: vendorVatAmount,
  //       vendorusd: vendorTotalUSD,
  //       isPrivateVendor: isPrivateVendor,
  //       remark: remarks,
  //     };
  //     console.log(chargesPayload, "chargesPayload");
  //     setChargesArray((prevChargesArray) => [
  //       ...prevChargesArray,
  //       chargesPayload,
  //     ]);
  //     toast.success("Charges Added Successfuly!", {
  //       position: "top-center",
  //       autoClose: 2000,
  //     });
  //     resetCharges();
  //     // onSubmit(formData);
  //     // onClose();
  //   } else {
  //     toast.error("Please fill all fields", {
  //       position: "top-center",
  //       autoClose: 2000,
  //     });
  //   }
  // };

  const addCharges = (action = "add", index = null) => {
    console.log(selectedService, "selectedService");
    console.log(selectedChargesType, "selectedChargesType");
    console.log(selectedSubhargesType, "selectedSubhargesType");
    console.log(selectedQuantity, "selectedQuantity");
    console.log(selectedNewCustomer, "selectedNewCustomer");
    console.log(customerAmount, "customerAmount");
    console.log(customerOmrAmount, "customerOmrAmount");
    console.log(customerTotalUSD, "customerTotalUSD");
    console.log(customerVatAmount, "customerVatAmount");
    console.log(selectedVendor, "selectedVendor");
    console.log(vendorAmount, "vendorAmount");
    console.log(vendorOmrAmount, "vendorOmrAmount");
    console.log(vendorTotalUSD, "vendorTotalUSD");
    console.log(vendorVatAmount, "vendorVatAmount");

    if (
      selectedService &&
      selectedChargesType &&
      selectedSubhargesType &&
      selectedQuantity &&
      selectedNewCustomer &&
      customerAmount &&
      customerTotalUSD &&
      customerVatAmount &&
      selectedVendor &&
      vendorAmount &&
      vendorTotalUSD &&
      vendorVatAmount
    ) {
      let chargesPayload = {
        serviceid: selectedService?._id,
        chargeid: selectedChargesType?._id,
        subchargeid: selectedSubhargesType?._id,
        quantity: Number(selectedQuantity),
        customerid: selectedNewCustomer?._id,
        customeramount: Number(customerAmount),
        customervat: Number(customerVatAmount),
        customerusd: Number(customerTotalUSD),
        vendorid: selectedVendor?._id,
        vendoramount: Number(vendorAmount),
        vendorvat: Number(vendorVatAmount),
        vendorusd: Number(vendorTotalUSD),
        isPrivateVendor: isPrivateVendor,
        remark: remarks,
      };
      console.log(chargesPayload, "chargesPayload");
      if (action === "edit" && index !== null) {
        // Edit existing charge
        setChargesArray((prevChargesArray) =>
          prevChargesArray.map((charge, idx) =>
            idx === index ? chargesPayload : charge
          )
        );
        toast.success("Charge Edited Successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        // Add new charge
        setChargesArray((prevChargesArray) => [
          ...prevChargesArray,
          chargesPayload,
        ]);
        toast.success("Charges Added Successfully!", {
          position: "top-center",
          autoClose: 2000,
        });
        resetCharges();
      }

      // onSubmit(formData);
      // onClose();
    } else {
      toast.error("Please fill all fields", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const submitCharges = () => {
    onSubmit(chargesArray);
    toast.success("Charges Added Successfuly!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  useEffect(() => {
    console.log(editCharge, "editCharge");
    setSelectedService(editCharge);
    setSelectedChargesType(editCharge);
    setSelectedSubhargesType(editCharge);
    setSelectedQuantity(editCharge?.quantity);
    setCustomerAmount(editCharge?.customeramount);
    setCustomerVatAmount(editCharge?.customervat);
    setVendorAmount(editCharge?.vendoramount);
    setVendorVatAmount(editCharge?.vendorvat);
    setCustomerTotalUSD(editCharge?.customerusd);
    setVendorTotalUSD(editCharge?.vendorusd);
    setRemarks(editCharge?.remark);
    setSelectedNewCustomer(editCharge);
    setSelectedVendor(editCharge);
  }, [editCharge]);

  useEffect(() => {
    console.log(selectedService, "selectedService");
    console.log(selectedChargesType, "selectedChargesType");
    console.log(selectedSubhargesType, "selectedSubhargesType");
    console.log(selectedQuantity, "selectedQuantity");
    console.log(selectedNewCustomer, "selectedNewCustomer");
    console.log(customerAmount, "customerAmount");
    console.log(customerOmrAmount, "customerOmrAmount");
    console.log(customerTotalUSD, "customerTotalUSD");
    console.log(customerVatAmount, "customerVatAmount");
    console.log(selectedVendor, "selectedVendor");
    console.log(vendorAmount, "vendorAmount");
    console.log(vendorOmrAmount, "vendorOmrAmount");
    console.log(vendorTotalUSD, "vendorTotalUSD");
    console.log(vendorVatAmount, "vendorVatAmount");
  }, [
    selectedService,
    selectedChargesType,
    selectedSubhargesType,
    selectedQuantity,
    selectedNewCustomer,
    customerAmount,
    customerOmrAmount,
    customerTotalUSD,
    customerVatAmount,
    selectedVendor,
    vendorAmount,
    vendorOmrAmount,
    vendorTotalUSD,
    vendorVatAmount,
  ]);

  useEffect(() => {
    let total = Number(customerAmount) + Number(customerVatAmount);
    setCustomerTotalOmr(total);
  }, [customerAmount, customerVatAmount]);

  useEffect(() => {
    let total = Number(vendorAmount) + Number(vendorVatAmount);
    setVendorTotalOmr(total);
  }, [vendorAmount, vendorVatAmount]);

  const submitEditCharges = () => {};

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>{isEditcharge ? "Update" : "Add"} Charges</DialogTitle>
      <DialogContent>
        {isEditcharge == false && (
          <>
            <div className="Anchoragecall">
              <div className="Callhead">Service: Anchorage Call</div>
              <div className="row ">
                <div className="row align-items-start">
                  <div className="col-md-4">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Services:*
                    </label>
                    <div className="vessel-select">
                      <select
                        name="service"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedService}
                      >
                        <option value="">Choose Services</option>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {firstFieldSelected && (
                    <>
                      <div className="col-md-4">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Charges Type:*
                        </label>
                        <div className="vessel-select">
                          <select
                            name="chargeType"
                            className="form-select vesselbox"
                            onChange={handleSelectChange}
                            aria-label="Default select example"
                            value={selectedChargesType?._id}
                          >
                            <option value="">Choose Charge Type</option>
                            {charges?.map((charge) => (
                              <option key={charge._id} value={charge._id}>
                                {charge.chargeName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {secondFieldSelected && (
                    <>
                      <div className="col-md-4">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Sub Charges Type:*
                        </label>
                        <div className="vessel-select">
                          <select
                            name="subChargeType"
                            className="form-select vesselbox"
                            onChange={handleSelectChange}
                            aria-label="Default select example"
                            value={selectedSubhargesType?._id}
                          >
                            <option value="">Choose Sub Charge Type</option>
                            {subCharges?.map((charge) => (
                              <option key={charge._id} value={charge._id}>
                                {charge.subchargeName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              {thirdFieldSelected && (
                <>
                  <div className="row align-items-start mt-3">
                    <div className="col-md-4">
                      <div className="mb-3">
                        <div className="col">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Quantity:*
                          </label>
                          <input
                            type="number"
                            className="form-control vessel-voyage"
                            id="exampleFormControlInput1"
                            placeholder="PerDay"
                            name="quantity"
                            value={selectedQuantity || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="customerhead">
                    <div className="headname">Customer Charges</div>
                    <div className="rectangle"></div>
                  </div>
                  <div className="row ">
                    <div className="row align-items-start">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Customer:
                        </label>
                        <div className="vessel-select">
                          <select
                            name="customer"
                            className="form-select vesselbox"
                            onChange={handleSelectChange}
                            aria-label="Default select example"
                            value={selectedNewCustomer?._id}
                          >
                            <option value="">Choose Customer</option>
                            {customers?.map((customer) => (
                              <option key={customer._id} value={customer._id}>
                                {customer.customerName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Amount(OMR):*
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1/"
                              placeholder="200.00"
                              name="customerAmount"
                              value={customerAmount || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              VAT Amount:*
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="50.00"
                              name="customerVatAmount"
                              value={customerVatAmount || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="row align-items-start">
                      <div className="col-4  ">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Total OMR:
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="Total OMR"
                              name="customerOmrAmount"
                              value={customerTotalOmr}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Total USD:
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="25.00"
                              name="customerTotalUSD"
                              value={customerTotalUSD || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="customerhead">
                    <div className="headname">Vendor Charges</div>
                    <div className="rectangle"></div>
                  </div>
                  <div className="row ">
                    <div className="row align-items-start">
                      <div className="col">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Vendor:
                        </label>
                        <div className="vessel-select">
                          <select
                            name="vendor"
                            className="form-select vesselbox"
                            onChange={handleSelectChange}
                            aria-label="Default select example"
                            value={selectedVendor?._id}
                          >
                            <option value="">Choose Vendor</option>
                            {ports?.map((port) => (
                              <option key={port._id} value={port._id}>
                                {port.portName}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Amount(OMR):*
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="200.00"
                              name="vendorAmount"
                              value={vendorAmount || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              VAT Amount:*
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="50.00"
                              name="vendorVatAmount"
                              value={vendorVatAmount || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="row align-items-start">
                      <div className="col-4  ">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Total OMR:
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="Total OMR"
                              name="vendorOmrAmount"
                              value={vendorTotalOmr}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Total USD:
                            </label>
                            <input
                              type="number"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder="25.00"
                              name="vendorTotalUSD"
                              value={vendorTotalUSD || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="row align-items-start">
                      <div className="col">
                        <div className="mb-3">
                          <div className="col">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Remarks:
                            </label>
                            <textarea
                              rows="3"
                              className="form-control"
                              id="exampleFormControlInput1"
                              placeholder="RO 0.0049/day"
                              name="remarks"
                              value={remarks || ""}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <div className="form-check pvendor">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexCheckDefault"
                          checked={isPrivateVendor}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          Private Vendor
                        </label>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="firstfooter">
                        <button
                          type="button"
                          className="btn add-button"
                          onClick={() => {
                            addCharges("add");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {chargesArray?.length > 0 && (
                <>
                  {chargesArray.map((charge, index) => (
                    <>
                      <div className="marinetable mt-4 mb-4">
                        <div className="tablehead">
                          {getItemName(charge?.serviceid, "service")}
                        </div>
                        <div key={index} className="tablesep">
                          <div className="col">
                            <div className="subh">
                              <span className="marinehead">charge Type:</span>
                              <span className="subvalue">
                                {" "}
                                {getItemName(
                                  charge?.chargeid,
                                  "chargeType"
                                )}{" "}
                              </span>
                            </div>
                            <div className="subh">
                              <span className="marinehead">
                                Sub charge Type:
                              </span>
                              <span className="subvalue">
                                {getItemName(
                                  charge?.subchargeid,
                                  "subChargeType"
                                )}
                              </span>
                            </div>
                            <div className="subh">
                              <span className="marinehead">Customer:</span>
                              <span className="subvalue">
                                {getItemName(charge?.customerid, "customer")}
                              </span>
                            </div>
                            <div className="subh d-flex">
                              <div className="omr">
                                <span className="marinehead">
                                  Amount (OMR):
                                </span>
                                <span className="subvalue">
                                  {charge.customeramount}
                                </span>
                              </div>
                              <div className="vat ms-5">
                                <span className="marinehead">VAT Amount:</span>
                                <span className="subvalue">
                                  {charge.customervat}
                                </span>
                              </div>
                            </div>
                            <div className="subheadremarks">
                              <span className="marinehead">Remarks:</span>
                              <span className="subvalue">{charge.remark}</span>
                            </div>
                          </div>
                          <div className="marineseperation"></div>
                          <div className="col">
                            <div className="subhvendor d-flex justify-content-start">
                              <span className="marinehead">Quantity:</span>
                              <span className="subvalue">
                                {charge.quantity}
                              </span>
                            </div>
                            <div className="subhvendor d-flex justify-content-start">
                              <span className="marinehead">Vendor:</span>
                              <span className="subvalue">
                                {" "}
                                {getItemName(charge?.vendorid, "vendor")}{" "}
                              </span>
                            </div>
                            <div className="subhvendor d-flex justify-content-start">
                              <div className="omr">
                                <span className="marinehead">
                                  Amount (OMR):
                                </span>
                                <span className="subvalue">
                                  {charge.vendoramount}
                                </span>
                              </div>
                              <div className="vat ms-5">
                                <span className="marinehead">VAT Amount:</span>
                                <span className="subvalue">
                                  {charge.vendorvat}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}

              <div className="footer-button d-flex justify-content-center">
                <button
                  type="button"
                  className="btn cancel-button"
                  onClick={onClose}
                >
                  Cancel{" "}
                </button>
                <button
                  type="button"
                  className="btn save-button"
                  onClick={() => {
                    submitCharges();
                  }}
                >
                  Save{" "}
                </button>
              </div>
            </div>
          </>
        )}

        {isEditcharge == true && (
          <>
            <div class="Anchoragecall">
              <div class="row ">
                <div class="row align-items-start table">
                  <div class="col-lg-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Services:*
                    </label>
                    <div className="vessel-select">
                      <select
                        name="service"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedService?._id}
                      >
                        <option value="">Choose Services</option>
                        {services.map((service) => (
                          <option key={service._id} value={service._id}>
                            {service.serviceName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Charges Type:*
                    </label>
                    <div className="vessel-select">
                      <select
                        name="chargeType"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedChargesType?._id}
                      >
                        <option value="">Choose Charge Type</option>
                        {charges?.map((charge) => (
                          <option key={charge._id} value={charge._id}>
                            {charge.chargeName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <label
                      for="exampleFormControlInput1"
                      className="form-label"
                    >
                      Sub Charges Type:*
                    </label>
                    <div className="vessel-select">
                      <select
                        name="subChargeType"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedSubhargesType?._id}
                      >
                        <option value="">Choose Sub Charge Type</option>
                        {subCharges?.map((charge) => (
                          <option key={charge._id} value={charge._id}>
                            {charge.subchargeName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div class="col-lg-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label labelhead"
                    >
                      Quantity:
                    </label>
                    <div class="vessel-select">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" Per Day"
                        name="quantity"
                        value={selectedQuantity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 ">
                <div class="marinetable">
                  <div class="tablehead">Customer Charges</div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Customer:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <select
                        name="customer"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedNewCustomer?._id}
                      >
                        <option value="">Choose Customer</option>
                        {customers?.map((customer) => (
                          <option key={customer._id} value={customer._id}>
                            {customer.customerName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Amount(OMR):
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder="200.00"
                        name="customerAmount"
                        value={customerAmount || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        VAT Amount:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 50.00"
                        name="customerVatAmount"
                        value={customerVatAmount || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Total OMR:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 250.00"
                        name="customerOmrAmount"
                        value={customerTotalOmr}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Total USD:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 25.00"
                        name="customerTotalUSD"
                        value={customerTotalUSD || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="marinetable">
                  <div class="tablehead">Vendor Charges</div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Vendor:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <select
                        name="vendor"
                        className="form-select vesselbox"
                        onChange={handleSelectChange}
                        aria-label="Default select example"
                        value={selectedVendor?._id}
                      >
                        <option value="">Choose Vendor</option>
                        {ports?.map((port) => (
                          <option key={port._id} value={port._id}>
                            {port.portName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Amount(OMR):
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder="200.00"
                        name="vendorAmount"
                        value={vendorAmount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        VAT Amount:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 50.00"
                        name="vendorVatAmount"
                        value={vendorVatAmount}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Total OMR:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 250.00"
                        name="vendorOmrAmount"
                        value={vendorTotalOmr}
                        disabled
                      />
                    </div>
                  </div>
                  <div class="row cust">
                    <div class="col-6 d-flex justify-content-end ">
                      <label
                        for="exampleFormControlInput1"
                        class="form-label labelhead"
                      >
                        Total USD:
                      </label>
                    </div>
                    <div class="col-6 d-flex justify-content-start ">
                      <input
                        type="number"
                        class="form-control labelbox"
                        id="exampleFormControlInput1"
                        placeholder=" 25.00"
                        name="vendorTotalUSD"
                        value={vendorTotalUSD}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="firstfooter">
              <button
                type="button"
                class="btn add-button"
                onClick={() => {
                  addCharges("edit", editIndex);
                }}
              >
                Save changes
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveDialog;