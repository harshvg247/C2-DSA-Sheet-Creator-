import axios from 'axios';


// Create an instance of axios with a custom config
// For development, use 'http://localhost:5000/api' as your backend API endpoint.
const axiosInstance = axios.create({
  baseURL: 'https://c2-backend-plv7.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to dynamically get the token from the local storage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Dynamically get the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;