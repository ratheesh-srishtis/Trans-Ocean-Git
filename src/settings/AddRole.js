import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  getAllPermissions,
  saveUserRole,
  editUserRole,
} from "../services/apiService";
import PopUp from "../pages/PopUp";
const AddRole = ({ open, onAddRole, onClose, editMode, roleSet }) => {
  const [PermissionList, setPermissionList] = useState([]);
  const [formData, setFormData] = useState({
    role: "",
    designation: "",
    permissions: [],
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);

  useEffect(() => {
    fetchAllPermissions();
  }, []);

  useEffect(() => {
    if (editMode && roleSet) {
      setFormData({
        role: roleSet.roleType,
        designation: roleSet.role,
        permissions: roleSet.permissions || [],
        roleId: roleSet._id,
      });
    } else {
      setFormData({
        role: "",
        designation: "",
        permissions: [],
      });
    }
  }, [editMode, roleSet]);

  const fetchAllPermissions = async () => {
    try {
      const listallpermisssions = await getAllPermissions();
      setPermissionList(listallpermisssions?.permissions || []);
    } catch (error) {
      console.error("Failed to fetch permissions", error);
    }
  };
  const fetchrolesList = async () => {
    setOpenPopUp(false);
    onAddRole();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (id) => (event) => {
    const { checked } = event.target;
    setFormData((prevData) => {
      const newPermissions = checked
        ? [...prevData.permissions, id]
        : prevData.permissions.filter((permId) => permId !== id);

      return { ...prevData, permissions: newPermissions };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.role) newErrors.roleType = "Role Type is required";
    if (!formData.designation)
      newErrors.designation = "Designation is required";
    if (formData.permissions.length === 0)
      newErrors.permissions = "At least one permission must be selected";

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
        response = await editUserRole(formData);
      } else {
        // Add new role
        console.log("Add mode formData:", formData);
        response = await saveUserRole(formData);
      }

      if (response.status === true) {
        setMessage(response.message);
        setOpenPopUp(true);
      }

      setFormData({ role: "", designation: "", permissions: [] });
      onAddRole(formData);
      onClose();
    } catch (error) {
      setMessage("API Failed");
      setOpenPopUp(true);
      console.error("Error saving/updating role", error);
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
          <DialogTitle>{editMode ? "Edit Role" : "Add Role"}</DialogTitle>
          <div className="closeicon">
            <i className="bi bi-x-lg "></i>
          </div>
        </div>
        <DialogContent style={{ marginBottom: "40px" }}>
          <form onSubmit={handleSubmit}>
            <div className="typesofcall-row ">
              <div className="row mb-3 align-items-start">
                <div className="col-4">
                  <label for="exampleFormControlInput1" className="form-label">
                    Role Type <span className="required"> * </span>:
                  </label>
                  <div className="vessel-select">
                    <select
                      name="role"
                      className="form-select vesselbox"
                      aria-label="Default select example"
                      onChange={handleChange}
                      value={formData.role}
                    >
                      <option value="">Choose Role Type</option>
                      <option value="hr">HR</option>
                      <option value="admin">Admin</option>
                      <option value="finance">Finance</option>
                      <option value="operations">Operations</option>
                    </select>
                    {errors.role && (
                      <span className="invalid">{errors.role}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-3 align-items-start">
              <div className="col-4">
                <label for="exampleFormControlInput1" className="form-label">
                  Role:
                </label>
                <input
                  name="designation"
                  type="text"
                  className="form-control vessel-voyage"
                  id="exampleFormControlInput1"
                  placeholder=""
                  onChange={handleChange}
                  value={formData.designation}
                />
                {errors.designation && (
                  <span className="invalid">{errors.designation}</span>
                )}
              </div>
            </div>
            <div className="choosepermi">Choose Permissions</div>
            <div className="permissionlist gap-5">
              <div>
                {PermissionList.map((perm) => (
                  <div key={perm._id}>
                    <input
                      type="checkbox"
                      className="checkboxrole"
                      name="permissions[]"
                      checked={formData.permissions.includes(perm._id)}
                      value={perm._id}
                      onChange={handleCheckboxChange(perm._id)}
                    />
                    <label for="" className="permissionfont">
                      {" "}
                      {perm.permission}
                    </label>
                  </div>
                ))}

                {errors.permissions && (
                  <span className="invalid">{errors.permissions}</span>
                )}
              </div>
            </div>
            <div className="btnrole">
              <button type="submit" className="btn btna submit-button btnfsize">
                Submit
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {openPopUp && <PopUp message={message} closePopup={fetchrolesList} />}
    </>
  );
};

export default AddRole;
