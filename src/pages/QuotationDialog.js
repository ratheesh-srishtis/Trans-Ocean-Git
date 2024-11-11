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
import {
  getSubcharges,
  getCharges,
  editChargeQuotation,
  addPDACharges,
} from "../services/apiService";
import PopUp from "./PopUp";

const QuotationDialog = ({
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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <div className="d-flex justify-content-between">
          <DialogTitle>Send Quotation</DialogTitle>
          <div className="closeicon" onClick={onClose}>
            <i class="bi bi-x-lg "></i>
          </div>
        </div>

        <DialogContent>
          <div class="Anchoragecall">
            <div class="toaddress ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        To Address:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ccbcc ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Cc:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Bcc:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="ccbcc ">
              <div class="row align-items-start">
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Subject:
                      </label>
                      <input
                        type="email"
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Upload Attachments:
                      </label>
                      <input
                        class="form-control vessel-voyage"
                        id="exampleFormControlInput1"
                        placeholder=" "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row ">
              <div class="col">
                <div class="mb-3">
                  <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">
                      EmailBody:
                    </label>
                    <textarea
                      rows="3"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="I am writing to seek your approval for the Quotation. Please find attached a copy of the signed quotation for your records. Once approved, we will proceed with the Quotation as per our standard procedures. Thank you for your prompt attention to this matter."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="mb-3">
                <div class="col">
                  <label for="exampleFormControlInput1" class="form-label">
                    Attachments:
                  </label>
                  <div class="rectangle-quotation">
                    <div class="invoice">Quotation PDF</div>
                    <div class="Attach">
                      <i class="bi bi-file-earmark-fill"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="firstfooter d-flex justify-content-end">
              <button type="button" class="btn add-button">
                OK
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
    </>
  );
};

export default QuotationDialog;
