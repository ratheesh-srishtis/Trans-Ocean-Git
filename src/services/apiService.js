// apiService.js
import axios from "axios";

const BASE_URL = "https://hybrid.sicsglobal.com/transocean_api";
const fileUrl =
  "https://hybrid.sicsglobal.com/transocean_api/assets/template_pdf/";

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("transocean_token");
    if (token) {
      config.headers["x-access-token"] = token; // Set the token in the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API function
export const loginApi = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, loginData);
    if (response.data.status) {
      // Store the token in localStorage if the login is successful
      localStorage.setItem("transocean_token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

// Get All PDA Values API function
export const getAllPdaValuesApi = async () => {
  try {
    const response = await axiosInstance.post("/getAllPdaValues");
    return response.data;
  } catch (error) {
    console.error("Get All PDA Values API Error:", error);
    throw error;
  }
};

// forgotUserPassword api
export const forgotUserPassword = async (userData) => {
  try {
    const response = await axiosInstance.post("/forgotUserPassword", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// validateOTP api
export const validateOTP = async (userData) => {
  try {
    const response = await axiosInstance.post("/validateOTP", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// validateOTP api
export const resetUserPassword = async (userData) => {
  try {
    const response = await axiosInstance.post("/resetUserPassword", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Add more API functions here as needed

export const getCharges = async (userData) => {
  try {
    const response = await axiosInstance.post("/getCharges", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getSubcharges = async (userData) => {
  try {
    const response = await axiosInstance.post("/getSubcharges", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const savePda = async (userData) => {
  try {
    const response = await axiosInstance.post("/savePda", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const changeQuotationStatus = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/changeQuotationStatus",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editChargeQuotation = async (userData) => {
  try {
    const response = await axiosInstance.post("/editQuotationCharge", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editPDA = async (userData) => {
  try {
    const response = await axiosInstance.post("/editQuotation", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const addPDACharges = async (userData) => {
  try {
    const response = await axiosInstance.post("/addQuotationCharges", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteQuotationCharge = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/deleteQuotationCharge",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteQuotation = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteQuotation", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const sendQuotationAPI = async (userData) => {
  try {
    const response = await axiosInstance.post("/sendQuotation", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Get All Quotations API function
export const getAllQuotations = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllQuotations", data);
    return response.data;
  } catch (error) {
    console.error("Get All Quotations API Error:", error);
    throw error;
  }
};

export const getPdaDetails = async (data) => {
  try {
    const response = await axiosInstance.post("/getPda", data);
    return response.data;
  } catch (error) {
    console.error("Get All Quotations API Error:", error);
    throw error;
  }
};

export const getDashbordDetails = async (data) => {
  try {
    const response = await axiosInstance.post("/financeDashboard", data);
    return response.data;
  } catch (error) {
    console.error("financeDashboard API Error:", error);
    throw error;
  }
};

export const getPdaFile = async (data) => {
  try {
    const response = await axiosInstance.post("/generateQuotationPDF", data);
    return response.data;
  } catch (error) {
    console.error("financeDashboard API Error:", error);
    throw error;
  }
};

export const getAllJobs = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllJobs", data);
    return response.data;
  } catch (error) {
    console.error("financeDashboard API Error:", error);
    throw error;
  }
};

export const getAllUserRoles = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllRoles", data);
    return response.data;
  } catch (error) {
    console.error("List all roles API Error:", error);
    throw error;
  }
};

export const getAllPermissions = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllPermissions", data);
    return response.data;
  } catch (error) {
    console.error("List all permissions API Error:", error);
    throw error;
  }
};

export const saveUserRole = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveUserRole", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const deleteUserRole = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteUserRole", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const editUserRole = async (userData) => {
  try {
    const response = await axiosInstance.post("/editUserRole", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* user settings */

export const getAllUsers = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllUsers", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/editUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteUser", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* vessel settings */

export const getAllVessels = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllVessels", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveVessel = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveVessel", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editVessel = async (userData) => {
  try {
    const response = await axiosInstance.post("/editVessel", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteVessel = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteVessel", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* Port Settings */

export const getAllPorts = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllPorts", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const savePort = async (userData) => {
  try {
    const response = await axiosInstance.post("/savePort", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editPort = async (userData) => {
  try {
    const response = await axiosInstance.post("/editPort", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deletePort = async (userData) => {
  try {
    const response = await axiosInstance.post("/deletePort", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* vessel Type settings */

export const getAllVesselTypes = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllVesselTypes", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveVesselType = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveVesselType", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editVesselType = async (userData) => {
  try {
    const response = await axiosInstance.post("/editVesselType", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteVesselType = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteVesselType", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* customer settings */
export const getAllCustomers = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllCustomers", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveCustomer = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveCustomer", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editCustomer = async (userData) => {
  try {
    const response = await axiosInstance.post("/editCustomer", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteCustomer = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteCustomer", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* charge settings */
export const getAllCharges = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllCharges", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveCharge = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveCharge", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editCharge = async (userData) => {
  try {
    const response = await axiosInstance.post("/editCharge", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteCharge = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteCharge", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* service settings */
export const getAllServices = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllServices", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveService = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveService", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editService = async (userData) => {
  try {
    const response = await axiosInstance.post("/editService", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteService = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteService", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

/* cargo settings */
export const getAllCargos = async (data) => {
  try {
    const response = await axiosInstance.post("/getAllCargos", data);
    return response.data;
  } catch (error) {
    console.error("List all users API Error:", error);
    throw error;
  }
};
export const saveCargo = async (userData) => {
  try {
    const response = await axiosInstance.post("/saveCargo", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const editCargo = async (userData) => {
  try {
    const response = await axiosInstance.post("/editCargo", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const deleteCargo = async (userData) => {
  try {
    const response = await axiosInstance.post("/deleteCargo", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const uploadDocuments = async (formData) => {
  try {
    const response = await axiosInstance.post("/uploadDocuments", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file uploads
      },
    });
    return response.data;
  } catch (error) {
    console.error("uploadDocuments API Error:", error);
    throw error;
  }
};

export const generateTemplatePDF = async (userData) => {
  try {
    const response = await axiosInstance.post("/generateTemplatePDF", userData);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
