import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../../css/quotation.css";
import {
  getAllQuotations,
  deleteQuotation,
  getAllJobs,
} from "../../services/apiService";
import { IconButton, TextField } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import PopUp from "../PopUp";
import Loader from "../Loader";
const JobReportTable = ({ loginResponse, reportTableList, ports }) => {
  console.log(reportTableList, "reportTableList");
  console.log(ports, "ports_JobReportTable");
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");

  const [selectedRows, setSelectedRows] = useState([]);
  const [quotationsList, setQuotationsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPort, setSelectedPort] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const fetchQuotations = async (type) => {
    setSelectedTab(type);

    try {
      setIsLoading(true);
      let userData = {
        filter: type,
      };
      const quotations = await getAllJobs(userData);
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
      case 5:
        return "Customer Approved";
      case 6:
        return "Pending from operations";
      case 7:
        return "Operations Completed";
      default:
        return "Unknown Status";
    }
  };

  const columns = [
    {
      field: "JobId",
      headerName: "Job ID",
      flex: 1,
      renderCell: (params) => (
        <div
          style={{
            color: "#1EBBEE",
            cursor: "pointer",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: "vessel", headerName: "Vessel Name", flex: 1 },
    { field: "job", headerName: "Job", flex: 1, width: "400px" },
    { field: "port", headerName: "Port Name", flex: 2 },
    { field: "AssignedTo", headerName: "Ops By", flex: 1 },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "actions",
      headerName: "Action",
      flex: 0,
      renderCell: (params) => (
        <>
          <button
            type="button"
            className="btn btn-info jobviewbtnn mt-3"
            onClick={() => handleJobClick(params.row)}
          >
            View
          </button>

          {loginResponse?.data?.userRole?.roleType == "admin" && (
            <>
              <IconButton
                color="secondary"
                onClick={() => handleDelete(params.row)}
              >
                <DeleteIcon sx={{ fontSize: "19px" }} />
              </IconButton>
            </>
          )}
        </>
      ),
    },
  ];

  const handleJobClick = (row) => {
    navigate("/view-operation", { state: { row } });
  };

  const handleEdit = (row) => {
    console.log("Edit row", row);
    navigate("/edit-operation", { state: { row } });
  };

  const handleNavigation = () => {
    navigate("/job-report");
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
  };

  const filteredQuotations = reportTableList?.filter((item) => {
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
    const matchesPort =
      !selectedPort || item.portId[0]?.portName === selectedPort;

    return matchesSearchTerm && matchesStatus && matchesPort;
  });

  useEffect(() => {
    setStatusList([
      "Customer Approved",
      "Pending from operations",
      "Operations Completed",
    ]);
  }, []);

  useEffect(() => {
    console.log(selectedStatus, "selectedStatus");
    console.log(selectedPort, "selectedPort");
  }, [selectedStatus, selectedPort]);
  useEffect(() => {
    console.log(filteredQuotations, "filteredQuotations");
  }, [filteredQuotations]);

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "status":
        setSelectedStatus(value);
        break;
      case "port":
        setSelectedPort(value);
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

  const handleCellClick = (params, event) => {
    console.log(params, "params");
    if (params.field === "JobId") {
      let row = params.row;
      navigate("/view-operation", { state: { row } });
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between headerb mb-3 mt-3 ">
        <div className="leftside"></div>

        <div className="d-flex gap-3 rightside">
          <div className=" filtermain ">
            <i className="bi bi-funnel-fill filtericon"></i>
            <select
              className="form-select form-select-sm filter"
              aria-label="Small select example"
              name="port"
              onChange={handleSelectChange}
              value={selectedPort}
            >
              <option value="">Filter by port</option>
              {ports?.map((port) => (
                <option key={port?.portId} value={port?.portId}>
                  {port?.portName}
                </option>
              ))}
            </select>
          </div>
          <div className=" filtermain ">
            <i className="bi bi-funnel-fill filtericon"></i>
            <select
              className="form-select form-select-sm filter"
              aria-label="Small select example"
              name="status"
              onChange={handleSelectChange}
              value={selectedStatus}
            >
              <option value="">Filter by status</option>
              {statusList?.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className=" tablequo">
        <div className="quotation-outer-div">
          <div>
            <DataGrid
              rows={
                filteredQuotations?.length > 0
                  ? filteredQuotations?.map((item) => ({
                      id: item._id,
                      JobId: item.jobId,
                      vessel: item.vesselId[0]?.vesselName || "N/A",
                      job:
                        item.jobs
                          ?.map((job) => job.service?.[0]?.serviceName || "N/A")
                          ?.join(", ") || "N/A", // Updated line to include service names
                      port: item.portId[0]?.portName || "N/A",
                      AssignedTo:
                        item.assignedEmployee[0]?.employeeName || "N/A",
                      status: getStatusText(item.pdaStatus),
                      ...item,
                    }))
                  : []
              }
              jobId
              columns={columns}
              getRowId={(row) => row.id} // Use id field for unique row identification
              disableSelectionOnClick // Disables checkbox selection to prevent empty column
              disableColumnMenu // Removes column menu
              components={{
                NoRowsOverlay,
              }}
              onCellClick={handleCellClick}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
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
                "& .MuiTablePagination-toolbar": {
                  alignItems: "baseline", // Apply align-items baseline
                },
              }}
              pagination // Enables pagination
              pageSizeOptions={[5, 10, 20]} // Sets available page size options
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5, // Default page size
                    page: 0, // Default page index
                  },
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

export default JobReportTable;
