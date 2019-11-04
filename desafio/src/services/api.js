import axios from 'axios';

const api = axios.create({baseURL :'https://www.googleapis.com/youtube/v3/search'})
export const API_KEY = 'AIzaSyD8ZK8C0pjzpuJoXuuGRxBLpjFz4W9KuEU';

export default api;