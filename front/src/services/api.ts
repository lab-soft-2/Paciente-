import axios from 'axios';

const BASE_URL = "https://patient-service-lojv4wqana-uc.a.run.app/" || 'https://default.backend.url';

const api = axios.create({
  baseURL: BASE_URL,
//  headers: {
//    'Content-Type': 'application/json',
// },
});

export default api;