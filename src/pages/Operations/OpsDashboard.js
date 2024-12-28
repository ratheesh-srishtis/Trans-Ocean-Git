import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ops-dashboard.css";
import { getAllJobs, deleteQuotation } from "../../services/apiService";
import Loader from "../Loader";
import Swal from "sweetalert2";
import PopUp from "../PopUp";
const OpsDashboard = () => {
  const Group = require("../../assets/images/hugeicons_new-job.png");
  const [jobsList, setJobsList] = useState([]); // Loader state
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("all");
  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const fetchAllJObs = async (type, status, searchValue) => {
    setSelectedTab(type);
    try {
      setIsLoading(true);
      let userData = {
        filter: type, // Always include the filter
        statusFilter: status, // Include statusFilter if selectedStatus has a value
        searchKey: searchValue, // Include searchKey if searchTerm has a value
      };
      const quotations = await getAllJobs(userData);
      console.log("Quotations:", quotations);
      setJobsList(quotations?.pda || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setStatusList([
      { label: "All", value: "all" },
      { label: "Customer Approved", value: 5 },
      { label: "Pending From Operations", value: 6 },
      { label: "Operations Completed", value: 7 },
    ]);
  }, []);
  useEffect(() => {
    fetchAllJObs("all", selectedStatus, searchTerm);
  }, []);

  useEffect(() => {
    console.log(jobsList, "jobsList");
  }, [jobsList]);

  const handleEditJob = (row) => {
    navigate("/edit-operation", { state: { row } });
  };

  const handleJobClick = (row) => {
    navigate("/view-operation", { state: { row } });
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "status":
        setSelectedStatus(value);
        fetchAllJObs(selectedTab, value, searchTerm); // Call fetchAllJobs with the updated status
        break;
      default:
        break;
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    fetchAllJObs(selectedTab, selectedStatus, value);
  };

  const handleDelete = async (item) => {
    console.log(item, "item handleDelete");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (item?._id) {
          try {
            let payload = {
              pdaId: item?._id,
            };
            const response = await deleteQuotation(payload);
            console.log("Fetched Charges:", response);
            setMessage("Quotation has been successfully deleted");
            setOpenPopUp(true);
            fetchAllJObs("all");
          } catch (error) {
            console.error("Error fetching charges:", error);
            Swal.fire("Error deleting quotation");
            fetchAllJObs("all");
          }
        }
      }
    });
  };

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <div className="leftside d-flex">
          <ul className="nav nav-underline gap-3 ">
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontent ${
                  selectedTab === "all" ? "active-nav-style" : ""
                }`}
                aria-current="page"
                onClick={() => fetchAllJObs("all", selectedStatus, searchTerm)}
              >
                All
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className={`nav-link carduppercontent ${
                  selectedTab === "day" ? "active-nav-style" : ""
                }`}
                onClick={() => fetchAllJObs("day", selectedStatus, searchTerm)}
              >
                Last 24 Hour
              </a>
            </li>
          </ul>
        </div>

        <div className="d-flex gap-2 rightside">
          <div className=" searchmain">
            <input
              type="text"
              className="form-control search"
              id="exampleFormControlInput1"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <i className="bi bi-search searchicon"></i>
          </div>
          <div className=" filtermainjobs ">
            <i className="bi bi-funnel-fill filtericon"></i>
            <select
              className="form-select form-select-sm filter opsstatus"
              aria-label="Small select example"
              name="status"
              onChange={handleSelectChange}
              value={selectedStatus}
            >
              <option value="">Select Status</option>
              {statusList.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="firsttile">
        <div className="row  gap-5 d-flex justify-content-center ">
          {jobsList && jobsList?.length > 0 && (
            <>
              {jobsList?.length > 0 &&
                jobsList?.map((job, index) => {
                  return (
                    <>
                      <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div className="d-flex justify-content-between">
                          <div>
                            <img src={Group}></img>
                          </div>
                          <div
                            className={`dashstatus ${
                              job?.pdaStatus === 5
                                ? "customer-approved"
                                : job?.pdaStatus === 6
                                ? "pending"
                                : job?.pdaStatus === 7
                                ? "Operations"
                                : ""
                            }`}
                          >
                            {job?.pdaStatus == 5
                              ? "Customer Approved"
                              : job?.pdaStatus == 6
                              ? "Pending from operations"
                              : job?.pdaStatus == 7
                              ? "Operations Completed"
                              : ""}
                          </div>
                        </div>
                        {job?.jobId && (
                          <>
                            <div>
                              <span className="dashhead"> Job ID:</span>
                              <p className="toms">{job?.jobId}</p>
                            </div>
                          </>
                        )}

                        <div>
                          <span className="dashhead"> Port Name:</span>
                          <p className="toms">{job?.portId?.portName}</p>
                        </div>
                        <div>
                          <span className="dashhead"> Vessel Name:</span>
                          <p className="toms">{job?.vesselId?.vesselName}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <div
                            className="viewdetail"
                            onClick={() => handleJobClick(job)}
                          >
                            View Detail >>>
                          </div>
                          <div className="d-flex">
                            <i
                              className="bi bi-pencil-square dashedit"
                              onClick={() => handleEditJob(job)}
                            ></i>
                            {/* <i
                              className="bi bi-trash-fill dashdelete"
                              onClick={() => handleDelete(job)}
                            ></i> */}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          )}
          {jobsList?.length == 0 && (
            <>
              <p>Currently, there are no available jobs</p>{" "}
            </>
          )}
          {/* <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img src={Group}></img>
              </div>
              <div className="pending">Pending From Operations</div>
            </div>
            <div>
              <span className="dashhead"> Job ID:</span>
              <p className="toms">TOMS/OM/24/123</p>
            </div>
            <div>
              <span className="dashhead"> Port Name:</span>
              <p className="toms">Sohar Port</p>
            </div>
            <div>
              <span className="dashhead"> Vessel Name:</span>
              <p className="toms">MV Viva Globus</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i className="bi bi-pencil-square dashedit"></i>
                <i className="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img src={Group}></img>
              </div>
              <div className="Operations">Operations Completed</div>
            </div>
            <div>
              <span className="dashhead"> Job ID:</span>
              <p className="toms">TOMS/OM/24/123</p>
            </div>
            <div>
              <span className="dashhead"> Port Name:</span>
              <p className="toms">Sohar Port</p>
            </div>
            <div>
              <span className="dashhead"> Vessel Name:</span>
              <p className="toms">MV Viva Globus</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i className="bi bi-pencil-square dashedit"></i>
                <i className="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="row  gap-5 d-flex justify-content-center ">
          <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img src={Group}></img>
              </div>
              <div className="dashstatus">Customer Approved</div>
            </div>
            <div>
              <span className="dashhead"> Job ID:</span>
              <p className="toms">TOMS/OM/24/123</p>
            </div>
            <div>
              <span className="dashhead"> Port Name:</span>
              <p className="toms">Sohar Port</p>
            </div>
            <div>
              <span className="dashhead"> Vessel Name:</span>
              <p className="toms">MV Viva Globus</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i className="bi bi-pencil-square dashedit"></i>
                <i className="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img src={Group}></img>
              </div>
              <div className="pending">Pending From Operations</div>
            </div>
            <div>
              <span className="dashhead"> Job ID:</span>
              <p className="toms">TOMS/OM/24/123</p>
            </div>
            <div>
              <span className="dashhead"> Port Name:</span>
              <p className="toms">Sohar Port</p>
            </div>
            <div>
              <span className="dashhead"> Vessel Name:</span>
              <p className="toms">MV Viva Globus</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i className="bi bi-pencil-square dashedit"></i>
                <i className="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div className=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div className="d-flex justify-content-between">
              <div>
                <img src={Group}></img>
              </div>
              <div className="Operations">Operations Completed</div>
            </div>
            <div>
              <span className="dashhead"> Job ID:</span>
              <p className="toms">TOMS/OM/24/123</p>
            </div>
            <div>
              <span className="dashhead"> Port Name:</span>
              <p className="toms">Sohar Port</p>
            </div>
            <div>
              <span className="dashhead"> Vessel Name:</span>
              <p className="toms">MV Viva Globus</p>
            </div>
            <div className="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i className="bi bi-pencil-square dashedit"></i>
                <i className="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Loader isLoading={isLoading} />
      {openPopUp && (
        <PopUp message={message} closePopup={() => setOpenPopUp(false)} />
      )}
    </>
  );
};

export default OpsDashboard;
