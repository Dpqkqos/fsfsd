<template>
  <div>
    <UserCard :user="user" />
    <EmotionTable :emotions="emotions" @add-emotion="addEmotion" />
  </div>
</template>

<script>
import UserCard from './components/UserCard.vue';
import EmotionTable from './components/EmotionTable.vue';
import axios from 'axios';

export default {
  components: { UserCard, EmotionTable },
  data() {
    return {
      user: {
        avatar: '',
        name: '',
        daysOnPlatform: 0,
        dailyForecast: '',
      },
      emotions: [],
    };
  },
  async created() {
    try {
      // Загрузка данных пользователя
      const response = await axios.get('/api/user/12345');
      this.user = {
        avatar: response.data.avatar,
        name: response.data.name,
        daysOnPlatform: response.data.days_on_platform,
        dailyForecast: response.data.daily_forecast,
      };

      // Загрузка эмоций
      this.emotions = response.data.daily_emotions.map((emotion, index) => ({
        day: index + 1,
        state: emotion,
      }));
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    }
  },
  methods: {
    async addEmotion(emotion) {
      try {
        const response = await axios.post('/api/emotion/12345', { emotion });
        if (response.status === 200) {
          this.emotions.push({ day: this.emotions.length + 1, state: emotion });
        }
      } catch (error) {
        console.error('Ошибка при добавлении эмоции:', error);
      }
    },
  },
};
</script>