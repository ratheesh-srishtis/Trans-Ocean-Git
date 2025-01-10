// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import PopUp from "./PopUp";
import "../css/viewvoucher.css";

const mail = require("../assets/images/mail.png");
const location = require("../assets/images/location.png");
const phone = require("../assets/images/call.png");
const fax = require("../assets/images/fax-free-4_svgrepo.com.png");
const landline = require("../assets/images/landline-f_svgrepo.com.png");
const web = require("../assets/images/web.png");
const logo = require("../assets/images/TRANSocean-LOGO.png");
const arablogo = require("../assets/images/image 13.png");
const rectangle = require("../assets/images/4.jpg");
const rectanglesub = require("../assets/images/5.jpg");
const ViewVoucher = ({ open, onClose, getvoucher }) => {

  return (
    <>
      <Dialog
        sx={{
          width: 1000,
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

        <div className="">
    <table className="vouchertablebody">
        <thead>
            <tr>
                <th colspan="6"
                    className=" voucherth">
                  <img className="voucherimg" src={logo}></img>
                  <img className="voucherimgone" src={arablogo}></img>
                </th>


            </tr>

        </thead>
    </table>
    <div className="voucherpadding">
        <div className="headvoucher">
            VOUCHER
        </div>
        <div className="voucherdateandnumber">
            <div>
                No:973
            </div>
            <div>
                Date:09/01/2025
            </div>
        </div>
        <table>
            <thead>
                <tr>

                    <th className="voucherpart">
                        Particulars</th>
                    <th className="voucherpartone">
                    </th>

                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="voucherpartthree">

                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucheraccount">
                        Account:
                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherprinting">
                        PRINTING & STATIONERY
                    </td>
                    <td className="voucheramountrate">
                        261.025
                    </td>
                </tr>
                <tr>
                    <td className="voucherpartthree">
                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherpartthree">

                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherpartthree">

                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherpartthree">

                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>

                <tr>
                    <td className="voucheraccount">
                        Through:
                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherprinting">
                        ATHIL PETTY_JUNE 30
                    </td>
                    <td className="voucherpartfour">
                          
                    </td>
                </tr>
                <tr>
                    <td className="voucheraccount">
                        On Account of:
                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherprinting">
                        CASH PAID FOR TONERS
                    </td>
                    <td className="voucherpartfour">
                        
                    </td>
                </tr>
                <tr>
                    <td className="voucheraccount">
                        Amount(in words):
                    </td>
                    <td className="voucherpartfour">

                    </td>
                </tr>
                <tr>
                    <td className="voucherprinting">
                        Omani Riyal Two Hundred fourty one and eighty baisa only
                    </td>
                    <td className="voucheramountrate">
                       OMR 241.080
                    </td>
                </tr>
            </tbody>
        </table>
    </div>



    <div className=" paddv  ">
        <img className="locationvoucher" src={location}></img>
        <span className="locvoucher">2nd Floor, B Block, Port City Business Park P.O Box:186, PC-322,
            Sohar Industrial Port Area, Sohar, Sultanate of Oman </span>
        <div className="voucherflex">
            <div>
                
                <img className="locationvoucher" src={phone}></img>
                <span className="locvoucher">+968 91918073, +968 91918045, +968 9198064</span>
            </div>
            <div className="d-flex">
                <div>
                    <img className="locationvoucher" src={fax}></img>
                    <span className="locvoucher">+968 26949863</span>
                </div>
                <div>
                    <img className="landvoucher" src={landline}></img>
                    <span className="locvoucher">+968 26949863</span>
                </div>
            </div>
        </div>
        <div>
            <div>
                
                <img className="mailvoucher" src={mail}></img>
                <span className="locvoucher">Ops.manager@transocean-maritime.com,
                    operations@transocean-maritime.com</span>





            </div>
            <div>
                <img className="webvoucher" src={web}></img>
                <span className="locvoucher">www.transocean-maritime.com</span>
            </div>
        </div>

    </div>
    <div className="voucherflexone">
        <div>
           
            <img className="imgvouchimg" src={rectangle}></img>
        </div>
        <div>
            
            <img className="imgvouchimg" src={rectanglesub}></img>
        </div>
    </div>

</div>




        </DialogContent>
      </Dialog>

    </>
  );
};

export default ViewVoucher;
