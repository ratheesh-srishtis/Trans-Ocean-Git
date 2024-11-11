// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import "../css/addcharges.css";
import "../css/editcharges.css";
import "../css/sendquotation.css";
import "../css/generatepda.css";
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
} from "../services/apiService";

import PopUp from "./PopUp";

const PdaDialog = ({
  open,
  onClose,
  onSubmit,
  selectedVessel,
  selectedPort,
  selectedCargo,
  selectedVesselType,
  selectedCustomer,
  eta,
  etd,
  status,
  formData,
  services,
  customers,
  ports,
  isEditcharge,
  editCharge,
  editIndex,
  pdaResponse,
}) => {
  console.log(services, "services");
  console.log(pdaResponse, "pdaResponse_dialog");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const uploadIcon = require("../assets/images/uploadIcon.png");
  const imageType = require("../assets/images/imageType.png");
  const elipsis = require("../assets/images/elipsis.png");
  const greenTickCircle = require("../assets/images/small-green-tick.png");
  const image_1 = require("../assets/images/2.jpg");
  const image_2 = require("../assets/images/3.jpg");
  const image_3 = require("../assets/images/4.jpg");
  const image_4 = require("../assets/images/5.jpg");
  const image_5 = require("../assets/images/11.jpg");

  const [profileFile, setProfileFile] = useState(null);

  const handleProfileDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);

    uploadProfile(droppedFiles[0]);
  };

  const handleProfileDragOver = (e) => {
    e.preventDefault();
  };

  const profileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!file.type.startsWith("image/")) {
        setMessage("You can only upload images");
        setOpenPopUp(true);
        setTimeout(function () {
          setOpenPopUp(false);
        }, 1000);
        return;
      }

      uploadProfile(file);
    }
  };

  const uploadProfile = async (fileData) => {
    // const params = new FormData();
    // params.append("file", fileData);
    // params.append("fileName", fileData.name);
    // params.append("fileType", getFileType(fileData.type));
    // await Axios.post(API.uploadFile, params, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    //   .then((resData) => {
    //     setMessage(resData.data.message);
    //     let fileObj = {
    //       id: resData.data.data.fileId,
    //       title: fileData.name,
    //       fileData: resData.data.data.filename,
    //       type: resData?.data?.data?.filetype,
    //     };
    //     setProfileFile(fileObj);
    //     setOpenPopUp(true);
    //     setTimeout(function () {
    //       setOpenPopUp(false);
    //     }, 1000);
    //   })
    //   .catch((err) => {});
  };

  const handleProfileDelete = () => {
    setProfileFile(null);
  };

  const handleView = (imageUrl) => {
    // let viewImage = `${API.userFilePath}${imageUrl?.fileData}`;
    // window.open(viewImage, "_blank");
  };

  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (option) => {
    if (option === "view") {
      window.open("your-image-url", "_blank");
    } else if (option === "delete") {
    }
    setShowOptions(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogContent>
          <div class="header d-flex justify-content-between">
            <img src={image_5} />
            <img src={image_1} />
          </div>

          <div class="row">
            <div class="col-1 rectangle"></div>
            <div class="col-2">
              <div class="invoice">
                Invoice Number<p>1765433</p>
              </div>
              <div class="invoice">
                Amount<p>$2365</p>
              </div>
            </div>
            <div class="col-2">
              <div class="invoice">
                Payment Method <p>Cash</p>
              </div>
              <div class="invoice">
                Date<p>09/11/2024</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-1 rectanglea"></div>
            <div class="col-2">
              <div class="invoice">
                <span class="bill">Bill To</span>
                <p> Norok Shipping Sohar Industrial 971000 Sharjah</p>
              </div>
            </div>
            <div class="col-2">
              <div class="invoice">
                <span class="bill">Billed From</span>
                <p>
                  2nd Floor, B Block, Port City, Business Park,PO BOX:18B,
                  PC-322, OMAN
                </p>
              </div>
            </div>
          </div>

          <div class="table-responsive container">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Marine Charges</td>
                  <td>$20</td>
                  <td>4</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>Port Due 5(Days)</td>
                  <td>$12</td>
                  <td>5</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td class="no_borders_column"></td>
                  <td class="no_borders_column"></td>
                  <td>Subtotal</td>
                  <td>200</td>
                </tr>
                <tr>
                  <td class="no_borders_column"></td>
                  <td class="no_borders_column"></td>
                  <td>Taxes</td>
                  <td>20.5</td>
                </tr>
                <tr>
                  <td class="no_borders_column"></td>
                  <td class="no_borders_column"></td>
                  <td>Total</td>
                  <td>220.5</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            <div class="row mt-4">
              <div class="col-6">
                <div class="terms ">
                  <span class="bill">Terms & Conditions</span>
                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
              <div class="col-6">
                <div class="sub d-flex justify-content-start ">
                  <div class="subicon">
                    <i class="bi bi-envelope-fill"></i>
                  </div>
                  <div class="subtext"> manager@transocean-maritime.com</div>
                </div>
                <div class="sub d-flex justify-content-start  ">
                  <div class="subicon">
                    <i class="bi bi-telephone-fill"></i>
                  </div>
                  <div class="subtext"> +968 26949863 +968 91918073</div>
                </div>
                <div class="sub d-flex justify-content-start  ">
                  <div class="subicon">
                    <i class="bi bi-geo-alt-fill"></i>
                  </div>
                  <div class="subtext">
                    {" "}
                    2nd Floor , B Block, PortCity, Oman
                  </div>
                </div>
                <div class="sub d-flex justify-content-start  ">
                  <div class="subicon">
                    <i class="bi bi-envelope-fill"></i>
                  </div>
                  <div class="subtext"> manager@transocean-maritime.com</div>
                </div>
              </div>
            </div>
          </div>

          <div class="footerlast d-flex justify-content-between">
            <div class="">
              <img class="leftimg" src={image_3} />
            </div>
            <div class="">
              <img class="rightimg" src={image_4} />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {openPopUp && <PopUp message={message} />}
    </>
  );
};

export default PdaDialog;
