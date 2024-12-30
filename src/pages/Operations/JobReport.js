// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/jobreport.css";
import PopUp from "../PopUp";
import { getJobReport } from "../../services/apiService";
import Loader from "../Loader";
import JobReportTable from "./JobReportTable";
import Select from "react-select";
import Multiselect from "multiselect-react-dropdown";
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

  const customStyles = {
    multiselectContainer: {
      // Optional: Style for the container if needed
    },
    option: {
      fontSize: "0.7rem", // Set font size for dropdown options
      padding: "5px 10px", // Optional: Add padding for better spacing
      cursor: "pointer", // Ensure options look clickable
    },
    optionContainer: {
      // Optional: Customize the option container (dropdown menu)
    },
  };

  const hoverStyles = {
    backgroundColor: "#eee !important", // Apply the background color on hover
  };

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

  const [selectedIds, setSelectedIds] = useState([]);

  const handleSelect = (selectedList) => {
    const ids = selectedList.map((item) => item._id); // Extract the selected _id values
    setSelectedIds(ids);
    console.log("Selected IDs:", ids); // Log the selected IDs
  };

  const handleRemove = (selectedList) => {
    const ids = selectedList.map((item) => item._id); // Extract the selected _id values
    setSelectedIds(ids);
    console.log("Updated Selected IDs:", ids); // Log the updated IDs
  };

  const [isClicked, setIsClicked] = useState(false);

  const filterbyJobs = () => {
    setIsClicked(true); // Notify the child of the click
  };

  const resetClick = () => {
    setIsClicked(false); // Reset the state (optional)
  };

  useEffect(() => {
    console.log(selectedJobs, "selectedJobs");
    console.log(selectedIds, "selectedIds");
  }, [selectedJobs, selectedIds]);

  useEffect(() => {
    fetchJobReport();
  }, []);

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
        </div>
        <div className="bbn"> </div>
        <div className="row mt-3">
          <div className="col-11 totalno ">
            <label for="inputPassword" className=" form-label jobused">
              {" "}
              Jobs used in each port :
            </label>
            <Multiselect
              options={selectedJobs}
              displayValue="serviceName" // Display the serviceName in the dropdown
              showCheckbox
              onSelect={handleSelect} // Triggered when an item is selected
              onRemove={handleRemove} // Triggered when an item is removed
              className="custom-multiselect" // Apply custom class
              style={{
                ...customStyles,
                option: {
                  ...customStyles.option,
                  ":hover": hoverStyles, // Add hover styling
                },
              }}
            />
          </div>

          <div className="col-1">
            <button
              type="button"
              className="btn btn-info filbtn"
              onClick={() => filterbyJobs()}
            >
              Filter
            </button>
          </div>
        </div>
        <div className="charge mt-2">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
        <div className="createtable mt-4">
          <JobReportTable
            ports={ports}
            isClicked={isClicked}
            onReset={resetClick}
            selectedIds={selectedIds}
          />
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
