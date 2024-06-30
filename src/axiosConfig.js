import axios from 'axios';

// Create an instance of axios with a custom config
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
  // You can add more default settings here, for example:
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;