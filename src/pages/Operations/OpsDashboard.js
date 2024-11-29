import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ops-dashboard.css";
import { getAllJobs } from "../../services/apiService";
import Loader from "../Loader";
const OpsDashboard = () => {
  const Group = require("../../assets/images/hugeicons_new-job.png");
  const [isLoading, setIsLoading] = useState(false); // Loader state
  const [jobsList, setJobsList] = useState([]); // Loader state
  const navigate = useNavigate();

  const fetchAllJObs = async (type) => {
    try {
      setIsLoading(true);
      let userData = {
        filter: type,
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
    fetchAllJObs("all");
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

  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <div className="leftside d-flex">
          <ul className="nav nav-underline gap-3 ">
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontent"
                aria-current="page"
                onClick={() => fetchAllJObs("all")}
              >
                All
              </a>
            </li>
            <li className="nav-item nav-item-filter">
              <a
                className="nav-link carduppercontent"
                onClick={() => fetchAllJObs("day")}
              >
                Last 24 Hour
              </a>
            </li>
          </ul>
        </div>

        <div class="d-flex gap-2 rightside">
          <div class=" searchmain">
            <input
              type="email"
              className="form-control searchops"
              id="exampleFormControlInput1"
              placeholder="Search"
            />
            <i className="bi bi-search searchicon"></i>
          </div>
          <div class=" filtermainjobs ">
            <i class="bi bi-funnel-fill filtericon"></i>
            <select
              class="form-select form-select-sm filter"
              aria-label="Small select example"
              name="status"
            >
              <option value="">Filter By Status</option>
              <option value="">Customer Approved</option>
              <option value="">Pending From OPS</option>
              <option value="">Operations Completed</option>
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
                      <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
                        <div class="d-flex justify-content-between">
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
                        <div>
                          <span className="dashhead"> Job ID:</span>
                          <p className="toms">{job?.jobId}</p>
                        </div>
                        <div>
                          <span className="dashhead"> Port Name:</span>
                          <p className="toms">{job?.portId?.portName}</p>
                        </div>
                        <div>
                          <span className="dashhead"> Vessel Name:</span>
                          <p className="toms">{job?.vesselId?.vesselName}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                          <div
                            className="viewdetail"
                            onClick={() => handleJobClick(job)}
                          >
                            View Detail >>>
                          </div>
                          <div className="d-flex">
                            <i
                              class="bi bi-pencil-square dashedit"
                              onClick={() => handleEditJob(job)}
                            ></i>
                            <i class="bi bi-trash-fill dashdelete"></i>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </>
          )}

          {/* <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="d-flex justify-content-between">
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
            <div class="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i class="bi bi-pencil-square dashedit"></i>
                <i class="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="d-flex justify-content-between">
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
            <div class="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i class="bi bi-pencil-square dashedit"></i>
                <i class="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div> */}
        </div>
        {/* <div className="row  gap-5 d-flex justify-content-center ">
          <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="d-flex justify-content-between">
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
            <div class="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i class="bi bi-pencil-square dashedit"></i>
                <i class="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="d-flex justify-content-between">
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
            <div class="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i class="bi bi-pencil-square dashedit"></i>
                <i class="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
          <div class=" col-3 shadow p-3 mb-5 bg-body-tertiary rounded">
            <div class="d-flex justify-content-between">
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
            <div class="d-flex justify-content-between">
              <div className="viewdetail">View Detail >>></div>
              <div className="d-flex">
                <i class="bi bi-pencil-square dashedit"></i>
                <i class="bi bi-trash-fill dashdelete"></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <Loader isLoading={isLoading} />
    </>
  );
};

export default OpsDashboard;
