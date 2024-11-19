import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

import { getAllQuotations } from "../services/apiService";

const Quotations = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [quotationsList, setQuotationsList] = useState([]);

  const fetchQuotations = async () => {
    try {
      const quotations = await getAllQuotations();
      console.log("Quotations:", quotations);
      setQuotationsList(quotations?.pda || []);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Draft PDA";
      case 2:
        return "Waiting For Approval From Finance Manager";
      case 3:
        return "Internally Approved";
      case 4:
        return "Rejected By Finance Manager";
      case 5:
        return "Customer Approved";
      default:
        return "Unknown Status";
    }
  };

  const columns = [
    { field: "pdaNumber", headerName: "Job ID", flex: 1 },
    { field: "vessel", headerName: "Vessel Name", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "port", headerName: "Port Name", flex: 2 },
    { field: "cargo", headerName: "Cargo", flex: 2 },
    { field: "preparedBy", headerName: "Prepared By", flex: 1 },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit row", row);
    navigate("/create-pda", { state: { row } });
  };

  const handleDelete = (_id) => {
    setQuotationsList((prevData) => prevData.filter((row) => row._id !== _id));
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <DataGrid
        rows={quotationsList.map((item) => ({
          id: item._id, // Map _id to id
          vessel: item.vesselId?.vesselName || "N/A",
          port: item.portId?.portName || "N/A",
          cargo: item.cargoId?.cargoName || "N/A",
          date: formatDate(item.createdAt),
          preparedBy: item.preparedUserId?._id || "N/A",
          status: getStatusText(item.pdaStatus),
          ...item,
        }))}
        columns={columns}
        getRowId={(row) => row.id} // Use id field for unique row identification
        disableSelectionOnClick // Disables checkbox selection to prevent empty column
        hideFooterPagination // Removes footer pagination
        disableColumnMenu // Removes column menu
      />
    </div>
  );
};

export default Quotations;
