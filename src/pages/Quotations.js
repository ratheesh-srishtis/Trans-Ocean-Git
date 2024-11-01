import React, { useState, useRef } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const initialData = [
  {
    id: 1,
    jobId: "TOMS/OM/24/123",
    vessel: "Jimei Shunhao",
    date: "09/08/2024",
    port: "Port Of Sultan",
    cargo: "Anthracite Coal",
    preparedBy: "Khalid",
    status: "Draft",
  },
  {
    id: 2,
    jobId: "TOMS/OM/24/456",
    vessel: "MV Toro Bianco",
    date: "09/08/2024",
    port: "Port Of Salalah",
    cargo: "Oil Drums",
    preparedBy: "Ali Jebe",
    status: "Waiting for approval from FM",
  },
  {
    id: 3,
    jobId: "TOMS/OM/24/258",
    vessel: "CSCL Globe",
    date: "09/08/2024",
    port: "Port Of Duqm",
    cargo: "Oil Tanker",
    preparedBy: "Ali Khalid",
    status: "Internally Approved",
  },
  {
    id: 4,
    jobId: "TOMS/OM/24/789",
    vessel: "MV Viva Globus",
    date: "09/08/2024",
    port: "Port Of Shinas",
    cargo: "Petrol",
    preparedBy: "Rashid Ali",
    status: "Customer Approved",
  },
  // Add more rows as needed
];

const Quotations = () => {
  const [data, setData] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);
  const invoiceRef = useRef();

  // Column definition
  const columns = [
    { field: "jobId", headerName: "Job ID", width: 150 },
    { field: "vessel", headerName: "Vessel Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "port", headerName: "Port Name", width: 200 },
    { field: "cargo", headerName: "Cargo", width: 200 },
    { field: "preparedBy", headerName: "Prepared By", width: 150 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "actions",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  // Action handlers (Edit, Delete)
  const handleEdit = (id) => {
    console.log("Edit row", id);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  // PDF Generation using jsPDF and html2canvas
  const handleGeneratePDF = () => {
    const input = invoiceRef.current;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width
      const pageHeight = 295; // A4 height
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
        />
      </div>

      {/* Invoice Section */}
      {/* <div
        ref={invoiceRef}
        style={{
          padding: "20px",
          background: "#fff",
          maxWidth: "800px",
          margin: "20px auto",
          border: "1px solid #ccc",
          borderRadius: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <img
            src="https://via.placeholder.com/100"
            alt="Logo"
            style={{ width: "100px" }}
          />
          <h2>TransOcean</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <div>
            <p>
              <strong>Invoice Number:</strong> 1765433
            </p>
            <p>
              <strong>Amount:</strong> $323.4
            </p>
          </div>
          <div>
            <p>
              <strong>Payment method:</strong> Cash
            </p>
            <p>
              <strong>Date:</strong> 17-07-2024
            </p>
          </div>
        </div>
        <hr />
        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #000" }}>
              <th style={{ textAlign: "left", padding: "10px" }}>
                Description
              </th>
              <th style={{ textAlign: "right", padding: "10px" }}>Price</th>
              <th style={{ textAlign: "right", padding: "10px" }}>Quantity</th>
              <th style={{ textAlign: "right", padding: "10px" }}>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px" }}>Marine Charges</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$20</td>
              <td style={{ padding: "10px", textAlign: "right" }}>4</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$100</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Port Dues (5 Days)</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$12</td>
              <td style={{ padding: "10px", textAlign: "right" }}>5</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$60</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>LinesMan Charges</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$10</td>
              <td style={{ padding: "10px", textAlign: "right" }}>2</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$20</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Pilotage Charges</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$17</td>
              <td style={{ padding: "10px", textAlign: "right" }}>2</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$34</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Environmental Fee</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$20</td>
              <td style={{ padding: "10px", textAlign: "right" }}>2</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$40</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>Customs</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$20</td>
              <td style={{ padding: "10px", textAlign: "right" }}>2</td>
              <td style={{ padding: "10px", textAlign: "right" }}>$40</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div style={{ textAlign: "right", marginTop: "20px" }}>
          <h3>Total Amount: $323.4</h3>
        </div>
      </div> */}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
          Generate PDF
        </Button>
      </div>
    </>
  );
};

export default Quotations;
