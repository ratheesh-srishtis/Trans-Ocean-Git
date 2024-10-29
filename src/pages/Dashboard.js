import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/create-pda");
  };

  return (
    <div>
      <h2>Dashboard Page</h2>
      <button onClick={() => handleNavigation()}>create pda</button>
    </div>
  );
};

export default Dashboard;
