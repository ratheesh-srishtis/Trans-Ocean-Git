import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Quotations from "../pages/Quotations";
import Payments from "../pages/Payments";
import Soa from "../pages/Soa";
import CreatePDA from "../pages/CreatePDA";
import { useAuth } from "../context/AuthContext";
import { getAllPdaValuesApi } from "../services/apiService";
import UpdateJobs from "../pages/UpdateJobs";
import ViewQuotation from "../pages/ViewQuotation";
import ViewOperations from "../pages/Operations/ViewOperations";
import EditOperation from "../pages/Operations/EditOperation";
import RolesSettings from "../settings/RolesSettings";
import UserSettings from "../settings/UserSettings";
import PortSettings from "../settings/PortSettings";
import VesselsSettings from "../settings/VesselsSettings";
import VesselTypeSettings from "../settings/VesselTypeSettings";
import CustomerSettings from "../settings/CustomerSettings";
import ServiceSettings from "../settings/ServiceSettings";
import ChargesSettings from "../settings/ChargesSettings";
import SubChargesSettings from "../settings/SubChargesSettings";
import CargoSettings from "../settings/CargoSettings";
import AnchorageLocationSettings from "../settings/AnchorageLocationSettings";
import VendorSettings from "../settings/VendorSettings";
import QQFormSettings from "../settings/QQFormSettings";
import PasswordRequests from "../settings/PasswordRequests";
import OpsList from "../pages/Operations/OpsList";
import FinalReport from "../pages/Operations/FinalReport";
import QQForm from "../pages/Operations/QQForm";
import JobReport from "../pages/Operations/JobReport";
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
  const [vendors, setVendors] = useState([]);

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
          localStorage.setItem(
            "vendors_list",
            JSON.stringify(response.vendors)
          );
          setVessels(response.vessels);
          setPorts(response.ports);
          setCargos(response.cargos);
          setVesselTypes(response.vesselTypes);
          setServices(response.services);
          setCustomers(response.customers);
          setEmployees(response.employees);
          setVendors(response.vendors);
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
      <Route
        path="/quotations"
        element={<Quotations loginResponse={loginResponse} />}
      />
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
            vendors={vendors}
          />
        }
      />
      <Route path="/jobs" element={<OpsList loginResponse={loginResponse} />} />
      <Route path="/final-report" element={<FinalReport />} />
      <Route path="/qq-form" element={<QQForm />} />
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
            vendors={vendors}
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
            vendors={vendors}
          />
        }
      />
            <Route path="/job-report" element={<JobReport />} />

      <Route path="/roles-settings" element={<RolesSettings />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route path="/ports-settings" element={<PortSettings />} />
      <Route path="/vessels-settings" element={<VesselsSettings />} />
      <Route path="/vessel-type-settings" element={<VesselTypeSettings />} />
      <Route path="/customer-settings" element={<CustomerSettings />} />
      <Route path="/service-settings" element={<ServiceSettings />} />
      <Route path="/charges-settings" element={<ChargesSettings />} />
      <Route path="/sub-charges-settings" element={<SubChargesSettings />} />
      <Route path="/cargo-settings" element={<CargoSettings />} />
      <Route path="/anchorage-locations" element={<AnchorageLocationSettings />} />
      <Route path="/vendor-settings" element={<VendorSettings/>} />
      <Route path="/QQform-settings" element={<QQFormSettings/>} />
      <Route path="/password-requests" element={<PasswordRequests/>} />
    </Routes>
  );
};

export default Content;
