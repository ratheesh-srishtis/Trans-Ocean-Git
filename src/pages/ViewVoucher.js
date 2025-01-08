// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PopUp from "./PopUp";

const ViewVoucher = ({ open,onClose,getvoucher}) => {
 
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
                      <DialogTitle>View Voucher</DialogTitle>
                      <div className="closeicon">
                        <i className="bi bi-x-lg "></i>
                      </div>
                    </div>
                    <DialogContent style={{ marginBottom: "40px" }}>
                             
                            </DialogContent>
           </Dialog>
           
    </>
  );
};

export default ViewVoucher;
