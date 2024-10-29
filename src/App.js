import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import PrivateRoute from "./protected/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./error/ErrorBoundary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllPdaValuesApi } from "./services.js/apiService";
import Sidebar from "./views/Sidebar";
import Header from "./views/Header";
import Content from "./views/Content";
const App = () => {
  // State variables for each select option
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
    <>
      <ErrorBoundary>
        <Router basename="/project/transocean">
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <PrivateRoute>
                    <div
                      style={{
                        display: "flex",
                        height: "100vh",
                      }}
                    >
                      <Sidebar />
                      <div style={{ width: "100%" }}>
                        <Header />
                        <Content />
                      </div>
                    </div>
                  </PrivateRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </Router>
      </ErrorBoundary>
      <ToastContainer />
    </>
  );
};

export default App;
