// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/jobreport.css";
import PopUp from "../PopUp";
import { getJobReport } from "../../services/apiService";
import Loader from "../Loader";
import JobReportTable from "./JobReportTable";
const JobReport = ({
  open,
  onClose,
  templates,
  charge,
  services,
  ports,
  customers,

  vendors,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const Group = require("../../assets/images/job sheet.png");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [reportList, setReportList] = useState(null);
  const [reportTableList, setReportTableList] = useState(null);

  const fetchJobReport = async () => {
    setIsLoading(true);
    try {
      const reportResponse = await getJobReport();
      setReportList(reportResponse);
      setReportTableList(reportResponse?.pda);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobReport();
  }, []);
  useEffect(() => {
    console.log(reportList, "reportList");
    console.log(reportTableList, "reportTableList");
  }, [reportList, reportTableList]);

  return (
    <>
      <div className="p-3">
        <div className="summary">SUMMARY</div>
        <div className="bb"> </div>
        <div className="row mt-3">
          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Total No.of Vessels :
            </label>
            <input
              type="password"
              className="form-control totalnoinputb"
              id="inputPassword"
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Total No.of Services :
            </label>
            <input
              type="password"
              className="form-control totalnoinputa"
              id="inputPassword"
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              {" "}
              No.of Tanker Vessels :
            </label>
            <input
              type="password"
              className="form-control totalnoinput"
              id="inputPassword"
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              {" "}
              No.of Bulk Vessels :
            </label>
            <input
              type="password"
              className="form-control totalnoinput"
              id="inputPassword"
            ></input>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Other Client Vessels :
            </label>
            <input
              type="password"
              className="form-control totalnoinput"
              id="inputPassword"
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Job Used in Each Port :
            </label>
            <input
              type="password"
              className="form-control totalnoinput"
              id="inputPassword"
            ></input>
          </div>
        </div>
        <div className="bbn"> </div>
        <div className="row mt-4">
          <div className="col-3">
            <div className="jobfilter">
              <div>Filter By:</div>
              <div>
                <select
                  className="form-select jobporrt"
                  aria-label="Default select example"
                >
                  <option value="2">Monthly</option>
                  <option value="3">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="jobfilter">
              <div>Choose Month:</div>
              <div>
                <select
                  className="form-select jobporrt"
                  aria-label="Default select example"
                >
                  <option value="1">Weekly</option>
                  <option value="2">Monthly</option>
                  <option value="3">Yearly</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="jobfilter">
              <div>Choose Year:</div>
              <div>
                <select
                  className="form-select jobporrt"
                  aria-label="Default select example"
                >
                  <option value="1">Weekly</option>
                  <option value="2">Monthly</option>
                  <option value="3">Yearly</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="charge mt-2">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="createtable mt-4">
          <JobReportTable reportTableList={reportTableList} />
        </div>
      </div>
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}{" "}
      <Loader isLoading={isLoading} />
    </>
  );
};

export default JobReport;
