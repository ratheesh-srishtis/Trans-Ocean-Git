import React, { useState } from "react";
import { getCharges, getSubcharges } from "../services/apiService";
import Swal from "sweetalert2";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { deleteQuotationCharge } from "../services/apiService";
import PopUp from "./PopUp";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ChargesTable = ({
  chargesArray,
  services,
  ports,
  customers,
  onEdit,
  pdaResponse,
  onSubmit,
}) => {
  const [charges, setCharges] = useState([]);
  const [subCharges, setSubCharges] = useState([]);
  const [fetchedCharges, setFetchedCharges] = useState(new Set());
  const [fetchedSubCharges, setFetchedSubCharges] = useState(new Set());
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
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

  const fetchCharges = async (id) => {
    if (!fetchedCharges.has(id)) {
      try {
        const response = await getCharges({
          serviceId: id,
        });
        setCharges((prev) => [...prev, ...response?.charges]);
        setFetchedCharges((prev) => new Set(prev).add(id));
        console.log("Fetched Charges:", response);
      } catch (error) {
        console.error("Error fetching charges:", error);
      }
    }
  };

  const fetchSubCharges = async (id) => {
    if (!fetchedSubCharges.has(id)) {
      try {
        const response = await getSubcharges({
          chargeId: id,
        });
        setSubCharges((prev) => [...prev, ...response?.subcharges]);
        setFetchedSubCharges((prev) => new Set(prev).add(id));
        console.log("Fetched SubCharges:", response);
      } catch (error) {
        console.error("Error fetching subcharges:", error);
      }
    }
  };

  const getItemName = (id, name) => {
    if (name === "service") {
      if (id) {
        fetchCharges(id);
      }
      const service = services.find((s) => s._id === id);
      return service ? service.serviceName : "Unknown Service";
    } else if (name === "customer") {
      const customer = customers.find((s) => s._id === id);
      return customer ? customer.customerName : "Unknown Customer";
    } else if (name === "vendor") {
      const port = ports.find((s) => s._id === id);
      return port ? port.portName : "Unknown port";
    } else if (name === "chargeType") {
      if (id) {
        fetchSubCharges(id);
      }
      const charge = charges.find((s) => s._id === id);
      return charge ? charge.chargeName : "Unknown charge";
    } else if (name === "subChargeType") {
      const subCharge = subCharges.find((s) => s._id === id);
      return subCharge ? subCharge.subchargeName : "Unknown subCharge";
    }
  };

  // Function to handle edit action
  const handleEdit = (charge, index) => {
    console.log("Edit:", charge);
    onEdit(charge, index);
    // Implement your edit logic here
  };

  const handleDelete = async (charge, index) => {
    console.log(charge, "charge handleDelete");
    console.log(index, "index handleDelete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("Delete:", charge);
        // Implement your delete logic here (e.g., API call to delete the charge)
        if (charge?.pdaChargeId) {
          try {
            let chargesPayload = {
              pdaChargeId: charge?.pdaChargeId,
            };
            const response = await deleteQuotationCharge(chargesPayload);
            console.log("Fetched Charges:", response);
            const updatedChargesArray = chargesArray.filter(
              (_, i) => i !== index
            );
            onSubmit(updatedChargesArray);
            setMessage("Charge deleted successfully");
            setOpenPopUp(true);
          } catch (error) {
            console.error("Error fetching charges:", error);
            Swal.fire("Error deleting charges");
          }
        } else {
          const updatedChargesArray = chargesArray.filter(
            (_, i) => i !== index
          );
          onSubmit(updatedChargesArray);
          setMessage("Charge deleted successfully");
          setOpenPopUp(true);
        }
      }
    });
  };
  const [valueTabs, setValueTabs] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValueTabs(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={valueTabs}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              label="Customer Charges"
              {...a11yProps(0)}
              style={{ textTransform: "capitalize" }}
            />
            <Tab
              label="Vendor Charges"
              {...a11yProps(1)}
              style={{ textTransform: "capitalize" }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueTabs} index={0}>
          <div className="createtable">
            <table className="table tableheadcolor">
              <thead className="tableheadcolor">
                <tr className="tableheadcolor">
                  <th className="tableheadcolor">SL NO</th>
                  <th className="tableheadcolor">Service Type</th>
                  <th className="tableheadcolor">Charge Type</th>
                  <th className="tableheadcolor">Sub Charge Type</th>
                  {/* <th>Quantity</th> */}
                  <th className="tableheadcolor">Amount (OMR)</th>
                  <th className="tableheadcolor">VAT Amount</th>
                  <th className="tableheadcolor">Total OMR</th>
                  <th className="tableheadcolor">Total USD</th>
                  <th className="tableheadcolor">Actions</th>{" "}
                  {/* Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                {chargesArray?.length > 0 &&
                  chargesArray.map((charge, index) => (
                    <tr key={index} onClick={() => handleRowClick(charge)}>
                      <td>{index + 1}</td>
                      <td>
                        {charge.serviceId
                          ? getItemName(charge.serviceId, "service")
                          : ""}
                      </td>
                      <td>
                        {charge.chargeId
                          ? getItemName(charge.chargeId, "chargeType")
                          : ""}
                      </td>
                      <td>
                        {charge.subchargeId
                          ? getItemName(charge.subchargeId, "subChargeType")
                          : ""}
                      </td>
                      {/* <td>{charge.quantity}</td> */}
                      <td>{charge.customerOMR}</td>
                      <td>{charge.customerVAT}</td>
                      <td>
                        {parseFloat(charge.customerOMR) +
                          parseFloat(charge.customerVAT)}
                      </td>
                      <td>{charge.customerTotalUSD}</td>
                      <td>
                        {/* Edit and Delete Buttons */}

                        <i
                          className="bi bi-pencil-square editicon"
                          onClick={() => handleEdit(charge, index)}
                        >
                          {" "}
                        </i>
                        <i
                          className="bi bi-trash deleteicon"
                          onClick={() => handleDelete(charge, index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {chargesArray?.length > 0 && (
                <>
                  <tfoot>
                    <tr className="bold-row">
                      <td colSpan={4}>Total Cost</td>
                      {/* <td>{totalValues.quantity}</td> */}
                      <td>{totalValues.customerOMR}</td>
                      <td>{totalValues.customerVAT}</td>
                      <td>
                        {totalValues.customerOMR + totalValues?.customerVAT}
                      </td>
                      <td>{totalValues?.customerTotalUSD}</td>
                      <td></td> {/* Empty cell for footer */}
                    </tr>
                  </tfoot>
                </>
              )}
            </table>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={valueTabs} index={1}>
          <div className="createtable">
            <table className="table tableheadcolor ">
              <thead className="tableheadcolor">
                <tr className="tableheadcolor">
                  <th className="tableheadcolor">SL NO</th>
                  <th className="tableheadcolor">Service Type</th>
                  <th className="tableheadcolor">Charge Type</th>
                  <th className="tableheadcolor">Sub Charge Type</th>
                  {/* <th>Quantity</th> */}
                  <th className="tableheadcolor">Amount (OMR)</th>
                  <th className="tableheadcolor">VAT Amount</th>
                  <th className="tableheadcolor">Total OMR</th>
                  <th className="tableheadcolor">Total USD</th>
                  <th className="tableheadcolor">Actions</th>{" "}
                  {/* Added Actions Column */}
                </tr>
              </thead>
              <tbody>
                {chargesArray?.length > 0 &&
                  chargesArray.map((charge, index) => (
                    <tr key={index} onClick={() => handleRowClick(charge)}>
                      <td>{index + 1}</td>
                      <td>
                        {charge.serviceId
                          ? getItemName(charge.serviceId, "service")
                          : ""}
                      </td>
                      <td>
                        {charge.chargeId
                          ? getItemName(charge.chargeId, "chargeType")
                          : ""}
                      </td>
                      <td>
                        {charge.subchargeId
                          ? getItemName(charge.subchargeId, "subChargeType")
                          : ""}
                      </td>
                      {/* <td>{charge.quantity}</td> */}
                      <td>{charge.vendorOMR}</td>
                      <td>{charge.vendorVAT}</td>
                      <td>
                        {parseFloat(charge.vendorOMR) +
                          parseFloat(charge.vendorVAT)}
                      </td>
                      <td>{charge.vendorTotalUSD}</td>
                      <td>
                        {/* Edit and Delete Buttons */}

                        <i
                          className="bi bi-pencil-square editicon"
                          onClick={() => handleEdit(charge, index)}
                        >
                          {" "}
                        </i>
                        <i
                          className="bi bi-trash deleteicon"
                          onClick={() => handleDelete(charge, index)}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
              {chargesArray?.length > 0 && (
                <>
                  <tfoot>
                    <tr className="bold-row">
                      <td colSpan={4}>Total Cost</td>
                      {/* <td>{vendorTotalValues.quantity}</td> */}
                      <td>{vendorTotalValues.vendorOMR}</td>
                      <td>{vendorTotalValues.vendorVAT}</td>
                      <td>
                        {vendorTotalValues.vendorOMR +
                          vendorTotalValues?.vendorVAT}
                      </td>
                      <td>{vendorTotalValues?.vendorTotalUSD}</td>
                      <td></td> {/* Empty cell for footer */}
                    </tr>
                  </tfoot>
                </>
              )}
            </table>
          </div>
        </CustomTabPanel>
      </Box>

      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default ChargesTable;
