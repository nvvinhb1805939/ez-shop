import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://api.ezfrontend.com/',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    const data = error.response.data;
    const message = data.message;
    const errorMessage = message[0].messages[0].message;
    throw new Error(errorMessage);
    // return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
