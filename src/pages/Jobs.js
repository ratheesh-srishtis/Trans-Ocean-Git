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
        <div className="leftside d-flex">
          <ul className="nav nav-underline gap-3 ">
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontent"
                aria-current="page"
                onClick={() => fetchQuotations("all")}
              >
                All
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontent"
                onClick={() => fetchQuotations("day")}
              >
                Last 24 Hour
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontent"
                onClick={() => fetchQuotations("week")}
              >
                Last Week
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontentlast"
                onClick={() => fetchQuotations("month")}
              >
                Last Month
              </a>
            </li>
          </ul>
          <div class="draft-pda-jobs ">
            <span class="badge statusbadge ">
            <i className="bi bi-check2-circle circle"></i>
            </span>
            <div class="pdabadge">Assigned to Operations</div>
          </div>
        </div>

        <div class="d-flex gap-2 rightside">

          <div class=" searchmain">
            <input
              type="email"
              className="form-control search"
              id="exampleFormControlInput1"
              placeholder="Search"
            />
            <i className="bi bi-search searchicon"></i>
          </div>
          <div class=" filtermainjobs ">
            <i class="bi bi-funnel-fill filtericon"></i>
            <select
              class="form-select form-select-sm filter"
              aria-label="Small select example"
              name="status"
            >
              <option value="">Filter By Status</option>
              <option value="">Customer Approved</option>
              <option value="">Pending From OPS</option>
              <option value="">Operations Completed</option>
              <option value="">NO Approvals Required</option>

            </select>
          </div>
          <div className=" createbtn">
            <button
              type="button"

              className="btn btn-info infobtn"
            >
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
