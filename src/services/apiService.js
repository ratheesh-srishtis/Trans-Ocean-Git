// apiService.js
import axios from "axios";

const BASE_URL = "https://hybrid.sicsglobal.com/transocean_api";

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
  /**  Settings Services **/
    
   /* user settings */
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
    const response = await axiosInstance.post(
      "/deleteUserRole",
      userData
    );
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
    const response = await axiosInstance.post(
      "/deleteUser",
      userData
    );
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
    const response = await axiosInstance.post(
      "/deleteVessel",
      userData
    );
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
    const response = await axiosInstance.post(
      "/deletePort",
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

