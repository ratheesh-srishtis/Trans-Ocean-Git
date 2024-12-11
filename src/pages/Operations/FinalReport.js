import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../css/finalreport.css";

const FinalReport = ({
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
  const Group = require("../../assets/images/jobreport.png");
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <div className="charge mt-4">
          <div className="rectangle"></div>
          <div>
            <img src={Group}></img>
          </div>
        </div>
<div className="p-3">
<table className="tabmain">
          <thead>
            <tr>
              <th className="tabhead">SL NO.</th>
              <th className="tabhead">DESCRIPTION</th>
              <th className="tabhead">DATE & TIME</th>
              <th className="tabhead">SERVICE ACTIVITIES</th>
              <th className="tabhead">QUANTITY </th>
              <th className="tabhead">REMARKS </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="tdstylwidt">1</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
            </tr>
            <tr>
              <td className="tdstylwidt">2</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
            </tr>
            <tr>
              <td className="tdstylwidt">3</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
            </tr>
            <tr>
              <td className="tdstylwidt">4</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
            </tr>
            <tr>
              <td className="tdstylwidt">5</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
            </tr>
            <tr>
              <td className="tdstylwidt">6</td>
              <td className="tdstyl">
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                </input>
              </td>
              <td className="tdstyl">
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
              <td className="tdstyl"> 
              <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
              </input> 
              </td>
            </tr>


          </tbody>
        </table>
        <div className="attach">
          Attach Documents :
        </div>
<div className="d-flex justify-content-between pdf">
<div>
          Attach PDFs
        </div>
        <div>
        <i class="bi bi-file-earmark-pdf"></i>
        </div>
</div>
</div>


      </div>



      <div class="buttons-wrapper">
        <div class="left">
          <button class="btn btna submit-button btnfsize">
            Generate Report
          </button>
        </div>
        <div class="right d-flex">
          <button class="btn btna submit-button btnfsize" onClick={() => { }}>
            Send Report
          </button>
          <button
            class="btn btna submit-button btnfsize"
            onClick={() => {
              navigate("/qq-form");
            }}
          >
            QQ Form
          </button>
        </div>
      </div>
    </>
  );
};

export default FinalReport;
