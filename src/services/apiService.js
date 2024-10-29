import axios from "axios";

// Base URL for your API
const API_URL = "https://your-backend-api.com";

// Create an axios instance for setting common config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login API call
export const login = async (emailOrUsername, password, rememberMe) => {
  try {
    const response = await api.post("/login", {
      emailOrUsername,
      password,
      rememberMe,
    });

    // Return the response data (for example, token or user details)
    return response.data;
  } catch (error) {
    // Handle error here
    console.error("Login error:", error.response?.data || error.message);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Other API calls can be added here
// Example for future API endpoints:
// export const fetchUserData = async (userId) => {
//   try {
//     const response = await api.get(`/users/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//     throw error;
//   }
// };
