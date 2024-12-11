import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/qqform.css";

const QQForm = ({
  vessels,
  ports,
  cargos,
  vesselTypes,
  services,
  customers,
  employees,
  templates,
  vendors,
}) => {
  const QQForm = useNavigate();

  return (
    <>
      <div className="color">QQ Form</div>
    </>
  );
};

export default QQForm;
