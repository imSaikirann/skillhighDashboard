
import axios from 'axios';
import { API_URL } from './config';
import { getToken } from '../utils/tokenutils';


// Check if the API URL is defined
if (!API_URL) {
  console.error("API URL is not defined.");
}

// Create an Axios instance with base configurations
const api = axios.create({
  baseURL: API_URL, // Set the base URL from config
  withCredentials: true, // Allow sending cookies/credentials
});

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request errors
  }
);

// Add a response interceptor for global error handling (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, like token expiration
    if (error.response?.status === 401) {
      console.error('Unauthorized access - perhaps the token is invalid.');
      // localStorage.removeItem('token')
      // redirectToLogin('/login')

    }
    return Promise.reject(error);
  }
);

export default api;
