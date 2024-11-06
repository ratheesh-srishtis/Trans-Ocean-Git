import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Quotations from "../pages/Quotations";
import Jobs from "../pages/Jobs";
import Payments from "../pages/Payments";
import Soa from "../pages/Soa";
import CreatePDA from "../pages/CreatePDA";
import { useAuth } from "../context/AuthContext";
import { getAllPdaValuesApi } from "../services/apiService";
const Content = () => {
  const { loginResponse } = useAuth();

  const [vessels, setVessels] = useState([]);
  const [ports, setPorts] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);

  // Fetch PDA values on component mount
  useEffect(() => {
    const fetchPdaValues = async () => {
      try {
        const response = await getAllPdaValuesApi();
        if (response.status) {
          setVessels(response.vessels);
          setPorts(response.ports);
          setCargos(response.cargos);
          setVesselTypes(response.vesselTypes);
          setServices(response.services);
          setCustomers(response.customers);
        }
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };

    fetchPdaValues();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quotations" element={<Quotations />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/soa" element={<Soa />} />
      <Route
        path="/create-pda"
        element={
          <CreatePDA
            vessels={vessels}
            ports={ports}
            cargos={cargos}
            vesselTypes={vesselTypes}
            services={services}
            customers={customers}
            loginResponse={loginResponse}
          />
        }
      />
    </Routes>
  );
};

export default Content;
