import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../css/quotation.css";
import { getAllQuotations } from "../services/apiService";
import { IconButton, TextField } from "@mui/material";

const Quotations = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [quotationsList, setQuotationsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pageSize, setPageSize] = useState(10); // Default rows per page

  const fetchQuotations = async () => {
    try {
      let userData = {
        filter: "all",
      };
      const quotations = await getAllQuotations(userData);
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

  const handleNavigation = () => {
    navigate("/create-pda");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredQuotations = quotationsList.filter((item) => {
    const matchesSearchTerm =
      !searchTerm ||
      item.pdaNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vesselId?.vesselName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.portId?.portName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cargoId?.cargoName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.preparedUserId?._id
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getStatusText(item.pdaStatus)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      !selectedStatus || getStatusText(item.pdaStatus) === selectedStatus;

    return matchesSearchTerm && matchesStatus;
  });

  useEffect(() => {
    setStatusList([
      "Draft PDA",
      "Internally Approved",
      "Rejected By Finance Manager",
      "Customer Approved",
    ]);
  }, []);

  useEffect(() => {
    console.log(selectedStatus, "selectedStatus");
  }, [selectedStatus]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "status":
        setSelectedStatus(value);

        break;
      default:
        break;
    }
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
          <div class="">
            <input
              type="email"
              class="form-control search"
              id="exampleFormControlInput1"
              placeholder="Search"
            />
            <i class="bi bi-search searchicon"></i>
          </div>
          <div class="">
            <i class="bi bi-funnel-fill filtericon"></i>
            <select
              class="form-select form-select-sm filter"
              aria-label="Small select example"
            >
              <option value="1" className="filtervalue">
                Draft
              </option>
              <option value="2">Submitted</option>
              <option value="3">Waiting for FM Approval</option>
              <option value="3">Internally Approved</option>
            </select>
          </div>
          <div class=" createbtn">
            <button type="button" class="btn btn-info infobtn">
              Create New PDA
            </button>
          </div>
        </div>
      </div>

      <div className=" tablequo">
        {/* <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          /> */}

        {/* <select
            name="status"
            className="form-select vesselbox"
            onChange={handleSelectChange}
            aria-label="Default select example" 
            value={selectedStatus}
          >
            <option value="">Filter</option>
            {statusList?.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select> */}

        <DataGrid
          rows={filteredQuotations.map((item) => ({
            id: item._id,
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
          disableColumnMenu // Removes column menu
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]} // Options for rows per page
          sx={{
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "center",
              padding: "10px",
            },
          }}
        />
      </div>
    </>
  );
};

export default Quotations;
