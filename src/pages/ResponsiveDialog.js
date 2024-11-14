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
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
  getPdaDetails,
} from "../services/apiService";
import PopUp from "./PopUp";
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
  pdaResponse,
  finalChargesArray,
}) => {
  console.log(services, "services");
  console.log(pdaResponse, "pdaResponse_dialog");

  const [selectedServiceError, setSelectedServiceError] = useState(false);
  const [selectedChargesTypeError, setSelectedChargesTypeError] =
    useState(false);
  const [selectedSubhargesTypeError, setSelectedSubhargesTypeError] =
    useState(false);
  const [selectedQuantityError, setSelectedQuantityError] = useState(false);
  const [selectedNewCustomerError, setSelectedNewCustomerError] =
    useState(false);
  const [customerAmountError, setCustomerAmountError] = useState(false);
  const [customerTotalUSDError, setCustomerTotalUSDError] = useState(false);
  const [customerVatAmountError, setCustomerVatAmountError] = useState(false);
  const [selectedVendorError, setSelectedVendorError] = useState(false);
  const [vendorAmountError, setVendorAmountError] = useState(false);
  const [vendorTotalUSDError, setVendorTotalUSDError] = useState(false);
  const [vendorVatAmountError, setVendorVatAmountError] = useState(false);
  const [customerTotalOmrError, setCustomerTotalOmrError] = useState(null);

  const [firstFieldSelected, setFirstFieldSelected] = useState(false);
  const [secondFieldSelected, setSecondFieldSelected] = useState(false);
  const [thirdFieldSelected, setThirdFieldSelected] = useState(false);
  const [selectedService, setSelectedService] = useState("");
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
  const [savedChargesArray, setSavedChargesArray] = useState([]);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");

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
        setSelectedServiceError(false);
        setCharges([]);
        setSubCharges([]);
        break;
      case "chargeType":
        setSelectedChargesType(charges.find((charge) => charge?._id === value));
        setSecondFieldSelected(true);
        setSelectedChargesTypeError(false);
        setSubCharges([]);
        break;
      case "subChargeType":
        setSelectedSubhargesType(
          subCharges.find((subCharge) => subCharge?._id === value)
        );
        setThirdFieldSelected(true);
        setSelectedSubhargesTypeError(false);
        break;
      case "customer":
        setSelectedNewCustomer(
          customers.find((customer) => customer?._id === value)
        );
        setSelectedNewCustomerError(false);
        break;
      case "vendor":
        setSelectedVendor(ports.find((port) => port?._id === value));
        setSelectedVendorError(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const fetchCharges = async () => {
      try {
        const response = await getCharges({
          serviceId: selectedService?.serviceId || selectedService?._id,
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
          chargeId: selectedChargesType?.chargeId || selectedChargesType?._id,
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
      setSelectedQuantityError(false);
    } else if (name === "customerAmount") {
      setCustomerAmount(value);
      setCustomerAmountError(false);
    } else if (name === "customerVatAmount") {
      setCustomerVatAmount(value);
      setCustomerVatAmountError(false);
    } else if (name === "customerOmrAmount") {
      setCustomerOmrAmount(value);
    } else if (name === "vendorAmount") {
      setVendorAmount(value);
      setVendorAmountError(false);
    } else if (name === "vendorOmrAmount") {
      setVendorOmrAmount(value);
    } else if (name === "vendorVatAmount") {
      setVendorVatAmount(value);
      setVendorVatAmountError(false);
    } else if (name === "vendorTotalUSD") {
      setVendorTotalUSD(value);
      setVendorTotalUSDError(false);
    } else if (name === "customerTotalUSD") {
      setCustomerTotalUSD(value);
      setCustomerTotalUSDError(false);
    } else if (name === "vendorTotalUSD") {
      setVendorTotalUSD(value);
    } else if (name === "remarks") {
      setRemarks(value);
    }
  };

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
    if (name == "service" && id) {
      const service = services.find((s) => s._id === id);
      return service ? service.serviceName : "Unknown Service";
    } else if (name == "customer" && id) {
      const customer = customers.find((s) => s._id === id);
      return customer ? customer.customerName : "Unknown Customer";
    } else if (name == "vendor" && id) {
      const port = ports.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    } else if (name == "chargeType" && id) {
      const charge = charges.find((s) => s._id === id);
      console.log(charge, "chargegetItemName");
      return charge ? charge.chargeName : "Unknown charge";
    } else if (name == "subChargeType" && id) {
      const subCharge = subCharges.find((s) => s._id === id);
      return subCharge ? subCharge.subchargeName : "Unknown subCharge";
    }
  };

  const addNewCharge = async () => {
    if (!selectedService || selectedService === "" || !selectedService) {
      setSelectedServiceError(true);
    } else {
      setSelectedServiceError(false);
    }

    if (
      !selectedChargesType ||
      selectedChargesType === "" ||
      !selectedChargesType
    ) {
      setSelectedChargesTypeError(true);
    } else {
      setSelectedChargesTypeError(false);
    }

    if (
      !selectedSubhargesType ||
      selectedSubhargesType === "" ||
      !selectedSubhargesType
    ) {
      setSelectedSubhargesTypeError(true);
    } else {
      setSelectedSubhargesTypeError(false);
    }

    if (selectedQuantity === "" || !selectedQuantity) {
      setSelectedQuantityError(true);
    } else {
      setSelectedQuantityError(false);
    }

    if (
      !selectedNewCustomer ||
      selectedNewCustomer === "" ||
      !selectedNewCustomer
    ) {
      setSelectedNewCustomerError(true);
    } else {
      setSelectedNewCustomerError(false);
    }

    if (!customerAmount || customerAmount === "" || !customerAmount) {
      setCustomerAmountError(true);
    } else {
      setCustomerAmountError(false);
    }

    if (!customerTotalUSD || customerTotalUSD === "" || !customerTotalUSD) {
      setCustomerTotalUSDError(true);
    } else {
      setCustomerTotalUSDError(false);
    }

    if (!customerVatAmount || customerVatAmount === "" || !customerVatAmount) {
      setCustomerVatAmountError(true);
    } else {
      setCustomerVatAmountError(false);
    }

    if (!selectedVendor || selectedVendor === "" || !selectedVendor) {
      setSelectedVendorError(true);
    } else {
      setSelectedVendorError(false);
    }

    if (!vendorAmount || vendorAmount === "" || !vendorAmount) {
      setVendorAmountError(true);
    } else {
      setVendorAmountError(false);
    }

    if (!vendorTotalUSD || vendorTotalUSD === "" || !vendorTotalUSD) {
      setVendorTotalUSDError(true);
    } else {
      setVendorTotalUSDError(false);
    }

    if (!vendorVatAmount || vendorVatAmount === "" || !vendorVatAmount) {
      setVendorVatAmountError(true);
    } else {
      setVendorVatAmountError(false);
    }

    if (!customerTotalOmr || customerTotalOmr === "" || !customerTotalOmr) {
      setCustomerTotalOmrError(true);
    } else {
      setCustomerTotalOmrError(false);
    }

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
        serviceId: selectedService?._id
          ? selectedService?._id
          : selectedService?.serviceId,
        chargeId: selectedChargesType?._id
          ? selectedChargesType?._id
          : selectedChargesType?.chargeId,
        subchargeId: selectedSubhargesType?._id
          ? selectedSubhargesType?._id
          : selectedSubhargesType?.subchargeId,
        quantity: selectedQuantity,
        customerId: selectedNewCustomer?._id
          ? selectedNewCustomer?._id
          : selectedNewCustomer?.customerId,
        vendorId: selectedVendor?._id
          ? selectedVendor?._id
          : selectedVendor?.vendorId,
        customerOMR: Number(customerAmount),
        customerVAT: Number(customerVatAmount),
        customerTotalUSD: Number(customerTotalUSD),
        vendorOMR: Number(vendorAmount),
        vendorVAT: Number(vendorVatAmount),
        vendorTotalUSD: Number(vendorTotalUSD),
        isPrivateVendor: isPrivateVendor,
        remark: remarks,
        pdaChargeId: pdaResponse?._id ? pdaResponse?._id : null,
        serviceName: selectedService?.serviceName,
        chargeName: selectedChargesType?.chargeName,
        subchargeName: selectedSubhargesType?.subchargeName,
      };
      // setChargesArray([...chargesArray, chargesPayload]);
      // setSavedChargesArray([...finalChargesArray, chargesPayload]);
      const updatedChargesArray = [...chargesArray, chargesPayload];
      setChargesArray(updatedChargesArray);

      // Check if finalChargesArray is empty
      let updatedSavedChargesArray;
      if (finalChargesArray.length === 0) {
        // If finalChargesArray is empty, add chargesArray objects and chargesPayload to savedChargesArray
        updatedSavedChargesArray = [...updatedChargesArray];
      } else {
        // If finalChargesArray already has objects, add only finalChargesArray objects and chargesPayload
        updatedSavedChargesArray = [...finalChargesArray, chargesPayload];
      }

      // Update savedChargesArray with the new array
      setSavedChargesArray(updatedSavedChargesArray);

      // Also update finalChargesArray with the new charge
      console.log(chargesArray, "chargesArray newCharge");
      setMessage("Charges added successfully!");
      setOpenPopUp(true);
      resetCharges("new");
    } else {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
    }
  };

  useEffect(() => {
    console.log(savedChargesArray, "savedChargesArray");
  }, [savedChargesArray]);

  const editCharges = async (index) => {
    // Individual checks for each field
    if (!selectedService || selectedService === "" || !selectedService) {
      setSelectedServiceError(true);
    } else {
      setSelectedServiceError(false);
    }
    if (
      !selectedChargesType ||
      selectedChargesType === "" ||
      !selectedChargesType
    ) {
      setSelectedChargesTypeError(true);
    } else {
      setSelectedChargesTypeError(false);
    }
    if (
      !selectedSubhargesType ||
      selectedSubhargesType === "" ||
      !selectedSubhargesType
    ) {
      setSelectedSubhargesTypeError(true);
    } else {
      setSelectedSubhargesTypeError(false);
    }

    if (!selectedQuantity || selectedQuantity === "") {
      setSelectedQuantityError(true);
    } else {
      setSelectedQuantityError(false);
    }

    if (
      !selectedNewCustomer ||
      selectedNewCustomer === "" ||
      !selectedNewCustomer
    ) {
      setSelectedNewCustomerError(true);
    } else {
      setSelectedNewCustomerError(false);
    }

    if (!customerAmount || customerAmount === "" || !customerAmount) {
      setCustomerAmountError(true);
    } else {
      setCustomerAmountError(false);
    }

    if (!customerTotalUSD || customerTotalUSD === "" || !customerTotalUSD) {
      setCustomerTotalUSDError(true);
    } else {
      setCustomerTotalUSDError(false);
    }

    if (!customerVatAmount || customerVatAmount === "" || !customerVatAmount) {
      setCustomerVatAmountError(true);
    } else {
      setCustomerVatAmountError(false);
    }

    if (!selectedVendor || selectedVendor === "" || !selectedVendor) {
      setSelectedVendorError(true);
    } else {
      setSelectedVendorError(false);
    }

    if (!vendorAmount || vendorAmount === "" || !vendorAmount) {
      setVendorAmountError(true);
    } else {
      setVendorAmountError(false);
    }

    if (!vendorTotalUSD || vendorTotalUSD === "" || !vendorTotalUSD) {
      setVendorTotalUSDError(true);
    } else {
      setVendorTotalUSDError(false);
    }

    if (!vendorVatAmount || vendorVatAmount === "" || !vendorVatAmount) {
      setVendorVatAmountError(true);
    } else {
      setVendorVatAmountError(false);
    }

    if (!customerTotalOmr || customerTotalOmr === "" || !customerTotalOmr) {
      setCustomerTotalOmrError(true);
    } else {
      setCustomerTotalOmrError(false);
    }

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
        serviceId: selectedService?._id
          ? selectedService?._id
          : selectedService?.serviceId,
        chargeId: selectedChargesType?._id
          ? selectedChargesType?._id
          : selectedChargesType?.chargeId,
        subchargeId: selectedSubhargesType?._id
          ? selectedSubhargesType?._id
          : selectedSubhargesType?.subchargeId,
        quantity: selectedQuantity,
        customerId: selectedNewCustomer?._id
          ? selectedNewCustomer?._id
          : selectedNewCustomer?.customerId,
        vendorId: selectedVendor?._id
          ? selectedVendor?._id
          : selectedVendor?.vendorId,
        customerOMR: Number(customerAmount),
        customerVAT: Number(customerVatAmount),
        customerTotalUSD: Number(customerTotalUSD),
        vendorOMR: Number(vendorAmount),
        vendorVAT: Number(vendorVatAmount),
        vendorTotalUSD: Number(vendorTotalUSD),
        isPrivateVendor: isPrivateVendor,
        remark: remarks,
        pdaChargeId: pdaResponse?._id ? pdaResponse?._id : null,
        serviceName: selectedService?.serviceName,
        chargeName: selectedChargesType?.chargeName,
        subchargeName: selectedSubhargesType?.subchargeName,
      };
      console.log(chargesPayload, "chargesPayload");
      if (index !== null) {
        const updatedChargesArray = finalChargesArray.map((charge, idx) =>
          idx === index ? chargesPayload : charge
        );
        setSavedChargesArray(updatedChargesArray); // update the state
        console.log(updatedChargesArray, "updatedChargesArray");
        // Now call submit with the updated charges array
        onSubmit(updatedChargesArray); // pass the updated array immediately
        if (pdaResponse?._id) {
          try {
            const response = await editChargeQuotation(chargesPayload);
            console.log("Fetched Charges:", response);
          } catch (error) {
            console.error("Error fetching charges:", error);
          }
        }
      }
    } else {
      setMessage("Please fill all the required fields");
      setOpenPopUp(true);
    }
  };

  const submitCharges = async () => {
    let chargesPayload = {
      serviceId: selectedService?._id
        ? selectedService?._id
        : selectedService?.serviceId,
      chargeId: selectedChargesType?._id
        ? selectedChargesType?._id
        : selectedChargesType?.chargeId,
      subchargeId: selectedSubhargesType?._id
        ? selectedSubhargesType?._id
        : selectedSubhargesType?.subchargeId,
      quantity: selectedQuantity,
      customerId: selectedNewCustomer?._id
        ? selectedNewCustomer?._id
        : selectedNewCustomer?.customerId,
      vendorId: selectedVendor?._id
        ? selectedVendor?._id
        : selectedVendor?.vendorId,
      customerOMR: Number(customerAmount),
      customerVAT: Number(customerVatAmount),
      customerTotalUSD: Number(customerTotalUSD),
      vendorOMR: Number(vendorAmount),
      vendorVAT: Number(vendorVatAmount),
      vendorTotalUSD: Number(vendorTotalUSD),
      isPrivateVendor: isPrivateVendor,
      remark: remarks,
      pdaChargeId: pdaResponse?._id ? pdaResponse?._id : null,
      serviceName: selectedService?.serviceName,
      chargeName: selectedChargesType?.chargeName,
      subchargeName: selectedSubhargesType?.subchargeName,
    };

    if (pdaResponse?._id) {
      try {
        const updatedChargesArray = [...finalChargesArray, chargesPayload];
        setSavedChargesArray(updatedChargesArray);
        let addChargesPaylod = {
          pdaId: pdaResponse?._id ? pdaResponse?._id : null,
          charges: updatedChargesArray,
        };
        const response = await addPDACharges(addChargesPaylod);
        console.log("addPDACharges_response:", response);
        onSubmit(updatedChargesArray);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    }

    onSubmit(savedChargesArray);
    setMessage("Charges saved successfully!");
    setOpenPopUp(true);
  };

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

  useEffect(() => {
    console.log(chargesArray, "chargesArray");
  }, [chargesArray]);
  useEffect(() => {
    console.log(remarks, "remarks");
  }, [remarks]);

  const resetCharges = (event) => {
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
    if (event != "new") {
      setChargesArray([]);
    }
  };

  useEffect(() => {
    console.log(open, "open");
    console.log(isEditcharge, "isEditcharge");
    if (isEditcharge == false && open == true) {
      resetCharges("load");
    }
  }, [isEditcharge, open]);

  useEffect(() => {
    console.log(editCharge, "editCharge");
    console.log(isEditcharge, "isEditcharge EDIT");
    console.log(open, "open EDIT");
    if (isEditcharge == true && open == true) {
      fetchPdaDetails(pdaResponse?._id);
      setSelectedService(editCharge);
      setSelectedChargesType(editCharge);
      setSelectedSubhargesType(editCharge);
      setSelectedQuantity(editCharge?.quantity);
      setCustomerAmount(editCharge?.customerOMR);
      setCustomerVatAmount(editCharge?.customerVAT);
      setVendorAmount(editCharge?.vendorOMR);
      setVendorVatAmount(editCharge?.vendorVAT);
      setCustomerTotalUSD(editCharge?.customerTotalUSD);
      setVendorTotalUSD(editCharge?.vendorTotalUSD);
      setRemarks(editCharge?.remark);
      setSelectedNewCustomer(editCharge);
      setSelectedVendor(editCharge);
    }
  }, [isEditcharge, open]);

  const fetchPdaDetails = async (id) => {
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      console.log("pdaDetails:", pdaDetails);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <div className="d-flex justify-content-between" onClick={onClose}>
          <DialogTitle>{isEditcharge ? "Update" : "Add"} Charges</DialogTitle>
          <div className="closeicon">
            <i class="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent>
          {isEditcharge == false && (
            <>
              <div className="Anchoragecall">
                {/* <div className="Callhead">Service: Anchorage Call</div> */}
                <div className="row ">
                  <div className="row align-items-start">
                    <div className="col-md-4">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Services:<span className="required"> * </span>
                      </label>
                      <div className="vessel-select">
                        <select
                          key={
                            selectedService ? selectedService?._id : "default"
                          }
                          name="service"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={selectedService ? selectedService?._id : null}
                        >
                          <option value="">Choose Services</option>
                          {services.map((service) => (
                            <option key={service._id} value={service._id}>
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedServiceError && (
                        <>
                          <div className="invalid">Please select service</div>
                        </>
                      )}
                    </div>
                    {firstFieldSelected && (
                      <>
                        <div className="col-md-4">
                          <label
                            for="exampleFormControlInput1"
                            className="form-label"
                          >
                            Charges Type:<span className="required"> * </span>
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
                          {selectedChargesTypeError && (
                            <>
                              <div className="invalid">
                                Please select charges type
                              </div>
                            </>
                          )}
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
                            Sub Charges Type:
                            <span className="required"> * </span>
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
                          {selectedSubhargesTypeError && (
                            <>
                              <div className="invalid">
                                Please select sub charges type
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {thirdFieldSelected && (
                  <>
                    <div className="qq">
                      <div className="col-4">
                        <div className="mb-5">
                          <div className="col mt-2">
                            <label
                              for="exampleFormControlInput1"
                              className="form-label"
                            >
                              Quantity:
                            </label>
                            <input
                              type="text"
                              className="form-control vessel-voyage"
                              id="exampleFormControlInput1"
                              placeholder=""
                              name="quantity"
                              value={selectedQuantity || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                          {selectedQuantityError && (
                            <>
                              <div className="invalid">
                                Please enter quantity
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="customerhead">
                      <div className="headname">Customer Charges</div>
                      <div className="customerrectangle"></div>
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
                          {selectedNewCustomerError && (
                            <>
                              <div className="invalid">
                                Please select customer
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                Amount(OMR):
                                <span className="required"> * </span>
                              </label>
                              <input
                                type="number"
                                className="form-control vessel-voyage"
                                id="exampleFormControlInput1/"
                                placeholder=""
                                name="customerAmount"
                                value={customerAmount || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {customerAmountError && (
                              <>
                                <div className="invalid">
                                  Please enter amount
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                VAT Amount:<span className="required"> * </span>
                              </label>
                              <input
                                type="number"
                                className="form-control vessel-voyage"
                                id="exampleFormControlInput1"
                                placeholder=""
                                name="customerVatAmount"
                                value={customerVatAmount || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {customerVatAmountError && (
                              <>
                                <div className="invalid">
                                  Please enter vat amount
                                </div>
                              </>
                            )}
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
                                placeholder=""
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
                                placeholder=""
                                name="customerTotalUSD"
                                value={customerTotalUSD || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {customerTotalUSDError && (
                              <>
                                <div className="invalid">
                                  Please enter total usd
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="customerhead">
                      <div className="headname">Vendor Charges</div>
                      <div className="customerrectangle"></div>
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
                          {selectedVendorError && (
                            <>
                              <div className="invalid">
                                Please select vendor
                              </div>
                            </>
                          )}
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                Amount(OMR):
                                <span className="required"> * </span>
                              </label>
                              <input
                                type="number"
                                className="form-control vessel-voyage"
                                id="exampleFormControlInput1"
                                placeholder=""
                                name="vendorAmount"
                                value={vendorAmount || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {vendorAmountError && (
                              <>
                                <div className="invalid">
                                  Please select amount
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="mb-3">
                            <div className="col">
                              <label
                                for="exampleFormControlInput1"
                                className="form-label"
                              >
                                VAT Amount:<span className="required"> * </span>
                              </label>
                              <input
                                type="number"
                                className="form-control vessel-voyage"
                                id="exampleFormControlInput1"
                                placeholder=""
                                name="vendorVatAmount"
                                value={vendorVatAmount || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {vendorVatAmountError && (
                              <>
                                <div className="invalid">
                                  Please select vat amount
                                </div>
                              </>
                            )}
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
                                placeholder=""
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
                                placeholder=""
                                name="vendorTotalUSD"
                                value={vendorTotalUSD || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            {vendorTotalUSDError && (
                              <>
                                <div className="invalid">
                                  Please select total usd
                                </div>
                              </>
                            )}
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
                                placeholder=""
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
                    </div>
                  </>
                )}

                <div className="col-12 mt-5">
                  <div className="footer-button d-flex justify-content-center ">
                    {chargesArray.length == 0 && (
                      <>
                        <button
                          type="button"
                          className="btn btncancel"
                          onClick={onClose}
                        >
                          Cancel{" "}
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      className="btn  generate-buttona "
                      onClick={() => {
                        addNewCharge();
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>

                {chargesArray?.length > 0 && (
                  <>
                    {chargesArray.map((charge, index) => (
                      <>
                        <div className="marinetable mt-4 mb-4">
                          <div className="tablehead">
                            {/* {getItemName(charge?.serviceId, "service")} */}
                            {charge?.serviceName}
                          </div>

                          <div className="row mb-3">
                            <div className="col-6">
                              <span className="marinehead">Charge type:</span>
                              <span className="subvalue">
                                {/* {getItemName(
                                  charge?.subchargeId,
                                  "subChargeType"
                                )} */}
                                {charge?.chargeName}
                              </span>
                              <div className="mt-2">
                                <span className="marinehead">
                                  Sub charge Type:
                                </span>
                                <span className="subvalue">
                                  {/* {getItemName(
                                  charge?.subchargeId,
                                  "subChargeType"
                                )} */}
                                  {charge?.subchargeName}
                                </span>
                              </div>
                            </div>
                            <div className="col-6">
                              <span className="marinehead">Quantity:</span>
                              <span className="subvalue">
                                {charge?.quantity}
                              </span>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <div className="col-6 table_seperation">
                              <span className="marinehead marineBold">
                                Customer:
                              </span>
                              <span className="subvalue marineBold">
                                {getItemName(charge?.customerId, "customer")}
                              </span>
                            </div>
                            <div className="col-6">
                              <span className="marinehead marineBold">
                                Vendor:
                              </span>
                              <span className="subvalue marineBold">
                                {" "}
                                {getItemName(charge?.vendorId, "vendor")}{" "}
                              </span>
                            </div>

                            <div className="omr col-6 table_seperation">
                              <span className="marinehead">Amount (OMR):</span>
                              <span className="subvalue">
                                {charge.customerOMR}
                              </span>
                            </div>
                            <div className="omr col-6">
                              <span className="marinehead">Amount (OMR):</span>
                              <span className="subvalue">
                                {charge.vendorOMR}
                              </span>
                            </div>

                            <div className="vat col-6 table_seperation">
                              <span className="marinehead">VAT Amount:</span>
                              <span className="subvalue">
                                {charge.customerVAT}
                              </span>
                            </div>
                            <div className="vat col-6">
                              <span className="marinehead">VAT Amount:</span>
                              <span className="subvalue">
                                {charge.vendorVAT}
                              </span>
                            </div>

                            <div className="omr col-6 table_seperation">
                              <span className="marinehead">Total (OMR):</span>
                              <span className="subvalue">
                                {Number(charge.customerOMR) +
                                  Number(charge.customerVAT)}
                              </span>
                            </div>
                            <div className="omr col-6">
                              <span className="marinehead">Total (OMR):</span>
                              <span className="subvalue">
                                {Number(charge.vendorOMR) +
                                  Number(charge.vendorVAT)}
                              </span>
                            </div>

                            <div className="vat col-6 table_seperation">
                              <span className="marinehead">Total USD:</span>
                              <span className="subvalue">
                                {charge.customerTotalUSD}
                              </span>
                            </div>
                            <div className="vat col-6">
                              <span className="marinehead">Total USD:</span>
                              <span className="subvalue">
                                {charge.vendorTotalUSD}
                              </span>
                            </div>

                            {charge?.isPrivateVendor && (
                              <>
                                <div className="vat col-6 ">
                                  <div className="marinehead d-flex">
                                    <input
                                      className="form-check-inpu "
                                      type="checkbox"
                                      id="flexCheckDefault"
                                      checked={charge?.isPrivateVendor}
                                      value={charge?.isPrivateVendor}
                                      readOnly
                                    />
                                    <span className="ml-2 left-spc">
                                      <label
                                        className="form-check-label "
                                        htmlFor="flexCheckDefault"
                                      >
                                        Private Vendor
                                      </label>
                                    </span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {charge?.remark && (
                            <>
                              <div className="row mb-3">
                                <div className="col-2">
                                  <span className="marinehead">Remarks:</span>
                                </div>
                                <div className="col-10 remark_value">
                                  <span className="">{charge?.remark}</span>
                                </div>
                              </div>
                            </>
                          )}

                          {/* <div key={index} className="tablesep">
                            <div className="col">
                              <div className="subh">
                                <span className="marinehead">Charge Type:</span>
                                <span className="subvalue">
                                  {" "}
                                  {getItemName(
                                    charge?.chargeId,
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
                                    charge?.subchargeId,
                                    "subChargeType"
                                  )}
                                </span>
                              </div>
                              <div className="subh">
                                <span className="marinehead">Customer:</span>
                                <span className="subvalue">
                                  {getItemName(charge?.customerId, "customer")}
                                </span>
                              </div>
                              <div className="subh d-flex">
                                <div className="omr">
                                  <span className="marinehead">
                                    Amount (OMR):
                                  </span>
                                  <span className="subvalue">
                                    {charge.customerOMR}
                                  </span>
                                </div>
                                <div className="vat ms-5">
                                  <span className="marinehead">
                                    VAT Amount:
                                  </span>
                                  <span className="subvalue">
                                    {charge.customerVAT}
                                  </span>
                                </div>
                              </div>
                              <div className="subh d-flex">
                                <div className="omr">
                                  <span className="marinehead">
                                    Total (OMR):
                                  </span>
                                  <span className="subvalue">
                                    {Number(charge.customerOMR) +
                                      Number(charge.customerVAT)}
                                  </span>
                                </div>
                                <div className="vat ms-5">
                                  <span className="marinehead">Total USD:</span>
                                  <span className="subvalue">
                                    {charge.customerTotalUSD}
                                  </span>
                                </div>
                              </div>
                              <div className="subh d-flex">
                                <div className="marinehead">
                                  <div className="form-check pvendor">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id="flexCheckDefault"
                                      checked={charge?.isPrivateVendor}
                                      value={charge?.isPrivateVendor}
                                      readOnly
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="flexCheckDefault"
                                    >
                                      Private Vendor
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="subheadremarks">
                                <span className="marinehead">Remarks:</span>
                                <span className="subvalue">
                                  {charge.remark}
                                </span>
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
                                  {getItemName(charge?.vendorId, "vendor")}{" "}
                                </span>
                              </div>
                              <div className="subhvendor d-flex justify-content-start">
                                <div className="omr">
                                  <span className="marinehead">
                                    Amount (OMR):
                                  </span>
                                  <span className="subvalue">
                                    {charge.vendorOMR}
                                  </span>
                                </div>
                                <div className="vat ms-5">
                                  <span className="marinehead">
                                    VAT Amount:
                                  </span>
                                  <span className="subvalue">
                                    {charge.vendorVAT}
                                  </span>
                                </div>
                              </div>
                              <div className="subhvendor d-flex justify-content-start">
                                <div className="omr">
                                  <span className="marinehead">
                                    Total (OMR):
                                  </span>
                                  <span className="subvalue">
                                    {Number(charge.vendorOMR) +
                                      Number(charge.vendorVAT)}
                                  </span>
                                </div>
                                <div className="vat ms-5">
                                  <span className="marinehead">Total USD:</span>
                                  <span className="subvalue">
                                    {charge.vendorTotalUSD}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </>
                    ))}
                  </>
                )}

                {chargesArray.length > 0 && (
                  <>
                    <div className="footer-button d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btncancel"
                        onClick={onClose}
                      >
                        Cancel{" "}
                      </button>
                      <button
                        type="button"
                        className="btn generate-buttona"
                        onClick={() => {
                          submitCharges();
                        }}
                      >
                        Save
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {isEditcharge == true && (
            <>
              <div className="Anchoragecall">
                <div className="row ">
                  <div className="row align-items-start table">
                    <div className="col-lg-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Services:<span className="required"> * </span>
                      </label>
                      <div className="vessel-select">
                        <select
                          name="service"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={
                            selectedService?.serviceId || selectedService?._id
                          }
                        >
                          <option value="">Choose Services</option>
                          {services.map((service) => (
                            <option key={service._id} value={service._id}>
                              {service.serviceName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedServiceError && (
                        <>
                          <div className="invalid">Please select services</div>
                        </>
                      )}
                    </div>
                    <div className="col-lg-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Charges Type:<span className="required"> * </span>
                      </label>
                      <div className="vessel-select">
                        <select
                          name="chargeType"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={
                            selectedChargesType?.chargeId ||
                            selectedChargesType?._id
                          }
                        >
                          <option value="">Choose Charge Type</option>
                          {charges?.map((charge) => (
                            <option key={charge._id} value={charge._id}>
                              {charge.chargeName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedChargesTypeError && (
                        <>
                          <div className="invalid">
                            Please select charges type
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-lg-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Sub Charges Type:<span className="required"> * </span>
                      </label>
                      <div className="vessel-select">
                        <select
                          name="subChargeType"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={
                            selectedSubhargesType?.subchargeId ||
                            selectedSubhargesType?._id
                          }
                        >
                          <option value="">Choose Sub Charge Type</option>
                          {subCharges?.map((charge) => (
                            <option key={charge._id} value={charge._id}>
                              {charge.subchargeName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {selectedSubhargesTypeError && (
                        <>
                          <div className="invalid">
                            Please select sub charges type
                          </div>
                        </>
                      )}
                    </div>
                    <div className="col-lg-3">
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Quantity:
                      </label>
                      <div className="vessel-select">
                        <input
                          type="text"
                          className="form-control labelbox vesselbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="quantity"
                          value={selectedQuantity}
                          onChange={handleInputChange}
                        />
                      </div>
                      {selectedQuantityError && (
                        <>
                          <div className="invalid">Please enter quantity</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 ">
                  <div className="marinetable">
                    <div className="tablehead">Customer Charges</div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Customer:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <select
                          name="customer"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={
                            selectedNewCustomer?.customerId ||
                            selectedNewCustomer?._id
                          }
                        >
                          <option value="">Choose Customer</option>
                          {customers?.map((customer) => (
                            <option key={customer._id} value={customer._id}>
                              {customer.customerName}
                            </option>
                          ))}
                        </select>
                        {selectedNewCustomerError && (
                          <>
                            <div className="invalid">
                              Please select customer
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Amount(OMR):
                        </label>
                      </div>
                      <div className="col-7 justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="customerAmount"
                          value={customerAmount || ""}
                          onChange={handleInputChange}
                        />
                        {customerAmountError && (
                          <>
                            <div className="invalid">Please enter amount</div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          VAT Amount:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="customerVatAmount"
                          value={customerVatAmount || ""}
                          onChange={handleInputChange}
                        />
                        {customerVatAmountError && (
                          <>
                            <div className="invalid">
                              Please enter vat amount
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Total OMR:
                        </label>
                      </div>
                      <div className="col-7 d-flex justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="customerOmrAmount"
                          value={customerTotalOmr}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Total USD:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="customerTotalUSD"
                          value={customerTotalUSD || ""}
                          onChange={handleInputChange}
                        />
                        {customerTotalUSDError && (
                          <>
                            <div className="invalid">
                              Please enter total usd
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="marinetable">
                    <div className="tablehead">Vendor Charges</div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Vendor:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <select
                          name="vendor"
                          className="form-select vesselbox"
                          onChange={handleSelectChange}
                          aria-label="Default select example"
                          value={
                            selectedVendor?.vendorId || selectedVendor?._id
                          }
                        >
                          <option value="">Choose Vendor</option>
                          {ports?.map((port) => (
                            <option key={port._id} value={port._id}>
                              {port.portName}
                            </option>
                          ))}
                        </select>
                        {selectedVendorError && (
                          <>
                            <div className="invalid">Please select vendor</div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Amount(OMR):
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="vendorAmount"
                          value={vendorAmount}
                          onChange={handleInputChange}
                        />
                        {vendorAmountError && (
                          <>
                            <div className="invalid">Please select amount</div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          VAT Amount:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="vendorVatAmount"
                          value={vendorVatAmount}
                          onChange={handleInputChange}
                        />
                        {vendorVatAmountError && (
                          <>
                            <div className="invalid">
                              Please select vat amount
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Total OMR:
                        </label>
                      </div>
                      <div className="col-7 d-flex justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="vendorOmrAmount"
                          value={vendorTotalOmr}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="row cust">
                      <div className="col-5">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label labelhead"
                        >
                          Total USD:
                        </label>
                      </div>
                      <div className="col-7  justify-content-start ">
                        <input
                          type="number"
                          className="form-control labelbox"
                          id="exampleFormControlInput1"
                          placeholder=""
                          name="vendorTotalUSD"
                          value={vendorTotalUSD}
                          onChange={handleInputChange}
                        />
                        {vendorTotalUSDError && (
                          <>
                            <div className="invalid">
                              Please select total usd
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="savechangesfooter text-center">
                <button
                  type="button"
                  className="btn add-button"
                  onClick={() => {
                    editCharges(editIndex);
                  }}
                >
                  Save changes
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default ResponsiveDialog;
