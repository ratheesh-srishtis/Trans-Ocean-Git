import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/finalreport.css";
import SendReport from "./SendReport";
import PopUp from "../PopUp";
import FinalReportDialog from "./FinalReportDialog";
import QQDialog from "./QQDialog";
const FinalReport = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  employees,
  templates,
  vendors,
}) => {
  const Group = require("../../assets/images/jobreport.png");
  const navigate = useNavigate();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
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

  const [finalDialogOpen, setFinalDialogOpen] = useState(false);

  const openFinalDialog = () => {
    handleFinalDialogClickOpen();
  };

  const handleFinalDialogClickOpen = () => {
    setFinalDialogOpen(true);
  };

  const handleFinalDialogueClose = () => {
    setFinalDialogOpen(false);
  };

  const [QQDialogOpen, setQQDialogOpen] = useState(false);

  const openQQDialog = () => {
    handleQQClickOpen();
  };

  const handleQQClickOpen = () => {
    setQQDialogOpen(true);
  };

  const handleQQDialogueClose = () => {
    setQQDialogOpen(false);
  };

  return (
    <>
      <div className="">
        <div className="charge mt-4">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="p-3">
          <table className="tabmain">
            <thead>
              <tr>
                <th className="tabhead">SL NO.</th>
                <th className="tabhead">DESCRIPTION</th>
                <th className="tabhead">DATE & TIME</th>
                <th className="tabhead">SERVICE ACTIVITIES</th>
                <th className="tabhead">QUANTITY </th>
                <th className="tabhead">REMARKS </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="tdstylwidt">1</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">2</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">3</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">4</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">5</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
              <tr>
                <td className="tdstylwidt">6</td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
                <td className="tdstyl">
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder=""
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="attach">Attach Documents :</div>
          <div className="d-flex justify-content-between pdf">
            <div>Attach PDFs</div>
            <div>
              <i class="bi bi-file-earmark-pdf"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="buttons-wrapper">
        <div class="left">
          <button
            class="btn btna submit-button btnfsize"
            onClick={() => {
              openFinalDialog();
            }}
          >
            Generate Report
          </button>
        </div>
        <div class="right d-flex">
          <button
            class="btn btna submit-button btnfsize"
            onClick={() => {
              openDialog();
            }}
          >
            Send Report
          </button>
          <button
            class="btn btna submit-button btnfsize"
            onClick={() => {
              openQQDialog();
            }}
          >
            QQ Form
          </button>
        </div>
      </div>

      <SendReport open={open} onClose={handleClose} />
      <FinalReportDialog
        open={finalDialogOpen}
        onClose={handleFinalDialogueClose}
      />
      <QQDialog open={QQDialogOpen} onClose={handleQQDialogueClose} />
    </>
  );
};

export default FinalReport;
