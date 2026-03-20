import axios from 'axios';


/**
 * Adds a JWT-Token to every outgoing Request from LocalStorage, 
 * if available.
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

api.interceptors.request.use(config => {
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
