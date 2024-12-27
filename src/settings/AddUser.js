// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { getAllUserRoles, saveUser, editUser } from "../services/apiService";
import PopUp from "../pages/PopUp";
import Swal from "sweetalert2";
const AddUser = ({ open, onAddUser, onClose, editMode, userSet }) => {
  const [RolesList, setRolesList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const [closePopUp, setclosePopup] = useState(false);
  useEffect(() => {
    fetchrolesList();
  }, []);
  useEffect(() => {
    if (editMode && userSet) {
      setFormData({
        name: userSet.name || "",
        email: userSet.email || "",
        username: userSet.username || "",
        password: "",
        role: userSet.userRole?._id || "",
        userId: userSet._id,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "",
      });
    }
  }, [editMode, userSet]);
  const fetchrolesList = async () => {
    try {
      const listallroles = await getAllUserRoles();
      console.log(listallroles, "listallroles");
      setRolesList(listallroles?.roles || []);
    } catch (error) {
      console.error("Failed to fetch roles", error);
    }
  };
  const fetchusersList = async () => {
    if (closePopUp == false) {
      onAddUser();
      onClose();
    }
    setOpenPopUp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (editMode == false)
      if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (editMode) {
        console.log("Edit mode formData:", formData);
        response = await editUser(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData);
        response = await saveUser(formData);
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
        setFormData({
          name: "",
          username: "",
          email: "",
          role: "",
          password: "",
        });
        onAddUser(formData);
        onClose();
      } else {
        setMessage(response.message);
        setOpenPopUp(true);
        setclosePopup(true);
      }
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating user", error);
    }
  };

  return (
    <>
      <Dialog
        sx={{
          width: 800,
          margin: "auto",
          borderRadius: 2,
        }}
        open={open}
        onClose={(event, reason) => {
          if (reason === "backdropClick") {
            // Prevent dialog from closing when clicking outside
            return;
          }
          onClose(); // Allow dialog to close for other reasons
        }}
        fullWidth
        maxWidth="lg"
      >
        <div className="d-flex justify-content-between " onClick={onClose}>
          <DialogTitle>{editMode ? "Edit User" : "Add User"}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    Name:
                  </label>
                  <input
                    name="name"
                    type=""
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.name}
                  ></input>
                  {errors.name && (
                    <span className="invalid">{errors.name}</span>
                  )}
                </div>
              </div>
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    User Name:
                  </label>
                  <input
                    name="username"
                    type=""
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.username}
                  ></input>
                  {errors.username && (
                    <span className="invalid">{errors.username}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    New Password:
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.password}
                  ></input>
                  {errors.password && (
                    <span className="invalid">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    {" "}
                    Mail ID:
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="form-control vessel-voyage"
                    id="exampleFormControlInput1"
                    placeholder=""
                    onChange={handleChange}
                    value={formData.email}
                  ></input>
                  {errors.email && (
                    <span className="invalid">{errors.email}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col mb-3 align-items-start">
                <div className="">
                  <label for="exampleFormControlInput1" className="form-label">
                    Role <span className="required"> * </span> :
                  </label>
                  <div className="vessel-select">
                    <select
                      name="role"
                      className="form-select vesselbox"
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={formData.role}
                    >
                      <option value="">Choose Role </option>
                      {RolesList.map((roles) => (
                        <option key={roles._id} value={roles._id}>
                          {roles.role}{" "}
                        </option>
                      ))}
                    </select>
                    {errors.role && (
                      <span className="invalid">{errors.role}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="col mb-3 align-items-start">
                {/*<div className="">
                <label for="exampleFormControlInput1" className="form-label">  Phone Number:</label>
                <input name="phone" type="" className="form-control vessel-voyage" id="exampleFormControlInput1" placeholder="" onChange={handleChange}
                  value={formData.phone}></input>
              </div>*/}
              </div>
            </div>

            <div className="btnuser">
              <button className="btn btna submit-button btnfsize">
                {" "}
                Submit{" "}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {openPopUp && <PopUp message={message} closePopup={fetchusersList} />}
    </>
  );
};

export default AddUser;
