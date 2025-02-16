import axios from 'axios'

const API_BASE = 'https://zany-robot-pj7xj56vxrwq36954-8000.app.github.dev'

export default {
  async registerUser(tgId, userData) {
    return await axios.post(`${API_BASE}/register/${tgId}`, userData)
  },

  async getUser(tgId) {
    return await axios.get(`${API_BASE}/user/${tgId}`)
  },

  async createEmotion(tgId, emotionData) {
    return await axios.post(`${API_BASE}/emotion/${tgId}`, emotionData)
  },

  async getEmotions(tgId) {
    return await axios.get(`${API_BASE}/emotions/${tgId}`)
  },

  async getForecast(tgId) {
    return await axios.get(`${API_BASE}/forecast/${tgId}`)
  }
}
