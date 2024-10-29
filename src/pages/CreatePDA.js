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
  return (
    <>  
        <div className="mainbody">
        <div className="main--content">

            <div className=" pda-no ">
                <div className="row justify-content-start ">
                    <div className="col-2 pdanumber ">
                        <span> PDA No:</span>
                        <span className="fw-bolder pdafontweight">2024001</span>
                    </div>
                    <div className="col-2 d-flex justify-content-start back">
                        <div className="pdadate">
                            <label for="inputPassword" className="col-sm-4 col-form-label">PDA Date:</label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" placeholder="25/09/2024" id="inputPassword"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 draft-pda ">
                        <button type="button" className="btn draft">
                            <span className="badge "><i className="bi bi-book-fill book"></i> </span> Draft PDA
                        </button>

                    </div>
                </div>
                <div className="typesofcall-row ">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Types of Call</label>
                                <div className="radio gap-3">
                                    <div>
                                        <input type="radio" name="payment" id="card" Checked="checked"
                                            className="vesselradio" />
                                        <label for="vessels" className="vessel"> vessels</label>
                                        <input type="radio" name="payment" />
                                        <label for="services"> Services</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <label for="exampleFormControlInput1" className="form-label">Vessel Name*:</label>
                            <div className="vessel-select">
                                <select className="form-select vesselbox" aria-label="Default select example">
                                    <option selected>Choose Vessel name</option>
                                    <option value="1">Jimei Shunhao</option>
                                    <option value="2">MV Viva Globus</option>
                                    <option value="3">MV Toro Bianco</option>
                                    <option value="4">TBA</option>
                                </select>
                            </div>
                        </div>
                        <div className="col">
                            <label for="exampleFormControlInput1" className="form-label">Port Name*:</label>
                            <div className="vessel-select">
                                <select className="form-select vesselbox" aria-label="Default select example">
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
                <div className="choosecargo-row ">
                    <div className="row align-items-start">
                        <div className="col">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Cargo</label>
                                <div className="vessel-select">
                                    <select className="form-select vesselbox" aria-label="Default select example">
                                        <option selected>Choose Cargo</option>
                                        <option value="1">Anthracite coal</option>
                                        <option value="2">Bundled Steel</option>
                                        <option value="3">Oil Drums</option>
                                        <option value="4">Chemicals</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <label for="exampleFormControlInput1" className="form-label">Type of Vessel:</label>
                            <div className="vessel-select">
                                <select className="form-select vesselbox" aria-label="Default select example">
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
                        <div className="col">
                            <label for="exampleFormControlInput1" className="form-label">Vessel Voyage No:</label>
                            <input type="email" className="form-control vessel-voyage" id="exampleFormControlInput1"
                                placeholder=""/>
                        </div>
                    </div>
                </div>
                <div className="imo">
                    <div className="row align-items-start">
                        <div className="col-5">
                            <div className="mb-3">
                                <label for="exampleFormControlInput1" className="form-label">Services</label>
                                <div className="vessel-select">
                                    <select className="form-select vesselbox" aria-label="Default select example">
                                        <option selected>Choose Services</option>
                                        <option value="1">Anchorage call</option>
                                        <option value="2">CSO Terminal (CARGO)</option>
                                        <option value="3">Husbandry Services</option>
                                        <option value="4"> Bunker call</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-5">
                            <label for="exampleFormControlInput1" className="form-label">Customer Name:</label>
                            <div className="vessel-select">
                                <select className="form-select vesselbox" aria-label="Default select example">
                                    <option selected>Norok Shipping</option>
                                    <option value="1">Norok Shipping</option>
                                    <option value="2">Customer 2</option>
                                    <option value="3">Customer 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-2">
                            <button type="button" className="btn addcharge-button">Add charge</button>
                        </div>
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