import axios from 'axios';

let authToken = localStorage.getItem('jwtToken');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    Authorization: `Bearer ${authToken}`
  }
});

axiosInstance.interceptors.request.use(async req => {
    authToken = localStorage.getItem('jwtToken');
    req.headers.Authorization = `Bearer ${authToken}`;
    return req;
});

export default axiosInstance;
