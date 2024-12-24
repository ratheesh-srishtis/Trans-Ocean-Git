// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/jobreport.css";
import PopUp from "../PopUp";
import { getJobReport } from "../../services/apiService";
import Loader from "../Loader";
import JobReportTable from "./JobReportTable";
import Select from "react-select";

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

  useEffect(() => {
    fetchJobReport();
  }, []);
  useEffect(() => {
    console.log(reportList, "reportList");
    console.log(reportTableList, "reportTableList");
  }, [reportList, reportTableList]);

  const [selectedMonth, setSelectedMonth] = useState("12"); // Default to December

  // Array of months
  const months = [
    { name: "January", value: "1" },
    { name: "February", value: "2" },
    { name: "March", value: "3" },
    { name: "April", value: "4" },
    { name: "May", value: "5" },
    { name: "June", value: "6" },
    { name: "July", value: "7" },
    { name: "August", value: "8" },
    { name: "September", value: "9" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  // Handle month selection
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
    fetchJobReport();
  };

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Generate an array of years (e.g., 2000 to 2030)
  const startYear = 2000;
  const endYear = 2030;
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => startYear + index
  );

  // Handle selection change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
    fetchJobReport();
  };

  const [filterType, setFilterType] = useState("month"); // Default to "monthly"

  // Handle filter type selection change
  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [jobsList, setJobsList] = useState([]); // Array of selected job _ids

  // Transform job options for react-select
  const selectOptions = selectedJobs.map((job) => ({
    value: job._id,
    label: job.serviceName,
  }));

  // Handle changes in selection
  const handleSelectChange = (selectedOptions) => {
    // Extract _id (value) as strings
    const selectedIds = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : [];
    setJobsList(selectedIds); // Update jobsList state
  };

  const fetchJobReport = async () => {
    setIsLoading(true);
    let payload = {
      filter: filterType,
      month: selectedMonth,
      year: String(selectedYear),
      jobs: jobsList,
    };
    try {
      const reportResponse = await getJobReport(payload);
      console.log(reportResponse, "reportResponse");
      setSelectedJobs(reportResponse?.jobs);
      setReportList(reportResponse);
      setReportTableList(reportResponse?.pda);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(selectedJobs, "selectedJobs");
  }, [selectedJobs]);

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
              type="text"
              className="form-control totalnoinputb"
              id="inputPassword"
              value={reportList?.totalVessels}
              readOnly
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Total No.of Services :
            </label>
            <input
              type="text"
              className="form-control totalnoinputa"
              id="inputPassword"
              value={reportList?.totalServices}
              readOnly
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              {" "}
              No.of Tanker Vessels :
            </label>
            <input
              type="text"
              className="form-control totalnoinput"
              id="inputPassword"
              value={reportList?.totalTankerVessels}
              readOnly
            ></input>
          </div>

          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              {" "}
              No.of Bulk Vessels :
            </label>
            <input
              type="text"
              className="form-control totalnoinput"
              id="inputPassword"
              value={reportList?.totalTankerVessels}
              readOnly
            ></input>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Other Client Vessels :
            </label>
            <input
              type="text"
              className="form-control totalnoinput"
              id="inputPassword"
              value={
                reportList?.totalVessels -
                (reportList?.totalTankerVessels + reportList?.totalBulkVessels)
              }
              readOnly
            ></input>
          </div>

          {/* <div className="col-3 totalno">
            <label for="inputPassword" className=" form-label">
              Job Used in Each Port :
            </label>
            <input
              type="text"
              className="form-control totalnoinput"
              id="inputPassword"
            ></input>
          </div> */}
        </div>
        <div className="bbn"> </div>
        {/* <div className="row mt-4">
          <div className="col-2">
            <div className="jobfilter">
              <div>Filter By:</div>
              <div>
                <select
                  className="form-select "
                  aria-label="Filter select"
                  value={filterType} // Bind selected value
                  onChange={handleFilterTypeChange} // Update state on change
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
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
                  aria-label="Select Month"
                  value={selectedMonth}
                  onChange={handleChange} // Update state on change
                >

                  <option value="month">January</option>
                  <option value="month">February</option>
                  <option value="month">March</option>
                  <option value="month">April</option>
                  <option value="month">May</option>
                  <option value="month">June</option>
                  <option value="month">July</option>


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

                >

                  <option value="month"> 2000   </option>

                </select>
              </div>
            </div>
          </div>




        </div> */}
        <div className="row mt-3">

          <div className="col-1">
            <button type="button"
            className="btn btn-info filbtn" onClick={() => fetchJobReport()}>Filter</button>
          </div>
        </div>
        <div className="charge mt-2">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="createtable mt-4">
          <JobReportTable reportTableList={reportTableList} ports={ports} />
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
