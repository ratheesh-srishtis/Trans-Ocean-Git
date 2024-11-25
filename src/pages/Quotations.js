import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../css/quotation.css";
import { getAllQuotations, deleteQuotation } from "../services/apiService";
import { IconButton, TextField } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Loader from "./Loader";
import Swal from "sweetalert2";
import PopUp from "./PopUp";

const Quotations = () => {
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const [quotationsList, setQuotationsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [pageSize, setPageSize] = useState(10); // Default rows per page
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const fetchQuotations = async (type) => {
    try {
      setIsLoading(true);
      let userData = {
        filter: type,
      };
      const quotations = await getAllQuotations(userData);
      console.log("Quotations:", quotations);
      setQuotationsList(quotations?.pda || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations("all");
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
      flex: 0,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ fontSize: "19px" }}  />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon  sx={{ fontSize: "19px" }}  />
          </IconButton>
        </>
      ),
    },
  ];

  const handleEdit = (row) => {
    console.log("Edit row", row);
    navigate("/create-pda", { state: { row } });
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
      item.preparedUserId?.name
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
  useEffect(() => {
    console.log(filteredQuotations, "filteredQuotations");
  }, [filteredQuotations]);

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

  const NoRowsOverlay = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        color: "gray",
      }}
    >
      <Typography>No Quotations available for given terms</Typography>
    </Box>
  );

  const handleDelete = async (item) => {
    console.log(item, "item handleDelete");
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
        if (item?._id) {
          try {
            let payload = {
              pdaId: item?._id,
            };
            const response = await deleteQuotation(payload);
            console.log("Fetched Charges:", response);
            setMessage("Charge deleted successfully");
            setOpenPopUp(true);
            fetchQuotations("all");
          } catch (error) {
            console.error("Error fetching charges:", error);
            Swal.fire("Error deleting charges");
            fetchQuotations("all");
          }
        }
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between headerb mb-3 mt-3 ">
        <div className="leftside">
          <ul className="nav nav-underline gap-4 ">
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
        </div>

        <div class="d-flex gap-3 rightside">
          <div class=" searchmain">
            <input
              type="email"
              className="form-control search"
              id="exampleFormControlInput1"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="bi bi-search searchicon"></i>
          </div>
          <div class=" filtermain ">
            <i class="bi bi-funnel-fill filtericon"></i>
            <select
              class="form-select form-select-sm filter"
              aria-label="Small select example"
              name="status"
              onChange={handleSelectChange}
              value={selectedStatus}
            >
              <option value="">All</option>
              {statusList?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className=" createbtn">
            <button
              type="button"
              onClick={() => handleNavigation()}
              className="btn btn-info infobtn"
            >
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
          <div
     className="quotation-outer-div"
    >
      <div>
      <DataGrid
          rows={
            filteredQuotations.length > 0
              ? filteredQuotations.map((item) => ({
                  id: item._id,
                  vessel: item.vesselId?.vesselName || "N/A",
                  port: item.portId?.portName || "N/A",
                  cargo: item.cargoId?.cargoName || "N/A",
                  date: formatDate(item.createdAt),
                  preparedBy: item.preparedUserId?.name || "N/A",
                  status: getStatusText(item.pdaStatus),
                  ...item,
                }))
              : []
          }
          columns={columns}
          getRowId={(row) => row.id} // Use id field for unique row identification
          disableSelectionOnClick // Disables checkbox selection to prevent empty column
          disableColumnMenu // Removes column menu
          pagination
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]} // Options for rows per page
          components={{
            NoRowsOverlay,
          }}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "flex-start", // Align pagination with table
              padding: "0 16px", // Match horizontal padding with columns
              borderTop: "1px solid rgba(224, 224, 224, 1)", // Add border for better alignmen
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#eee !important", // Set gray background color
              color: "#000000", // Set white text color for contrast
              fontWeight: "bold", // Optional: Make the text bold
            },
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap", 
              overflow: "hidden",
              textOverflow: "ellipsis", 
            },

            "& .MuiTablePagination-root": {
              margin: 0, // Remove default margins
            },
          
          
          }}
        />

      </div>
    </div>
       

        {filteredQuotations?.length == 0 && (
          <>
            <div className="no-data">
              <p>No Quotations available for given terms</p>
            </div>
          </>
        )}
      </div>

      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default Quotations;
