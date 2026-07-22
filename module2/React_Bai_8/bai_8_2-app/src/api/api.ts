import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.twelvedata.com/',
    timeout: 5000,
    headers: {}
});

export default api;