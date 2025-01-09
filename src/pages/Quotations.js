import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../css/quotation.css";
import {
  getAllQuotations,
  deleteQuotation,
  getPdaDetails,
} from "../services/apiService";
import { IconButton, TextField } from "@mui/material";
import { Box, Typography } from "@mui/material";
import Loader from "./Loader";
import Swal from "sweetalert2";
import PopUp from "./PopUp";
import SendInvoice from "./SendInvoice";
import InvoicePdf from "./InvoicePdf";

const Quotations = ({ loginResponse }) => {
  const navigate = useNavigate();
  console.log(loginResponse, "loginResponse_quoatations_page");
  const [selectedRows, setSelectedRows] = useState([]);
  const [quotationsList, setQuotationsList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const fetchQuotations = async (type) => {
    setSelectedTab(type);

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
      case 6:
        return "Pending From Operations";
      case 7:
        return "Operations Completed";
      case 8:
        return "Closed";
      default:
        return "Unknown Status";
    }
  };

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [selectedPdaData, setSelectedPdaData] = useState(null);

  const handleRowSelection = (params) => {
    console.log(params?.row, "params_handleRowSelection");
    setSelectedRowId(params.id); // Store the selected row ID
    setSelectedPdaData(params.row);
    fetchPdaDetails(params.row?.id);
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      width: 50,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div
          style={{
            width: "20px",
            height: "20px",
            border: `2px solid ${
              params.id === selectedRowId ? "#1ebbee" : "#ccc"
            }`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderRadius: "4px", // Slightly rounded corners
          }}
          onClick={() => handleRowSelection(params)}
        >
          {params.id === selectedRowId && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#1ebbee"
              width="16px"
              height="16px"
            >
              <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
            </svg>
          )}
        </div>
      ),
    },
    {
      field: "pdaNumber",
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
    { field: "vessel", headerName: "Vessel Name", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "port", headerName: "Port Name", flex: 2 },
    { field: "cargo", headerName: "Cargoes", flex: 2 },
    { field: "preparedBy", headerName: "Prepared By", flex: 1 },
    { field: "status", headerName: "Status", flex: 2 },
    {
      field: "actions",
      headerName: "Action",
      flex: 0,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ fontSize: "19px" }} />
          </IconButton>
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

  const handleEdit = (row) => {
    console.log("Edit row", row);
    navigate("/create-pda", { state: { row } });
  };

  const handleNavigation = () => {
    localStorage.removeItem("PDA_ID");
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
      "Waiting For Approval From Finance Manager",
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
            setMessage("Quotation has been successfully deleted");
            setOpenPopUp(true);
            fetchQuotations("all");
          } catch (error) {
            console.error("Error fetching charges:", error);
            Swal.fire("Error deleting quotation");
            fetchQuotations("all");
          }
        }
      }
    });
  };

  const handleCellClick = (params, event) => {
    console.log(params, "params");
    if (params.field === "pdaNumber") {
      let row = params.row;
      navigate("/view-quotation", { state: { row } });
    }
  };

  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const SendInvoiceOpen = () => {
    setInvoiceOpen(true);
  };
  const handleInvoiceClose = () => {
    setInvoiceOpen(false);
  };

  const [generateInvoiceOpen, setGenerateInvoiceOpen] = useState(false);

  const generateInvoiceOpenClick = () => {
    setGenerateInvoiceOpen(true);
  };
  const generateInvoiceCloseClick = () => {
    setGenerateInvoiceOpen(false);
  };

  const rows = filteredQuotations.map((item) => ({
    id: item._id,
    vessel: item.vesselId?.vesselName || "N/A",
    port: item.portId?.portName || "N/A",
    cargo: item.cargoId?.cargoName || "N/A",
    date: formatDate(item.createdAt),
    preparedBy: item.preparedUserId?.name || "N/A",
    status: getStatusText(item.pdaStatus),
    ...item,
  }));
  const [pdaResponse, setPdaResponse] = useState(null);

  const fetchPdaDetails = async (id) => {
    localStorage?.setItem("PDA_ID", id);
    let data = {
      pdaId: id,
    };
    try {
      const pdaDetails = await getPdaDetails(data);
      console.log("PDADETAILS", pdaDetails);
      setPdaResponse(pdaDetails?.pda);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between headerb mb-3 mt-3 ">
        <div className="leftside">
          <ul className="nav nav-underline gap-4 ">
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontent ${
                  selectedTab === "all" ? "active-nav-style" : ""
                }`}
                aria-current="page"
                onClick={() => fetchQuotations("all")}
              >
                All
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontent ${
                  selectedTab === "day" ? "active-nav-style" : ""
                }`}
                onClick={() => fetchQuotations("day")}
              >
                Last 24 Hour
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontent ${
                  selectedTab === "week" ? "active-nav-style" : ""
                }`}
                onClick={() => fetchQuotations("week")}
              >
                Last Week
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontentlast ${
                  selectedTab === "month" ? "active-nav-style" : ""
                }`}
                onClick={() => fetchQuotations("month")}
              >
                Last Month
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex gap-3 rightside">
          <div className=" searchmain">
            <input
              type="text"
              className="form-control search"
              id="exampleFormControlInput1"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="bi bi-search searchicon"></i>
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
        <div className="quotation-outer-div">
          <div>
            <DataGrid
              // rows={
              //   filteredQuotations.length > 0
              //     ? filteredQuotations.map((item) => ({
              //         id: item._id,
              //         vessel: item.vesselId?.vesselName || "N/A",
              //         port: item.portId?.portName || "N/A",
              //         cargo: item.cargoId?.cargoName || "N/A",
              //         date: formatDate(item.createdAt),
              //         preparedBy: item.preparedUserId?.name || "N/A",
              //         status: getStatusText(item.pdaStatus),
              //         ...item,
              //       }))
              //     : []
              // }
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id} // Use id field for unique row identification
              components={{
                NoRowsOverlay,
              }}
              onCellClick={handleCellClick}
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-columnHeader": {
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
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#eee", // Gray background for the footer
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold", // Bold font for header text
                },
                "& .MuiDataGrid-cell:focus": {
                  outline: "none", // Remove the blue focus outline
                },
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  alignItems: "center", // Center vertically
                  justifyContent: "center", // Center horizontally
                  textOverflow: "ellipsis",
                },
              }}
              pagination // Enables pagination
              pageSizeOptions={[5, 10, 20, 50, 100]} // Sets available page size options
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

        <div className="buttons-wrapper">
          <div className="left">
            <button
              className="btn btna submit-button"
              onClick={() => {
                generateInvoiceOpenClick();
              }}
              disabled={!selectedRowId || selectedPdaData?.pdaStatus != 7}
            >
              Generate Invoice
            </button>
            <button
              className="btn btna submit-button"
              onClick={() => {
                SendInvoiceOpen();
              }}
              disabled={!selectedRowId || selectedPdaData?.pdaStatus != 7}
            >
              Send Invoice
            </button>
          </div>

          <div className="right d-flex"></div>
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
      <SendInvoice
        open={invoiceOpen}
        onClose={handleInvoiceClose}
        selectedPdaData={selectedPdaData}
      />
      <InvoicePdf
        open={generateInvoiceOpen}
        onClose={generateInvoiceCloseClick}
        selectedPdaData={selectedPdaData}
        pdaResponse={pdaResponse}
      />
    </>
  );
};

export default Quotations;
