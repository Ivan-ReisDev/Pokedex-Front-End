import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5165/api/pokedex', 
  timeout: 300000, 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
