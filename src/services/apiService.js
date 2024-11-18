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
export const getAllQuotations = async () => {
  try {
    const response = await axiosInstance.post("/getAllQuotations");
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
