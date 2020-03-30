import axios from 'axios';

const api = axios.create({
  baseURL: 'http://100.73.63.240:3333'
});

export default api;