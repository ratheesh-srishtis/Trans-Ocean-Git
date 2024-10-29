import React, { useEffect, useState } from "react";
import "../css/createpda.css"
const CreatePDA = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
}) => {
  const Group = require("../assets/images/Group 1000002975.png");
  return (
    <>
      <div class="pdacontent">
        <div class=" pda-no ">
          <div class="row justify-content-start ">
            <div class="col-2 pdanumber ">
              <span> PDA No:</span>
              <span class="fw-bolder pdafontweight">2024001</span>
            </div>
            <div class="col-2 d-flex justify-content-start back">
              <div class="pdadate">
                <label for="inputPassword" class="col-sm-4 col-form-label">PDA Date:</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control" placeholder="25/09/2024" id="inputPassword" />
                </div>
              </div>
            </div>
            <div class="col-2 draft-pda ">
              <button type="button" class="btn draft">
                <span class="badge "><i class="bi bi-book-fill book"></i> </span> Draft PDA
              </button>
            </div>
          </div>
          <div class="charge">
            <div class="rectangle" ></div>
            <img src={Group}></img>
          </div>
          <div class="typesofcall-row ">
            <div class="row align-items-start">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Types of Call</label>
                  <div class="radio gap-3">
                    <div>
                      <input type="radio" name="payment" id="card" Checked="checked"
                        class="vesselradio" />
                      <label for="vessels" class="vessel"> vessels</label>
                      <input type="radio" name="payment" class="vesselradio" />
                      <label for="services"> Services</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Vessel Name*:</label>
                <div class="vessel-select">
                  <select class="form-select vesselbox" aria-label="Default select example">
                    <option selected>Choose Vessel name</option>
                    <option value="1">Jimei Shunhao</option>
                    <option value="2">MV Viva Globus</option>
                    <option value="3">MV Toro Bianco</option>
                    <option value="4">TBA</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Port Name*:</label>
                <div class="vessel-select">
                  <select class="form-select vesselbox" aria-label="Default select example">
                    <option selected>Choose Port name</option>
                    <option value="1">Port of sultan</option>
                    <option value="2">Port of Salalah</option>
                    <option value="3">Port of Shinas</option>
                    <option value="4">Port of DUQM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="choosecargo-row ">
            <div class="row align-items-start">
              <div class="col">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Cargo</label>
                  <div class="vessel-select">
                    <select class="form-select vesselbox" aria-label="Default select example">
                      <option selected>Choose Cargo</option>
                      <option value="1">Anthracite coal</option>
                      <option value="2">Bundled Steel</option>
                      <option value="3">Oil Drums</option>
                      <option value="4">Chemicals</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Type of Vessel:</label>
                <div class="vessel-select">
                  <select class="form-select vesselbox" aria-label="Default select example">
                    <option selected>Choose Vessel name</option>
                    <option value="1">Bulk Carrier</option>
                    <option value="2">Oil Tanker</option>
                    <option value="3">Container Ship</option>
                    <option value="4">Chemcial Tanker</option>
                    <option value="4">LNG Carrier</option>
                    <option value="4">LPG Carrier</option>
                    <option value="4">General Cargo</option>
                    <option value="4">Cruise Ship</option>
                  </select>
                </div>
              </div>
              <div class="col">
                <label for="exampleFormControlInput1" class="form-label">Vessel Voyage No:</label>
                <input type="email" class="form-control vessel-voyage" id="exampleFormControlInput1"
                  placeholder="" />
              </div>
            </div>
          </div>
          <div class="thirdrow mb-3">
            <div class="col-4">
              <div class="row">
                <div class="col-5">
                  <label for="exampleFormControlInput1" class="form-label">IMO No:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
                <div class="col-5 voyage ">
                  <label for="exampleFormControlInput1" class="form-label">LOA:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-5 grt">
                  <label for="exampleFormControlInput1" class="form-label">GRT:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
                <div class="col-5 nrt ">
                  <label for="exampleFormControlInput1" class="form-label">NRT:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="row">
                <div class="col-5 eta">
                  <label for="exampleFormControlInput1" class="form-label">ETA:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
                <div class="col-5 etd ">
                  <label for="exampleFormControlInput1" class="form-label">ETD:</label>
                  <input type="email" class="form-control vessel-voyage voyageblock" id="exampleFormControlInput1"
                    placeholder="" />
                </div>
              </div>
            </div>
          </div>

          <div class="imo">
            <div class="row align-items-start">
              <div class="col-5">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">Services</label>
                  <div class="vessel-select">
                    <select class="form-select vesselbox" aria-label="Default select example">
                      <option selected>Choose Services</option>
                      <option value="1">Anchorage call</option>
                      <option value="2">CSO Terminal (CARGO)</option>
                      <option value="3">Husbandry Services</option>
                      <option value="4"> Bunker call</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <label for="exampleFormControlInput1" class="form-label">Customer Name:</label>
                <div class="vessel-select">
                  <select class="form-select vesselbox" aria-label="Default select example">
                    <option selected>Norok Shipping</option>
                    <option value="1">Norok Shipping</option>
                    <option value="2">Customer 2</option>
                    <option value="3">Customer 3</option>
                  </select>
                </div>
              </div>
              <div class="col-2">
                <button type="button" class="btn addcharge-button">Add charge</button>
              </div>
            </div>
          </div>


        </div>
      </div>


    </>

  );
};

export default CreatePDA;

// <div>
// <h2>Select Options</h2>
// {/* Vessels Select */}
// <label htmlFor="vessels">Vessel:</label>
// <select id="vessels">
//   {vessels.map((vessel) => (
//     <option key={vessel._id} value={vessel._id}>
//       {vessel.vesselName}
//     </option>
//   ))}
// </select>

// {/* Ports Select */}
// <label htmlFor="ports">Port:</label>
// <select id="ports">
//   {ports.map((port) => (
//     <option key={port._id} value={port._id}>
//       {port.portName}
//     </option>
//   ))}
// </select>

// {/* Cargos Select */}
// <label htmlFor="cargos">Cargo:</label>
// <select id="cargos">
//   {cargos.map((cargo) => (
//     <option key={cargo._id} value={cargo._id}>
//       {cargo.cargoName}
//     </option>
//   ))}
// </select>

// {/* Vessel Types Select */}
// <label htmlFor="vesselTypes">Vessel Type:</label>
// <select id="vesselTypes">
//   {vesselTypes.map((type) => (
//     <option key={type._id} value={type._id}>
//       {type.vesselType}
//     </option>
//   ))}
// </select>

// {/* Services Select */}
// <label htmlFor="services">Service:</label>
// <select id="services">
//   {services.map((service) => (
//     <option key={service._id} value={service._id}>
//       {service.serviceName}
//     </option>
//   ))}
// </select>

// {/* Customers Select */}
// <label htmlFor="customers">Customer:</label>
// <select id="customers">
//   {customers.map((customer) => (
//     <option key={customer._id} value={customer._id}>
//       {customer.customerName}
//     </option>
//   ))}
// </select>
// </div>