import axios from 'axios';

const BASE_URL = process.env.BASE_URL || 'https://default.backend.url';

const api = axios.create({
  baseURL: BASE_URL,
//  headers: {
//    'Content-Type': 'application/json',
// },
});

export default api;