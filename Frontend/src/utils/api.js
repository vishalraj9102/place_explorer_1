import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // or your backend server's URL
});

export default api;
