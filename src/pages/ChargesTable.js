import React, { useState } from "react";
import { getCharges, getSubcharges } from "../services/apiService";
import Swal from "sweetalert2";

const ChargesTable = ({ chargesArray, services, ports, customers, onEdit }) => {
  const [charges, setCharges] = useState([]);
  const [subCharges, setSubCharges] = useState([]);
  const [fetchedCharges, setFetchedCharges] = useState(new Set());
  const [fetchedSubCharges, setFetchedSubCharges] = useState(new Set());

  console.log(chargesArray, "chargesArray ChargesTable");

  const totalValues = chargesArray.reduce(
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

  const handleDelete = (charge, index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Delete:", charge);
        // Implement your delete logic here (e.g., API call to delete the charge)
        Swal.fire("Deleted!", "Your charge has been deleted.", "success");
      }
    });
  };

  return (
    <div className="createtable">
      <table className="table">
        <thead>
          <tr>
            <th>SL NO</th>
            <th>Service Type</th>
            <th>Charge Type</th>
            <th>Sub Charge Type</th>
            <th>Quantity</th>
            <th>Amount (OMR)</th>
            <th>VAT Amount</th>
            <th>Total OMR</th>
            <th>Total USD</th>
            <th>Actions</th> {/* Added Actions Column */}
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
                <td>{charge.quantity}</td>
                <td>{charge.customerOMR}</td>
                <td>{charge.customerVAT}</td>
                <td>
                  {(
                    parseFloat(charge.customerOMR) +
                    parseFloat(charge.customerVAT)
                  )?.toFixed(2)}
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
              <tr>
                <td colSpan={4}>Total Cost</td>
                <td>{totalValues.quantity}</td>
                <td>{totalValues.customerOMR?.toFixed(2)}</td>
                <td>{totalValues.customerVAT?.toFixed(2)}</td>
                <td>
                  {(totalValues.customerOMR + totalValues?.customerVAT).toFixed(
                    2
                  )}
                </td>
                <td>{totalValues?.customerTotalUSD?.toFixed(2)}</td>
                <td></td> {/* Empty cell for footer */}
              </tr>
            </tfoot>
          </>
        )}
      </table>
    </div>
  );
};

export default ChargesTable;
