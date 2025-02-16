<template>
  <div class="app">
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
      },
      emotions: [],
    };
  },
  async created() {
    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
    if (tgUser) {
      try {
        // Регистрация пользователя
        await axios.post('/api/register', {
          tg_id: tgUser.id,
          name: tgUser.first_name,
          avatar: tgUser.photo_url,
        });

        // Загрузка данных
        const userResponse = await axios.get(`/api/user/${tgUser.id}`);
        this.user = userResponse.data;
        
        const emotionsResponse = await axios.get(`/api/emotions/${tgUser.id}`);
        this.emotions = emotionsResponse.data.map((e, i) => ({
          day: i + 1,
          state: e,
          id: Date.now() + i
        }));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  },
  methods: {
    async addEmotion(emotion) {
      try {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        await axios.post(`/api/emotion/${tgUser.id}`, { emotion });
        this.emotions = [
          ...this.emotions,
          {
            day: this.emotions.length + 1,
            state: emotion,
            id: Date.now()
          }
        ];
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }
}
</script>

<style>
.app {
  padding: 20px;
  background: white;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}
</style>