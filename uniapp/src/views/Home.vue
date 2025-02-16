<template>
  <div>
    <UserCard :user="user" />
    <EmotionTable :emotions="emotions" @add-emotion="addEmotion" />
  </div>
</template>

<script>
import UserCard from '../components/UserCard.vue';
import EmotionTable from '../components/EmotionTable.vue';
import apiClient from '../api';

export default {
  components: { UserCard, EmotionTable },
  data() {
    return {
      user: {},
      emotions: [],
    };
  },
  async created() {
    try {
      const response = await apiClient.get('/api/user/12345');
      this.user = response.data;

      this.emotions = response.data.daily_emotions.map((emotion, index) => ({
        day: index + 1,
        state: emotion,
      }));
    } catch (err) {
      console.error('Ошибка загрузки данных:', err);
    }
  },
  methods: {
    async addEmotion(emotion) {
      try {
        const response = await apiClient.post('/api/emotion/12345', { emotion });
        if (response.status === 200) {
          this.emotions.push({ day: this.emotions.length + 1, state: emotion });
        }
      } catch (err) {
        console.error('Ошибка добавления эмоции:', err);
      }
    },
  },
};
</script>