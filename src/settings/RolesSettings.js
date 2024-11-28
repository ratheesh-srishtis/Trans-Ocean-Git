import React, { useState } from "react";
import "../css/RolesSettings.css";
import AddRole from "./AddRole";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const RolesSettings = () => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "age", headerName: "Age", type: "number", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "Active" ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      name: "John Doe",
      age: 25,
      email: "john@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 30,
      email: "jane@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Michael Brown",
      age: 28,
      email: "michael@example.com",
      status: "Active",
    },
    {
      id: 4,
      name: "Emily Davis",
      age: 22,
      email: "emily@example.com",
      status: "Inactive",
    },
  ];

  return (
    <>

     <div className="d-flex justify-content-end mb-3 mt-3">
     <button onClick={() => {
        openDialog();
      }} class="btn btna submit-button btnfsize">Add Role</button>
     </div>



      <AddRole open={open} onClose={handleClose} />
      <div>

        <div>
          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default RolesSettings;
