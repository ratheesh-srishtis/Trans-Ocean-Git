import React, {useState,useEffect} from "react";
import "../css/UserSettings.css";
import AddUser from "./AddUser";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers,deleteUser } from "../services/apiService";
import Swal from "sweetalert2";
import Loader from "../pages/Loader";
import PopUp from "../pages/PopUp";

const UserSettings = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [open, setOpen] = useState(false);
  const [UsersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const fetchusersList = async () => {
    try {
      setIsLoading(true);
      const listallusers = await getAllUsers();
      console.log("users:", listallusers);
      setUsersList(listallusers?.users || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchusersList();
  }, []);


  const openDialog = () => {
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedRow(null);
  };
  const handleAddUser = (newUsers) => {
    fetchusersList();
    setOpen(false); 
  };
  const handleEdit = (row) => {
    setSelectedRow(row);
    setEditMode(true);
    openDialog();
  };
  const handleDelete = async (item) => {
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
              userId: item?._id,
             
            };
            const response = await deleteUser(payload);
            setMessage(response.message);
            setOpenPopUp(true);
            fetchusersList();
          } catch (error) {
            Swal.fire("Error deleting Role");
            fetchusersList();
          }
        }
      }
    });
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
      <Typography>No Record Found</Typography>
    </Box>
  );

  const columns = [
    { field: "name", headerName: "Name" },
    { field: "username", headerName: "User Name" },
    { field: "email", headerName: "Email" },
    { field: "role", headerName: "Role" },
   
    {
      field: "actions",
      headerName: "Action",
      flex: 0,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon sx={{ fontSize: "19px" }} />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon sx={{ fontSize: "19px" }} />
          </IconButton>
        </>
      ),
    },
  ];


  return (
    <>
     

    <div className="d-flex justify-content-end mb-3 mt-3">
     <button onClick={() => {
        openDialog();
      }} class="btn btna submit-button btnfsize">Add User</button>
     </div>
<AddUser open={open} onAddUser={handleAddUser} onClose={handleClose}  editMode={editMode} userSet={selectedRow}/>
<div>
        <DataGrid
          rows={UsersList.map((item) => ({
            id: item._id,
            name: item.name || 'N/A',
            username: item.username || 'N/A',
            email: item.email || 'N/A',
            role: item.userRole.roleType || 'N/A',
           
            ...item,
          }))}
          columns={columns}
          getRowId={(row) => row._id} // Use id field for unique row identification
          disableSelectionOnClick // Disables checkbox selection to prevent empty column
          disableColumnMenu // Removes column menu
          components={{
            NoRowsOverlay,
          }}
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
      {UsersList?.length === 0 && (
        <div className="no-data">
          <p>No Data Found</p>
        </div>
      )}

      <Loader isLoading={isLoading} />

      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default UserSettings;
