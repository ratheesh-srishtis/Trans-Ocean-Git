// ResponsiveDialog.js
import React, { useState, useEffect } from "react";
import "../../css/editOperation.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import BerthReport from "./Templates/BerthReport";
import CrewChangeList from "./Templates/CrewChangeList";
import LoadingReport from "./Templates/LoadingReport";
import OKTBReport from "./Templates/OKTBReport";
const AddJobs = ({ open, onClose, templates }) => {
  console.log(templates, "templates");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isBerthReportOpen, setIsBerthReportOpen] = useState(false);
  const [isCrewChangeListOpen, setIsCrewChangeListOpen] = useState(false);
  const [isLoadingReportOpen, setIsLoadingReportOpen] = useState(false);
  const [isOKTBOpen, setIsOKTBOpen] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  useEffect(() => {
    console.log(selectedTemplate, "selectedTemplate");
  }, [selectedTemplate]);

  const handleOpenTemplate = () => {
    if (selectedTemplate === "6745cbea3b3ccd845065a96c") {
      setIsBerthReportOpen(true);
    } else if (selectedTemplate === "6745cbc83b3ccd845065a922") {
      setIsCrewChangeListOpen(true);
    } else if (selectedTemplate === "6745cbdd3b3ccd845065a955") {
      setIsLoadingReportOpen(true);
    } else if (selectedTemplate === "6745c91e3b3ccd845065a12b") {
      setIsOKTBOpen(true);
    }
  };

  const handleCloseAllDialogs = () => {
    setIsBerthReportOpen(false);
    setIsCrewChangeListOpen(false);
    setIsLoadingReportOpen(false);
    setIsOKTBOpen(false);
  };

  return (
    <>
      <div>
        <Dialog
          sx={{
            width: 800,
            margin: "auto",
            borderRadius: 2,
          }}
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="lg"
        >
          <div className="d-flex justify-content-between " onClick={onClose}>
            <DialogTitle>Edit Job</DialogTitle>
            <div className="closeicon">
              <i className="bi bi-x-lg "></i>
            </div>
          </div>
          <DialogContent style={{ marginBottom: "40px" }}>
            <div class="typesofcall-row ">
              <div class="row mb-3 align-items-start">
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Services <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="vessel"
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option value="">Choose Services </option>
                      <option value="671a62f13b3ccd845029310b">
                        Anchorage Call{" "}
                      </option>
                      <option value="671a63363b3ccd8450293160">
                        CSO Terminal (CARGO){" "}
                      </option>
                      <option value="671a63823b3ccd84502931bf">
                        Husbandry Services{" "}
                      </option>
                      <option value="672b44d13b3ccd84503dde97">
                        Bunker Call{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    Job Name <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="vessel"
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option value="">Choose Job Name </option>
                      <option value="671a62f13b3ccd845029310b">
                        Marine Charges{" "}
                      </option>
                      <option value="671a63363b3ccd8450293160">
                        Others Port Related Charges{" "}
                      </option>
                      <option value="671a63823b3ccd84502931bf">AMNAS </option>
                      <option value="672b44d13b3ccd84503dde97">
                        Husbandry Services{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Sub Job Type <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="vessel"
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option value="">Choose Job Type </option>
                      <option value="671a62f13b3ccd845029310b">
                        Port Charges{" "}
                      </option>
                      <option value="671a63363b3ccd8450293160">
                        Pilot Charges{" "}
                      </option>
                      <option value="671a63823b3ccd84502931bf">
                        Tug Charges{" "}
                      </option>
                      <option value="672b44d13b3ccd84503dde97">
                        Environmental Fee{" "}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="typesofcall-row ">
              <div class="row mb-3 align-items-start">
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Status <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="vessel"
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option value="">Choose Status </option>
                      <option value="671a62f13b3ccd845029310b">Open </option>
                      <option value="671a63363b3ccd8450293160">Closed </option>
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    Vendor Name <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="vessel"
                      class="form-select vesselbox"
                      aria-label="Default select example"
                    >
                      <option value="">Choose Vendor Name</option>
                      <option value="671a62f13b3ccd845029310b">
                        Sohar port{" "}
                      </option>
                      <option value="671a63363b3ccd8450293160">
                        Port of Khalid{" "}
                      </option>
                      <option value="671a63823b3ccd84502931bf">
                        Port of Salalah{" "}
                      </option>
                      <option value="672b44d13b3ccd84503dde97">
                        Port of Shinas{" "}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-4">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Templates <span class="required"> </span> :
                  </label>
                  <div class="vessel-select">
                    <select
                      name="template"
                      className="form-select vesselbox"
                      aria-label="Default select example"
                      value={selectedTemplate}
                      onChange={handleSelectChange}
                    >
                      <option value="">Choose Template</option>
                      {templates.map((template) => (
                        <option key={template._id} value={template._id}>
                          {template.templateName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="typesofcall-row ">
              <div class="row align-items-start">
                <div class="mb-2">
                  <label for="formFile" class="form-label">
                    Documents Upload:
                  </label>
                  <input
                    class="form-control documentsfsize"
                    type="file"
                    id="formFile"
                  ></input>
                </div>
              </div>
            </div>
            <div class=" typesofcall-row">
              <div class="row align-items-start">
                <div class="col-8 ">
                  <div class="mb-3">
                    <div class="col">
                      <label for="exampleFormControlInput1" class="form-label">
                        Remarks:
                      </label>
                      <textarea
                        rows="1"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder=""
                        name="remarks"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="btnjobrole col-4">
                  <button
                    className="btn btna submit-button btnfsize"
                    onClick={handleOpenTemplate}
                    disabled={!selectedTemplate}
                  >
                    Open Template
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 mt-5">
              <div className="footer-button d-flex justify-content-center ">
                <button type="button" className="btn btncancel">
                  Close
                </button>

                <button type="button" className="btn  generate-buttona ">
                  Submit
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {/* Dialog Components */}
      {isBerthReportOpen && (
        <BerthReport open={isBerthReportOpen} onClose={handleCloseAllDialogs} />
      )}
      {isCrewChangeListOpen && (
        <CrewChangeList
          open={isCrewChangeListOpen}
          onClose={handleCloseAllDialogs}
        />
      )}
      {isLoadingReportOpen && (
        <LoadingReport
          open={isLoadingReportOpen}
          onClose={handleCloseAllDialogs}
        />
      )}
      {isOKTBOpen && (
        <OKTBReport open={isOKTBOpen} onClose={handleCloseAllDialogs} />
      )}
    </>
  );
};

export default AddJobs;
