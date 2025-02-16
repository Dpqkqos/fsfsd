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
        dailyForecast: '',
      },
      emotions: [],
    };
  },
  async created() {
    // Автоматическая настройка приложения
    this.setupTelegramApp();

    // Получаем данные пользователя из Telegram Web App
    const tgUser = window.Telegram.WebApp.initDataUnsafe.user;

    if (tgUser) {
      this.user = {
        avatar: tgUser.photo_url || 'https://example.com/default-avatar.jpg',
        name: tgUser.first_name || 'Пользователь',
        daysOnPlatform: 0,
        dailyForecast: 'Прогноз дня',
      };

      // Загрузка данных с сервера
      try {
        const response = await axios.get(`/api/user/${tgUser.id}`);
        this.user.daysOnPlatform = response.data.days_on_platform;
        this.emotions = response.data.daily_emotions.map((emotion, index) => ({
          day: index + 1,
          state: emotion,
        }));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
  },
  methods: {
    // Настройка Telegram Web App
    setupTelegramApp() {
      const tg = window.Telegram.WebApp;

      // Развернуть приложение на весь экран
      tg.expand();

      // Установить цвет фона
      tg.backgroundColor = '#6a11cb';
      tg.headerColor = '#6a11cb';

      // Установить цвет текста
      tg.setHeaderColor('#6a11cb');
      tg.setBackgroundColor('#6a11cb');

      // Включить кнопку "Назад"
      tg.BackButton.show();
      tg.BackButton.onClick(() => {
        tg.close();
      });
    },
    async addEmotion(emotion) {
      try {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (!tgUser) return;

        const response = await axios.post(`/api/emotion/${tgUser.id}`, { emotion });
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

<style>
/* Глобальные стили для Telegram Mini Apps */
.app {
  padding: 20px;
  background: var(--tg-theme-bg-color, #6a11cb);
  color: var(--tg-theme-text-color, white);
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}

/* Стили для карточки пользователя */
.user-card {
  background: var(--tg-theme-secondary-bg-color, rgba(255, 255, 255, 0.1));
  border-radius: 20px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

/* Стили для кнопок */
button {
  background: var(--tg-theme-button-color, linear-gradient(45deg, #ff7e5f, #feb47b));
  color: var(--tg-theme-button-text-color, white);
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

button:hover {
  transform: scale(1.05);
}

/* Анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>