import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/sidebar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Sidebar = () => {
  const { loginResponse } = useAuth();
  const { logout } = useAuth();

  console.log(loginResponse, "loginResponse_sidebar");

  const Logo = require("../assets/images/LOGO.png");

  const [lastPath, setLastPath] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    const lastSegment = path.substring(path.lastIndexOf("/") + 1);
    setLastPath(lastSegment);
  }, []);

  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showSubmenu, setShowSubmenu] = useState(false);

  const [menuList, setMenuList] = useState([]);

  const handleNavigation = (menuItem) => {
    if (menuItem === "settings") {
      // Toggle the submenu for settings
      setShowSubmenu((prev) => !prev);
    } else {
      setShowSubmenu(false); // Close the submenu if another menu item is clicked
    }
    if (lastPath == menuItem) {
      setActiveMenu(lastPath);
    } else if (lastPath != menuItem) {
      setActiveMenu(menuItem);
    }
    setActiveMenu(menuItem); // Update the active menu item
    switch (menuItem) {
      case "dashboard":
        navigate("/dashboard"); // Replace with your actual route
        break;
      case "quotations":
        navigate("/quotations"); // Replace with your actual route
        break;
      case "reports":
        navigate("/reports"); // Replace with your actual route
        break;
      case "jobs":
        navigate("/jobs"); // Replace with your actual route
        break;
      case "payments":
        navigate("/payments"); // Replace with your actual route
        break;
      case "soa":
        navigate("/soa"); // Replace with your actual route
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setMenuList(loginResponse?.data?.userRole?.permissions);
  }, [loginResponse]);

  useEffect(() => {
    console.log(menuList, "menuList");
  }, [menuList]);

  // Define menu items with icons and paths
  const menuItems = {
    dashboard: { label: "Dashboard", icon: "bi bi-pie-chart-fill" },
    quotations: { label: "Quotations", icon: "bi bi-receipt-cutoff" },
    jobs: { label: "Jobs", icon: "bi bi-briefcase-fill" },
    payments: { label: "Payments", icon: "bi bi-cash-stack" },
    soa: { label: "SOA", icon: "bi bi-wallet" },
    settings: { label: "Settings", icon: "bi bi-gear" },
  };

  const userPermissions = loginResponse?.permission || [];

  return (
    <>
      <div className="mainbody">
        <div className="sidebar">
          <div className="space">
            <ul className="menu">
              <img className="side-logo" src={Logo} alt="Logo" />
              {/* Render each item only if it's in the user permissions */}

              {userPermissions.map(
                (perm) =>
                  menuItems[perm] && (
                    <li
                      key={perm}
                      onClick={() => handleNavigation(perm)}
                      className={
                        activeMenu === perm
                          ? "active menulist menugap"
                          : "menugap"
                      }
                    >
                      <a>
                        <i
                          className={`${menuItems[perm].icon} ${
                            activeMenu === perm ? "active-span menulist" : ""
                          }`}
                        ></i>

                        <span
                          className={
                            activeMenu === perm
                              ? "active-span menulist "
                              : "menulist"
                          }
                        >
                          {" "}
                          {menuItems[perm].label}
                        </span>
                      </a>
                      {/* Show submenu for settings */}
                      {perm === "settings" && showSubmenu && (
                        <div className="submenu">
                          <ul className="settingsmenu">
                            <li
                              className="menusub"
                              onClick={() => navigate("/roles-settings")}
                            >
                              Roles
                            </li>
                            <li
                              className="menusub"
                              onClick={() => navigate("/user-settings")}
                            >
                              User
                            </li>
                            <li
                              className="menusub"
                              onClick={() => navigate("/vessels-settings")}
                            >
                              Vessels
                            </li>
                            <li
                              className="menusub"
                              onClick={() => navigate("/ports-settings")}
                            >
                              Ports
                            </li>
                            <li
                              className="menusub"
                              onClick={() => navigate("/vessel-type-settings")}
                            >
                              Ports
                            </li>
                          </ul>
                        </div>
                      )}
                    </li>
                  )
              )}

              {/* Signout */}
              {/* <li className="Signout" onClick={logout}>
                <a>
                  <i className="bi bi-box-arrow-left"></i>
                  <span> Signout</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
