import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/resetpassword.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetUserPassword } from "../services/apiService";
import PopUp from "../pages/PopUp";
const ResetPassword = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  console.log("test");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Logo = require("../assets/images/LOGO.png");
  const Group = require("../assets/images/Group 1000002969.png");
  const mian = require("../assets/images/mian.png");
  const [loading, setLoading] = useState(false);

  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState("Finance");

  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  // State to hold the input values
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const location = useLocation();

  const userId = location.state?.userId; // Access the passed row object

  console.log("userId:", userId);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    try {
      try {
        const userData = {
          userId: userId, // Replace with dynamic userId if needed
          password,
        };
        console.log(userData, "userData");
        const response = await resetUserPassword(userData);
        console.log(response, "login_response");
        if (response?.status == true) {
          setMessage(`${response?.message}`);
          setOpenPopUp(true);
        } else {
          setMessage(`${response?.message}`);
          setOpenPopUp(true);
        }
      } catch (error) {}
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const [newPasswordVisible, setewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setewPasswordVisible(!newPasswordVisible);
  };
  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePopupClose = () => {
    setOpenPopUp(false);
    navigate("/login");
  };

  return (
    <>
      <div>
        <div class="transocean_login">
          <div class="group">
            <img className="logoside" src={Group}></img>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-6 same-level">
                <div class="d-flex flex-column mb-3">
                  <img className="logo" src={Logo}></img>
                  <img className="mainpng" src={mian} alt=""></img>
                </div>
              </div>

              <div class="col-lg-6 same-level">
                <div class="logincard">
                  <div class="maincard">
                    <div>
                      <h3 class="text-center login_text">Reset Password</h3>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">
                        Enter New Password
                      </label>
                      <div className="pass">
                        <input
                          type={newPasswordVisible ? "text" : "password"}
                          className="form-control fieldwidth"
                          id="newPassword"
                          placeholder="**********"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordError(false);
                          }}
                        />

                        {newPasswordVisible ? (
                          <span
                            className="bi bi-eye "
                            onClick={toggleNewPasswordVisibility}
                          ></span>
                        ) : (
                          <span
                            className="bi bi-eye-slash "
                            onClick={toggleNewPasswordVisibility}
                          ></span>
                        )}
                      </div>
                      {passwordError && (
                        <div className="invalid">
                          Please enter the same password
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                      </label>
                      <div className="pass">
                        <input
                          type={confirmPasswordVisible ? "text" : "password"}
                          className="form-control fieldwidth"
                          id="confirmPassword"
                          placeholder="**********"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError(false);
                          }}
                        />
                        {confirmPasswordVisible ? (
                          <span
                            className="bi bi-eye "
                            onClick={toggleConfirmPasswordVisibility}
                          ></span>
                        ) : (
                          <span
                            className="bi bi-eye-slash "
                            onClick={toggleConfirmPasswordVisibility}
                          ></span>
                        )}
                      </div>
                      {passwordError && (
                        <div className="invalid">
                          Please enter the same password
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      onClick={() => {
                        handleSubmit();
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex bottom-head">
          <p class="copyright">Copyright@ transocean</p>
          <p class="footerlinks">
            <a href="#">Policy</a> | <a href="#"> Terms & Conditions </a>{" "}
          </p>
        </div>
      </div>
      {openPopUp && <PopUp message={message} closePopup={handlePopupClose} />}
    </>
  );
};

export default ResetPassword;
