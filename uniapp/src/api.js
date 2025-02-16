import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://zany-robot-pj7xj56vxrwq36954-8000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;