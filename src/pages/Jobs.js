import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../css/quotation.css";
import { getAllQuotations } from "../services/apiService";

const Jobs = () => {
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
    navigate("/update-jobs", { state: { row } });
  };

  const handleDelete = (_id) => {
    setQuotationsList((prevData) => prevData.filter((row) => row._id !== _id));
  };

  return (
    <>
      <div className="d-flex justify-content-between headerb mb-3 mt-3 ">
      <div className="leftside"> 
        <ul className="nav nav-underline gap-4 ">
          <li className="nav-item">
            <a
              className="nav-link carduppercontent"
              aria-current="page"
              href="#"
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link carduppercontent" href="#">
              Last 24 Hour
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link carduppercontent" href="#">
              Last Week
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link carduppercontentlast" href="#">
              Last Month
            </a>
          </li>
        </ul>
      </div>

      <div class="d-flex gap-3 rightside">
        <div class=" search d-flex justify-content-around">
          <i class="bi bi-search"></i>
          Search
        </div>
        <div class=" filter d-flex justify-content-between">
          <i class="bi bi-funnel-fill"></i>
          filter
          <i class="bi bi-caret-down-fill"></i>

        </div>
        <div class=" createbtn">
          <button type="button" class="btn btn-info infobtn">
            Create New PDA
          </button>
        </div>
      </div>
      </div>


      <div className=" tablequo">
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

    </>









  );
};

export default Jobs;
