import React, { useEffect, useState } from "react";
const CreatePDA = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
}) => {
  return (
    <div>
      <h2>Select Options</h2>
      {/* Vessels Select */}
      <label htmlFor="vessels">Vessel:</label>
      <select id="vessels">
        {vessels.map((vessel) => (
          <option key={vessel._id} value={vessel._id}>
            {vessel.vesselName}
          </option>
        ))}
      </select>

      {/* Ports Select */}
      <label htmlFor="ports">Port:</label>
      <select id="ports">
        {ports.map((port) => (
          <option key={port._id} value={port._id}>
            {port.portName}
          </option>
        ))}
      </select>

      {/* Cargos Select */}
      <label htmlFor="cargos">Cargo:</label>
      <select id="cargos">
        {cargos.map((cargo) => (
          <option key={cargo._id} value={cargo._id}>
            {cargo.cargoName}
          </option>
        ))}
      </select>

      {/* Vessel Types Select */}
      <label htmlFor="vesselTypes">Vessel Type:</label>
      <select id="vesselTypes">
        {vesselTypes.map((type) => (
          <option key={type._id} value={type._id}>
            {type.vesselType}
          </option>
        ))}
      </select>

      {/* Services Select */}
      <label htmlFor="services">Service:</label>
      <select id="services">
        {services.map((service) => (
          <option key={service._id} value={service._id}>
            {service.serviceName}
          </option>
        ))}
      </select>

      {/* Customers Select */}
      <label htmlFor="customers">Customer:</label>
      <select id="customers">
        {customers.map((customer) => (
          <option key={customer._id} value={customer._id}>
            {customer.customerName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CreatePDA;
