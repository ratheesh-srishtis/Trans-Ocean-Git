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
const[voucher,setVoucherNumber]=useState("");
const[through,setThrough]=useState("");
const[amount,setAmount]=useState("");
const[particulars,setParticulars]=useState("");
const[accountof,setAccountof]=useState("");
const[dateofPay,setDateofPay]=useState("");
useEffect(() => {
    if (getvoucher) {
        setVoucherNumber(getvoucher.voucher);
        setThrough(getvoucher.through); 
        setAmount(getvoucher.amount); 
        setParticulars(getvoucher.voucherParticulers); 
        setAccountof(getvoucher.accountof);  
        setDateofPay(getvoucher.dateofPay);
      
    } 
  }, [getvoucher]);
const numberToWords = (num) => {
    const singleDigits = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const twoDigits = ['', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tensMultiple = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const thousands = ['Thousand', 'Million', 'Billion', 'Trillion'];
  
    if (num === 0) return singleDigits[0];
  
    let word = '';
    if (Math.floor(num / 1000) > 0) {
      word += singleDigits[Math.floor(num / 1000)] + ' Thousand ';
      num %= 1000;
    }
    if (Math.floor(num / 100) > 0) {
      word += singleDigits[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }
    if (num > 0) {
      if (num < 20) {
        word += (num < 10) ? singleDigits[num] : twoDigits[num % 10];
      } else {
        word += tensMultiple[Math.floor(num / 10)];
        if ((num % 10) > 0) {
          word += ' ' + singleDigits[num % 10];
        }
      }
    }
    return word.trim();
  };
  
  

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
            Petty
        </div>
        <div className="voucherdateandnumber">
            <div>
                No:{voucher}
            </div>
            <div>
                Date:{dateofPay}
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
                    {particulars}
                    </td>
                    <td className="voucheramountrate">
                        {amount}
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
                       {through}
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
                       {accountof}
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
                    {numberToWords(amount)} Only
                    </td>
                    <td className="voucheramountrate">
                       OMR {amount}
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
