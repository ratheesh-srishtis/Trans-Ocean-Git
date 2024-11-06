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
      totals.customeramount += parseFloat(charge.customeramount);
      totals.customervat += parseFloat(charge.customervat);
      totals.customerusd += parseFloat(charge.customerusd);
      return totals;
    },
    { quantity: 0, customeramount: 0, customervat: 0, customerusd: 0 }
  );

  const handleRowClick = (charge) => {
    console.log(charge);
  };

  const fetchCharges = async (id) => {
    if (!fetchedCharges.has(id)) {
      try {
        const response = await getCharges({
          serviceid: id,
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
          chargeid: id,
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
    <div>
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
                  {charge.serviceid
                    ? getItemName(charge.serviceid, "service")
                    : ""}
                </td>
                <td>
                  {charge.chargeid
                    ? getItemName(charge.chargeid, "chargeType")
                    : ""}
                </td>
                <td>
                  {charge.subchargeid
                    ? getItemName(charge.subchargeid, "subChargeType")
                    : ""}
                </td>
                <td>{charge.quantity}</td>
                <td>{charge.customeramount}</td>
                <td>{charge.customervat}</td>
                <td>
                  {(
                    parseFloat(charge.customeramount) +
                    parseFloat(charge.customervat)
                  ).toFixed(2)}
                </td>
                <td>{charge.customerusd}</td>
                <td>
                  {/* Edit and Delete Buttons */}
                  <button
                    onClick={() => handleEdit(charge, index)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(charge, index)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
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
                <td>{totalValues.customeramount.toFixed(2)}</td>
                <td>{totalValues.customervat.toFixed(2)}</td>
                <td>
                  {(
                    totalValues.customeramount + totalValues.customervat
                  ).toFixed(2)}
                </td>
                <td>{totalValues.customerusd.toFixed(2)}</td>
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
