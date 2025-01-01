import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCharges, getSubcharges } from "../../services/apiService";
import PopUp from "../PopUp";
import AddJobs from "./AddJobs";
import "../../css/addjobs.css";

const OpsChargesTable = ({
  chargesArray,
  services,
  ports,
  customers,
  onEdit,
  pdaResponse,
  onSubmit,
  templates,
  vendors,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedCharge, setSelectedCharge] = useState(null); // State to hold the selected charge

  console.log(chargesArray, "chargesArray ChargesTable");

  const totalValues = chargesArray?.reduce(
    (totals, charge) => {
      totals.quantity += parseInt(charge.quantity);
      totals.customerOMR += parseFloat(charge.customerOMR);
      totals.customerVAT += parseFloat(charge.customerVAT);
      totals.customerTotalUSD += parseFloat(charge.customerTotalUSD);
      return totals;
    },
    { quantity: 0, customerOMR: 0, customerVAT: 0, customerTotalUSD: 0 }
  );

  console.log(totalValues, "totalValues");

  const vendorTotalValues = chargesArray?.reduce(
    (totals, charge) => {
      totals.quantity += parseInt(charge.quantity);
      totals.vendorOMR += parseFloat(charge.vendorOMR);
      totals.vendorVAT += parseFloat(charge.vendorVAT);
      totals.vendorTotalUSD += parseFloat(charge.vendorTotalUSD);
      return totals;
    },
    { quantity: 0, vendorOMR: 0, vendorVAT: 0, vendorTotalUSD: 0 }
  );

  console.log(vendorTotalValues, "vendorTotalValues");

  const handleRowClick = (charge) => {
    console.log(charge);
  };

  // Function to handle edit action
  const handleEdit = (charge, index) => {
    console.log("Edit:", charge);
    onEdit(charge, index);
    // Implement your edit logic here
  };

  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  const [open, setOpen] = useState(false);

  const openDialog = (charge) => {
    setSelectedCharge(charge); // Set the selected charge
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCharge(null); // Clear the selected charge
    onSubmit();
  };

  useEffect(() => {
    console.log(selectedCharge, "selectedCharge");
  }, [selectedCharge]);

  const [chargesData, setChargesData] = useState({}); // Store charges by serviceId
  const [subchargesData, setSubchargesData] = useState({}); // Store subcharges by chargeId
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Fetch all charges and subcharges on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const uniqueServiceIds = [
          ...new Set(chargesArray.map((charge) => charge.serviceId)),
        ];
        const fetchedCharges = {};

        // Fetch charges for all unique serviceIds
        await Promise.all(
          uniqueServiceIds.map(async (serviceId) => {
            const response = await getCharges({ serviceId });
            fetchedCharges[serviceId] = response?.charges || [];
          })
        );
        setChargesData(fetchedCharges);

        // Extract all unique chargeIds for fetching subcharges
        const uniqueChargeIds = [
          ...new Set(
            Object.values(fetchedCharges)
              .flat()
              .map((charge) => charge._id)
          ),
        ];
        const fetchedSubcharges = {};

        // Fetch subcharges for all unique chargeIds
        await Promise.all(
          uniqueChargeIds.map(async (chargeId) => {
            const response = await getSubcharges({ chargeId });
            fetchedSubcharges[chargeId] = response?.subcharges || [];
          })
        );
        setSubchargesData(fetchedSubcharges);
      } catch (error) {
        console.error("Error fetching charges or subcharges:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [chargesArray]);

  const getServiceName = (serviceId) => {
    const service = services.find((s) => s._id === serviceId);
    return service?.serviceName || "Unknown Service";
  };

  const getChargeName = (serviceId, chargeId) => {
    const serviceCharges = chargesData[serviceId] || [];
    const charge = serviceCharges.find((c) => c._id === chargeId);
    return charge?.chargeName || "N/A";
  };

  const getSubchargeName = (chargeId, subchargeId) => {
    const chargeSubcharges = subchargesData[chargeId] || [];
    const subcharge = chargeSubcharges.find((s) => s._id === subchargeId);
    return subcharge?.subchargeName || "N/A";
  };

  const getVendorName = (vendorId) => {
    const vendor = vendors.find((v) => v._id === vendorId);
    return vendor?.vendorName || "Unknown Vendor";
  };

  return (
    <>
      <div className="createtable">
        <table className="table tableheadcolor">
          <thead className="tableheadcolor">
            <tr className="tableheadcolor">
              <th className="tableheadcolor">SL NO</th>
              <th className="tableheadcolor">Service Type</th>
              <th className="tableheadcolor">Charge Type</th>
              <th className="tableheadcolor">Sub Charge Type</th>
              <th className="tableheadcolor">Vendor Name</th>
              <th className="tableheadcolor">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {chargesArray?.length > 0 &&
              chargesArray.map((charge, index) => (
                <tr key={index} onClick={() => handleRowClick(charge)}>
                  <td
                    onClick={() => {
                      openDialog(charge);
                    }}
                    className="addjob-click"
                  >
                    {index + 1}
                  </td>
                  <td>{getServiceName(charge.serviceId)}</td>
                  <td>{getChargeName(charge.serviceId, charge.chargeId)}</td>
                  <td>
                    {getSubchargeName(charge.chargeId, charge.subchargeId)}
                  </td>
                  <td>
                    {charge?.isPrivateVendor == false && (
                      <>{getVendorName(charge.vendorId)}</>
                    )}
                  </td>
                  <td className="subsub">{charge.remark}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <AddJobs
        open={open}
        onClose={handleClose}
        templates={templates}
        charge={selectedCharge}
        services={services}
        ports={ports}
        customers={customers}
        vendors={vendors}
      />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default OpsChargesTable;
