import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Quotations from "../pages/Quotations";
import Payments from "../pages/Payments";
import Soa from "../pages/Soa";
import CreatePDA from "../pages/CreatePDA";
import { useAuth } from "../context/AuthContext";
import { getAllPdaValuesApi, getDashbordDetails } from "../services/apiService";
import UpdateJobs from "../pages/UpdateJobs";
import ViewQuotation from "../pages/ViewQuotation";
import ViewOperations from "../pages/Operations/ViewOperations";
import EditOperation from "../pages/Operations/EditOperation";
import RolesSettings from "../settings/RolesSettings";
import UserSettings from "../settings/UserSettings";
import PortSettings from "../settings/PortSettings";
import VesselsSettings from "../settings/VesselsSettings";
import VesselTypeSettings from "../settings/VesselTypeSettings";
import OpsList from "../pages/Operations/OpsList";
const Content = () => {
  const { loginResponse } = useAuth();

  const [vessels, setVessels] = useState([]);
  const [ports, setPorts] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [vesselTypes, setVesselTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [templates, setTemplates] = useState([]);

  // Fetch PDA values on component mount
  useEffect(() => {
    const fetchPdaValues = async () => {
      try {
        const response = await getAllPdaValuesApi();
        console.log(response, "response");
        if (response.status) {
          localStorage.setItem(
            "vessels_list",
            JSON.stringify(response.vessels)
          );
          localStorage.setItem("ports_list", JSON.stringify(response.ports));
          localStorage.setItem("cargos_list", JSON.stringify(response.cargos));
          localStorage.setItem(
            "customers_list",
            JSON.stringify(response.customers)
          );
          localStorage.setItem(
            "vessel_types_list",
            JSON.stringify(response.vesselTypes)
          );
          localStorage.setItem(
            "employees_list",
            JSON.stringify(response.employees)
          );
          setVessels(response.vessels);
          setPorts(response.ports);
          setCargos(response.cargos);
          setVesselTypes(response.vesselTypes);
          setServices(response.services);
          setCustomers(response.customers);
          setEmployees(response.employees);
          setTemplates(response.templates);
        }
      } catch (error) {
        console.error("Error fetching PDA values:", error);
      }
    };

    fetchPdaValues();
  }, []);

  useEffect(() => {
    console.log(customers, "customers");
  }, [customers]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quotations" element={<Quotations />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/soa" element={<Soa />} />
      <Route
        path="/update-jobs"
        element={<UpdateJobs templates={templates} />}
      />
      <Route path="/view-operation" element={<ViewOperations />} />
      <Route
        path="/edit-operation"
        element={
          <EditOperation
            vessels={vessels}
            ports={ports}
            cargos={cargos}
            vesselTypes={vesselTypes}
            services={services}
            customers={customers}
            employees={employees}
            templates={templates}
          />
        }
      />
      <Route path="/jobs" element={<OpsList />} />
      <Route
        path="/view-quotation"
        element={
          <ViewQuotation
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
      <Route path="/roles-settings" element={<RolesSettings />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route path="/ports-settings" element={<PortSettings />} />
      <Route path="/vessels-settings" element={<VesselsSettings />} />
      <Route path="/vessels-type-settings" element={<VesselTypeSettings />} />
    </Routes>
  );
};

export default Content;
