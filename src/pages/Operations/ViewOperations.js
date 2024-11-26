import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../css/viewOperation.css";
import { getPdaDetails } from "../../services/apiService";
import ChargesTable from "../ChargesTable";
const ViewOperations = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  loginResponse,
}) => {
  const Group = require("../../assets/images/viewquo.png");

  const location = useLocation();

  const row = location.state?.row; // Access the passed row object
  const [editData, setEditData] = useState(null);
  const [fetchInitiated, setFetchInitiated] = useState(false); // State to track fetch initiation
  const [finalChargesArray, setFinalChargesArray] = useState([]);

  console.log("Row data:", row);

  // Initialize `editData` when `row` is available
  useEffect(() => {
    if (row) {
      setEditData(row);
    }
  }, [row]);

  // Fetch data only once when `editData` changes
  useEffect(() => {
    console.log(editData, "editData");
    if (editData && !fetchInitiated) {
      setFetchInitiated(true); // Mark fetch as initiated
      fetchPdaDetails(editData?._id);
    }
  }, [editData, fetchInitiated]);

  const getItemName = (id, name) => {
    if (name === "customer") {
      const customer = customers?.find((s) => s._id === id);
      console.log(customer, "customer");
      return customer ? customer.customerName : "Unknown Customer";
    }
  };

  const fetchPdaDetails = async (id) => {
    // alert("fetchPdaDetails");
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      updateValues(pdaDetails);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    console.log(customers, "customers");
  }, [customers]);

  const updateValues = (response) => {
    console.log(response, "updateValues");
    setFinalChargesArray(response?.pdaServices);
  };

  return <>view operation</>;
};

export default ViewOperations;
