import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "../css/otpverification.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateOTP } from "../services/apiService";
import PopUp from "../pages/PopUp";
import { useLocation } from "react-router-dom";
const OtpVerification = () => {
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
  const [emailError, setEmailError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");

  const [openPopUp, setOpenPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [otp, setOtp] = useState(["", "", "", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    if (value && index < 7) {
      inputRefs.current[index + 1].focus();
    }

    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").split("");
    if (pastedData.length === 8) {
      setOtp(pastedData);
      inputRefs.current[7].focus();
    }
  };

  const handleVerify = () => {
    const newOTP = otp.join("");
    resetPassword(newOTP);
    setOtp(["", "", "", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const location = useLocation();

  const emailOrUsername = location.state?.emailOrUsername; // Access the passed row object

  console.log("emailOrUsername:", emailOrUsername);

  const resetPassword = async (newOTP) => {
    try {
      try {
        const userData = {
          email: emailOrUsername,
          resetToken: newOTP,
        };
        console.log(userData, "userData");
        const response = await validateOTP(userData);
        console.log(response, "login_response");
        if (response?.status == true) {
          setUserId(response?.user);
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

    setIsLoading(true);
  };

  const handlePopupClose = () => {
    setOpenPopUp(false);
    navigate("/reset-password", { state: { userId } });
  };

  useEffect(() => {
    console.log(userId, "userId");
  }, [userId]);
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
                      <h3 class="text-center login_text">OTP Verification</h3>
                    </div>

                    {/* <div class="mb-5  ">
                      <label for="exampleInputEmail1" class="form-label">
                        Enter OTP{" "}
                      </label>
                      <div class="otp gap-3">
                        <input
                          type="email"
                          class="form-control otpform"
                          id="exampleInputEmail1"
                          placeholder="8"
                          aria-describedby="emailHelp"
                        />
                        <input
                          type="email"
                          class="form-control otpform"
                          id="exampleInputEmail1"
                          placeholder="4"
                          aria-describedby="emailHelp"
                        />
                        <input
                          type="email"
                          class="form-control otpform"
                          id="exampleInputEmail1"
                          placeholder="3"
                          aria-describedby="emailHelp"
                        />
                        <input
                          type="email"
                          class="form-control otpform"
                          id="exampleInputEmail1"
                          placeholder="2"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div> */}

                    <div>
                      <div onPaste={handlePaste} className="otp-boxes">
                        {otp.map((value, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className="otp"
                            value={value}
                            onChange={(e) =>
                              handleChange(e.target.value, index)
                            }
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{
                              width: "50px",
                              height: "50px",
                              fontSize: "24px",
                              textAlign: "center",
                              marginRight: "10px",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div class="resendotp mb-3 mt-3">
                      <a href="" class="otptext">
                        {" "}
                        Resend OTP?
                      </a>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary w-100"
                      onClick={handleVerify}
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

export default OtpVerification;
