<template>
  <div class="app">
    <UserCard :user="user" />
    <EmotionTable 
      :emotions="emotions" 
      @add-emotion="addEmotion"
      class="mt-4"
    />
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
        // Регистрация/получение пользователя
        await this.registerUser(tgUser);
        
        // Загрузка данных
        const response = await axios.get(`/api/user/${tgUser.id}`);
        this.user = {
          avatar: response.data.avatar,
          name: response.data.name,
          daysOnPlatform: response.data.days_on_platform,
        };
        this.emotions = response.data.daily_emotions.map((e, i) => ({
          day: i + 1,
          state: e,
          id: Date.now() + i // Уникальный ID для анимаций
        }));
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  },
  methods: {
    async registerUser(tgUser) {
      try {
        await axios.post('/api/register', {
          tg_id: tgUser.id,
          name: tgUser.first_name,
          avatar: tgUser.photo_url,
        });
      } catch (error) {
        if (error.response?.status !== 409) { // Игнорируем ошибку "уже существует"
          throw error;
        }
      }
    },
    async addEmotion(emotion) {
      try {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        const response = await axios.post(`/api/emotion/${tgUser.id}`, { emotion });
        
        if (response.status === 200) {
          this.emotions = [
            ...this.emotions,
            {
              day: this.emotions.length + 1,
              state: emotion,
              id: Date.now()
            }
          ];
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    },
  },
};
</script>

<style scoped>
.app {
  background: white;
  min-height: 100vh;
  padding: 16px;
  font-family: 'Roboto', sans-serif;
}

.mt-4 {
  margin-top: 1.5rem;
}
</style>